function generate() {
		var textDiv = document.getElementById('text');
		var linkDiv = document.getElementById('link');
		text = textDiv.value;
		longurl = encodeURIComponent("http://lmgtfy.com/?q="+text);
		callurl = "https://api-ssl.bitly.com/v3/shorten?access_token=6c0131a35e0baa09973b37e65cf819fcc528ba79&longUrl="+longurl;
		
		var twitterShare = document.getElementById('twitterButton');
		var facebookShare = document.getElementById('facebookButton');
		var googlePlusShare = document.getElementById('googlePlusButton');

		var xhr = new XMLHttpRequest();
		xhr.open("GET", callurl, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				var resp = JSON.parse(xhr.responseText);
				linkDiv.value = resp.data.url;
				twitterShare.href="https://twitter.com/intent/tweet?text="+text+"&url="+encodeURIComponent(resp.data.url)+"&via=rishirdua";
				facebookShare.href="https://www.facebook.com/dialog/share?app_id=379398048885600&display=popup&href="+encodeURIComponent(resp.data.url)+"&redirect_uri=https%3A%2F%2Ffacebook.com";
				googlePlusShare.href="https://plus.google.com/share?url="+resp.data.url;
        		var resultsDiv = document.getElementById('results');
        		resultsDiv.className="show";
			}
		}
		xhr.send();
		
}

function copy() {
		var copyDiv = document.getElementById('link');
		copyDiv.focus();
		document.execCommand('SelectAll');
		document.execCommand("Copy", false, null);
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.executeScript( {
  		code: "window.getSelection().toString();"
  	}, function(selection) {
  	 document.getElementById("text").value = selection[0];
  	}
  );
	document.getElementById("copy").onclick = copy;
	document.getElementById("generate").onclick = generate;
  document.getElementById('twitterButton').innerText = chrome.i18n.getMessage("twitter_string");
  document.getElementById('facebookButton').innerText = chrome.i18n.getMessage("facebook_string");
  document.getElementById('googlePlusButton').innerText = chrome.i18n.getMessage("googleplus_string");
  document.getElementById('generate').innerText = chrome.i18n.getMessage("lmgtfy_string");
  document.getElementById('copy').innerText = chrome.i18n.getMessage("clipboard_string");
});