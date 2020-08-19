import * as autoCompleteConstants from './autocompleteconstants.js';
import * as firebaseConstants from './firebaseconstants.js'
import { AutoComplete } from './autocomplete.js';

/**
 * An object of AutoComplete, essentially wraps the autoComplete object of the
 * autoComplete.js library. autoComplete enables users to quickly find and 
 * select from a populated list of values as they type, leveraging searching and
 * filtering. More information here:
 * https://tarekraafat.github.io/autoComplete.js/#/?id=api-configuration.
 * @type {AutoComplete}
 */
const autoComplete = new AutoComplete(
  autoCompleteConstants.AUTOCOMPLETE_TRIGGER,
  autoCompleteConstants.AUTOCOMPLETE_PLACEHOLDER,
  autoCompleteConstants.AUTOCOMPLETE_RESULTS_LIST,
  autoCompleteConstants.AUTOCOMPLETE_RESULT_ITEM,
  autoCompleteConstants.AUTOCOMPLETE_NO_RESULTS,
  autoCompleteConstants.AUTOCOMPLETE_HIGHLIGHT,
  autoCompleteConstants.AUTOCOMPLETE_ON_SELECTION
);

/**
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function () {
  firebase.initializeApp(firebaseConstants.FIREBASE_CONFIG);
  initApp();
  main(); 
}

/**
 * function main() adds pictures to the carousel and initializes an AutoComplete
 * object.
 */
function main() {
  firebaseConstants.INITALIZE_SIGN_IN();
  addToLandingCarousel();
  autoComplete.addAutoCompleteEventListener(eventListenerFunction);
  autoCompleteConstants.ADD_KEY_UP_EVENT_LISTENER_AUTOCOMPLETE();
  addOnClickListenerToElements();
}

/**
 * function initApp() adds an observer for changes to the user's sign-in state. 
 * Updates interface in the case where a user is signed into the 
 * website.
 */
function initApp() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      $('#sign-out').show();
      $('#sign-in').hide();
      const profilePicture = document.createElement('img');
      profilePicture.alt = 'Profile picture of signed in user';
      profilePicture.src = user.photoURL;
      profilePicture.className = 'rounded-circle';
      profilePicture.id = 'profile-picture';
      const displayName = document.createElement('p');
      displayName.textContent = user.displayName;
      $('#profile-display').append(profilePicture);
      $('#profile-display').show();
    } else {
      console.log("No user!")
    }
  });
}

/**
 * function addToLandingCarousel() adds fresh pictures to the carousel featured
 * on the landing page of the website.
 */
function addToLandingCarousel() {
  fetch('/retrieve-photos').then(response => response.json()).then(pictures => {
    JSON.parse(pictures.toString()).hits.forEach(pictureInfo => {
      buildCarouselDiv(pictureInfo.largeImageURL, pictureInfo.user, 
          pictureInfo.user_id, pictureInfo.tags
      );
    });
  });
}

/**
 * function buildCarouselDiv() builds a carousel image div 
 * given a url pointing to an image.
 * @param {string} urlOfImage
 * @param {string} photographer
 * @param {string} photographerId
 * @param {string} imageTags
 */
function buildCarouselDiv(urlOfImage, photographer, photographerId, imageTags) {
  const /** HTMLDivElement */ carouselDiv = document.createElement('div');
  carouselDiv.className = 'container carousel-item';
  const /** HTMLImageElement */ carouselImage = document.createElement('img');
  carouselImage.src = urlOfImage;
  carouselImage.alt = imageTags
  carouselImage.className = 'd-block w-100 h-100';
  const /** HTMLDivElement */ carouselCaptionDiv = 
      document.createElement('div');
  carouselCaptionDiv.className = 'picture-caption';
  carouselCaptionDiv.appendChild(
      buildCarouselCaption(photographer, photographerId));
  carouselDiv.appendChild(carouselImage);
  carouselDiv.appendChild(carouselCaptionDiv);
  document.getElementById('carousel-home-page').appendChild(carouselDiv);
}

/**
 * function buildCarouselCaption() builds a paragraph element that correctly
 * attributes the images of the carousel to the name of the photographer passed
 * in, linking to their portfolio.
 * @param {string} photographer 
 * @param {string} photographerId 
 * @return {HTMLParagraphElement} the carousel caption
 */
function buildCarouselCaption(photographer, photographerId) {
  const /** HTMLParagrahElement */ carouselCaption =
      document.createElement('p');
  const /** HTMLAnchorElement */ photographerLink = document.createElement('a');
  photographerLink.href =
      `https://pixabay.com/users/${photographer}-${photographerId}/`;
  photographerLink.appendChild(document.createTextNode(photographer));
  const /** HTMLAnchorElement */ pixabayLink = document.createElement('a');
  pixabayLink.href = 'https://pixabay.com';
  pixabayLink.appendChild(document.createTextNode('Pixabay'));
  carouselCaption.appendChild(document.createTextNode('Image by '));
  carouselCaption.appendChild(photographerLink);
  carouselCaption.appendChild(document.createTextNode(' on '));
  carouselCaption.appendChild(pixabayLink);
  carouselCaption.appendChild(document.createTextNode('.'));
  return carouselCaption;
}

/**
 * Adds an onclick event listener to some of the elements on the
 * main webpage.
 */
function addOnClickListenerToElements() {
  $('#greeting-message-button').click(() => {
    $('#greeting-message').hide();
    $('#selections').show();
  });
  $('#selections-close').click(() => {
    $('#selections').hide();
    $('#greeting-message').show();
  });
  $('#sign-in-close').click(() => {
    $('#sign-in-container').hide();
  });
  $('#sign-in').click(() => {
    $('#sign-in-container').show();
  });
  $('#sign-out').click(() => {
    firebase.auth().signOut();
    $('#sign-in').show();
    $('#sign-out').hide();
  });
}

/**
 * Uses the Datamuse api to suggest words based off of the input of the user,
 * refreshing the data of autoComplete.
 * @param {CustomEvent} customEvent 
 */
function eventListenerFunction(customEvent) {
  autoComplete.setData({
    src: async function () {
      const source = 
          await fetch(
              `https://api.datamuse.com/sug?s=${customEvent.detail.input}`);
      const data = await source.json();
      return data;
    },
    key: ["word"],
    cache: false
  });
}

export { addToLandingCarousel, buildCarouselDiv, buildCarouselCaption }