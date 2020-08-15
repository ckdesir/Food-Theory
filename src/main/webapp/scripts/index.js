
/**
 * @type {autoComplete}
 */
let autoComplete;


/**
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function () { main(); }

/**
 * function main() adds pictures to the carousel.
 */
function main() {
  initializeAutoComplete()
  addToLandingCarousel();
}

/**
 * function addToLandingCarousel() adds fresh pictures to the carousel featured
 * on the landing page of the website.
 */
function addToLandingCarousel() {
  fetch('/retrieve-photos').then(response => response.json()).then(pictures => {
    JSON.parse(pictures.toString()).hits.forEach(pictureInfo => {
      buildCarouselDiv(pictureInfo.largeImageURL.substr(
          0, pictureInfo.largeImageURL.length-8) + '1920.jpg', pictureInfo.user,
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
  carouselDiv.className = 'carousel-item';
  const /** HTMLImageElement */ carouselImage = document.createElement('img');
  carouselImage.src = urlOfImage;
  carouselImage.alt = imageTags
  carouselImage.className = 'd-block w-100 h-100';
  const /** HTMLDivElement */ carouselCaptionDiv = 
      document.createElement('div');
  carouselCaptionDiv.className = 'carousel-caption d-none d-md-block';
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

function initializeAutoComplete() {
  autoCompletejs = new autoComplete({
    data: {
      src: async function () {
        document.querySelector("#autoComplete").setAttribute("placeholder", "Loading...");
        const query = document.querySelector("#autoComplete").value;
        const source = await fetch(`https://api.datamuse.com/sug?s=${query}`);
        const data = await source.json();
        return data;
      },
      key: ["word"],
    },
    trigger: {
      event: ["input", "focusin", "focusout"],
      condition: function (query) {
        query.length > this.threshold;
      },
    },
    placeHolder: "Enter foods or cuisines!",
    selector: "#autoComplete",
    searchEngine: "strict",
    highlight: true,
    maxResults: 7,
    resultsList: {
      render: true,
      container: function (source) {
        source.setAttribute("id", "autoComplete_list");
      },
      element: "ul",
      destination: document.querySelector("#autoComplete"),
      position: "afterend",
    },
    resultItem: {
      content: function (data, source) {
        source.innerHTML = data.match;
      },
      element: "li",
    },
    noResults: function () {
      const result = document.createElement("li");
      result.setAttribute("class", "no_result");
      result.setAttribute("tabindex", "1");
      result.innerHTML = "Press enter to add to list anyways!";
      document.querySelector("#autoComplete_list").appendChild(result);
    },
    onSelection: function (feedback) {
      document.querySelector("#autoComplete").blur();
      const selection = feedback.selection.value.word;
      buildSelectionItem(selecion);
      document.querySelector("#autoComplete").value = '';
    },
  });
}

/**
 * Toggle event for search input
 * showing & hidding results list onfocus / blur
 */
["focus", "blur"].forEach(function (eventType) {
  const resultsList = document.querySelector("#autoComplete_list");
  document.querySelector("#autoComplete").addEventListener(eventType, function () {
    if (eventType === "blur") {
      $('#selections').removeClass("dim");
      resultsList.style.display = "none";
    } else if (eventType === "focus") {
      $('#selections').addClass("dim");
      resultsList.style.display = "block";
    }
  });
});

function buildSelectionItem() {
  throw new Error('Unimplemented');
}

export { addToLandingCarousel, buildCarouselDiv, buildCarouselCaption }