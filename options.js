var defaultSites = {
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
  'The Economist (javascript disabled)': 'economist.com',
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
  'New Zealand Herald': 'nzherald.co.nz',
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
  'The Diplomat': 'thediplomat.com',
  'The Globe and Mail (javascript disabled)': 'theglobeandmail.com',
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
  'The Telegraph': 'telegraph.co.uk',
  'The Times': 'thetimes.co.uk',
  'The Toronto Star (javascript disabled)': 'thestar.com',
  'The Washington Post': 'washingtonpost.com',
  'The Wall Street Journal': 'wsj.com',
  'Towards Data Science': 'towardsdatascience.com',
  'Vanity Fair': 'vanityfair.com',
  'Wired': 'wired.com'
};

// Saves options to browser.storage
function save_options() {
  var gh_url = document.getElementById('bypass_sites').value;
  var inputEls = document.querySelectorAll('#bypass_sites input');
  var sites = {};

  var sites = Array.from(inputEls).reduce(function(memo, inputEl) {
    if (inputEl.checked) {
      memo[inputEl.dataset.key] = inputEl.dataset.value;
    }
    return memo;
  }, {});

  browser.storage.sync.set({
    sites: sites
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
     status.textContent = 'Options saved.';
    setTimeout(function() {
      // status.textContent = '';
      window.close();
    }, 500);
  });
}

// Restores checkbox input states using the preferences
// stored in browser.storage.
function renderOptions() {
  browser.storage.sync.get({
    sites: {}
  }, function(items) {
    var sites = items.sites;
    var sitesEl = document.getElementById('bypass_sites');
    for (var key in defaultSites) {
      if (!defaultSites.hasOwnProperty(key)) {
        continue;
      }

      var value = defaultSites[key];
      var labelEl = document.createElement('label');
      var inputEl = document.createElement('input');
      inputEl.type = 'checkbox';
      inputEl.dataset.key = key;
      inputEl.dataset.value = value;
      inputEl.checked = key in sites;

      labelEl.appendChild(inputEl);
      labelEl.appendChild(document.createTextNode(' '+key));
      sitesEl.appendChild(labelEl);
    }
  });
}

function selectAll() {
  var inputEls = Array.from(document.querySelectorAll('input'));
  inputEls.forEach(function(inputEl) {
    inputEl.checked = true;
  });
}

function selectNone() {
  var inputEls = Array.from(document.querySelectorAll('input'));
  inputEls.forEach(function(inputEl) {
    inputEl.checked = false;
  });
}

document.addEventListener('DOMContentLoaded', renderOptions);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('select-all').addEventListener('click', selectAll);
document.getElementById('select-none').addEventListener('click', selectNone);

