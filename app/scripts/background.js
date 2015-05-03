(function() {
  var Stat, calc, extractDomain, myTimer, save, tabChanged, updateBadge;

  chrome.runtime.onInstalled.addListener(function(details) {});

  Stat = {
    data: {},
    cur: null
  };


// var dom;
// chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
//     if(request.theDOM != ""){
//         console.log("popup request: "+request.theDOM);
//         dom = request.theDOM;
//     }
// });
 
//  chrome.extension.sendRequest({theDOM: "page DOM here"});



  // functionUrl = function(url){
  //   document.getElementById('globalDiv').innerHTML = url;
  //   return url;
  // } 

// newFunction();
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
      var  onlyDomain;
        onlyDomain = extractDomain(tab.url);
        if (onlyDomain) {
          tabChanged(onlyDomain);
          chrome.extension.onConnect.addListener(function(port) {
            port.onMessage.addListener(function(msg) {
                  console.log("message recieved "+ msg + " omg");
                  port.postMessage(onlyDomain);
            });
          });
          // console.log (onlyDomain);
          // functionUrl(onlyDomain);
        }
    });
  });

}).call(this);
