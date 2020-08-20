import * as firebaseConstants from './firebaseconstants.js';

/**
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function () {
  main();
};

/**
 * function main() handles sign-in.
 */
function main() {
  firebase.initializeApp(firebaseConstants.FIREBASE_CONFIG);
  firebaseConstants.INITALIZE_SIGN_IN(
    new URL(window.location).searchParams.get('redirect')
  );
}
