import { logOutFunctions, baseUrl, displayCreditScore, profileUrl } from "../utils.mjs";
import { createHtml } from "./index_utils.mjs"
displayCreditScore(profileUrl)
logOutFunctions()
const getUrl = `${baseUrl}/api/v1/auction/listings/?_bids=true&sort=updated&sortOrder=asc`




async function getCall(url) {
  const postData = {
    headers: {
      "Content-Type": "application/json"
    },
  }
  const response = await fetch(url, postData)
  const json = await response.json()
  console.log(json)

  for (let i = 0; i < json.length; i++) {

    const event = new Date(json[i].endsAt);
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const time = event.toLocaleDateString("en-us", options)
    createHtml(json[i], time)
  }

}

getCall(getUrl)




