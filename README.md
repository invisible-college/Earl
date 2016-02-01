# Earl
Statebus-based url location manager

Hire Earl to handle the browser history & location bar. 

When your web application is loaded, Earl will update your application's 
fetch('location') state with the url, params, and anchor. Your application 
can simply react to location state changes as it would any other state change. 

If your application changes the location state, Earl will dutifully update 
the browser history/location to reflect this change. 

Earl also likes to brag about the souped-up, history-aware dom.A link he 
offers. It is a drop in replacement for dom.A that will cause internal links
on your site to update state and browser location without loading a new page.
Make sure to tell him you want these. 

DISCLAIMER: Earl assumes his clients are html5 pushstate history compatible. 
If you want to serve older non-pushstate compatible browsers try installing the 
https://github.com/devote/HTML5-History-API polyfill first. 
