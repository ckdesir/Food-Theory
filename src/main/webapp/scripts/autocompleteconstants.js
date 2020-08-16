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
  event: ['input', 'focusin', 'focusout'],
  condition: query => {
    return query.length > this.threshold && query !== ' ';
  }
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
  // <span class="badge badge-dark align-self-center justify-content-center p-2 m-2">Fettucine Alfredo
  //       <i class="fas fa-times-circle"></i>
  // </span>
};

export { AUTOCOMPLETE_HIGHLIGHT, AUTOCOMPLETE_NO_RESULTS, 
  AUTOCOMPLETE_ON_SELECTION, AUTOCOMPLETE_PLACEHOLDER, BUILD_SELECTION_ITEM,
  AUTOCOMPLETE_RESULTS_LIST, AUTOCOMPLETE_RESULT_ITEM, AUTOCOMPLETE_TRIGGER }

