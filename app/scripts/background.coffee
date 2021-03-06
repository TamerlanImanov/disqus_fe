
  Stat = undefined
  calc = undefined
  extractDomain = undefined
  myTimer = undefined
  save = undefined
  tabChanged = undefined
  updateBadge = undefined
  newURL = undefined
  chrome.runtime.onInstalled.addListener (details) ->
  Stat =
    data: {}
    cur: null
  #also trying to OAuth2 google
  # var oauth = ChromeExOAuth.initBackgroundPage({
  #   'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
  #   'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
  #   'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
  #   'consumer_key': 'anonymous',
  #   'consumer_secret': 'anonymous',
  #   'scope': 'https://docs.google.com/feeds/',
  #   'app_name': 'SDU Disqus'
  # });
  #check to changing tab or not

  tabChanged = (url) ->
    lst = undefined
    if Stat.cur
      lst = Stat.data[Stat.cur]
      lst.push new Date
    Stat.cur = url
    lst = Stat.data[url] or []
    lst.push new Date
    Stat.data[url] = lst
    Stat.data[url]

  #get only domain 

  extractDomain = (url) ->
    domain = undefined
    if url.indexOf('://') > -1
      domain = url.split('/')[2]
    else
      domain = url.split('/')[0]
      domain = domain.split(':')[0]
    domain

  #set amount of message to Badge

  setText = (onlyDomain) ->
    # var countMes = 0;
    $.ajax
      url: 'http://127.0.0.1:8000/api/v1/comment/?url=' + onlyDomain
      success: (result) ->
        chrome.browserAction.setBadgeText text: '' + result.objects.length
        return
    return

  chrome.tabs.onActivated.addListener (activeInfo) ->
    Stat.curTabId = activeInfo.tabId
    chrome.tabs.get activeInfo.tabId, (tab) ->
      onlyDomain = undefined
      onlyDomain = extractDomain(tab.url)
      if onlyDomain
        tabChanged onlyDomain
        console.log onlyDomain
        newURL = onlyDomain
        setText onlyDomain
        # console.log (onlyDomain);
        # functionUrl(onlyDomain);
        chrome.extension.onConnect.addListener (port) ->
          port.onMessage.addListener (msg) ->
            console.log 'message recieved ' + msg + ' '
            port.postMessage onlyDomain
            return
          return
      return
  #check function to changing url

  myTimer = ->
    if !Stat.curTabId
      return
    chrome.tabs.get Stat.curTabId, (tab) ->
      onlyDomain = undefined
      onlyDomain = extractDomain(tab.url)
      if onlyDomain
        chrome.extension.onConnect.addListener (port) ->
          port.onMessage.addListener (msg) ->
            console.log 'message recieved ' + msg + ' '
            port.postMessage onlyDomain
            return
          return
        newURL = onlyDomain
        return setText(onlyDomain)
      return

  setInterval myTimer, 100
  return

# ---
# generated by js2coffee 2.0.3