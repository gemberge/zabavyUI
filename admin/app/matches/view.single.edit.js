define(['jquery', 'underscore', 'backbone', 'bootstrap', 'toggle', 'typeahead', 'bloodhoundSources', 'text!matches/template.single.edit.html',
		'scores/model', 'scores/collection', 'scores/view.list.embedded.match', 'days/collection', 'gameboxes/collection', 'gameboxes/collection.addons'],
	function ($, _, Backbone, Bootstrap, toggle, Typeahead, sources, Template,
			  ScoreModel, ScoresCollection, ScoresListEmbeddedInMatchView, DaysCollection, GameboxesCollection, AddonsCollection) {

		var View = Backbone.View.extend({
			el: $('#modal'),
			template: _.template(Template),
			events: {
				'change #mainGamebox select': 'mainGameboxChanged',
				'click .saveBtn'	: 'saveEntity',
				'click .cloneBtn'	: 'cloneEntity',
				'click .delBtn'		: 'delEntity'
			},
			initialize: function(){
				$(this.el).off('change', '#mainGamebox select');
				$(this.el).off('click', '.saveBtn');
				$(this.el).off('click', '.delBtn');
				$(this.el).off('click', '.cloneBtn');
			},
			render: function(data) {
				this.$el.html( this.template(this.model.toJSON()) );
				$('#modal').modal('show');
				$('input[name="tutorial"]').bootstrapToggle({width: 120});
				if(this.model.isNew()) {
					if(this.model.get('event') != null) {
						$("#event > div").html("<p class='form-control-static'>" + this.model.get('event').title + "</p>");
						this.fillSelectors(false, true);
					} else {
						this.fillSelectors(true, true);
					}
					$("div.modal-footer > .delBtn").hide();
					$("div.modal-footer > .cloneBtn").hide();
				} else {
					this.fillSelectors(true, true);
				}
				this.scores = data.scores;
				this.scoresToRemove = [];
				var scoresView = new ScoresListEmbeddedInMatchView({collection: this.scores, scoresToRemove: this.scoresToRemove});
				$('#scores > div').append(scoresView.render().el);
				this.setupTypeahead();
			},
			setupTypeahead: function () {
				$('input[name="newPlayer"]').typeahead({
					classNames: {
						menu		: 'dropdown-menu',
						dataset		: 'autocomplete',
						suggestion	: 'autocomplete-item'
					}
				}, {
					limit	: 10,
					name	: "users",
					display	: 'nickname',
					source	: sources.users,
					templates: {
						pending: '<div class="autocomplete-item pending"><img src="/rsc/admin/img/preloader.gif"></div>',
						empty: '<div class="autocomplete-item text-muted">нічого такого немає</div>',
						suggestion: _.template('<div> <img src="<%= photoUrl %>" class="img-rounded" style="height: 40px;"> <%= nickname %> </div>')
					}
				});
				var view = this;
				$('input[name="newPlayer"]').bind('typeahead:select', function(ev, suggestion) {
					view.addNewScore(suggestion);
				});
			},
			addNewScore: function (user) {
				$('input[name="newPlayer"]').typeahead('val', "");
				var exist = false;
				this.scores.each(function (score) {
					if(score.get("user").id == user.id) exist = true;
				});
				if(!exist) {
					var newScore = new ScoreModel({match: this.model.toJSON(), user: user});
					this.scores.add(newScore);
				}
			},
			saveEntity: function() {
				var data = {};
				var view = this;
				data.tutorial = $('input[name="tutorial"]').prop('checked');
				data.winType = $('select[name="winType"]').val();

				if(this.model.isNew()) {
					if(this.model.get('event') == null) {
						data.event = {id: $("#event select").val(), title: $("#event option:selected").text()};
					} else {
						data.event = this.model.get('event');
					}
				} else {
					data.event = {id: $("#event select").val(), title: $("#event option:selected").text()};
				}
				data.mainGamebox = {id: $("#mainGamebox select").val(), ukTitle: $("#mainGamebox option:selected").text()};
				data.additionalGameboxes = [];

				var selector;
				this.addons.each(function (addon) {
					selector = 'input[name="addon' + addon.get('id') + '"]';
					if($(selector).prop('checked')) {
						data.additionalGameboxes.push({id: addon.get('id')});
					}
				});
				$('#modal .modal-footer').html('<img src="/rsc/admin/img/preloader.gif" class="pull-right"><span class="pull-right">зберігаються дані зіграної партії</span>');
				this.model.save(data, {
					wait: true,
					success: function (model, response, options) {
						view.saveScores();
					},
					error: function (model, response, options) {
						console.log("error: " + response.status);
						console.log(response);
						console.log(options);
					}
				});
			},
			saveScores: function () {
				var view = this;
				$('#modal .modal-footer').html('<img src="/rsc/admin/img/preloader.gif" class="pull-right"><span class="pull-right">зберігаються учасників зіграної партії</span>');
				_.each(view.scoresToRemove, function (score) {
					score.destroy({async: false});
				});
				view.scores.each(function (score) {
					score.set("match", view.model.toJSON());
					score.save({}, {async: false});
				});
				$('#modal').modal('hide');
				this.model.trigger("change");
			},
			delEntity: function() {
				if(this.model.isNew()) {
					$('#modal').modal('hide');
				} else {
					this.model.destroy({
						success: function () {
							$('#modal').modal('hide');
						},
						error: function (model, response, options) {
							console.log("error: " + response.status);
							console.log(response);
							console.log(options);
						}
					})
				}
			},
			cloneEntity: function() {
				$('#modal .modal-footer').html('<img src="/rsc/admin/img/preloader.gif" class="pull-right"><span class="pull-right">клонуємо цю партію</span>');
				var clone = this.model.clone();
				clone.unset("id");

				var view = this;
				var newScore;
				var newScores = new ScoresCollection();
				view.scores.each(function (score) {
					newScore = new ScoreModel({match: clone.toJSON(), user: score.get("user")});
					newScores.add(newScore);
				});
				var matchEditView = new View({model: clone});
				matchEditView.render({scores: newScores});
			},
			fillSelectors: function(needEvent, needMainGamebox) {
				var temp, model = this.model;
				if(needEvent) {
					var events = new DaysCollection();
					events.fetch({async: false});
					events.each(function(event) {
						temp = "<option value='" + event.get('id') + "' ";
						if(model.get('event')) if(event.get('id') == model.get('event').id) temp = temp + "selected";
						temp = temp + ">" + event.get('title') + "</option>";
						$("#event select").append(temp);
					});
				}
				if(needMainGamebox) {
					var gameboxes = new GameboxesCollection();
					gameboxes.fetch({async: false, data: {addon: false}});
					gameboxes.each(function(gamebox) {
						temp = "<option value='" + gamebox.get('id') + "' ";
						if(model.get('mainGamebox')) if(gamebox.get('id') == model.get('mainGamebox').id) temp = temp + "selected";
						temp = temp + ">" + gamebox.get('ukTitle') + "</option>";
						$("#mainGamebox select").append(temp);
					});
					this.updateAddons($('#mainGamebox select').val());
				}
			},
			mainGameboxChanged: function () {
				this.updateAddons($('#mainGamebox select').val());
			},
			updateAddons: function(gameboxId) {
				var model = this.model;
				this.addons = new AddonsCollection({parentId: gameboxId});
				this.addons.fetch({
					success: function (collection, data) {
						if(data.length == 0) {
							$("#additionalGameboxes > div").html("<p class='form-control-static'> немає доступних для цієї забавки</p>");
						} else {
							$("#additionalGameboxes > div").html("<ul class='list-group'></ul>");
							var temp;
							_.each(data, function(addon) {
								temp = '<li class="list-group-item"><span class="pull-right addon"><input name="addon' + addon.id;
								temp = temp + '" type="checkbox" data-toggle="toggle"></span>' + addon.ukTitle + "</li>";
								$("#additionalGameboxes ul").append(temp);
							});
							_.each(model.get('additionalGameboxes'), function(addon) {
								temp = 'input[name="addon' + addon.id + '"]';
								$(temp).prop('checked', true);
							});
							$('#additionalGameboxes input').bootstrapToggle({on: "залучено", off: "не залучено", width: 120});
						}
					},
					error: function (model, response) {
						console.error(response);
					}
				});
			},
			validate: function() {
				$('.has-error').removeClass('has-error');
				var isValid = true;
				var temp;

				temp = $('select[name="userId"]').val();
				if(temp != null) {
					this.model.set('user', {id: temp});
				} else {
					isValid = false;
					$('#user').addClass("has-error");
				}

				temp = $('input[name="timeFrom"]').val();
				if(temp != null && temp != '') {
					this.model.set('timeFrom', moment(temp, "HH:mm, DD.MM.YYYY").toISOString());
				} else {
					isValid = false;
					$('#time').addClass("has-error");
				}

				temp = $('input[name="timeTo"]').val();
				if(temp != null && temp != '') {
					this.model.set('timeTo', moment(temp, "HH:mm, DD.MM.YYYY").toISOString());
				}

				return isValid;
			}
		});

		return View;
	});