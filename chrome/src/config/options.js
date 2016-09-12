var handshakeDelayValue = 5;
var twitchDelayValue = 2;

function loadOptions() {
  chrome.storage.sync.get({
    handshakeDelay: handshakeDelayValue,
    twitchDelay: twitchDelayValue,
  }, function(items) {
    document.getElementById('twitchDelay').value = items.twitchDelay;
    document.getElementById('handshakeDelay').value = items.handshakeDelay;
  });
}

function saveOptions() {
	var twitchDelayValue = document.getElementById("twitchDelay").value;
  var handshakeDelayValue = document.getElementById("handshakeDelay").value;
  chrome.storage.sync.set({
    handshakeDelay: handshakeDelayValue,
    twitchDelay: twitchDelayValue
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function eraseOptions() {
	location.reload();
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', eraseOptions);
