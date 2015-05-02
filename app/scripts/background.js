(function() {
  var Stat, calc, extractDomain, myTimer, save, tabChanged, updateBadge;

  chrome.runtime.onInstalled.addListener(function(details) {});

  Stat = {
    data: {},
    cur: null
  };

  calc = function(url) {
    var i, lst, n, res, _i;
    lst = Stat.data[url];
    if (!lst) {
      return 0;
    }
    n = Math.floor(lst.length / 2);
    res = 0;
    for (i = _i = 0; 0 <= n ? _i <= n : _i >= n; i = 0 <= n ? ++_i : --_i) {
      if (lst[2 * i + 1] && lst[2 * i]) {
        res += lst[2 * i + 1].getTime() - lst[2 * i].getTime();
      }
    }
    res += (new Date()).getTime() - lst[lst.length - 1].getTime();
    return res;
  };

  // $('#focusedInput').keyup(function() {
  //   return console.log("omg");
  // });

  tabChanged = function(url) {
    var lst;
    if (Stat.cur) {
      lst = Stat.data[Stat.cur];
      lst.push(new Date());
    }
    Stat.cur = url;
    lst = Stat.data[url] || [];
    lst.push(new Date());
    Stat.data[url] = lst;
    return Stat.data[url];
  };

  updateBadge = function(url, qwe) {
    var res;
    if (qwe > 0) {
      res = parseInt(qwe);
      res += 1;
    } else {

    }
    return save(url, res);
  };

  extractDomain = function(url) {
    var domain;
    if (url.indexOf("://") > -1) {
      domain = url.split('/')[2];
    } else {
      domain = url.split('/')[0];
      domain = domain.split(':')[0];
    }
    return domain;
  };

  chrome.tabs.onActivated.addListener(function(activeInfo) {
    Stat.curTabId = activeInfo.tabId;
    return chrome.tabs.get(activeInfo.tabId, function(tab) {
      var onlyDomain;
      onlyDomain = extractDomain(tab.url);
      if (onlyDomain) {
        tabChanged(onlyDomain);
      }
      updateBadge(onlyDomain, localStorage.getItem(onlyDomain));
      return console.log(localStorage.getItem(onlyDomain));
    });
  });

  save = function(url, sec) {
    return localStorage.setItem(url, sec);
  };

  myTimer = function() {
    if (!Stat.curTabId) {
      return;
    }
    return chrome.tabs.get(Stat.curTabId, function(tab) {
      var onlyDomain;
      onlyDomain = extractDomain(tab.url);
      if (onlyDomain) {
        return updateBadge(onlyDomain, localStorage.getItem(onlyDomain));
      }
    });
  };

  setInterval(myTimer, 1000);

}).call(this);
