import {
  logOutFunctions,
  baseUrl,
  displayCreditScore,
  profileUrl
} from "../utils.mjs";

import {
  createHtml
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
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const time = event.toLocaleDateString("en-us", options)
    createHtml(json[i], time)
  }
}

getCall(getUrl)



const container = document.querySelector(".expiring_container")


async function expiringListingCall(url) {
  const postData = {
    headers: {
      "Content-Type": "application/json"
    },
  }
  const response = await fetch(url, postData)
  const json = await response.json()
  console.log(json)


  let highestBid = ""
  for (let i = 0; i < 4; i++) {

    if (json[i].bids.length >= 1) {
      highestBid = json[i].bids.pop().amount
    } else {
      highestBid = "0"
    }




    container.innerHTML += `
  <div class="col">
  <div class="card m-3 deals_card m-auto shadow-lg m-auto">
    <img
      src="${FilteredArrayGoesHere}"
      class="card-img-top"
      alt="${json.title}"
    />

    <ul class="list-group list-group-flush">
      <li class="list-group-item">${json.title}</li>
      <li class="list-group-item">${highestBid}</li>
    </ul>
    <div class="card-body">
      <p class="text-center h4">Expires in: 00:00:42</p>
      <div class="d-grid">
        <button class="btn btn-info">Join auction</button>
      </div>
    </div>
  </div>
</div>
  `
  }

}

expiringListingCall(expiringListing)