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
  'De Groene Amsterdammer': 'groene.nl',
  'De Tijd': 'tijd.be',
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
  'New Statesman (javascript disabled)': 'newstatesman.com',
  'New York Magazine': 'nymag.com',
  'New Zealand Herald': 'nzherald.co.nz',
  'Nikkei Asian Review': 'asia.nikkei.com',
  'NK News': 'nknews.org',
  'NRC': 'nrc.nl',
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
  'The Australian Financial Review (javascript disabled)': 'afr.com',
  'The Boston Globe': 'bostonglobe.com',
  'The Business Journals': 'bizjournals.com',
  'The Diplomat': 'thediplomat.com',
  'The Globe and Mail (javascript disabled)': 'theglobeandmail.com',
  'The Herald': 'theherald.com.au',
  'The Hindu': 'thehindu.com',
  'The Japan Times': 'japantimes.co.jp',
  'TheMarker': 'themarker.com',
  'The Mercury News': 'mercurynews.com',
  'The Mercury Tasmania': 'themercury.com.au',
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
  'The Toronto Star (javascript disabled)': 'thestar.com',
  'The Washington Post': 'washingtonpost.com',
  'The Wall Street Journal': 'wsj.com',
  'Times Literary Supplement': 'the-tls.co.uk',
  'Towards Data Science': 'towardsdatascience.com',
  'Trouw': 'trouw.nl',
  'Vanity Fair': 'vanityfair.com',
  'Vrij Nederland': 'vn.nl',
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
      inputEl.checked = (key in sites) || (key.replace(/\s\(.*\)/, '') in sites);

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

