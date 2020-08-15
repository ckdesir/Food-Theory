/**
 * The AutoComplete class essentially wraps the autoComplete object of the 
 * autoComplete.js library. Includes additional functionality like adding 
 * an event listener to the whole autoComplete object for the context of
 * Food Theory. autoComplete enables users to quickly find and select from 
 * a populated list of values as they type, leveraging searching and
 * filtering. Requires use with the accompanying autoComplete.css. A more 
 * detailed account of this library and all of its properties can be found here: 
 * https://tarekraafat.github.io/autoComplete.js/#/?id=api-configuration.
 */
class AutoComplete {
  /**
   * Initalizes an AutoComplete object.
   * @param {Object=} [trigger] - Engine event & condition trigger
   * @param {string} [placeHolder = ''] - Place Holder text
   * @param {Object=} [resultsList] - Rendered results list 
   *    destination, position, element & navigation
   * @param {Object=} [resultItem] - Rendered result Item content & element
   * @param {Function} [noResults = () => {}] - Action script on noResults
   *    found, by default nothing is done.
   * @param {boolean} [highlight = false] - Highlight matching results, 
   *    by default is disabled.
   * @param {Function} [onSelection = () => {}] - Action script
   *    onSelection event.
   * @param {number} [maxResults = 5] - Maximum number of displayed results
   * @param {Object} [data] - Data Source, Data Key & Data Caching
   * @param {string} [selector = '#autoComplete'] - Input field selector
   * @param {number} [threshold = 0] - Minimum characters length before engine
   *    starts rendering results
   * @param {(string|Function)} [searchEngine = 'strict'] - Search 
   *    Engine Type/Mode
   */
  constructor(
    trigger = {
      event: ["input"],
      condition: (query) => {
        return query.length > this.threshold_ && query !== ' ';
      }
    },
    placeHolder = '',
    resultsList = {
      render: false,
      destination: document.querySelector("#autoComplete"),
      position: "afterend",
      element: "ul",
    },
    resultItem = {
      element: "li"
    },
    noResults = () => {},
    highlight = false,
    onSelection = () => {},
    maxResults = 5,
    data = {
      src: {}
    },
    selector = '#autoComplete',
    threshold = 0,
    searchEngine = 'strict',
  ) {
    this.autoComplete_ = new autoComplete({
      data: data,
      trigger: trigger,
      placeHolder: placeHolder,
      selector: selector,
      threshold: threshold,
      searchEngine: searchEngine,
      resultsList: resultsList,
      resultItem: resultItem,
      noResults: noResults,
      highlight: highlight,
      maxResults: maxResults,
      onSelection: onSelection,
    });
  }

  setData(data) {
    this.autoComplete_.data = data;
  }

  /**
   * Adds an eventListener to the autoComplete object.
   * @param {function(): any} eventListenerFunction 
   */
  addAutoCompleteEventListener(eventListenerFunction) {
    document.querySelector(this.autoComplete_.selector).
        addEventListener("autoComplete", eventListenerFunction);
  }
}