import { logOutFunctions, baseUrl } from "../utils.mjs";
logOutFunctions()

const getUrl = `${baseUrl}/api/v1/auction/listings/?_bids=true`




async function getCall(url) {
  const postData = {
    headers: {
      "Content-Type": "application/json"
    },
  }
  const response = await fetch(url, postData)
  const json = await response.json()
  // console.log(json)


  const event = new Date(json[4].created);
  const options = { hour: 'numeric' };
  const time = event.toLocaleDateString("en-us", options)






  for (let i = 0; i < 10; i++) {
    createHtml(json[i], time)
  }

}

getCall(getUrl)

const container = document.querySelector(".auctions_container")



function createHtml(json, time) {


  const lastItem = json.bids.length - 1
  console.log(lastItem)

  console.log(json.bids[`${lastItem}`].amount)


  container.innerHTML += `          <div
class="row mt-5 bg-light border-bottom shadow-bottom border-secondary rounded container m-auto p-2"
>
<div class="col-12 col-md-4 col-lg-4 col-sm-12">
  <div class="img_all_container">
    <img
      class="img_all rounded"
      src="${json.media[0]}"
      alt=""
    />
  </div>
</div>
<div class="col-sm-12 col-md-8 col-lg-6">
  <h5 class="">Bid closing: ${time}</h5>
  <h3>${json.title}</h3>
  <p>
  ${json.description}
  </p>
</div>
<div class="col-md-12 col-lg-2 col-12 align-content-around d-grid">
  <div>
    <h3 class="text-center">Current price</h3>
  </div>
  <div>
    <h3 class="text-center ">$${json.bids.amount}</h3>
  </div>
  <div class="d-flex justify-content-center">
    <button class="btn btn-info">View auction</button>
  </div>
</div>
</div>`
}