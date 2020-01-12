'use strict';

var defaultSites = {
  'Algemeen Dagblad': 'ad.nl',
  'Baltimore Sun': 'baltimoresun.com',
  'Barron\'s': 'barrons.com',
  'Bloomberg': 'bloomberg.com',
  'Bloomberg Quint': 'bloombergquint.com',
  'Business Insider': 'businessinsider.com',
  'Caixin': 'caixinglobal.com',
  'Chemical & Engineering News': 'cen.acs.org',
  'Chicago Tribune': 'chicagotribune.com',
  'Central Western Daily': 'centralwesterndaily.com.au',
  'Crain\'s Chicago Business': 'chicagobusiness.com',
  'Corriere Della Sera': 'corriere.it',
  'Daily Press': 'dailypress.com',
  'DeMorgen': 'demorgen.be',
  'Denver Post': 'denverpost.com',
  'De Tijd': 'tijd.be',
  'De Groene Amsterdammer': 'groene.nl',
  'de Volkskrant': 'volkskrant.nl',
  'ET Prime': 'prime.economictimes.indiatimes.com',
  'The Economist': 'economist.com',
  'Eindhovens Dagblad': 'ed.nl',
  'Examiner': 'examiner.com.au',
  'Financial Times': 'ft.com',
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
  'La Repubblica': 'repubblica.it',
  'Le Monde': 'lemonde.fr',
  'Le Parisien': 'leparisien.fr',
  'Le Temps': 'letemps.ch',
  'London Review of Books': 'lrb.co.uk',
  'Los Angeles Times': 'latimes.com',
  'Medium': 'medium.com',
  'Medscape': 'medscape.com',
  'MIT Technology Review': 'technologyreview.com',
  'Mountain View Voice': 'mv-voice.com',
  'National Post': 'nationalpost.com',
  'New Statesman': 'newstatesman.com',
  'New York Magazine': 'nymag.com',
  'Nikkei Asian Review': 'asia.nikkei.com',
  'NK News': 'nknews.org',
  'NRC': 'nrc.nl',
  'New Zealand Herald': 'nzherald.co.nz',
  'Orange County Register': 'ocregister.com',
  'Orlando Sentinel': 'orlandosentinel.com',
  'Palo Alto Online': 'paloaltoonline.com',
  'Parool': 'parool.nl',
  'Quartz': 'qz.com',
  'Quora': 'quora.com',
  'Scientific American': 'scientificamerican.com',
  'Statista': 'statista.com',
  'SunSentinel': 'sun-sentinel.com',
  'Telegraaf': 'telegraaf.nl',
  'The Advocate': 'theadvocate.com.au',
  'The Age': 'theage.com.au',
  'The Atlantic': 'theatlantic.com',
  'The Australian': 'theaustralian.com.au',
  'The Australian Financial Review': 'afr.com',
  'The Boston Globe': 'bostonglobe.com',
  'The Business Journals': 'bizjournals.com',
  'The Diplomat': 'thediplomat.com',
  'The Globe and Mail': 'theglobeandmail.com',
  'The Herald': 'theherald.com.au',
  'The Hindu': 'thehindu.com',
  'The Japan Times': 'japantimes.co.jp',
  'TheMarker': 'themarker.com',
  'The Mercury Tasmania': 'themercury.com.au',
  'The Mercury News': 'mercurynews.com',
  'The Morning Call': 'mcall.com',
  'The Nation': 'thenation.com',
  'The New York Times': 'nytimes.com',
  'The New Yorker': 'newyorker.com',
  'The News-Gazette': 'news-gazette.com',
  'The Philadelphia Inquirer': 'inquirer.com',
  'The Saturday Paper': 'thesaturdaypaper.com.au',
  'The Spectator': 'spectator.co.uk',
  'The Seattle Times': 'seattletimes.com',
  'The Sydney Morning Herald': 'smh.com.au',
  'The Telegraph': 'telegraph.co.uk',  
  'The Times': 'thetimes.co.uk',
  'The Toronto Star': 'thestar.com',
  'The Washington Post': 'washingtonpost.com',
  'The Wall Street Journal': 'wsj.com',
  'Times Literary Supplement': 'the-tls.co.uk',
  'Towards Data Science': 'towardsdatascience.com',
  'Trouw': 'trouw.nl',
  'Vanity Fair': 'vanityfair.com',
  'Vrij Nederland': 'vn.nl',
  'Wired': 'wired.com',
};

const restrictions = {
  'barrons.com': /.+barrons\.com\/articles\/.+/,
  'prime.economictimes.indiatimes.com': /.+prime\.economictimes\.indiatimes\.com\/news\/[0-9]{8}\/.+/,
  'wsj.com': /.+wsj\.com\/articles\/.+/
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
'harpers.org',
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
'harpers.org',
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
'washingtonpost.com'
]

// select specific cookie(s) to hold from remove_cookies domains
const remove_cookies_select_hold = {
	'washingtonpost.com': ['wp_gdpr'],
	'qz.com': ['gdpr']
}

// select only specific cookie(s) to drop from remove_cookies domains
const remove_cookies_select_drop = {
	'ad.nl': ['temptationTrackingId'],
	'bostonglobe.com': ['FMPaywall'],
	'demorgen.be': ['TID_ID'],
	'economist.com': ['rvuuid'],
	'ed.nl': ['temptationTrackingId'],
	'nrc.nl': ['counter']
}

// Override User-Agent with Googlebot
const use_google_bot = [
'barrons.com',
'lemonde.fr',
'nytimes.com',
'quora.com',
'telegraph.co.uk',
'theaustralian.com.au',
'themercury.com.au',
'thetimes.co.uk',
'wsj.com',
'haaretz.co.il',
'haaretz.com',
'themarker.com',
'nknews.org',
'prime.economictimes.indiatimes.com'
]

function setDefaultOptions() {
  browser.storage.sync.set({
    sites: defaultSites
  }, function() {
    browser.runtime.openOptionsPage();
  });
}

// to block external script also add domain to manifest.json (permissions)
const blockedRegexes = {
'chicagotribune.com': /.+:\/\/.+\.tribdss\.com\//,
'thenation.com': /thenation\.com\/.+\/paywall-script\.php/,
'haaretz.co.il': /haaretz\.co\.il\/htz\/js\/inter\.js/,
'nzherald.co.nz': /nzherald\.co\.nz\/.+\/headjs\/.+\.js/,
'economist.com': /.+\.tinypass\.com\/.+/,
'lrb.co.uk': /.+\.tinypass\.com\/.+/,
'bostonglobe.com': /meter\.bostonglobe\.com\/js\/.+/,
'foreignpolicy.com': /.+\.tinypass\.com\/.+/,
'inquirer.com': /.+\.tinypass\.com\/.+/,
'spectator.co.uk': /.+\.tinypass\.com\/.+/
};

const userAgentDesktop = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
const userAgentMobile = "Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible ; Googlebot/2.1 ; +http://www.google.com/bot.html)"

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
browser.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "install") {
    setDefaultOptions();
  } else if (details.reason == "update") {
    // User updated extension
  }
});

// Disable javascript for these sites
chrome.webRequest.onBeforeRequest.addListener(function(details) {
  if (!isSiteEnabled(details) || details.url.indexOf("mod=rsswn") !== -1) {
    return;
  }
  return {cancel: true};
  },
  {
    urls: ["*://*.theglobeandmail.com/*", "*://*.thestar.com/*", "*://*.newstatesman.com/*", "*://*.afr.com/*"],
    types: ["script"]
  },
  ["blocking"]
);

browser.webRequest.onBeforeSendHeaders.addListener(function(details) {
  var requestHeaders = details.requestHeaders;

  var header_referer = '';
  for (var n in requestHeaders) {
	  if (requestHeaders[n].name.toLowerCase() == 'referer') {
		  header_referer = requestHeaders[n].value;
		  continue;
	  }
  }
  
  // check for blocked regular expression: domain enabled, match regex, block on an internal or external regex
  for (var domain in blockedRegexes) {
	  if ((isSiteEnabled({url: '.'+ domain}) || isSiteEnabled({url: header_referer})) && details.url.match(blockedRegexes[domain])) {
			if (details.url.indexOf(domain) !== -1 || header_referer.indexOf(domain) !== -1) {
				// allow BG paywall-script to set cookies in homepage/sections (else no article-text)
				if (details.url.indexOf('meter.bostonglobe.com/js/') !== -1 && (header_referer === 'https://www.bostonglobe.com/' 
						|| header_referer.indexOf('/?p1=BGHeader_') !== -1  || header_referer.indexOf('/?p1=BGMenu_') !== -1)) {
					break;
				}
				return { cancel: true };
			}
	  }
  }

  if (!isSiteEnabled(details)) {
    return;
  }

  var tabId = details.tabId;
  
  var useUserAgentMobile = false;
  var setReferer = false;

  // if referer exists, set it to google
  requestHeaders = requestHeaders.map(function(requestHeader) {
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
  var useGoogleBot = use_google_bot.filter(function(item) {
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
		if ((rc_domain in remove_cookies_select_hold) && remove_cookies_select_hold[rc_domain].includes(cookies[i].name)){
			continue; // don't remove specific cookie
		}
		// drop only specific cookie(s) from remove_cookies domains
		if ((rc_domain in remove_cookies_select_drop) && !(remove_cookies_select_drop[rc_domain].includes(cookies[i].name))){
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
  var isEnabled = enabledSites.some(function(enabledSite) {
    var useSite = (details.url.indexOf("." + enabledSite) !== -1 || details.url.indexOf("/" + enabledSite) !== -1);
    if (enabledSite in restrictions) {
      return useSite && details.url.match(restrictions[enabledSite]);
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
