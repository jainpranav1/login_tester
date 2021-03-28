console.log("has started");

// receives message after browser button clicked
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {		
	parsed_message = message.split("^^^");

	if (parsed_message[0] == "credentials") {
		// enters credentials
		input_elements = document.querySelectorAll("input");
		email_add_input = input_elements[1];
		password_input = input_elements[2];
		
		email_add_input.value = parsed_message[1];
		password_input.value = parsed_message[2];

		submit_button = document.querySelector("#submit")
		submit_button.disabled = false	
		submit_button.click()
		
		sendResponse("received");
	}
	else {
		page_url = window.location.href
		
		if (page_url == "https://us-demo-hema.mypkfit.com/pkc/#/") {
			sendResponse("valid");
		}
		else if (page_url == "https://us-demo-hema.mypkfit.com/uaa/login") {
			sendResponse("invalid");
		}
		else {
			sendResponse("unknown");
		}
	}
}