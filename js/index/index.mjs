import {
  logOutFunctions,
  baseUrl,
  displayCreditScore,
  profileUrl,
  displayUserImage
} from "../utils.mjs";

import {
  createHtml,
  createExpiringHtml
} from "./index_utils.mjs";

displayUserImage()
displayCreditScore(profileUrl)
logOutFunctions()
const getUrl = `${baseUrl}/api/v1/auction/listings/?_seller=true&_bids=true&_active=true&sort=created&sortOrder=desc`
const expiringListing = `${baseUrl}/api/v1/auction/listings/?_seller=true&_bids=true&_active=true&sort=endsAt&sortOrder=asc`



/**
 * Makes a GET request to the specified URL and creates HTML code for the
 * auction listings based on the response data.
 *
 * @async
 * @param {string} url - The URL to make the GET request to.
 *
 * @returns {Promise} Resolves with the HTML code for the auction listings,
 *                    or rejects with an error if there was a problem.
 */
async function getCall(url) {
  const postData = {
    headers: {
      "Content-Type": "application/json"
    },
  }
  const response = await fetch(url, postData)
  const json = await response.json()

  for (let i = 0; i < json.length; i++) {
    const event = new Date(json[i].endsAt);
    const options = { hour: 'numeric', minute: 'numeric' };
    const time = event.toLocaleDateString("en-us", options)
    createHtml(json[i], time)

  }
  searchListings(json)
}

getCall(getUrl)

/**
 * Makes a GET request to the specified URL and creates HTML code for the
 * expiring auctions based on the response data.
 *
 * @async
 * @param {string} url - The URL to make the GET request to.
 *
 * @returns {Promise} Resolves with the HTML code for the expiring auctions,
 *                    or rejects with an error if there was a problem.
 */
async function expiringListingCall(url) {
  const postData = {
    headers: {
      "Content-Type": "application/json"
    },
  }
  const response = await fetch(url, postData)
  const json = await response.json()
  const listingsWithImages = json.filter(listing => listing.media.length > 0);
  createExpiringHtml(listingsWithImages)
}
expiringListingCall(expiringListing)



function searchListings(json) {
  const search = document.querySelector(".search_input");

  search.onkeyup = function (event) {

    const searchValue = event.target.value.trim().toLowerCase();

    const filteredListings = json.filter(function (listing) {
      if (listing.title.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });

    createFilteredHtml(filteredListings);
  };
}

function createFilteredHtml(listings) {
  const container = document.querySelector(".auctions_container");
  container.innerHTML = "";

  listings.forEach(function (json) {
    const event = new Date(json.endsAt);
    const options = { hour: 'numeric', minute: 'numeric' };
    const time = event.toLocaleDateString("en-us", options)
    createHtml(json, time)
  });
}

