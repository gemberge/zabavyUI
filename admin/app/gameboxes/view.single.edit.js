define(['jquery', 'underscore', 'backbone', 'gameboxes/collection', 'gameboxes/model', 'text!gameboxes/template.single.edit.html'],
	function ($, _, Backbone, Gameboxes, Model, Template) {

	var SingleEditView = Backbone.View.extend({
		el: $('#main'),
		template: _.template(Template),
		events: {
			'change input'			: 'inputChanged',
			'change textarea' 		: 'inputChanged',
			'change select' 		: 'inputChanged',
			'click .step.clickable'	: 'showStep',
			'click .nextStepBtn'	: 'nextStep',
			'click .saveBtn'		: 'saveEntity',
			'click .cancelBtn'		: 'showFinalDialog'
		},
		initialize: function(){
			$(this.el).off('change', 'input');
			$(this.el).off('change', 'textarea');
			$(this.el).off('change', 'select');
			$(this.el).off('click', '.step.clickable');
			$(this.el).off('click', '.saveBtn');
			$(this.el).off('click', '.cancelBtn');
			$(this.el).off('click', '.nextStepBtn');
		},
		render: function(step) {
			var parents = new Gameboxes();
			parents.fetch({ async: false, data: {addon: false} });
			this.$el.html( this.template({ model: this.model, parents: parents }) );
			if(step) {
				this.showStep(step);
			} else {
				this.showStep("title");
			}
		},
		cancel: function() {
			window.history.back();
		},
		saveEntity: function() {
			if(this.validate()) {
				if(this.changed.cover) {
					this.changed.cover = this.saveImage(this.changed.cover);
				}
				this.model.save(this.changed, {
					success: function (model, response, options) {
						Backbone.history.navigate('gameboxes/' + model.get("id"), {trigger: true});
					},
					error: function (model, response, options) {
						console.log(response);
					}
				});
			}
		},
		saveImage: function (file) {
			var image = null;
			var formData = new FormData($('form#imageUpload')[0]);
			$.ajax({
				async: false,
				url: 'api/files',
				type: 'POST',
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				success: function (img, response) {
					image = img;
				}
			});
			return image;
		},
		inputChanged: function (e) {
			if(!this.changed) {
				this.changed = {};
			}
			if(e.target.name == "file") {
				this.changed.cover = e.target.files[0];
				this.showImagePreview(e.target.files[0]);
			} else if(e.target.name == "isAddon") {
				if(e.target.checked) {
					this.showParentSelector(true);
					this.changed.parent = {id: $("select[name='parentId']").val()}
				} else {
					this.showParentSelector(false);
					this.changed.parent = null;
				}
			} else if(e.target.name == "parentId") {
				this.changed.parent = {id: e.target.value}
			} else {
				this.changed[e.target.name] = e.target.value;
			}
		},
		showImagePreview: function (file) {
			var canvas = document.getElementById("imagePreview");
			var reader = new FileReader();
			reader.onload = function(event){
				var img = new Image();
				img.onload = function(){
					canvas.width = img.width;
					canvas.height = img.height;
					canvas.getContext("2d").drawImage(img,0,0);
				};
				img.src = event.target.result;
			};
			reader.readAsDataURL(file);
		},
		showParentSelector: function (show) {
			if(show) {
				$("select[name='parentId']").show();
			} else {
				$("select[name='parentId']").hide();
			}
		},
		nextStep: function () {
			if(this.model.isNew()) {
				$('.has-error').removeClass('has-error');
				if(this.changed) {
					var complete = true;
					if(this.changed.ukTitle == null) {
						$('#ukTitle').addClass("has-error");
						complete = false;
					}
					if(this.changed.enTitle == null) {
						$('#enTitle').addClass("has-error");
						complete = false;
					}
					if(complete) {
						var view = this;
						view.model.save(view.changed, {
							success: function (model, response, options) {
								view.render("addon");
							},
							error: function (model, response, options) {
								console.log(response);
							}
						});
					}
				} else {
					$('#ukTitle').addClass("has-error");
					$('#enTitle').addClass("has-error");
				}
			} else {
				switch (this.currentStep) {
					case "title": this.showStep("addon"); break;
					case "addon": this.showStep("image"); break;
					case "image": this.showStep("details"); break;
					case "details": this.showStep("description"); break;
					case "description": this.showStep("rules"); break;
					case "rules": this.showFinalDialog(); break;
				}
			}
		},
		showStep: function (step) {
			var selector;
			if(step.target) step = step.currentTarget.dataset.step;
			if(!this.model.isNew() || step == "title") {
				if(this.currentStep) {
					selector = '.step[data-step="' + this.currentStep + '"]';
					$(selector).removeClass("active");
					selector = '#' + this.currentStep + '.step-block';
					$(selector).hide();
				}
				this.currentStep = step;
				selector = '.step[data-step="' + step + '"]';
				$(selector).addClass("active");
				selector = '#' + step + '.step-block';
				$(selector).show();
				if(step == "rules") {
					$('.nextStepBtn').text('Завершити');
				} else {
					$('.nextStepBtn').text('Наступний блок');
				}
			}
		},
		showFinalDialog: function () {
			if(this.changed) {
				if (confirm('Ви змінили деякі поля забавки, зберегти їх?')) {
					this.saveEntity();
				} else {
					this.cancel();
				}
			} else {
				this.cancel();
			}
		},
		validate: function() {
			$('.has-error').removeClass('has-error');
			$('.step.error').removeClass('error');
			var isValid = true;

			if(this.changed.ukTitle != null) {
				if(this.changed.ukTitle == '') {
					isValid = false;
					$('#ukTitle').addClass("has-error");
					$('.step[data-step="title"]').addClass("error");
				}
			}
			if(this.changed.enTitle != null) {
				if(this.changed.enTitle == '') {
					isValid = false;
					$('#enTitle').addClass("has-error");
					$('.step[data-step="title"]').addClass("error");
				}
			}

			if(this.changed.mink != null) {
				if(this.changed.mink == '' || !$.isNumeric(this.changed.mink)) {
					isValid = false;
					$('#mink').addClass("has-error");
					$('.step[data-step="details"]').addClass("error");
				}
			}
			if(this.changed.maxk != null) {
				if(this.changed.maxk == '' || !$.isNumeric(this.changed.maxk)) {
					isValid = false;
					$('#maxk').addClass("has-error");
					$('.step[data-step="details"]').addClass("error");
				}
			}
			if(this.changed.minTime != null) {
				if(this.changed.minTime == '' || !$.isNumeric(this.changed.minTime)) {
					isValid = false;
					$('#minTime').addClass("has-error");
					$('.step[data-step="details"]').addClass("error");
				}
			}
			if(this.changed.maxTime != null) {
				if(this.changed.maxTime == '' || !$.isNumeric(this.changed.maxTime)) {
					isValid = false;
					$('#maxTime').addClass("has-error");
					$('.step[data-step="details"]').addClass("error");
				}
			}

			return isValid;
		}
	});

	return SingleEditView;
});