import { logOutFunctions, baseUrl } from "../utils.mjs";
logOutFunctions()


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const getListingUrl = `${baseUrl}/api/v1/auction/listings/${id}?_seller=true&_bids=true`


async function displayListing(url) {



    const response = await fetch(url)
    const json = await response.json()
    console.log(json)
}

displayListing(getListingUrl)
