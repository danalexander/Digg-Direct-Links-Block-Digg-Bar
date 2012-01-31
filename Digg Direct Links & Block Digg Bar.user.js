// ==UserScript==
// @name           Digg Direct Links & Block Digg Bar
// @namespace      http://danalexander.org
// @description    Rewrites digg site links to point directly to the websites, to avoid the diggbar altogether. Forces the Top News to point directly to the article, instead of redirecting to comments section. Also removes the diggbar from any visited links.
// @version        1.0.2
// @match          http://digg.com/*
// ==/UserScript==

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
		var javascript_append = function() {
			// Direct links for all story item (including right section)
			
			function rewrite_links() {
				$(function() {
					$('a:eq(0)', 'div.story-details, .stories:visible div.story-item-details').each(function(){
						var ahref = $(this).attr('href').split("/");
						$(this).attr('href',  "/story/r/" + ahref[ahref.length-1]);
					});
				});
			}
			
			// Call it initially
			rewrite_links();
			
			// Also call it every time we hit PREV / NEXT page
			$(document).ajaxComplete(function() { rewrite_links(); });
		}		
		
		// Inject our main script
		// REFERENCE: http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
		var script = document.createElement('script');
		script.textContent = '(' + javascript_append.toString() + ')();';
		document.body.appendChild(script);
	}
}