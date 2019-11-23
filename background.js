'use strict';

var defaultSites = {
  'Algemeen Dagblad': 'ad.nl',
  'American Banker': 'americanbanker.com',
  'Baltimore Sun': 'baltimoresun.com',
  'Barron\'s': 'barrons.com',
  'Bloomberg': 'bloomberg.com',
  'Bloomberg Quint': 'bloombergquint.com',
  'Business Insider': 'businessinsider.com',
  'Caixin': 'caixinglobal.com',
  'Central Western Daily': 'centralwesterndaily.com.au',
  'Chemical & Engineering News': 'cen.acs.org',
  'Chicago Tribune': 'chicagotribune.com',
  'Corriere Della Sera': 'corriere.it',
  'Crain\'s Chicago Business': 'chicagobusiness.com',
  'Dagens Nyheter': 'dn.se',
  'Daily Press': 'dailypress.com',
  'De Groene Amsterdammer': 'groene.nl',
  'De Tijd': 'tijd.be',
  'de Volkskrant': 'volkskrant.nl',
  'DeMorgen': 'demorgen.be',
  'Denver Post': 'denverpost.com',
  'Die Zeit': 'zeit.de',
  'Dynamed Plus': 'dynamed.com',
  'Eindhovens Dagblad': 'ed.nl',
  'Encyclopedia Britannica': 'britannica.com',
  'Examiner': 'examiner.com.au',
  'Financial News': 'fnlondon.com',
  'Financial Times': 'ft.com',
  'First Things': 'firstthings.com',
  'Foreign Policy': 'foreignpolicy.com',
  'Glassdoor': 'glassdoor.com',
  'Haaretz': 'haaretz.co.il',
  'Haaretz English': 'haaretz.com',
  'Handelsblatt': 'handelsblatt.com',
  'Harper\'s Magazine': 'harpers.org',
  'Hartford Courant': 'courant.com',
  'Harvard Business Review': 'hbr.org',
  'Inc.com': 'inc.com',
  'Investors Chronicle': 'investorschronicle.co.uk',
  'L\'Echo': 'lecho.be',
  'La Nacion': 'lanacion.com.ar',
  'La Repubblica': 'repubblica.it',
  'La Tercera': 'latercera.com',
  'Le Devoir': 'ledevoir.com',
  'Le Monde': 'lemonde.fr',
  'Le Parisien': 'leparisien.fr',
  'Le Temps': 'letemps.ch',
  'Les Echos': 'lesechos.fr',
  'Liberation': 'liberation.fr',
  'Loeb Classical Library': 'loebclassics.com',
  'Los Angeles Business Journal': 'labusinessjournal.com',
  'Los Angeles Times': 'latimes.com',
  'Medium': 'medium.com',
  'Medscape': 'medscape.com',
  'Mexico News Daily': 'mexiconewsdaily.com',
  'MIT Sloan Management Review': 'sloanreview.mit.edu',
  'MIT Technology Review': 'technologyreview.com',
  'Mountain View Voice': 'mv-voice.com',
  'National Post': 'nationalpost.com',
  'New Statesman': 'newstatesman.com',
  'New York Magazine': 'nymag.com',
  'New Zealand Herald': 'nzherald.co.nz',
  'Newsrep': 'thenewsrep.com',
  'Nikkei Asian Review': 'asia.nikkei.com',
  'NRC': 'nrc.nl',
  'Orange County Register': 'ocregister.com',
  'Orlando Sentinel': 'orlandosentinel.com',
  'OrlandoSentinel': 'orlandosentinel.com',
  'Palo Alto Online': 'paloaltoonline.com',
  'Parool': 'parool.nl',
  'Quartz': 'qz.com',
  'Quora': 'quora.com',
  'San Diego Union Tribune': 'sandiegouniontribune.com',
  'San Francisco Chronicle': 'sfchronicle.com',
  'Scientific American': 'scientificamerican.com',
  'Statista': 'statista.com',
  'SunSentinel': 'sun-sentinel.com',
  'Telegraaf': 'telegraaf.nl',
  'The Advocate': 'theadvocate.com.au',
  'The Age': 'theage.com.au',
  'The American Interest': 'the-american-interest.com',
  'The Atlantic': 'theatlantic.com',
  'The Australian': 'theaustralian.com.au',
  'The Australian Financial Review': 'afr.com',
  'The Boston Globe': 'bostonglobe.com',
  'The Business Journals': 'bizjournals.com',
  'The Canberra Times': 'canberratimes.com.au',
  'The Diplomat': 'thediplomat.com',
  'The Economist': 'economist.com',
  'The Globe and Mail': 'theglobeandmail.com',
  'The Herald': 'theherald.com.au',
  'The Hindu': 'thehindu.com',
  'The Irish Times': 'irishtimes.com',
  'The Japan Times': 'japantimes.co.jp',
  'The Marker': 'themarker.com',
  'The Mercury News': 'mercurynews.com',
  'The Mercury Tasmania': 'themercury.com.au',
  'The Morning Call': 'mcall.com',
  'The Nation': 'thenation.com',
  'The New Statesman': 'newstatesman.com',
  'The New York Times': 'nytimes.com',
  'The New Yorker': 'newyorker.com',
  'The News-Gazette': 'news-gazette.com',
  'The Philadelphia Inquirer': 'inquirer.com',
  'The Saturday Paper': 'thesaturdaypaper.com.au',
  'The Seattle Times': 'seattletimes.com',
  'The Spectator': 'spectator.co.uk',
  'The Sydney Morning Herald': 'smh.com.au',
  'The Telegraph': 'telegraph.co.uk',
  'The Times': 'thetimes.co.uk',
  'The Toronto Star': 'thestar.com',
  'The Wall Street Journal': 'wsj.com',
  'The Washington Post': 'washingtonpost.com',
  'Towards Data Science': 'towardsdatascience.com',
  'Trouw': 'trouw.nl',
  'Vanity Fair': 'vanityfair.com',
  'Vrij Nederland': 'vn.nl',
  'Winston-Salem Journal': 'journalnow.com',
  'Wired': 'wired.com'
};

const restrictions = {
  'barrons.com': 'barrons.com/articles'
}

// Don't remove cookies before page load
const allow_cookies = [
  'ad.nl',
  'asia.nikkei.com',
  'bostonglobe.com',
  'cen.acs.org',
  'chicagobusiness.com',
  'demorgen.be',
  'denverpost.com',
  'economist.com',
  'ed.nl',
  'examiner.com.au',
  'ft.com',
  'hacked.com',
  'hbr.org',
  'lemonde.fr',
  'letemps.ch',
  'medium.com',
  'mercurynews.com',
  'newstatesman.com',
  'nymag.com',
  'nytimes.com',
  'ocregister.com',
  'parool.nl',
  'qz.com',
  'scientificamerican.com',
  'spectator.co.uk',
  'telegraaf.nl',
  'theadvocate.com.au',
  'theage.com.au',
  'theatlantic.com',
  'theaustralian.com.au',
  'thediplomat.com',
  'themercury.com.au',
  'thestar.com',
  'towardsdatascience.com',
  'trouw.nl',
  'vn.nl',
  'volkskrant.nl',
  'washingtonpost.com',
  'wsj.com',
]

// Removes cookies after page load
const remove_cookies = [
  'ad.nl',
  'asia.nikkei.com',
  'bloombergquint.com',
  'bostonglobe.com',
  'cen.acs.org',
  'chicagobusiness.com',
  'demorgen.be',
  'denverpost.com',
  'economist.com',
  'ed.nl',
  'examiner.com.au',
  'ft.com',
  'hacked.com',
  'hbr.org',
  'letemps.ch',
  'medium.com',
  'mercurynews.com',
  'newstatesman.com',
  'nymag.com',
  'nytimes.com',
  'ocregister.com',
  'qz.com',
  'scientificamerican.com',
  'spectator.co.uk',
  'telegraaf.nl',
  'theadvocate.com.au',
  'theage.com.au',
  'theatlantic.com',
  'thediplomat.com',
  'thestar.com',
  'towardsdatascience.com',
  'vn.nl',
  'washingtonpost.com',
  'wsj.com',
]

// select specific cookie(s) to hold from remove_cookies domains
const remove_cookies_select_hold = {
  'nrc.nl': ['nmt_closed_cookiebar'],
  'washingtonpost.com': ['wp_gdpr'],
  'wsj.com': ['wsjregion']
}

// select only specific cookie(s) to drop from remove_cookies domains
const remove_cookies_select_drop = {
  'ad.nl': ['temptationTrackingId'],
  'demorgen.be': ['TID_ID'],
  'ed.nl': ['temptationTrackingId'],
  'nrc.nl': ['counter']
}

// Override User-Agent with Googlebot
const use_google_bot = [
  'barrons.com',
  'haaretz.co.il',
  'haaretz.com',
  'lemonde.fr',
  'nytimes.com',
  'quora.com',
  'telegraph.co.uk',
  'theaustralian.com.au',
  'themarker.com',
  'themercury.com.au',
  'thetimes.co.uk',
  'wsj.com'
]

function setDefaultOptions() {
  browser.storage.sync.set({
    sites: defaultSites
  }, function () {
    browser.runtime.openOptionsPage();
  });
}

const blockedRegexes = [
  /.+:\/\/.+\.tribdss\.com\//,
  /thenation\.com\/.+\/paywall-script\.php/,
  /haaretz\.co\.il\/htz\/js\/inter\.js/,
  /nzherald\.co\.nz\/.+\/headjs\/.+\.js/
];

const userAgentDesktop = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
const userAgentMobile = "Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible ; Googlebot/2.1 ; +http://www.google.com/bot.html)"

var enabledSites = [];

// Get the enabled sites
browser.storage.sync.get({
  sites: {}
}, function (items) {
  var sites = items.sites;
  enabledSites = Object.keys(items.sites).map(function (key) {
    return items.sites[key];
  });
});

// Listen for changes to options
browser.storage.onChanged.addListener(function (changes, namespace) {
  var key;
  for (key in changes) {
    var storageChange = changes[key];
    if (key === 'sites') {
      var sites = storageChange.newValue;
      enabledSites = Object.keys(sites).map(function (key) {
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

/**
// WSJ bypass
browser.webRequest.onBeforeSendHeaders.addListener(function(details) {
  if (!isSiteEnabled(details) || details.url.indexOf("mod=rsswn") !== -1 || details.url.indexOf("/print-edition/") !== -1) {
    return;
  }

  var param;
  var updatedUrl;

  param = getParameterByName("mod", details.url);

  if (param === null) {
    updatedUrl = stripQueryStringAndHashFromPath(details.url);
    updatedUrl += "?mod=rsswn";
  } else {
    updatedUrl = details.url.replace(param, "rsswn");
  }
  return { redirectUrl: updatedUrl};
},
{urls:["*://*.wsj.com/*"], types:["main_frame"]},
["blocking"]
);
**/

// Disable javascript for these sites
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    if (!isSiteEnabled(details) || details.url.indexOf("mod=rsswn") !== -1) {
      return;
    }
    return {
      cancel: true
    };
  }, {
    urls: ["*://*.theglobeandmail.com/*", "*://*.economist.com/*", "*://*.thestar.com/*", "*://*.newstatesman.com/*", "*://*.bostonglobe.com/*", "*://*.afr.com/*"],
    types: ["script"]
  },
  ["blocking"]
);

browser.webRequest.onBeforeSendHeaders.addListener(function (details) {
  if (!isSiteEnabled(details)) {
    return;
  }

  if (blockedRegexes.some(function (regex) {
      return regex.test(details.url);
    })) {
    return {
      cancel: true
    };
  }

  var requestHeaders = details.requestHeaders;
  var tabId = details.tabId;

  var useUserAgentMobile = false;
  var setReferer = false;

  // if referer exists, set it to google
  requestHeaders = requestHeaders.map(function (requestHeader) {
    if (requestHeader.name === 'Referer') {
      if (details.url.indexOf("cooking.nytimes.com/api/v1/users/bootstrap") !== -1) {
        // this fixes images not being loaded on cooking.nytimes.com main page
        // referrer has to be *nytimes.com otherwise returns 403
        requestHeader.value = 'https://cooking.nytimes.com';
      } else if (details.url.indexOf("wsj.com") !== -1 || details.url.indexOf("ft.com") !== -1) {
        requestHeader.value = 'https://www.facebook.com/';
      } else {
        requestHeader.value = 'https://www.google.com/';
      }
      setReferer = true;
    }
    if (requestHeader.name === 'User-Agent') {
      useUserAgentMobile = requestHeader.value.toLowerCase().includes("mobile");
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

  // override User-Agent to use Googlebot
  var useGoogleBot = use_google_bot.filter(function (item) {
    return typeof item == 'string' && details.url.indexOf(item) > -1;
  }).length > 0;

  if (useGoogleBot) {
    requestHeaders.push({
      "name": "User-Agent",
      "value": useUserAgentMobile ? userAgentMobile : userAgentDesktop
    })
    requestHeaders.push({
      "name": "X-Forwarded-For",
      "value": "66.249.66.1"
    })
  }

  // remove cookies before page load
  requestHeaders = requestHeaders.map(function (requestHeader) {
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
    }, function (res) {
      if (browser.runtime.lastError || res[0]) {
        return;
      }
    });
  }

  return {
    requestHeaders: requestHeaders
  };
}, {
  urls: ['<all_urls>']
}, ['blocking', 'requestHeaders']);

// remove cookies after page load
browser.webRequest.onCompleted.addListener(function (details) {
  for (var domainIndex in remove_cookies) {
    var domainVar = remove_cookies[domainIndex];
    if (!enabledSites.includes(domainVar) || details.url.indexOf(domainVar) === -1) {
      continue; // don't remove cookies
    }
    browser.cookies.getAll({
      domain: domainVar
    }, function (cookies) {
      for (var i = 0; i < cookies.length; i++) {
        var cookie = {
          url: (cookies[i].secure ? "https://" : "http://") + cookies[i].domain + cookies[i].path,
          name: cookies[i].name,
          storeId: cookies[i].storeId
        };
        if (cookies[i].firstPartyDomain !== undefined) {
          cookie.firstPartyDomain = cookies[i].firstPartyDomain;
        }

        var cookie_domain = cookies[i].domain;
        var rc_domain = cookie_domain.replace(/^(\.?www\.|\.)/, '');
        // hold specific cookie(s) from remove_cookies domains
        if ((rc_domain in remove_cookies_select_hold) && remove_cookies_select_hold[rc_domain].includes(cookies[i].name)) {
          continue; // don't remove specific cookie
        }
        // drop only specific cookie(s) from remove_cookies domains
        if ((rc_domain in remove_cookies_select_drop) && !(remove_cookies_select_drop[rc_domain].includes(cookies[i].name))) {
          continue; // only remove specific cookie
        }

        browser.cookies.remove(cookie);
      }
    });
  }
}, {
  urls: ["<all_urls>"]
});

function isSiteEnabled(details) {
  var isEnabled = enabledSites.some(function (enabledSite) {
    var useSite = details.url.indexOf("." + enabledSite) !== -1;
    if (enabledSite in restrictions) {
      return useSite && details.url.indexOf(restrictions[enabledSite]) !== -1;
    }
    return useSite;
  });
  return isEnabled;
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function stripQueryStringAndHashFromPath(url) {
  return url.split("?")[0].split("#")[0];
}