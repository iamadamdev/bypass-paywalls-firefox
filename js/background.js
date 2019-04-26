'use strict';

let defaultSites = {
    'Baltimore Sun': 'baltimoresun.com',
    'Barron\'s': 'barrons.com',
    'Bloomberg': 'bloomberg.com',
    'Business Insider': 'businessinsider.com',
    'Caixin': 'caixinglobal.com',
    'Chemical & Engineering News': 'cen.acs.org',
    'Chicago Tribune': 'chicagotribune.com',
    'Central Western Daily': 'centralwesterndaily.com.au',
    'Crain\'s Chicago Business': 'chicagobusiness.com',
    'Corriere Della Sera': 'corriere.it',
    'Daily Press': 'dailypress.com',
    'Denver Post': 'denverpost.com',
    'De Tijd': 'tijd.be',
    'de Volkskrant': 'volkskrant.nl',
    'The Economist': 'economist.com',
    'Examiner': 'examiner.com.au',
    'Financial Times': 'ft.com',
    'Foreign Policy': 'foreignpolicy.com',
    'Glassdoor': 'glassdoor.com',
    'Haaretz': 'haaretz.co.il',
    'Haaretz English': 'haaretz.com',
    'Handelsblatt': 'handelsblatt.com',
    'Hartford Courant': 'courant.com',
    'Harvard Business Review': 'hbr.org',
    'Inc.com': 'inc.com',
    'Investors Chronicle': 'investorschronicle.co.uk',
    'Irish Times': 'irishtimes.com',
    'La Repubblica': 'repubblica.it',
    'Le Temps': 'letemps.ch',
    'Los Angeles Times': 'latimes.com',
    'Medium': 'medium.com',
    'Medscape': 'medscape.com',
    'MIT Technology Review': 'technologyreview.com',
    'Mountain View Voice': 'mv-voice.com',
    'National Post': 'nationalpost.com',
    'New Statesman': 'newstatesman.com',
    'New York Magazine': 'nymag.com',
    'Nikkei Asian Review': 'asia.nikkei.com',
    'NRC': 'nrc.nl',
    'Orange County Register': 'ocregister.com',
    'Orlando Sentinel': 'orlandosentinel.com',
    'Palo Alto Online': 'paloaltoonline.com',
    'Quora': 'quora.com',
    'SunSentinel': 'sun-sentinel.com',
    'Tech in Asia': 'techinasia.com',
    'The Advocate': 'theadvocate.com.au',
    'The Age': 'theage.com.au',
    'The Australian': 'theaustralian.com.au',
    'The Australian Financial Review': 'afr.com',
    'The Boston Globe': 'bostonglobe.com',
    'The Business Journals': 'bizjournals.com',
    'The Globe and Mail': 'theglobeandmail.com',
    'The Herald': 'theherald.com.au',
    'The Japan Times': 'japantimes.co.jp',
    'TheMarker': 'themarker.com',
    'The Mercury News': 'mercurynews.com',
    'The Morning Call': 'mcall.com',
    'The Nation': 'thenation.com',
    'The New York Times': 'nytimes.com',
    'The New Yorker': 'newyorker.com',
    'The News-Gazette': 'news-gazette.com',
    'The Saturday Paper': 'thesaturdaypaper.com.au',
    'The Spectator': 'spectator.co.uk',
    'The Seattle Times': 'seattletimes.com',
    'The Sydney Morning Herald': 'smh.com.au',
    'The Times': 'thetimes.co.uk',
    'The Toronto Star': 'thestar.com',
    'The Washington Post': 'washingtonpost.com',
    'The Wall Street Journal': 'wsj.com',
    'Towards Data Science': 'towardsdatascience.com',
    'Vanity Fair': 'vanityfair.com',
    'Wired': 'wired.com'
};

const restrictions = {
    'barrons.com': 'barrons.com/articles'
};

// Don't remove cookies before page load
const allow_cookies = [
    'asia.nikkei.com',
    'nytimes.com',
    'wsj.com',
    'ft.com',
    'letemps.ch',
    'mercurynews.com',
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
    'examiner.com.au',
    'thestar.com',
    'washingtonpost.com',
    'irishtimes.com',
    'hbr.org',
    'nymag.com',
    'theaustralian.com.au',
];

// Removes cookies after page load
const remove_cookies = [
    'asia.nikkei.com',
    'nytimes.com',
    'ft.com',
    'letemps.ch',
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
    'examiner.com.au',
    'thestar.com',
    'centralwesterndaily.com.au',
    'theherald.com.au',
    'foreignpolicy.com',
    'wsj.com',
    'glassdoor.com',
    'cen.acs.org',
    'irishtimes.com',
    'hbr.org',
    'thenewsrep.com',
    'washingtonpost.com',
    'nymag.com',
    'techinasia.com',
    'nationalpost.com',
    'volkskrant.nl',
    'handelsblatt.com',
];

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
    /haaretz\.co\.il\/htz\/js\/inter\.js/
];

const userAgentDesktop = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const userAgentMobile = "Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible ; Googlebot/2.1 ; +http://www.google.com/bot.html)";

let enabledSites = [];

// Get the enabled sites
browser.storage.sync.get({
    sites: {}
}, function (items) {
    let sites = items.sites;
    enabledSites = Object.keys(items.sites).map(function (key) {
        return items.sites[key];
    });
});

// Listen for changes to options
browser.storage.onChanged.addListener(function (changes, namespace) {
    let key;
    for (key in changes) {
        let storageChange = changes[key];
        if (key === 'sites') {
            let sites = storageChange.newValue;
            enabledSites = Object.keys(sites).map(function (key) {
                return sites[key];
            });
        }
    }
});

// Set and show default options on install
browser.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        setDefaultOptions();
    } else if (details.reason === "update") {
        // User updated extension
    }
});

// WSJ bypass
browser.webRequest.onBeforeSendHeaders.addListener(function (details) {
        if (!isSiteEnabled(details) || details.url.indexOf("mod=rsswn") !== -1) {
            return;
        }

        let param;
        let updatedUrl;

        param = getParameterByName("mod", details.url);

        if (param === null) {
            updatedUrl = stripQueryStringAndHashFromPath(details.url);
            updatedUrl += "?mod=rsswn";
        } else {
            updatedUrl = details.url.replace(param, "rsswn");
        }
        return {redirectUrl: updatedUrl};
    },
    {urls: ["*://*.wsj.com/*"], types: ["main_frame"]},
    ["blocking"]
);

browser.webRequest.onBeforeSendHeaders.addListener(function (details) {
    if (!isSiteEnabled(details)) {
        return;
    }

    if (blockedRegexes.some(function (regex) {
        return regex.test(details.url);
    })) {
        return {cancel: true};
    }

    let requestHeaders = details.requestHeaders;
    let tabId = details.tabId;

    let useUserAgentMobile = false;
    let setReferer = false;

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

    // override User-Agent except on medium.com
    if (details.url.indexOf("medium.com") === -1) {
        requestHeaders.push({
            "name": "User-Agent",
            "value": useUserAgentMobile ? userAgentMobile : userAgentDesktop
        })
    }

    requestHeaders.push({
        "name": "X-Forwarded-For",
        "value": "66.249.66.1"
    });

    // remove cookies before page load
    requestHeaders = requestHeaders.map(function (requestHeader) {
        for (let siteIndex in allow_cookies) {
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

            }
        });
    }

    return {requestHeaders: requestHeaders};
}, {
    urls: ['<all_urls>']
}, ['blocking', 'requestHeaders']);

// remove cookies after page load
browser.webRequest.onCompleted.addListener(function (details) {
    for (let domainIndex in remove_cookies) {
        let domainVar = remove_cookies[domainIndex];
        if (!enabledSites.includes(domainVar) || details.url.indexOf(domainVar) === -1) {
            continue; // don't remove cookies
        }
        browser.cookies.getAll({domain: domainVar}, function (cookies) {
            for (let i = 0; i < cookies.length; i++) {
                let cookie = {
                    url: (cookies[i].secure ? "https://" : "http://") + cookies[i].domain + cookies[i].path,
                    name: cookies[i].name,
                    storeId: cookies[i].storeId
                };
                if (cookies[i].firstPartyDomain !== undefined) {
                    cookie.firstPartyDomain = cookies[i].firstPartyDomain;
                }
                browser.cookies.remove(cookie);
            }
        });
    }
}, {
    urls: ["<all_urls>"]
});

function isSiteEnabled(details) {
    return enabledSites.some(function (enabledSite) {
        let useSite = details.url.indexOf("." + enabledSite) !== -1;
        if (enabledSite in restrictions) {
            return useSite && details.url.indexOf(restrictions[enabledSite]) !== -1;
        }
        return useSite;
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function stripQueryStringAndHashFromPath(url) {
    return url.split("?")[0].split("#")[0];
}
