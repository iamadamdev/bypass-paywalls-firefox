'use strict';

var defaultSites = {
  'The Age': 'theage.com.au',
  'Baltimore Sun': 'baltimoresun.com',
  'Barron\'s': 'barrons.com',
  'Bloomberg': 'bloomberg.com',
  'Business Insider': 'businessinsider.com',
  'Caixin': 'caixinglobal.com',
  'Crain\'s Chicago Business': 'chicagobusiness.com',
  'Chicago Tribune': 'chicagotribune.com',
  'Corriere Della Sera': 'corriere.it',
  'Daily Press': 'dailypress.com',
  'Dagens Nyheter': 'dn.se',
  'Denver Post': 'denverpost.com',
  'The Economist': 'economist.com',
  'Financial Times': 'ft.com',
  'Glassdoor': 'glassdoor.com',
  'Haaretz': 'haaretz.co.il',
  'Haaretz English': 'haaretz.com',
  'Hacked': 'hacked.com',
  'Hartford Courant': 'courant.com',
  'Harvard Business Review': 'hbr.org',
  'Het Financieele Dagblad': 'fd.nl',
  'Inc.com': 'inc.com',
  'Le Temps': 'letemps.ch',
  'Los Angeles Times': 'latimes.com',
  'Medium': 'medium.com',
  'Medscape': 'medscape.com',
  'MIT Technology Review': 'technologyreview.com',
  'New Statesman': 'newstatesman.com',
  'Nikkei Asian Review': 'asia.nikkei.com',
  'NRC': 'nrc.nl',
  'The Boston Globe': 'bostonglobe.com',
  'The Business Journals': 'bizjournals.com',
  'The Globe and Mail': 'theglobeandmail.com',
  'The Japan Times': 'japantimes.co.jp',
  'The Mercury News': 'mercurynews.com',
  'The Morning Call': 'mcall.com',
  'The Nation': 'thenation.com',
  'The New York Times': 'nytimes.com',
  'The New Yorker': 'newyorker.com',
  'The Spectator': 'spectator.co.uk',
  'Orange County Register': 'ocregister.com',
  'OrlandoSentinel': 'orlandosentinel.com',
  'Quora': 'quora.com',
  'SunSentinel': 'sun-sentinel.com',
  'TheMarker': 'themarker.com',
  'The Seattle Times': 'seattletimes.com',
  'The Sydney Morning Herald': 'smh.com.au',
  'The Toronto Star': 'thestar.com',
  'The Washington Post': 'washingtonpost.com',
  'The Wall Street Journal': 'wsj.com',
  'Towards Data Science': 'towardsdatascience.com',
  'Vanity Fair': 'vanityfair.com',
  'Wired': 'wired.com',
  'The Advocate': 'theadvocate.com.au',
  'Examiner': 'examiner.com.au'
};

const restrictions = {
  'barrons.com': 'barrons.com/articles'
}

// Don't remove cookies before page load
const allow_cookies = [
'asia.nikkei.com',
'nytimes.com',
'wsj.com',
'ft.com',
'letemps.ch',
'fd.nl',
'mercurynews.com',
'theage.com.au',
'economist.com',
'bostonglobe.com',
'denverpost.com',
'hacked.com',
'ocregister.com',
'newstatesman.com',
'spectator.co.uk',
'towardsdatascience.com',
'medium.com',
'theadvocate.com.au',
'examiner.com.au' 
]

// Removes cookies after page load
const remove_cookies = [
'asia.nikkei.com',
'ft.com',
'letemps.ch',
'fd.nl',
'mercurynews.com',
'theage.com.au',
'economist.com',
'bostonglobe.com',
'denverpost.com',
'hacked.com',
'ocregister.com',
'newstatesman.com',
'spectator.co.uk',
'towardsdatascience.com',
'medium.com',
'theadvocate.com.au',
'examiner.com.au'  
]

function setDefaultOptions() {
  browser.storage.sync.set({
    sites: defaultSites
  }, function() {
    browser.runtime.openOptionsPage();
  });
}


const blockedRegexes = [
/.+:\/\/.+\.tribdss\.com\//,
/thenation\.com\/.+\/paywall-script\.php/
];

var enabledSites = [];

// Get the enabled sites
browser.storage.sync.get({
  sites: {}
}, function(items) {
  var sites = items.sites;
  enabledSites = Object.keys(items.sites).map(function(key) {
    return items.sites[key];
  });
});


// Listen for changes to options
browser.storage.onChanged.addListener(function(changes, namespace) {
  var key;
  for (key in changes) {
    var storageChange = changes[key];
    if (key === 'sites') {
      var sites = storageChange.newValue;
      enabledSites = Object.keys(sites).map(function(key) {
        return sites[key];
      });
    }
  }
});


// Set and show default options on install
browser.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    setDefaultOptions();
  } else if (details.reason == "update") {
    // User updated extension
  }
});


browser.webRequest.onBeforeSendHeaders.addListener(function(details) {
  if (blockedRegexes.some(function(regex) { return regex.test(details.url); })) {
    return { cancel: true };
  }

  var isEnabled = enabledSites.some(function(enabledSite) {

    var useSite = details.url.indexOf("." + enabledSite) !== -1;

    if (enabledSite in restrictions) {
      return useSite && details.url.indexOf(restrictions[enabledSite]) !== -1;
    }

    return useSite;

  });

  if (!isEnabled) {
    return;
  }

  var requestHeaders = details.requestHeaders;
  var tabId = details.tabId;

  var setReferer = false;

  // if referer exists, set it to google
  requestHeaders = requestHeaders.map(function(requestHeader) {
    if (requestHeader.name === 'Referer') {
      if (details.url.indexOf("wsj.com") !== -1) {
       requestHeader.value = 'https://www.facebook.com/';
     } else {
       requestHeader.value = 'https://www.google.com/';
     }

     setReferer = true;
   }
   return requestHeader;
 });

  // otherwise add it
  if (!setReferer) {
    if (details.url.indexOf("wsj.com") !== -1) {
      requestHeaders.push({
        name: 'Referer',
        value: 'https://www.facebook.com/'
      });
    } else {
      requestHeaders.push({
        name: 'Referer',
        value: 'https://www.google.com/'
      });
    }

  }

  // remove cookies before page load
  requestHeaders = requestHeaders.map(function(requestHeader) {
    for (var siteIndex in allow_cookies) {
      if (details.url.indexOf(allow_cookies[siteIndex]) !== -1) {
        return requestHeader;
      }
    }
    if (requestHeader.name === 'Cookie') {
      requestHeader.value = '';
    }
    return requestHeader;
  });

  if (tabId !== -1) {
    // run contentScript inside tab
    browser.tabs.executeScript(tabId, {
      file: 'contentScript.js',
      runAt: 'document_start'
    }, function(res) {
      if (browser.runtime.lastError || res[0]) {
        return;
      }
    });
  }

  return { requestHeaders: requestHeaders };
}, {
  urls: ['<all_urls>']
}, ['blocking', 'requestHeaders']);

// remove cookies after page load
browser.webRequest.onCompleted.addListener(function(details) {
  for (var domainIndex in remove_cookies) {
    var domainVar = remove_cookies[domainIndex];
    if (!enabledSites.includes(domainVar) || details.url.indexOf(domainVar) === -1) {
      continue; // don't remove cookies
    }
    browser.cookies.getAll({domain: domainVar}, function(cookies) {
      for (var i=0; i<cookies.length; i++) {
        browser.cookies.remove({url: cookies[i].secure ? "https://" : "http://" + cookies[i].domain + cookies[i].path, name: cookies[i].name});
      }
    });
  }
}, {
  urls: ["<all_urls>"]
});
