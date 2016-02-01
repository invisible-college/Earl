var history_aware_links_installed, install_history_aware_links, react_to_location, seek_to_hash, url_from_browser_location, url_from_statebus;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty;
window.Earl = {};
Earl.start_work = function(opts) {
  opts || (opts = {});
  if (opts.history_aware_links) {
    install_history_aware_links();
  }
  opts.root || (opts.root = '/');
  if (opts.root[0] !== '/') {
    opts.root = '/' + opts.root;
  }
  Earl.root = opts.root;
  react_to_location();
  window.addEventListener('popstate', function(ev) {
    return Earl.load_page(url_from_browser_location());
  });
  return Earl.load_page(url_from_browser_location());
};
Earl.load_page = function(url, query_params) {
  var hash, loc, query_param, seek_to_hash, _i, _len, _ref, _ref2, _ref3;
  loc = fetch('location');
  loc.query_params = query_params || {};
  if (url.indexOf('?') > -1) {
    _ref = url.split('?'), url = _ref[0], query_params = _ref[1];
    _ref2 = query_params.split('&');
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      query_param = _ref2[_i];
      query_param = query_param.split('=');
      if (query_param.length === 2) {
        loc.query_params[query_param[0]] = query_param[1];
      }
    }
  }
  hash = '';
  if (url.indexOf('#') > -1) {
    _ref3 = url.split('#'), url = _ref3[0], hash = _ref3[1];
    if (url === '') {
      url = '/';
    }
    seek_to_hash = true;
  }
  loc.url = url;
  loc.hash = hash;
  return save(loc);
};
history_aware_links_installed = false;
install_history_aware_links = function() {
  var is_android_browser, is_mobile, rxaosp, ua;
  if (history_aware_links_installed) {
    return;
  }
  if (!window.A) {
    throw "dom.A has not been defined yet!";
  }
  dom.HISTORY_IGNORANT_LINK = window.A;
  history_aware_links_installed = true;
  document.ontouchmove = function(e) {
    return Earl._user_swipping = true;
  };
  document.ontouchend = function(e) {
    return Earl._user_swipping = false;
  };
  rxaosp = window.navigator.userAgent.match(/Android.*AppleWebKit\/([\d.]+)/);
  is_android_browser = !!(rxaosp && rxaosp[1] < 537);
  ua = navigator.userAgent;
  is_mobile = is_android_browser || ua.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i);
  dom.A = function() {
    var handle_click, onClick, props;
    props = this.props;
    if (this.props.href) {
      onClick = this.props.onClick || (function() {
        return null;
      });
      handle_click = __bind(function(event) {
        var href, internal_link, is_mailto, opened_in_new_tab;
        href = this.props.href;
        internal_link = !href.match('//') || !!href.match(location.origin);
        is_mailto = !!href.toLowerCase().match('mailto');
        opened_in_new_tab = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        if (!internal_link || opened_in_new_tab || is_mailto || this.props.target === '_blank') {
          return onClick(event);
        } else {
          event.preventDefault();
          event.stopPropagation();
          Earl.load_page(href);
          onClick(event);
          if (!this.props.noScroll) {
            window.scrollTo(0, 0);
          }
          return false;
        }
      }, this);
      if (is_mobile) {
        this.props.onTouchEnd = function(e) {
          if (!Earl._user_swipping) {
            return handle_click(e);
          }
        };
        if (is_android_browser) {
          this.props.onClick = function(e) {
            e.preventDefault();
            return e.stopPropagation();
          };
        }
      } else {
        this.props.onClick = handle_click;
      }
    }
    return dom.HISTORY_IGNORANT_LINK(props, props.children);
  };

};
react_to_location = function() {
  var monitor;
  monitor = bus.reactive(function() {
    var doc, el, loc, new_location, seek_to_hash, title;
    loc = fetch('location');
    doc = fetch('document');
    title = doc.title || document.title;
    if (title && title !== doc.title) {
      document.title = title;
    }
    new_location = url_from_statebus();
    if (this.last_location !== new_location) {
      if (url_from_browser_location() !== new_location) {
        history.pushState(loc.query_params, title, (Earl.root + '/' + new_location).replace('//', '/'));
      }
      this.last_location = new_location;
    }
    if (seek_to_hash) {
      seek_to_hash = false;
      el = document.querySelector("#" + loc.hash);
      if (el) {
        return $(window).scrollTop(getCoords(el).top - 50);
      }
    }
  });
  return monitor();
};
seek_to_hash = false;
url_from_browser_location = function() {
  var loc, search, _ref, _ref2;
  search = (_ref = location.search) != null ? _ref.replace(/\%2[fF]/g, '/') : void 0;
  loc = (_ref2 = location.pathname) != null ? _ref2.replace(/\%20/g, ' ') : void 0;
  if (Earl.root && !!loc.match(Earl.root)) {
    loc = loc.split(Earl.root)[1];
  }
  return "" + loc + search + location.hash;
};
url_from_statebus = function() {
  var k, loc, query_params, relative_url, v, _ref;
  loc = fetch('location');
  relative_url = loc.url || '';
  if (loc.query_params && Object.keys(loc.query_params).length > 0) {
    query_params = (function() {
      var _ref, _results;
      _ref = loc.query_params;
      _results = [];
      for (k in _ref) {
        if (!__hasProp.call(_ref, k)) continue;
        v = _ref[k];
        _results.push("" + k + "=" + v);
      }
      return _results;
    })();
    relative_url += "?" + (query_params.join('&'));
  }
  if (((_ref = loc.hash) != null ? _ref.length : void 0) > 0) {
    relative_url += "#" + loc.hash;
  }
  return relative_url;
};