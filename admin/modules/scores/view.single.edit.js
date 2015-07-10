App.Views.MatchEdit = Backbone.View.extend({
	el: $('#modal'),
	template: _.template( $('#template-single-edit-match').html() ),
	events: {
		'change #mainGamebox select': 'mainGameboxChanged',
		'click .saveBtn': 'saveEntity',
		'click .delBtn'	: 'delEntity'
	},
	initialize: function(){
		$(this.el).off('change', '#mainGamebox select');
		$(this.el).off('click', '.saveBtn');
		$(this.el).off('click', '.delBtn');
	},
	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		$('#modal').modal('show');
		$('input[name="tutorial"]').bootstrapToggle({width: 120});
		if(this.model.isNew()) {
			if(this.model.get('event') != null) {
				$("#event > div").html("<p class='form-control-static'>" + this.model.get('event').title + "</p>");
				this.fillSelectors(false, true);
			}
			if(this.model.get('mainGamebox') != null) {
				$("#mainGamebox > div").html("<p class='form-control-static'>" + this.model.get('mainGamebox').ukTitle + "</p>");
				this.fillSelectors(true, false);
				this.updateAddons(this.model.get('mainGamebox').id);
			}
			$("div.modal-footer > .delBtn").hide();
		} else {
			this.fillSelectors(true, true);
		}
	},
	saveEntity: function() {
		var data = {};
		data.tutorial = $('input[name="tutorial"]').prop('checked');
		data.winType = $('select[name="winType"]').val();

		if(this.model.isNew()) {
			if(this.model.get('event') == null) {
				data.event = {id: $("#event select").val(), title: $("#event option:selected").text()};
			} else {
				data.event = this.model.get('event');
			}
			if(this.model.get('mainGamebox') == null) {
				data.mainGamebox = {id: $("#mainGamebox select").val(), ukTitle: $("#mainGamebox option:selected").text()};
			} else {
				data.mainGamebox = this.model.get('mainGamebox');
			}
		} else {
			data.event = {id: $("#event select").val(), title: $("#event option:selected").text()};
			data.mainGamebox = {id: $("#mainGamebox select").val(), ukTitle: $("#mainGamebox option:selected").text()};
		}

		data.additionalGameboxes = [];

		var selector;
		this.addons.each(function (addon) {
			selector = 'input[name="addon' + addon.get('id') + '"]';
			if($(selector).prop('checked')) {
				data.additionalGameboxes.push({id: addon.get('id')});
			}
		});

		this.model.save(data, {
			wait: true,
			success: function (model, response, options) {
				$('#modal').modal('hide');
			},
			error: function (model, response, options) {
				console.log("error: " + response.status);
				console.log(response);
				console.log(options);
			}
		});
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
	fillSelectors: function(needEvent, needMainGamebox) {
		var temp, model = this.model;
		if(needEvent) {
			var events = new App.Collections.Days();
			events.fetch({async: false});
			events.each(function(event) {
				temp = "<option value='" + event.get('id') + "' ";
				if(model.get('event')) if(event.get('id') == model.get('event').id) temp = temp + "selected";
				temp = temp + ">" + event.get('title') + "</option>";
				$("#event select").append(temp);
			});
		}
		if(needMainGamebox) {
			var gameboxes = new App.Collections.Gameboxes();
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
		this.addons = new App.Collections.GameboxAddons({parentId: gameboxId});
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