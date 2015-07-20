define(['jquery', 'underscore', 'backbone', 'moment', 'datetimepicker', 'text!days/template.single.edit.html'],
	function ($, _, Backbone, momentLib, datetimepicker, Template) {

	var EditView = Backbone.View.extend({
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
			if(this.model.get("startTime") != '') {
				$('input[name="startTime"]').val(moment(this.model.get('startTime')).format('HH:mm, DD.MM.YYYY'));
			}
			$('input[name="startTime"]').bootstrapMaterialDatePicker({
				format: 'HH:mm, DD.MM.YYYY',
				weekStart : 1,
				cancelText: 'Скасувати',
				okText: 'Вибрати'
			});
			if(this.model.get("endTime") != '') {
				$('input[name="endTime"]').val(moment(this.model.get('endTime')).format('HH:mm, DD.MM.YYYY'));
			}
			$('input[name="endTime"]').bootstrapMaterialDatePicker({
				format: 'HH:mm, DD.MM.YYYY',
				weekStart : 1,
				cancelText: 'Скасувати',
				okText: 'Вибрати'
			});
		},
		cancel: function() {
			window.history.back();
		},
		saveEntity: function() {
			if(this.validate()) {
				this.model.save(this.model.attributes, {
					success: function (model, response, options) {
						Backbone.history.navigate('days/' + model.get("id"), {trigger: true});
					},
					error: function (model, response, options) {
						console.log("error: " + response.status);
						console.log(response);
						console.log(options);
					}
				});
			} else {
				$("")
			}
		},
		validate: function() {
			$('.invalid').removeClass('invalid');
			var isValid = true;
			var temp;

			temp = $('input[name="title"]').val();
			if(temp != null && temp != '') {
				this.model.set('title', temp);
			} else {
				isValid = false;
				$('#title').addClass("invalid");
			}

			temp = $('textarea[name="description"]').val();
			if(temp != null) {
				this.model.set('description', temp);
			}

			temp = $('input[name="startTime"]').val();
			if(temp != null && temp != '') {
				this.model.set('startTime', moment(temp, "HH:mm, DD.MM.YYYY"));
			} else {
				isValid = false;
				$('#startTime').addClass("invalid");
			}

			temp = $('input[name="endTime"]').val();
			if(temp != null && temp != '') {
				this.model.set('endTime', moment(temp, "HH:mm, DD.MM.YYYY"));
			} else {
				isValid = false;
				$('#endTime').addClass("invalid");
			}

			return isValid;
		}
	});

	return EditView;
});