import * as firebaseConstants from './firebaseconstants.js';

/**
 * Time before the user is redirected back to the homepage if they aren't logged
 * in.
 * @type {number}
 */
const REDIRECT_TIME_MS = 5000;

/**
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function () {
  main();
};

/**
 * function main() adds adds onClickListeners to some elements on the main page,
 * and detects whether a user is signed in.
 */
function main() {
  firebase.initializeApp(firebaseConstants.FIREBASE_CONFIG);
  detectSignedInUser();
  addOnClickListenerToElements();
}

/**
 * function detectSignedInUser() adds an observer for changes to the
 * user's sign-in state. Updates interface in the case where a user is
 * signed into the website and redirects users back to home if not.
 */
function detectSignedInUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#navigation').show();
    } else {
      $('#refresh-message').show();
      setTimeout(() => {
        window.location.href = 'index.html';
      }, REDIRECT_TIME_MS);
    }
  });
}

/**
 * function addOnClickListenerToElements() adds an onclick event listener
 * to some of the elements on the main webpage.
 */
function addOnClickListenerToElements() {
  $('#sign-out').click(() => {
    firebase.auth().signOut();
  });
}
