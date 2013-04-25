// ==UserScript==
// @name Send to OmniFocus from Pivotal Tracker
// @version 1.1
// @description Adds a button to every Pivotal Tracker story, that opens the OmniFocus quick entry bar with the story title and URL filled in.
// @icon icon128.png
// @match https://www.pivotaltracker.com/s/projects/*
// @require http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

jQuery(function($) {
  var omnifocusButton =
    '<div style="padding: 3px;margin: 5px 0"><a href="#" '+
    'style="font-size: 11px; font-weight: bold; font-family: Lucida Grande, sans-serif; background: #7c3eaa; text-decoration: none; padding: 3px; color: #fff;'+
           '-webkit-border-radius: 5px; -moz-border-radius: 5px; border: solid 2px #fff;" '+
    'onmousedown=\\\''+
    'var item=jQuery(this).closest(".item");'+
    'var id = item.find(".copy_id input.id").val();'+
    'var title = item.find("textarea[name=\\\\\\\"story[name]\\\\\\\"]").val();'+
    'var projectName = jQuery("header.project h2 a").text();'+
    'jQuery(this).attr("href", "omnifocus:///add?name="+encodeURIComponent(projectName+" - "+title)+"&note="+encodeURIComponent("https://www.pivotaltracker.com/story/show/"+id));'+
    'return true;'+
    '\\\'>&#x2713; Send to OmniFocus</a></div>';

  var elt = document.createElement("script");



  elt.innerHTML =
    "var storyWithoutOmnifocus = window.JST['templates/stories/form'];"+

    "var storyWithOmnifocus = function() {"+
    "var html = storyWithoutOmnifocus.apply(this, arguments);"+
    "return html.replace('<fieldset class=\"story info\">', ' "+omnifocusButton+" ' + '<fieldset class=\"story info\">');"+
  "};"+
  "window.JST['templates/stories/form'] = storyWithOmnifocus;";

  document.head.appendChild(elt);
});
