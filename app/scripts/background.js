(function() {
  var Stat, calc, extractDomain, myTimer, save, tabChanged, updateBadge;

  chrome.runtime.onInstalled.addListener(function(details) {});

  Stat = {
    data: {},
    cur: null
  };


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
      console.log(onlyDomain);
      if (onlyDomain) {
        tabChanged(onlyDomain);
      }
      return console.log(onlyDomain);
    });
  });


}).call(this);
