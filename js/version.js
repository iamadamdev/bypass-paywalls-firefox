let manifestData = browser.runtime.getManifest();
let versionString = 'v' + manifestData.version;
document.getElementById('version').innerText = versionString;
