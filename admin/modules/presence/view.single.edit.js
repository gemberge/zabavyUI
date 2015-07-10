App.Views.PresenceEdit = Backbone.View.extend({
	el: $('#modal'),
	template: _.template( $('#template-single-edit-presence').html() ),
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
		$('#modal').modal('show');
		if(this.model.isNew()) {
			if(this.model.get('user') != null) {
				$("#user > div").html("<p class='form-control-static'>" + this.model.get('user').firstName + ' ' + this.model.get('user').lastName + "</p>");
				this.fillSelectors(false, true);
			}
			if(this.model.get('gamingDay') != null) {
				$("#gamingDay > div").html("<p class='form-control-static'>" + this.model.get('gamingDay').title + "</p>");
				this.fillSelectors(true, false);
			}
			$("div.modal-footer > .delBtn").hide();
		} else {
			this.fillSelectors(true, true);
		}
		if(this.model.get('timeFrom') != 0) {
			$("#time #from").datetimepicker({
				format			: 'hh:ii, dd.mm.yyyy',
				autoclose		: true,
				todayBtn		: true,
				pickerPosition	: "bottom-left",
				initialDate		: new Date(this.model.get('timeFrom'))
			});
			$("#time #from input").val(moment(this.model.get('timeFrom')).format("HH:mm, DD.MM.YYYY"));
		} else {
			$("#time #from").datetimepicker({
				format			: 'hh:ii, dd.mm.yyyy',
				autoclose		: true,
				todayBtn		: true,
				pickerPosition	: "bottom-left"
			});
		}
		if(this.model.get('timeTo') != 0) {
			$("#time #to").datetimepicker({
				format			: 'hh:ii, dd.mm.yyyy',
				autoclose		: true,
				todayBtn		: true,
				pickerPosition	: "bottom-left",
				startDate		: new Date(this.model.get('timeFrom')),
				initialDate		: new Date(this.model.get('timeTo'))
			});
			$("#time #to input").val(moment(this.model.get('timeTo')).format("HH:mm, DD.MM.YYYY"));
		} else {
			$("#time #to").datetimepicker({
				format			: 'hh:ii, dd.mm.yyyy',
				autoclose		: true,
				todayBtn		: true,
				pickerPosition	: "bottom-left",
				startDate		: new Date(this.model.get('timeFrom'))
			});
		}
	},
	saveEntity: function() {
		if(this.validate()) {
			this.model.save(this.model.attributes, {
				success: function (model, response, options) {
					$('#modal').modal('hide');
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
	fillSelectors: function(needUser, needDay) {
		var temp, model = this.model;
		if(needUser) {
			var users = new App.Collections.Users();
			users.fetch({async: false});
			users.each(function(user) {
				temp = "<option value='" + user.get('id') + "' ";
				if(model.get('user')) if(user.get('id') == model.get('user').id) temp = temp + "selected";
				temp = temp + ">" + user.get('firstName') + " " + user.get('lastName') + "</option>";
				$("#user select").append(temp);
			});
		}
		if(needDay) {
			var days = new App.Collections.Days();
			days.fetch({async: false});
			days.each(function(day) {
				temp = "<option value='" + day.get('id') + "' ";
				if(model.get('gamingDay')) if(day.get('id') == model.get('gamingDay').id) temp = temp + "selected";
				temp = temp + ">" + day.get('title') + "</option>";
				$("#gamingDay select").append(temp);
			});
		}
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