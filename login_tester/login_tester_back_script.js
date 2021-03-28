// runs login tester when browser button clicked
chrome.browserAction.onClicked.addListener(buttonClicked);


usernames = ["fake@fake.com", "incorrect.com", "pranavji@tamu.edu", "anotherfake@hotmail.com"];
passwords = ["sdfsjhjhjhjhhf", "asdasfasfjjhj", "SuperHardPassword1", "sdfsdhjhjhjhjhjhjhhf"];


// returns stores returns from  submitting credentials
returns = new Array(usernames.length);

// validities stores the validity of each credential (valid, invalid)
validities = new Array(usernames.length);

// time delays for each of 3 steps (submitting credentials, checking url, deleting page)
td_1 = 2000
td_2 = 2000
td_3 = 500


// loops through arrays (usernames, passwords)
function buttonClicked(tab) {
	for (var i = 0; i < usernames.length; ++i) {
		u = usernames[i];
		p = passwords[i];
		
		login_auto(u,p,i);
	}
	
	setTimeout(function() {console.log(returns)}, 1000 + usernames.length * (td_1 + td_2 + td_3));
	setTimeout(function() {console.log(validities)}, 1000 + usernames.length * (td_1 + td_2 + td_3));
	
}


// enters credentials
function login_auto(usrn, pwd, j) {
	setTimeout(function() {	
		chrome.tabs.create({"url": "https://us-demo-hema.mypkfit.com/uaa/login"}, function(tab) {
			setTimeout(function(){chrome.tabs.sendMessage(tab.id, "credentials^^^" + usrn + "^^^" + pwd, function(response){returns[j] = response})}, td_1);
			setTimeout(function(){chrome.tabs.sendMessage(tab.id, "check", function(response){validities[j] = response})}, td_1 + td_2);
			setTimeout(function(){chrome.tabs.remove(tab.id)}, td_1 + td_2 + td_3);	
		})
	}, j * (td_1 + td_2 + td_3));
}