(function($){
	var tapastreet = {};

	tapastreet.init = function() {

		// jQuery Selectors to be used
		this.$ = {};
		this.$.wrapper = $(".wrapper");
		this.$.sections = $("section");
		this.$.header = $("#header");
		this.$.homepage = $("#homepage");
		this.$.introduction = $("#introduction");
		this.$.discover = $("#discover");
		this.$.team = $("#team");
		this.$.footer = $("#footer");

		// Fit every seciton to the user's screen height
		this.fitSectionsToUserScreen();

		// Activate event listeners
		this.listenToEvents();
	}

	tapastreet.listenToEvents = function() {
		var self = this;
		var	scrollSpeed = 1000,
			scrollEase ='easeOutExpo',
			targetSection;

		this.$.wrapper.find('.navigateTo').on("click", function(evt) {
			evt.preventDefault();
			//get current
			targetSection = tapastreet.$.wrapper.find(this).attr('href');
			
			//Set doc title
			document.title = 'Tapastreet - ' + ( targetSection.replace( /[_\-\#\!\.\/]/g, ' ' ));
				
			//get pos of target section
			var targetOffset = tapastreet.$.wrapper.find(targetSection).offset().top+1;

			//scroll			 
			$('html,body').animate({scrollTop: targetOffset}, scrollSpeed, scrollEase, function() {
				window.location.hash = targetSection
			 });

		});

		$(window).resize(function() {
			self.fitSectionsToUserScreen();
		});

	}

	tapastreet.fitSectionsToUserScreen = function() {
		var self = this;
		var w = window,
		    d = document,
		    e = d.documentElement,
		    g = d.getElementsByTagName('body')[0],
		    x = w.innerWidth || e.clientWidth || g.clientWidth,
		    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		this.$.sections.each(function(index) {
			self.$.wrapper.find(this).css('height',y+'px');
		});
	}


	$(document).ready(function() {
		console.log('Tapstreet init');
		$("html:first").removeClass('no-js').addClass('js');
		tapastreet.init();
	});
 
}(jQuery));