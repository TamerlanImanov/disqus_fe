(function() {
  var Stat, calc, extractDomain, myTimer, save, tabChanged, updateBadge,newURL;

  chrome.runtime.onInstalled.addListener(function(details) {});

  Stat = {
    data: {},
    cur: null
  };

//also trying to OAuth2 google
  // var oauth = ChromeExOAuth.initBackgroundPage({
  //   'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
  //   'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
  //   'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
  //   'consumer_key': 'anonymous',
  //   'consumer_secret': 'anonymous',
  //   'scope': 'https://docs.google.com/feeds/',
  //   'app_name': 'SDU Disqus'
  // });


//check to changing tab or not
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


//get only domain 
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

//set amount of message to Badge
  setText = function(onlyDomain){
    // var countMes = 0;
    $.ajax({
      url: 'http://127.0.0.1:8000/api/v1/comment/?url='+onlyDomain, 
      success: function(result){
        chrome.browserAction.setBadgeText({
          text: "" + result.objects.length
        }); 
      }
    }); 
  }

  chrome.tabs.onActivated.addListener(function(activeInfo) {
    Stat.curTabId = activeInfo.tabId;
    return chrome.tabs.get(activeInfo.tabId, function(tab) {
      var  onlyDomain;
        onlyDomain = extractDomain(tab.url);
        if (onlyDomain) {
          tabChanged(onlyDomain);
          console.log (onlyDomain);
          newURL=onlyDomain;
          setText(onlyDomain);
          // console.log (onlyDomain);
          // functionUrl(onlyDomain);
          chrome.extension.onConnect.addListener(function(port) {
            port.onMessage.addListener(function(msg) {
                  console.log("message recieved "+ msg + " ");
                  port.postMessage(onlyDomain);
            });
          });
        }
    });
  });

//check function to changing url
  myTimer = function() {
    if (!Stat.curTabId) {
      return;
    }
    return chrome.tabs.get(Stat.curTabId, function(tab) {
      var onlyDomain;
      onlyDomain = extractDomain(tab.url);
      if (onlyDomain) {
        chrome.extension.onConnect.addListener(function(port) {
          port.onMessage.addListener(function(msg) {
                console.log("message recieved "+ msg + " ");
                port.postMessage(onlyDomain);
          });
        });
        newURL=onlyDomain;
        return setText(onlyDomain);
      }
    });
  };

  setInterval(myTimer, 100);

}).call(this);
