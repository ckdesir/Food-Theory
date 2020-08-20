import * as indexScript from '../scripts/index';
import fetch from 'jest-fetch-mock';

afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});

test('buildCarouselCaption', () => {
  const expectedInnerHTML =
    'Photo by <a href="https://unsplash.com/@anniespratt?utm_source=food-theory&amp;utm_medium=referral">Annie Spratt</a> on <a href="https://unsplash.com/?utm_source=food-theory&amp;utm_medium=referral">Unsplash</a>.';
  expect(
    indexScript.buildCarouselCaption(
      'Annie Spratt',
      'https://unsplash.com/@anniespratt'
    ).innerHTML
  ).toEqual(expectedInnerHTML);
});

test('buildCarouselDiv', () => {
  document.body.innerHTML = '<div id="carousel-home-page"></div>';
  const carouselContainer = document.getElementById('carousel-home-page');
  const expectedPhotographerLink = document.createElement('a');
  expectedPhotographerLink.href =
    'https://unsplash.com/@anniespratt?utm_source=food-theory&utm_medium=referral';
  expectedPhotographerLink.appendChild(
    document.createTextNode('Annie Spratt')
  );
  indexScript.buildCarouselDiv(
    'https://images.unsplash.com/photo-1565729341099-2557e318fca0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1NjU4OX0',
    'Annie Spratt',
    'https://unsplash.com/@anniespratt'
  );
  expect(carouselContainer.children[0].className).toEqual(
    'container carousel-item'
  );
  expect(
    carouselContainer.children[0].lastElementChild.querySelector('a')
  ).toEqual(expectedPhotographerLink);
});
