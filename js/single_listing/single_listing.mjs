import { logOutFunctions, baseUrl, userToken, displayCreditScore, profileUrl } from "../utils.mjs";
import { createHtml } from "./single_listing_utils.mjs"
logOutFunctions()
displayCreditScore(profileUrl)

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const getListingUrl = `${baseUrl}/api/v1/auction/listings/${id}?_seller=true&_bids=true`


async function displayListing(url) {
  const response = await fetch(url)
  const json = await response.json()
  console.log(json)
  createHtml(json)
  const bidBtn = document.querySelector(".bid_btn")
  bidBtn.addEventListener("click", () => {
    postBid(bidUrl)
  })
}

displayListing(getListingUrl)



const bidUrl = `${baseUrl}/api/v1/auction/listings/${id}/bids`

async function postBid(url) {
  const bidInput = document.querySelector(".input_value")
  const bidValue = {
    amount: +bidInput.value
  }
  const postData = {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${userToken}`
    },
    body: JSON.stringify(bidValue)
  };
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