import * as mapConstants from './scripts/map-constants.js';

/**
 * Represents the map on the results webpage, shows the resturants
 * chosen for the user.
 */
let map;

/**
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function () {
  main();
};

/**
 * function main() initializes the slideshows and the interactive
 * elements on the website.
 */
function main() {
  firebase.initializeApp(firebaseConstants.FIREBASE_CONFIG);
  detectSignedInUser();
  addOnClickListenerToElements();
  initMap();
}

/**
 * function detectSignedInUser() adds an observer for changes to the
 * user's sign-in state. Updates interface in the case where a user
 * is signed into the website.
 */
function detectSignedInUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#sign-out').show();
      $('#sign-in').hide();
      const profilePicture = document.createElement('img');
      profilePicture.alt = 'Profile picture of signed in user.';
      profilePicture.src = user.photoURL;
      profilePicture.className = 'rounded-circle mr-3';
      profilePicture.id = 'profile-picture';
      const profileLink = document.createElement('span');
      profileLink.textContent = user.displayName;
      $('#profile-display').append(profilePicture);
      $('#profile-display').append(profileLink);
      $('#profile-display').show();
    }
  });
}

/**
 * Creates a map using the Google Maps API.
 */
function initMap() {
  throw new Error('Unimplemented');
}

function addOnClickListenerToElements() {
  $('#sign-in').click(() => {
    window.location.href = 
        `signin.html?redirect=results.html${window.location.search}`;
  });
  $('#sign-out').click(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.reload();
      });
  });
}
