import * as indexScript from '../scripts/index';
import fetch from 'jest-fetch-mock';

afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});

test('buildCarouselCaption', () => {
  const expectedInnerHTML = 
      'Image by <a href="https://pixabay.com/users/Josch13-48777/">'+
      'Josch13</a> on <a href="https://pixabay.com">Pixabay</a>.';
  expect(indexScript.buildCarouselCaption('Josch13', '48777').innerHTML)
      .toEqual(expectedInnerHTML);
});

test('buildCarouselDiv', () => {
  document.body.innerHTML = '<div id="carousel-home-page"></div>';
  const carouselContainer = document.getElementById('carousel-home-page');
  const expectedPhotographerLink = document.createElement('a');
  expectedPhotographerLink.href = 'https://pixabay.com/users/Josch13-48777/';
  expectedPhotographerLink.appendChild(document.createTextNode('Josch13'));
  indexScript.buildCarouselDiv(
      'https://pixabay.com/get/ed6a99fd0a76647_1280.jpg', 'Josch13', '48777');
  expect(carouselContainer.children[0].className).toEqual('container carousel-item');
  expect(carouselContainer.children[0].lastElementChild.querySelector('a')).
      toEqual(expectedPhotographerLink);
});