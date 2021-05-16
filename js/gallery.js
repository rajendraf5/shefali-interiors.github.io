/*--------------------- Copyright (c) 2019 -----------------------
[Master Javascript]
Project: Inland Design - Multipurpose Responsive HTML Template
Version: 1.0.0
Assigned to: Theme Forest
-------------------------------------------------------------------*/

(function ($) {
	"use strict";
	var Inland = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}

		/*-------------- Inland Design Functions Calling ---------------------------------------------------
		------------------------------------------------------------------------------------------------*/
		
			this.Isotop_gallery();
			this.Magnific_popup();
			this.Product_thumb_slider();

			
		},
		
	

		
		
		// Star isotop gallery js 
		
			Isotop_gallery: function() {
				$(window).on('load', function(){
					
					$('.gallery_grid').isotope({
							itemSelector: '.grid-item',
							filter: '*'
					}); 
					$('.int_project_gallery > .gallery_nav > ul > li').on('click', 'a', function() {
						// filter button click
						var filterValue = $( this ).attr('data-filter');
						$('.gallery_grid').isotope({ filter: filterValue });

						//active class added
						$('a').removeClass('gallery_active');
						$(this).addClass('gallery_active');
					});
					
					
					
				});
				
				$('#loadMore').on('click', function(){
					$('.int_view_gallery').addClass('int_view_gallery_view');
					$('.gallery_grid').isotope({
						itemSelector: '.grid-item',
						filter: '*'
					}); 
					
				});
			},
		
		// Star isotop gallery js 
		
		// magnifiv popup for project gallery
			Magnific_popup: function() {
					if($('.view').length > 0){
					$('.view').magnificPopup({
					  type: 'image',
					  
					  gallery: {
						// options for gallery
						enabled: true
					  }
					  
					  // other options
					});
				}
			},
		// magnifiv popup for project gallery
		
		
		
	
		
		

		
		// List Grid View js start
			Product_thumb_slider: function() {
				if($('.int_thumb_slider').length > 0){
					var galleryThumbs = new Swiper('.gallery-thumbs', {
					  spaceBetween: 10,
					  slidesPerView: 4,
					  freeMode: true,
					  watchSlidesVisibility: true,
					  watchSlidesProgress: true,
					});
					var galleryTop = new Swiper('.gallery-top', {
					  spaceBetween: 10,
					  thumbs: {
						swiper: galleryThumbs
					  }
					});
				}
			},
		// List Grid View js End
		
		
		
		
		
	
	
		
	};
	Inland.init();	

}(jQuery));	








// Contact Form Submission
function checkRequire(formId , targetResp){
	targetResp.html('');
	var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
	var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
	var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
	var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
	var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
	var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
	var check = 0;
	$('#er_msg').remove();
	var target = (typeof formId == 'object')? $(formId):$('#'+formId);
	target.find('input , textarea , select').each(function(){
		if($(this).hasClass('require')){
			if($(this).val().trim() == ''){
				check = 1;
				$(this).focus();
				$(this).parent('div').addClass('form_error');
				targetResp.html('You missed out some fields.');
				$(this).addClass('error');
				return false;
			}else{
				$(this).removeClass('error');
				$(this).parent('div').removeClass('form_error');
			}
		}
		if($(this).val().trim() != ''){
			var valid = $(this).attr('data-valid');
			if(typeof valid != 'undefined'){
				if(!eval(valid).test($(this).val().trim())){
					$(this).addClass('error');
					$(this).focus();
					check = 1;
					targetResp.html($(this).attr('data-error'));
					return false;
				}else{
					$(this).removeClass('error');
				}
			}
		}
	});
	return check;
}
$(".submitForm").on('click', function() {
	var _this = $(this);
	var targetForm = _this.closest('form');
	var errroTarget = targetForm.find('.response');
	var check = checkRequire(targetForm , errroTarget);
	
	if(check == 0){
	   var formDetail = new FormData(targetForm[0]);
		formDetail.append('form_type' , _this.attr('form-type'));
		$.ajax({
			method : 'post',
			url : 'ajaxmail.php',
			data:formDetail,
			cache:false,
			contentType: false,
			processData: false
		}).done(function(resp){
			console.log(resp);
			if(resp == 1){
				targetForm.find('input').val('');
				targetForm.find('textarea').val('');
				errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
			}else{
				errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
			}
		});
	}
});