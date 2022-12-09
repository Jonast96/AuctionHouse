import {
  logOutFunctions,
  baseUrl,
  displayCreditScore,
  profileUrl
} from "../utils.mjs";

import {
  createHtml,
  createExpiringHtml
} from "./index_utils.mjs"
displayCreditScore(profileUrl)
logOutFunctions()
const getUrl = `${baseUrl}/api/v1/auction/listings/?_seller=true&_bids=true&_active=true&sort=created&sortOrder=desc`
const expiringListing = `${baseUrl}/api/v1/auction/listings/?_seller=true&_bids=true&_active=true&sort=endsAt&sortOrder=asc`




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
}

getCall(getUrl)





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




