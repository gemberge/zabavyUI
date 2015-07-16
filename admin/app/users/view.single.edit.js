define(['jquery', 'underscore', 'backbone', 'moment', 'materialize', 'users/model', 'text!users/template.single.edit.html'],
	function ($, _, Backbone, momentLib, Materialize, Model, Template) {

	var SingleEditView = Backbone.View.extend({
		el: $('#main'),
		template: _.template(Template),
		events: {
			'click .saveBtn'	: 'saveEntity',
			'click .cancelBtn'	: 'cancel'
		},
		initialize: function(){
			$(this.el).off('click', '.saveBtn');
			$(this.el).off('click', '.cancelBtn');
		},
		render: function() {
			this.$el.html( this.template({ model: this.model }) );
			$('select').material_select();
			$("#createdAt .date input").val(moment(this.model.get('createdAt')).format("HH:mm, DD.MM.YYYY"));
		},
		cancel: function() {
			window.history.back();
		},
		saveEntity: function() {
			if(this.validate()) {
				this.model.save(this.model.attributes, {
					success: function (model, response, options) {
						Backbone.history.navigate('users/' + model.get("id"), {trigger: true});
					},
					error: function (model, response, options) {
						console.log("error: " + response.status);
						console.log(response);
						console.log(options);
					}
				});
			} else {

			}
		},
		validate: function() {
			$('.invalid').removeClass('invalid');
			var isValid = true;
			var temp;

			temp = $('input[name="firstName"]').val();
			if(temp != null && temp != '') {
				this.model.set('firstName', temp);
			} else {
				isValid = false;
				$('#firstName').addClass("invalid");
			}

			temp = $('input[name="lastName"]').val();
			if(temp != null && temp != '') {
				this.model.set('lastName', temp);
			} else {
				isValid = false;
				$('#lastName').addClass("invalid");
			}

			temp = $('input[name="nickname"]').val();
			if(temp != null && temp != '') {
				this.model.set('nickname', temp);
			}

			temp = $('input[name="photoUrl"]').val();
			if(temp != null && temp != '') {
				this.model.set('photoUrl', temp);
			}

			this.model.set('role', $('select[name="role"]').val());

			return isValid;
		}
	});

	return SingleEditView;
});