(function($, jQuery){
	var tapastreet = {};

	tapastreet.init = function() {

		// jQuery Selectors to be used
		this.$ = {};
		navigator.sayswho = navigator.sayswho || ["Unknow"];

		this.$.window = $(window);
		this.$.document = $(document);

		if(navigator.sayswho[0] !== "Unknow") {
			this.$.scrollBody = $(navigator.sayswho[0] == "Chrome" ? "body": "html");
		} else {
			this.$.scrollBody = $("body,html");
		}

		this.$.header = $("#header");
		this.$.navButton = $("#nav-btn");
		this.$.wrapper = $(".wrapper");

		this.$.sections = $("section");
		this.$.sections.content = $('.section-content');

		this.$.homepage = $("#homepage");
		this.$.introduction = $("#introduction");
		this.$.discover = $("#discover");
		this.$.team = $("#team");
		this.$.footer = $("#footer");

		this.$.featurePreview = $('.feature-preview');
		this.$.featurePreview.iPhone = $('.feature-preview.iphone');
		this.$.featurePreview.galaxy = $('.feature-preview.galaxy');
		this.$.featurePreviewContent = $('.feature-preview-content');
		this.$.featurePreviewContent.iphone = $('.feature-preview-content.iphone');
		this.$.featurePreviewContent.galaxy = $('.feature-preview-content.galaxy');

		// Fit every seciton to the user's screen height
		this.fitSectionsToUserScreen();
		this.fitFeaturePreviewToUserScreen();

		// Activate event listeners
		this.listenToEvents();
	}

	tapastreet.listenToEvents = function() {
		var self = this;
		var	scrollSpeed = 1000,
			scrollEase ='easeOutExpo',
			targetSection;

		// Scroll animation on inside links
		this.$.wrapper.find('.navigateTo').on("click", function(evt) {
			evt.preventDefault();
			targetSection = tapastreet.$.wrapper.find(this).attr('href');
			sectionTitle = tapastreet.$.wrapper.find(this).attr('data-title');
			
			document.title = 'Tapastreet - ' + (sectionTitle);
				
			var targetOffset = tapastreet.$.wrapper.find(targetSection).offset().top;

			self.$.scrollBody.animate({scrollTop: targetOffset}, scrollSpeed, scrollEase, function() {
				window.location.hash = targetSection;
			});

		});

		this.$.navButton.on("click", function(evt) {
			evt.preventDefault();
	        self.$.header.toggleClass('header-hide').toggleClass('header-show');
	        self.$.sections.toggleClass('section-shifted');
	        self.$.wrapper.find(this).toggleClass('in-header');
		});


		// Show the header on page scroll
		self.$.window.scroll(function(evt){
			if(self.x > 979) {
			    if(self.$.window.scrollTop() > self.$.introduction.position().top){
			    	if(!self.$.header.hasClass('header-show')) {
						self.$.header.removeClass('header-hide').addClass('header-show');
			    	}
			    } else {
			        self.$.header.removeClass('header-show').addClass('header-hide');
			    }				
			}

		});

		// On window resize, resize key elements of the page.
		$(window).resize(function() {
			self.fitSectionsToUserScreen();
			self.fitFeaturePreviewToUserScreen();
		});

	}

	tapastreet.fitSectionsToUserScreen = function() {
		var self = this;
		this.getUserScreenDimensions();
		self.$.sections.css('height',self.y+'px');
		self.$.sections.content.css('min-height', (self.y-50)+'px');
	}

	tapastreet.getUserScreenDimensions = function() {
		var w = window,
		    d = document,
		    e = d.documentElement,
		    g = d.getElementsByTagName('body')[0];
	    this.x = w.innerWidth || e.clientWidth || g.clientWidth;
	    this.y = w.innerHeight|| e.clientHeight|| g.clientHeight;
	}

	tapastreet.fitFeaturePreviewToUserScreen = function() {
		var self = this;
		var iPhoneHWRatio = 2.11,
			iPhoneContentWHRatio = 0.58,
			iPhoneContentWWRatio = 1.18777292576,
			iPhoneContentHHRatio = 1.46683673469,
			iPhoneContentPositionHYRatio = 4,
			iPhoneContentPositionWXRatio = 9.95,
			maxIphoneSize = {
				width:272,
				height:575
			},
			maxIphoneContentSize = {
				width:229,
				height:392
			},
			totalMargin = 100,
			newFeaturePreviewSize = {
				width: 0,
				height: 0
			},
			newFeaturePreviewContentSize = {
				width: 0,
				height: 0
			},
			newFeaturePreviewContentPosition = {
				top: 0,
				left: 0
			};

			newFeaturePreviewSize.height = this.y - totalMargin;
			newFeaturePreviewSize.width = newFeaturePreviewSize.height/iPhoneHWRatio;

			newFeaturePreviewContentSize.height = newFeaturePreviewSize.height/iPhoneContentHHRatio;
			newFeaturePreviewContentSize.width = newFeaturePreviewSize.width/iPhoneContentWWRatio;

			newFeaturePreviewContentPosition.top = newFeaturePreviewContentSize.height/iPhoneContentPositionHYRatio;
			newFeaturePreviewContentPosition.left = newFeaturePreviewContentSize.width/iPhoneContentPositionWXRatio;

		if (this.y < maxIphoneSize.height+totalMargin) {
			this.$.featurePreview
				.css('width', newFeaturePreviewSize.width)
				.css('height', newFeaturePreviewSize.height);
			this.$.featurePreviewContent
				.css('width', newFeaturePreviewContentSize.width)
				.css('height', newFeaturePreviewContentSize.height);
			this.$.featurePreviewContent
				.css('top', newFeaturePreviewContentPosition.top)
				.css('left', newFeaturePreviewContentPosition.left);
		} else {
			console.log("this.y > maxIphoneSize+totalMargin");
			console.log(this.y);
		}

	}

	$(document).ready(function() {
		console.log('Tapstreet init');
		$("html:first").removeClass('no-js').addClass('js');
		tapastreet.init();
	});

	navigator.sayswho= (function(){
		var N= navigator.appName, ua= navigator.userAgent, tem;
		var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
		M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
		return M;
	})();
 
}($, jQuery));