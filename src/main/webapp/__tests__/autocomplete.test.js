import autoComplete from '../scripts/autocompletelibrary';
import { AutoComplete } from '../scripts/autocomplete';
import * as autoCompleteConstants from '../scripts/autocompleteconstants';
jest.mock('../scripts/autocompletelibrary');

beforeEach(() => {
  autoComplete.mockClear();
  autoComplete.mockImplementation(() => {
    return {
      data: {
        src: []
      },
      selector: '#autoComplete'
    };
  });
});

const expectedAutoCompleteObject = { 
  "data": { "src": [] }, 
  "highlight": true, 
  "maxResults": 5, 
  "noResults": autoCompleteConstants.AUTOCOMPLETE_NO_RESULTS,
  "onSelection": autoCompleteConstants.AUTOCOMPLETE_ON_SELECTION,
  "placeHolder": "Enter foods or cuisines!", 
  "resultItem": autoCompleteConstants.AUTOCOMPLETE_RESULT_ITEM,
  "resultsList": autoCompleteConstants.AUTOCOMPLETE_RESULTS_LIST,
  "searchEngine": "strict", 
  "selector": "#autoComplete", 
  "threshold": 0, 
  "trigger": autoCompleteConstants.AUTOCOMPLETE_TRIGGER
}

  test('initializes correctly', () => {
  const autoCompleteTest = new AutoComplete(
    autoCompleteConstants.AUTOCOMPLETE_TRIGGER,
    autoCompleteConstants.AUTOCOMPLETE_PLACEHOLDER,
    autoCompleteConstants.AUTOCOMPLETE_RESULTS_LIST,
    autoCompleteConstants.AUTOCOMPLETE_RESULT_ITEM,
    autoCompleteConstants.AUTOCOMPLETE_NO_RESULTS,
    autoCompleteConstants.AUTOCOMPLETE_HIGHLIGHT,
    autoCompleteConstants.AUTOCOMPLETE_ON_SELECTION
  );
  expect(autoComplete).toHaveBeenCalledTimes(1);
  expect(autoComplete).toHaveBeenCalledWith(expectedAutoCompleteObject);
});

test('set data', () => {
  const autoCompleteTest = new AutoComplete(
    autoCompleteConstants.AUTOCOMPLETE_TRIGGER,
    autoCompleteConstants.AUTOCOMPLETE_PLACEHOLDER,
    autoCompleteConstants.AUTOCOMPLETE_RESULTS_LIST,
    autoCompleteConstants.AUTOCOMPLETE_RESULT_ITEM,
    autoCompleteConstants.AUTOCOMPLETE_NO_RESULTS,
    autoCompleteConstants.AUTOCOMPLETE_HIGHLIGHT,
    autoCompleteConstants.AUTOCOMPLETE_ON_SELECTION
  );
  autoCompleteTest.setData({
    src: ['hello']
  });
  expect(autoCompleteTest.autoComplete_.data).toEqual({
    src: ['hello']
  });
});

function testEventListenerFunction() {
  return false;
}