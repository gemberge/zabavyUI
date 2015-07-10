define(['jquery', 'underscore', 'backbone', 'gameboxes/collection', 'gameboxes/model', 'text!gameboxes/template.single.edit.html'],
	function ($, _, Backbone, Gameboxes, Model, Template) {

	var SingleEditView = Backbone.View.extend({
		el: $('#main'),
		template: _.template(Template),
		events: {
			'change input[name="isAddon"]' : 'showParentSelector',
			'click .saveBtn'	: 'saveEntity',
			'click .cancelBtn'	: 'cancel'
		},
		initialize: function(){
			$(this.el).off('change', 'input[name="isAddon"]');
			$(this.el).off('click', '.saveBtn');
			$(this.el).off('click', '.cancelBtn');
		},
		render: function() {
			var parents = new Gameboxes();
			parents.fetch({ async: false, data: {addon: false} });
			this.$el.html( this.template({ model: this.model, parents: parents }) );
		},
		cancel: function() {
			window.history.back();
		},
		saveEntity: function() {
			if(this.validate()) {
				this.model.save(this.model.attributes, {
					success: function (model, response, options) {
						Backbone.history.navigate('gameboxes/' + model.get("id"), {trigger: true});
					},
					error: function (model, response, options) {
						console.log(response);
					}
				});
			}
		},
		showParentSelector: function (e) {

		},
		validate: function() {
			$('.has-error').removeClass('has-error');
			var isValid = true;
			var temp;

			temp = $('input[name="ukTitle"]').val();
			if(temp != null && temp != '') {
				this.model.set('ukTitle', temp);
			} else {
				isValid = false;
				$('#ukTitle').addClass("has-error");
			}

			temp = $('input[name="enTitle"]').val();
			if(temp != null && temp != '') {
				this.model.set('enTitle', temp);
			} else {
				isValid = false;
				$('#enTitle').addClass("has-error");
			}

			temp = $('input[name="mink"]').val();
			if(temp != null && temp != '') {
				this.model.set('mink', temp);
			} else {
				isValid = false;
				$('#numbers').addClass("has-error");
			}

			temp = $('input[name="maxk"]').val();
			if(temp != null && temp != '') {
				this.model.set('maxk', temp);
			} else {
				isValid = false;
				$('#numbers').addClass("has-error");
			}

			temp = $('input[name="minTime"]').val();
			if(temp != null && temp != '') {
				this.model.set('minTime', temp);
			} else {
				isValid = false;
				$('#numbers').addClass("has-error");
			}

			temp = $('input[name="maxTime"]').val();
			if(temp != null && temp != '') {
				this.model.set('maxTime', temp);
			} else {
				isValid = false;
				$('#numbers').addClass("has-error");
			}

			if($('input[name="isAddon"]')[0].checked) {
				var parent = {};
				parent.id = $('select[name="parentId"]').val();
				this.model.set('parent', parent);
			}

			temp = $('input[name="description"]').val();
			if(temp != null && temp != '') {
				this.model.set('description', temp);
			}

			return isValid;
		}
	});

	return SingleEditView;
});