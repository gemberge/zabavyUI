define(['jquery', 'underscore', 'backbone', 'materialize', 'moment', 'datetimepicker', 'presence/model', 'users/collection', 'days/collection', 'text!presence/template.single.edit.html'],
	function ($, _, Backbone, Materialize, momentLib, datetimepicker, Model, UsersCollection, DaysCollection, Template) {

	var View = Backbone.View.extend({
		el: $('#modal'),
		template: _.template(Template),
		events: {
			'click .saveBtn'			: 'saveEntity',
			'click .delBtn'				: 'delEntity'
		},
		initialize: function(){
			$(this.el).off('click', '.saveBtn');
			$(this.el).off('click', '.delBtn');
		},
		render: function() {
			this.$el.html( this.template({ model: this.model }) );
			$('#modal').openModal();
			if(this.model.isNew()) {
				if(this.model.get('user') != null) {
					$("select[name='userId']").html("<option value='" + this.model.get('user').id + "' selected> " + this.model.get('user').firstName + ' ' + this.model.get('user').lastName + "</option>");
					$("select[name='userId']").attr("disabled", "disabled");
					this.fillSelectors(false, true);
				}
				if(this.model.get('gamingDay') != null) {
					$("select[name='eventId']").html("<option value='" + this.model.get('gamingDay').id + "' selected> " + this.model.get('gamingDay').title + "</option>");
					$("select[name='eventId']").attr("disabled", "disabled");
					this.fillSelectors(true, false);
				}
				$("div.modal-footer > .delBtn").hide();
			} else {
				this.fillSelectors(true, true);
			}
			if(this.model.get('timeFrom') != 0) {
				$("input[name='timeFrom']").val(moment(this.model.get('timeFrom')).format("HH:mm, DD.MM.YYYY"));
			}
			$('input[name="timeFrom"]').bootstrapMaterialDatePicker({
				format: 'HH:mm, DD.MM.YYYY',
				weekStart : 1,
				cancelText: 'Скасувати',
				okText: 'Вибрати'
			});
			if(this.model.get('timeTo') != 0) {
				$("input[name='timeTo']").val(moment(this.model.get('timeTo')).format("HH:mm, DD.MM.YYYY"));
			}
			$('input[name="timeTo"]').bootstrapMaterialDatePicker({
				format: 'HH:mm, DD.MM.YYYY',
				weekStart : 1,
				cancelText: 'Скасувати',
				okText: 'Вибрати'
			});
		},
		saveEntity: function() {
			if(this.validate()) {
				this.model.save(this.model.attributes, {
					success: function (model, response, options) {
						$('#modal').closeModal();
					},
					error: function (model, response, options) {
						console.log("error: " + response.status);
						console.log(response);
						console.log(options);
					}
				});
			} else {}
		},
		delEntity: function() {
			if(this.model.isNew()) {
				$('#modal').closeModal();
			} else {
				this.model.destroy({
					success: function () {
						$('#modal').closeModal();
					},
					error: function (model, response, options) {
						console.log("error: " + response.status);
						console.log(response);
						console.log(options);
					}
				})
			}
		},
		fillSelectors: function(needUser, needDay) {
			var temp, model = this.model;
			if(needUser) {
				var users = new UsersCollection();
				users.fetch({async: false, data: {offset: 0, limit: 3000}});
				users.each(function(user) {
					temp = "<option value='" + user.get('id') + "' ";
					if(model.get('user')) if(user.get('id') == model.get('user').id) temp = temp + "selected";
					temp = temp + ">" + user.get('firstName') + " " + user.get('lastName') + "</option>";
					$("select[name='userId']").append(temp);
				});
			}
			if(needDay) {
				var days = new DaysCollection();
				days.fetch({async: false, data: {offset: 0, limit: 3000}});
				days.each(function(day) {
					temp = "<option value='" + day.get('id') + "' ";
					if(model.get('gamingDay')) if(day.get('id') == model.get('gamingDay').id) temp = temp + "selected";
					temp = temp + ">" + day.get('title') + "</option>";
					$("select[name='eventId']").append(temp);
				});
			}
			$('select').material_select();
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