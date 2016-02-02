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
Make sure to tell him you want these. 

DISCLAIMER: Earl assumes his clients are html5 pushstate history compatible. 
If you want to serve older non-pushstate compatible browsers try installing the 
https://github.com/devote/HTML5-History-API polyfill first. 

## Hiring Earl

For production, link to https://cdn.rawgit.com/invisible-college/Earl/0.1/earl.js

For development version, link to https://rawgit.com/invisible-college/Earl/master/earl.js

## Admissible Professional Inquiries

If you ask nicely, Earl can:

#### Earl.start_work
Initialize Earl. He'll start reacting to state changes, as well as initializing your application's state based on the initial browser location. Should be called ASAP. Accepts an opts argument with these options:
  `opts.history_aware_links`: Enable history aware links. [false]
  `opts.root`: the base path that urls are relative too, such as my_root.html. ['/']

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

## Developing with Earl

Often when prototyping Statebus applications, we like to open flat .html files using the file:// protocol in our browser. Unfortunately, browsers don't support the HTML5 history API for the file:// protocol. The workaround for now is to run a node server. I've found that https://github.com/paulmillr/pushserve works best because it also supports reloading a page at a url based off of your html file. 
```
npm install -g pushserve
pushserve -p 3002 -i demo.html
```
Now you can access localhost:3002/demo.html/whatever/craziness/you/have/defined?seriously=true#awesome

It would be nice to find a way around this, such as by using hashbangs for push state in development. 

## Demo

A little sample application is at https://github.com/invisible-college/Earl/blob/master/demo.html
