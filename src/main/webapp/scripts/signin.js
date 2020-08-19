import * as logInConstants from './autocompleteconstants.js';

/**
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function () { main(); }


/**
 * function main() handles log-in once the sign-in button is clicked.
 */
function main() {
  addToLandingCarousel();
  autoComplete.addAutoCompleteEventListener(eventListenerFunction);
  autoCompleteConstants.ADD_KEY_UP_EVENT_LISTENER_AUTOCOMPLETE();
  $('#greeting-message-button').click(() => {
    $('#greeting-message').hide();
    $('#selections').show();
  });
  $('#selections-close').click(() => {
    $('#selections').hide();
    $('#greeting-message').show();
  });
}