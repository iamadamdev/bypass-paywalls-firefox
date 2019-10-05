window.localStorage.clear();

const getHostName = _ => {
	let url = location.hostname;
	if (location.hostname.startsWith('www.')) {
		return url.replace('www.', '');
	}

	return url;
};

const urlMatches = (url) => {

	return getHostName() === url;
};


if (urlMatches('bizjournals.com')) {
	const hiddenStory = document.getElementsByClassName(
		"js-pre-chunks__story-body"
	);
	if (hiddenStory && hiddenStory.length > 0) {
		hiddenStory[0].style.display = "block";
	}

	const payWallMessage = document.getElementsByClassName(
		"chunk chunk--flex@lg chunk--paywall"
	);
	if (payWallMessage && payWallMessage.length > 0) {
		payWallMessage[0].style.display = "none";
	}
}

if (urlMatches('businessinsider.com')) {
	const paywall = document.getElementsByClassName(
		"tp-modal"
	);
	while (paywall.length > 0) {
		paywall[0].parentNode.removeChild(paywall[0]);
	}
}

if (urlMatches('haaretz.co.il')) {
	const html = document.getElementsByTagName('html');
	if (html && html.length > 0) {
		html[0].style['overflow-y'] = 'auto';
	}
	const msg = document.getElementById('article-wrapper');
	if (msg) {
		msg.style['display'] = 'none';
	}
}

if (urlMatches('nzherald.co.nz')) {
	const paywall = document.getElementById(
		"article-content"
	);
	if (paywall) {
		paywall.classList.remove('premium-content');
		paywall.classList.add('full-content');
		var paras = paywall.querySelectorAll("p, span, h2, div");
		var delClass = "";
		for (var i = 0; i < paras.length; i++) {
			if (paras[i].nodeName == 'P' || paras[i].nodeName == 'SPAN') {
				paras[i].classList.remove("ellipsis");
				if (delClass == "" && paras[i].className != "") {
					delClass = paras[i].className;
				} else {
					if (delClass != "") {
						paras[i].classList.remove(delClass);
					}
				}
			}
			paras[i].removeAttribute('style');
		}
	}
}

if (urlMatches('rep.repubblica.it')) {
	if (location.href.includes("/pwa/")) {
		location.href = location.href.replace("/pwa/", "/ws/detail/");
	}

	if (location.href.includes("/ws/detail/")) {
		const paywall = document.querySelector('.paywall[subscriptions-section="content"]');
		if (paywall) {
			paywall.removeAttribute('subscriptions-section');
			const preview = document.querySelector('div[subscriptions-section="content-not-granted"]');
			if (preview) {
				preview.remove();
			}
		}
	}
}

if (urlMatches("wsj.com")) {
	if (location.href.includes('/articles/')) {
		setTimeout(function () {
			document.querySelector('.close-btn').click();
		}, 2000);
	}
}

if (urlMatches('washingtonpost.com')) {
	if (location.href.includes('/gdpr-consent/')) {
		document.querySelector('.gdpr-consent-container .continue-btn.button.free').click();

		setTimeout(function () {

			const gdprcheckbox = document.querySelector('.gdpr-consent-container .consent-page:not(.hide) #agree');
			if (gdprcheckbox) {
				gdprcheckbox.checked = true;
				gdprcheckbox.dispatchEvent(new Event('change'));

				document.querySelector('.gdpr-consent-container .consent-page:not(.hide) .continue-btn.button.accept-consent').click();
			}
		}, 300); // Delay (in milliseconds)
	}
}
