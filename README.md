# Earl
Hire Earl to handle your browser history & location bar needs. Earl has the most experience with Statebus of any Urler you can hire. 

When your web application is loaded, Earl will update your application's 
fetch('location') state with the url, params, and anchor. Your application 
can simply react to location state changes as it would any other state change. 

If your application changes the location state, Earl will dutifully update 
the browser history/location to reflect this change. 

Earl also likes to brag about the souped-up, history-aware dom.A link he 
offers. It is a drop in replacement for dom.A that will cause internal links
on your site to update state and browser location without loading a new page.
Make sure to tell him you want it by setting a history-aware-link attribute
on the script tag you use to request Earl to attend to your page:

# <script src="/path/to/earl.js" history-aware-links></script> 

DISCLAIMER: Earl assumes his clients are html5 pushstate history compatible. 
If you want to serve older non-pushstate compatible browsers try installing the 
https://github.com/devote/HTML5-History-API polyfill first. 

## Hiring Earl

For production, link to https://cdn.rawgit.com/invisible-college/Earl/0.1/earl.js

For development version, link to https://rawgit.com/invisible-college/Earl/master/earl.js

## Admissible Professional Inquiries

If you ask nicely, Earl can:

#### Earl.load_page
A convenience method for changing the page's url and associated state. Parameters are url, query_parameters (object).

## Out of band inquiries

Outside of the typical channels, you can communicate with Earl through this state:

#### fetch('location')

`url`: the current browser location

`query_params`: browser search values (e.g. blah?foo=fab&bar=nice)

`hash`: the anchor tag (if any) in the link. e.g. blah.html#hash

#### fetch('document')

`title`: the window title

## Demo

A little sample application is at https://github.com/invisible-college/Earl/blob/master/demo.html
