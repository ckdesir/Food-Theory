/**
 * Highlights results that match in the resultsList.
 * @type {boolean}
 */
const AUTOCOMPLETE_HIGHLIGHT = true;

/**
 * A placeholder text for the input.
 * @type {string}
 */
const AUTOCOMPLETE_PLACEHOLDER = 'Enter foods or cuisines!';

/**
 * Represents what triggers the autoComplete's library to start by
 * the conditional and by the event trigger type.
 * @type {Object}
 */
const AUTOCOMPLETE_TRIGGER = {
  event: ['input', 'focusin', 'focusout']
};

/**
 * Rendered results list destination, position, element & navigation.
 * @type {Object}
 */
const AUTOCOMPLETE_RESULTS_LIST = {
  render: true,
  container: source => {
    source.setAttribute('id', 'autoComplete_list');
  },
  element: 'ul',
  destination: document.querySelector('#autoComplete'),
  position: 'afterend'
};

/**
 * Rendered result Item content & element.
 * @type {object}
 */
const AUTOCOMPLETE_RESULT_ITEM = {
  content: (data, source) => {
    source.innerHTML = data.match;
  },
  element: 'li',
};

/**
 * Triggers when there are no results to display.
 * @type {function(): any}
 */
const AUTOCOMPLETE_NO_RESULTS = () => {
  const result = document.createElement('li');
  result.setAttribute('class', 'no_result');
  result.setAttribute('tabindex', '1');
  result.innerHTML = 'Nothing found. Press enter to add to list anyways!';
  document.querySelector('#autoComplete_list').appendChild(result);
};

/**
 * Triggers once a result item is selected.
 * @type {function(): any}
 */
const AUTOCOMPLETE_ON_SELECTION = (feedback) => {
  document.querySelector('#autoComplete').blur();
  const selection = feedback.selection.value.word;
  BUILD_SELECTION_ITEM(selection);
  document.querySelector('#autoComplete').value = '';
};

/**
 * Builds a badge of the given item.
 * @param {string} item 
 */
const BUILD_SELECTION_ITEM = (item) => {
  const badge = document.createElement('span');
  badge.className = 
      'badge badge-dark align-self-center justify-content-center p-2 m-2';
  badge.innerText = item + ' ';
  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fas fa-times-circle';
  deleteIcon.addEventListener('click', REMOVE_SELECTION_ITEM);
  badge.appendChild(deleteIcon);
  document.getElementById('selectionContainer').appendChild(badge);
};

/**
 * Removes the selection item badge from its container.
 * @param {MouseEvent} mouseEvent the mouseEvent
 *    that captures what was clicked on
 */
const REMOVE_SELECTION_ITEM = (mouseEvent) => {
  document.getElementById('selectionContainer')
      .removeChild(mouseEvent.target.parentNode);
}

/**
 * Detecs when the enter key is 
 * released on the autoComplete input, building a tag of whatever was in the 
 * input at the time. 
 */
const ADD_KEY_UP_EVENT_LISTENER_AUTOCOMPLETE = () => {
  $('#autoComplete').on('keyup', (keyboardEvent) => {
    if ((keyboardEvent.key === 'Enter' || keyboardEvent.keyCode === 13) &&
      keyboardEvent.target.value) {
      BUILD_SELECTION_ITEM(keyboardEvent.target.value);
      document.querySelector('#autoComplete').value = '';
    }
  });
}

export { AUTOCOMPLETE_HIGHLIGHT, AUTOCOMPLETE_NO_RESULTS, 
  AUTOCOMPLETE_ON_SELECTION, AUTOCOMPLETE_PLACEHOLDER, BUILD_SELECTION_ITEM,
  AUTOCOMPLETE_RESULTS_LIST, AUTOCOMPLETE_RESULT_ITEM, AUTOCOMPLETE_TRIGGER,
  ADD_KEY_UP_EVENT_LISTENER_AUTOCOMPLETE }

