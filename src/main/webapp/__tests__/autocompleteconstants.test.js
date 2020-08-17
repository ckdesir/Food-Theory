import * as autoCompleteConstants from '../scripts/autocompleteconstants';

beforeEach(() => {
  document.body.innerHTML = '';
});

test('AUTOCOMPLETE_NO_RESULTS', () => {
  const autoCompleteList = document.createElement('ul');
  autoCompleteList.id = 'autoComplete_list';
  document.body.appendChild(autoCompleteList);
  const expectedResult = document.createElement('li');
  expectedResult.setAttribute('class', 'no_result');
  expectedResult.setAttribute('tabindex', '1');
  expectedResult.innerHTML = 
      'Nothing found. Press enter to add to list anyways!';
  autoCompleteConstants.AUTOCOMPLETE_NO_RESULTS();
  expect(autoCompleteList.children[0]).toEqual(expectedResult);
});

test('AUTOCOMPLETE_ON_SELECTION', () => {
  const autoComplete = document.createElement('input');
  autoComplete.id = 'autoComplete';
  autoComplete.value = 'Hello';
  const selectionContainer = document.createElement('div');
  selectionContainer.id = 'selectionContainer';
  document.body.appendChild(autoComplete);
  document.body.appendChild(selectionContainer);
  autoCompleteConstants.AUTOCOMPLETE_ON_SELECTION({
    selection: {
      value: {
        word: 'Hello'
      }
    }
  });
  expect(autoComplete.value).toEqual('');
});

test('ADD_KEY_UP_EVENT_LISTENER_AUTOCOMPLETE, NO KEYUP', () => {
  const autoComplete = document.createElement('input');
  autoComplete.id = 'autoComplete';
  autoComplete.value = 'Hello';
  const selectionContainer = document.createElement('div');
  selectionContainer.id = 'selectionContainer';
  document.body.appendChild(autoComplete);
  document.body.appendChild(selectionContainer);
  autoCompleteConstants.ADD_KEY_UP_EVENT_LISTENER_AUTOCOMPLETE();
  expect(autoComplete.value).toEqual('Hello');
});

test('ADD_KEY_UP_EVENT_LISTENER_AUTOCOMPLETE, KEYUP DETECTED', () => {
  const autoComplete = document.createElement('input');
  autoComplete.id = 'autoComplete';
  autoComplete.value = 'Hello';
  const selectionContainer = document.createElement('div');
  selectionContainer.id = 'selectionContainer';
  document.body.appendChild(autoComplete);
  document.body.appendChild(selectionContainer);
  autoCompleteConstants.ADD_KEY_UP_EVENT_LISTENER_AUTOCOMPLETE();
  var e = $.Event('keyup');
  e.key = 'Enter' 
  $('#autoComplete').trigger(e);
  expect(autoComplete.value).toEqual('');
});

test('BUILD_SELECTION_ITEM', () => {
  const selectionContainer = document.createElement('div');
  selectionContainer.id = 'selectionContainer';
  document.body.appendChild(selectionContainer);
  const expectedBadge = document.createElement('span');
  expectedBadge.className =
      'badge badge-dark align-self-center justify-content-center p-2 m-2';
  expectedBadge.innerText = 'Fettucine Alfredo ';
  const expcetedDeleteIcon = document.createElement('i');
  expcetedDeleteIcon.className = 'fas fa-times-circle';
  expcetedDeleteIcon.addEventListener(
      'click', autoCompleteConstants.REMOVE_SELECTION_ITEM);
  expectedBadge.appendChild(expcetedDeleteIcon);
  autoCompleteConstants.BUILD_SELECTION_ITEM('Fettucine Alfredo');
  expect(selectionContainer.children[0]).toEqual(expectedBadge);
});

test('REMOVE_SELECTION_ITEM', () => {
  const selectionContainer = document.createElement('div');
  selectionContainer.id = 'selectionContainer';
  document.body.appendChild(selectionContainer);
  const parentNode = document.createElement('span');
  const childNode = document.createElement('i');
  childNode.id = 'clickable';
  childNode.addEventListener(
      'click', autoCompleteConstants.REMOVE_SELECTION_ITEM);
  parentNode.appendChild(childNode);
  selectionContainer.appendChild(parentNode);
  $('i').click();
  expect(selectionContainer.hasChildNodes()).toBe(false);
});

test('REMOVE_SELECTION_ITEM from BUILD_SELECTION_ITEM', () => {
  const selectionContainer = document.createElement('div');
  selectionContainer.id = 'selectionContainer';
  document.body.appendChild(selectionContainer);
  autoCompleteConstants.BUILD_SELECTION_ITEM('fettucine alfredo');
  $('i').click();
  expect(selectionContainer.hasChildNodes()).toBe(false);
});
