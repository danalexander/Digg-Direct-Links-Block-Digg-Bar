// ==UserScript==
// @name           Digg Direct Links & Block Digg Bar v1.0
// @namespace      dan@danalexander.org
// @description    Rewrites digg site links to point directly to the websites, to avoid the diggbar altogether. Forces the Top News to point directly to the article, instead of redirecting to comments section. Also removes the diggbar from any visited links.
// @match        http://digg.com/*
// ==/UserScript==

// @include        http://digg.com/*

// REFERENCES:
// - Use jQuery if it already exists on the page
//	http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome

if(top.location.hostname == "digg.com") {
	
	// <Changeable values>
		var diggbar_iframe_id = "newsbar-frame";
		var diggbar_beginning_url = "/newsbar/";
	// </Changeable values>
	
	
	// Check if we're in the diggbar, and NOT on the digg site itself
	if(top.location.pathname.search(diggbar_beginning_url) == 0) {
		
		// Diggbar (don't use jquery)
		var frame = document.getElementsById(diggbar_iframe_id);
		if (iframe) { window.location.href = frame[0].src; }
		
	} else {
		
		// Digg site (ok to use jquery)
		
		// Create a wrapper function
		var rewrite_links = function() {
			// Direct links for all story item (including right section)
			
			$(function() {
				$('a:eq(0)', 'div.story-details, div.story-item-details').each(function(){
					var ahref = $(this).attr('href').split("/");
					$(this).attr('href',  "/story/r/" + ahref[ahref.length-1]);
				});
			});
		}		
		
		// Inject our main script
		// REFERENCE: http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
		var script = document.createElement('script');
		script.textContent = '(' + rewrite_links.toString() + ')();';
		document.body.appendChild(script);
	}
}