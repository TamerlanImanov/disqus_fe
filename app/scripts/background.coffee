chrome.runtime.onInstalled.addListener (details) ->

Stat =
  data: {}
  cur: null


  

calc = (url)->
  lst = Stat.data[url]
  if not lst
    return 0
  n = Math.floor (lst.length / 2)
  res = 0
  for i in [0..n]
    if lst[2 * i + 1] and lst[2 * i]
      res += lst[2 * i + 1].getTime() - lst[2 * i].getTime()
  res += (new Date()).getTime() - lst[lst.length - 1].getTime()
  return res

$('#focusedInput').keyup ->
    console.log  "omg"

tabChanged = (url) ->
  if Stat.cur
    lst = Stat.data[Stat.cur]
    lst.push(new Date())
  Stat.cur = url
  lst = Stat.data[url] or []
  lst.push(new Date())
  Stat.data[url] = lst
  return Stat.data[url]

updateBadge = (url,qwe)->
  if (qwe>0)
    res = parseInt(qwe)
    res +=1
    # chrome.browserAction.setBadgeText({text: ""})
  else 
    # chrome.browserAction.setBadgeText({text: ""})

  save url, res

extractDomain = (url) ->
  if (url.indexOf("://") > -1)
    domain = url.split('/')[2]
  else
    domain = url.split('/')[0]
    domain = domain.split(':')[0];
  return domain

chrome.tabs.onActivated.addListener (activeInfo)->
  Stat.curTabId = activeInfo.tabId
  chrome.tabs.get activeInfo.tabId, (tab) ->
      onlyDomain = extractDomain tab.url 
      tabChanged(onlyDomain) if onlyDomain
      updateBadge onlyDomain,localStorage.getItem(onlyDomain)
      console.log localStorage.getItem(onlyDomain)

save = (url,sec) ->
    localStorage.setItem(url,sec)

myTimer = () ->
  if not Stat.curTabId
      return
    chrome.tabs.get Stat.curTabId, (tab)->
      onlyDomain = extractDomain tab.url 
      if onlyDomain
        updateBadge onlyDomain,localStorage.getItem(onlyDomain)

setInterval(myTimer, 1000)