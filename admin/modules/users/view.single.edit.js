App.Views.UserEdit = Backbone.View.extend({
	el: $('#main'),
	template: _.template( $('#template-single-edit-users').html() ),
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
		$("#createdAt .date").datetimepicker({
			format			: 'hh:ii, dd.mm.yyyy',
			autoclose		: true,
			todayBtn		: true,
			pickerPosition	: "bottom-left",
			initialDate		: new Date(this.model.get('createdAt'))
		});
		$("#createdAt .date input").val(moment(this.model.get('createdAt')).format("HH:mm, DD.MM.YYYY"));
		console.info("created at: " + moment(this.model.get('createdAt')).format("HH:mm, DD.MM.YYYY"));
		console.info("updated at: " + moment(this.model.get('updatedAt')).format("HH:mm, DD.MM.YYYY"));
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
		$('.has-error').removeClass('has-error');
		var isValid = true;
		var temp;

		temp = $('input[name="firstName"]').val();
		if(temp != null && temp != '') {
			this.model.set('firstName', temp);
		} else {
			isValid = false;
			$('#firstName').addClass("has-error");
		}

		temp = $('input[name="lastName"]').val();
		if(temp != null && temp != '') {
			this.model.set('lastName', temp);
		} else {
			isValid = false;
			$('#lastName').addClass("has-error");
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

		this.model.set('createdAt', moment($('input[name="createdAt"]').val(), "HH:mm, DD.MM.YYYY").toISOString());

		return isValid;
	}
});