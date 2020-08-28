import * as selectionsConstants from './selections-constants.js';
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
  selectionsConstants.AUTOCOMPLETE_TRIGGER,
  selectionsConstants.AUTOCOMPLETE_PLACEHOLDER,
  selectionsConstants.AUTOCOMPLETE_RESULTS_LIST,
  selectionsConstants.AUTOCOMPLETE_RESULT_ITEM,
  selectionsConstants.AUTOCOMPLETE_NO_RESULTS,
  selectionsConstants.AUTOCOMPLETE_HIGHLIGHT,
  selectionsConstants.AUTOCOMPLETE_ON_SELECTION
);

let autoCompletePlaces;

/**
 * Initializes an AutoComplete object and builds the rating container.
 */
$(document).ready(function () {
  autoComplete.addAutoCompleteEventListener(eventListenerFunction);
  selectionsConstants.ADD_KEY_UP_EVENT_LISTENER_AUTOCOMPLETE();
  buildRatingContainer();
  initPlacesAutoComplete();
});

/**
 * Uses the rater.js library to add a rating selection specifying relative
 * proximity, popularity, and cost.
 */
function buildRatingContainer() {
  $('#ratingProximity').rate(
    selectionsConstants.RATER_OBJECT('proximity')
  );
  $('#ratingPopularity').rate(
    selectionsConstants.RATER_OBJECT('popularity')
  );
  $('#ratingCost').rate(selectionsConstants.RATER_OBJECT('cost'));
}

/**
 * function initPlacesAutoComplete() creates a places autocomplete object.
 */
function initPlacesAutoComplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autoCompletePlaces = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete-places'),
    { types: ['geocode'] }
  );
  // // Avoid paying for data that you don't need by restricting the set of
  // // place fields that are returned to just the address components.
  // autoCompletePlaces.setFields(['address_component']);
  // // When the user selects an address from the drop-down, populate the
  // // address fields in the form.
  // autocomplete.addListener('place_changed', fillInAddress);
}

/**
 * function eventListenerFunction() uses the Datamuse api to suggest words
 * based off of the input of the user, refreshing the data of autoComplete.
 * @param {CustomEvent} customEvent
 */
function eventListenerFunction(customEvent) {
  autoComplete.setData({
    src: async function () {
      const source = await fetch(
        `https://api.datamuse.com/sug?s=${customEvent.detail.input}`
      );
      const data = await source.json();
      return data;
    },
    key: ['word'],
    cache: false,
  });
}
