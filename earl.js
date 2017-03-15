var hist_aware, is_android_browser, is_mobile, onload, react_to_location, ref, rxaosp, sc, seek_to_hash, ua, url_from_browser_location, url_from_statebus,
  hasProp = {}.hasOwnProperty;

onload = function() {
  Earl.root = '/';
  if (window.location.pathname.match('.html')) {
    Earl.root += location.pathname.match(/\/([\w-_]+\.html)/)[1] + '/';
  }
  window.addEventListener('popstate', function(ev) {
    return Earl.load_page(url_from_browser_location());
  });
  Earl.load_page(url_from_browser_location());
  return react_to_location();
};

if (window.addEventListener) {
  window.addEventListener('load', onload, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', onload);
}

window.Earl = {
  load_page: function(url, query_params) {
    var hash, i, len, loc, query_param, ref, ref1, ref2, seek_to_hash;
    loc = fetch('location');
    loc.host = window.location.host;
    loc.query_params = query_params || {};
    if (url.indexOf('?') > -1) {
      ref = url.split('?'), url = ref[0], query_params = ref[1];
      ref1 = query_params.split('&');
      for (i = 0, len = ref1.length; i < len; i++) {
        query_param = ref1[i];
        query_param = query_param.split('=');
        if (query_param.length === 2) {
          loc.query_params[query_param[0]] = query_param[1];
        }
      }
    }
    hash = '';
    if (url.indexOf('#') > -1) {
      ref2 = url.split('#'), url = ref2[0], hash = ref2[1];
      if (url === '') {
        url = '/';
      }
      seek_to_hash = true;
    }
    loc.url = url || '/';
    loc.hash = hash;
    return save(loc);
  }
};

sc = document.querySelector('script[src*="earl"][src$=".coffee"], script[src*="earl"][src$=".js"]');

hist_aware = ((ref = sc.getAttribute('history-aware-links')) != null ? ref.toLowerCase() : void 0) !== 'false';

if (hist_aware) {
  window.dom = window.dom || {};
  dom.A = function() {
    var handle_click, onClick, props;
    props = this.props;
    if (this.props.href) {
      onClick = this.props.onClick || (function() {
        return null;
      });
      handle_click = (function(_this) {
        return function(event) {
          var href, internal_link, is_mailto, opened_in_new_tab;
          href = _this.props.href;
          internal_link = !href.match('//') || !!href.match(location.origin);
          is_mailto = !!href.toLowerCase().match('mailto');
          opened_in_new_tab = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
          if (!internal_link || opened_in_new_tab || is_mailto || _this.props.target === '_blank') {
            return onClick(event);
          } else {
            event.preventDefault();
            event.stopPropagation();
            Earl.load_page(href);
            onClick(event);
            if (!_this.props.noScroll) {
              window.scrollTo(0, 0);
            }
            return false;
          }
        };
      })(this);
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
    return React.DOM.a(props, props.children);
  };
}

react_to_location = function() {
  var monitor;
  monitor = bus.reactive(function() {
    var el, h, loc, new_location, seek_to_hash, title;
    loc = fetch('location');
    title = location.title || document.title;
    if (title && title !== location.title) {
      document.title = title;
    }
    new_location = url_from_statebus();
    if (this.last_location !== new_location) {
      if (url_from_browser_location() !== new_location) {
        h = Earl.root + new_location;
        history.pushState(loc.query_params, title, h.replace(/(\/){2,}/, '/').replace(/(\/)$/, ''));
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
  var loc, ref1, ref2, search;
  search = (ref1 = location.search) != null ? ref1.replace(/\%2[fF]/g, '/') : void 0;
  loc = (ref2 = location.pathname) != null ? ref2.replace(/\%20/g, ' ') : void 0;
  if (Earl.root) {
    loc = (loc + '/').split(Earl.root)[1];
  }
  return "" + loc + search + location.hash;
};

url_from_statebus = function() {
  var k, loc, query_params, ref1, relative_url, v;
  loc = fetch('location');
  relative_url = loc.url || '/';
  if (loc.query_params && Object.keys(loc.query_params).length > 0) {
    query_params = (function() {
      var ref1, results;
      ref1 = loc.query_params;
      results = [];
      for (k in ref1) {
        if (!hasProp.call(ref1, k)) continue;
        v = ref1[k];
        results.push(k + "=" + v);
      }
      return results;
    })();
    relative_url += "?" + (query_params.join('&'));
  }
  if (((ref1 = loc.hash) != null ? ref1.length : void 0) > 0) {
    relative_url += "#" + loc.hash;
  }
  return relative_url;
};

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
