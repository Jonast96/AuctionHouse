import {
  logOutFunctions,
  baseUrl,
  userToken,
  displayCreditScore,
  profileUrl
} from "../utils.mjs";
import {
  createHtml,
  onlyLoggedInUserCanBid
} from "./single_listing_utils.mjs";

logOutFunctions()
displayCreditScore(profileUrl)


// Get the "id" parameter from the query string
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// Construct the URL's for the api calls
const getListingUrl = `${baseUrl}/api/v1/auction/listings/${id}?_seller=true&_bids=true`
const bidUrl = `${baseUrl}/api/v1/auction/listings/${id}/bids`


/**
 * Display a listing and allow a logged-in user to bid on it.
 *
 * @param {string} url - The URL from which to fetch the listing data.
 * @returns {Promise} - A promise that resolves when the listing is displayed and the bid button is added.
 */
async function displayListing(url) {
  const response = await fetch(url)
  const json = await response.json()
  createHtml(json)
  const bidBtn = document.querySelector(".bid_btn")
  bidBtn.addEventListener("click", () => {
    postBid(bidUrl)
  })
  onlyLoggedInUserCanBid()
}
displayListing(getListingUrl)


/**
 * Place a bid on a listing.
 *
 * @param {string} url - The URL to which the bid will be posted.
 * @returns {Promise} - A promise that resolves when the bid is posted and the response is processed.
 */
async function postBid(url) {
  const bidInput = document.querySelector(".input_value")
  const bidValue = { amount: +bidInput.value }
  const postData = {
    method: "post",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(bidValue),
  }
  const response = await fetch(url, postData)
  const json = await response.json()
  console.log(json)
  const errorMsg = document.querySelector(".error_msg")

  if (response.ok) {
    errorMsg.innerHTML = `Your bid of: ${bidInput.value} has successfully been placed`
    errorMsg.classList.add("text-success")
    errorMsg.classList.remove("text-danger")
  } else {
    errorMsg.innerHTML = `${json.errors[0].message}`
    errorMsg.classList.remove("text-success")
    errorMsg.classList.add("text-danger")
  }
}