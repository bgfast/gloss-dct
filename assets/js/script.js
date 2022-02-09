$(function () {

	var theJSONFileName = "glossary.json"
	// Globals variables

		// 	An array containing objects with information about the terms.
	var terms = []

	//	Event handlers for frontend navigation

	// Single term page buttons

	var singleTermPage = $('.single-term');

	singleTermPage.on('click', function (e) {

		if (singleTermPage.hasClass('visible')) {

			var clicked = $(e.target);

			// If the close button or the background are clicked go to the previous page.
			if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
			    window.location.hash = '#';
			}

		}

	});


	// These are called on page load

	$.getJSON( theJSONFileName, function( data ) {

		// Write the data into our global variable.
		terms = data;

		// Call a function to create HTML for all the terms.
		generateAllTermsHTML(terms);

		// Manually trigger a hashchange to start the app.
		$(window).trigger('hashchange');
	});


	// An event handler with calls the render function on every hashchange.
	// The render function will show the appropriate content of out page.
	$(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});


	// Navigation

	function render(url) {

		// Get the keyword from the url.
		var temp = url.split('/')[0];

		// Hide whatever page is currently shown.
		$('.main-content .page').removeClass('visible');


		var	map = {

			// The "Homepage".
			'': function() {

				renderTermsPage(terms);
			},

			// Single Terms page.
			'#term': function() {

				// Get the index of which term we want to show and call the appropriate function.
				var index = url.split('#term/')[1].trim();

				renderSingleTermPage(index, terms);
			},

		};

		// Execute the needed function depending on the url keyword (stored in temp).
		if(map[temp]){
			map[temp]();
		}
		// If the keyword isn't listed in the above - render the error page.
		else {
			renderErrorPage();
		}

	}


	// This function is called only once - on page load.
	// It fills up the terms list via a handlebars template.
	function generateAllTermsHTML(data){

		var list = $('.all-terms .terms-list');

		var theTemplateScript = $("#terms-template").html();
		//Compile the template​
		var theTemplate = Handlebars.compile (theTemplateScript);
		list.append (theTemplate(data));


		// Each terms has a data-index attribute.
		// On click change the url hash to open up a preview for this term only.
		// Remember: every hashchange triggers the render function.
		list.find('li').on('click', function (e) {
			e.preventDefault();

			var termIndex = $(this).data('index');

			window.location.hash = 'term/' + termIndex;
		})
	}

	// This function receives an object containing all the term we want to show.
	function renderTermsPage(data){

		var page = $('.all-terms'),
			allTerms = $('.all-terms .terms-list > li');

		// Hide all the terms in the terms list.
		allTerms.addClass('hidden');

		// Iterate over all of the terms.
		// If their ID is somewhere in the data object remove the hidden class to reveal them.
		allTerms.each(function () {

			var that = $(this);

		    Object.entries(data).forEach(entry => {
				if(that.data('index') == entry[1].id){
				    that.removeClass('hidden');
				}
			})
		
		    });

		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');

	}


	// Opens up a preview for one of the terms.
	// Its parameters are an index from the hash and the terms object.
	function renderSingleTermPage(index, data){

		var page = $('.single-term'),
			container = $('.preview-large');

		// Find the wanted term by iterating the data object and searching for the chosen index.
		Object.entries(data).forEach(entry => {
		    if(index == entry[1].id){
				container.find('h3').text(entry[1].name);
				container.find('p.definition').text(entry[1].definition);
				container.find('p.sentence').text(entry[1].sentence);
				container.find('p.example').text(entry[1].example);
				container.find('p.more_info').text(entry[1].more_info);
				container.find('p.related_words').text(entry[1].related_words);
				container.find('p.opposite_words').text(entry[1].opposite_words);
				container.find('img').attr('src', entry[1].image.small);
		   }
		})

		// Show the page.
		page.addClass('visible');

	}

	// Shows the error page.
	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}


});