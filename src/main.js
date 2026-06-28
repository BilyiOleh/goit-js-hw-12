import "./css/styles.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions";

import { getImagesByQuery } from "./js/pixabay-api";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let currentQuery = "";
let currentPage = 1;

const PER_PAGE = 15;
let totalHits = 0;

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  currentQuery = event.target.elements["search-text"].value.trim();

  if (!currentQuery) {
    iziToast.warning({
      message: "Please fill in the search field!",
      position: "topRight",
    });
    return;
  }

  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });

      return;
    }

    createGallery(data.hits);

    if (totalHits > PER_PAGE) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: "topRight",
    });
  } finally {
    hideLoader();
  }

  form.reset();
}

loadMoreBtn.addEventListener("click", loadMoreImages);

async function loadMoreImages() {
  currentPage++;

  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / PER_PAGE);

    if (currentPage >= totalPages) {
      hideLoadMoreButton();

      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }

    const card = document.querySelector(".gallery-item");

    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

  } catch (error) {

    iziToast.error({
      message: error.message,
      position: "topRight",
    });

  } finally {

    hideLoader();

  }
}