/* eslint-env browser */
/* global utils */
/* global Lime */
/* global WebSocketHttpTransport */
/* global BlipSdk */
(function (window) {
  'use strict';

  // buttons
  const $connectButton = document.getElementById('connect-button');
  const $disconnectButton = document.getElementById('disconnect-button');

  // input elements for connection
  const $identifierInput = document.getElementById('identifier-input');
  const $passwordInput = document.getElementById('password-input');

  // input elements for messages
  const $messageToInput = document.getElementById('message-to-input');
  const $messageContentInput = document.getElementById('message-content-input');

  // input elements for notifications
  const $notificationShow = document.getElementById('notification-show');

  let blipClient;
  let identifier;
  let password;

  function createClient(identifier, password) {
      blipClient = new BlipSdk.ClientBuilder()
        .withIdentifier(identifier)
        .withAccessKey(password)
        .withTransportFactory(() => {
            return new WebSocketHttpTransport({
                localNode: identifier
            });
        })
        .build();

      blipClient.addMessageReceiver(null, function (message) {
          utils.logLimeMessage(message, 'Message received');
      });

      blipClient.addNotificationReceiver(null, function (notification) {
          if ($notificationShow.checked) {
              utils.logLimeNotification(notification, 'Notification received');
          }
      });

      setConnectedState();
  }

  function setConnectedState() {
      $connectButton.disabled = true;
      $disconnectButton.disabled = false;
      blipClient.connect()
          .then(() => utils.logMessage('Client connected'))
          .catch((err) => utils.logMessage('Error:', err));
  }

  function setDisconnectedState() {
      $connectButton.disabled = false;
      $disconnectButton.disabled = true;
      utils.logMessage('Client disconnected');
  }

  window.connect = function () {
      utils.checkMandatoryInput($identifierInput);

      identifier = $identifierInput.value;
      password = $passwordInput.value;

      createClient(identifier, password);
  };

  window.disconnect = function () {
      blipClient.close();
      setDisconnectedState();
  };

  window.sendMessage = function () {
      var message = {
          id: Lime.Guid(),
          to: $messageToInput.value,
          type: 'text/plain',
          content: $messageContentInput.value
      };

      blipClient.sendMessage(message);
      utils.logLimeMessage(message, 'Message sent');
  };

})(this);
