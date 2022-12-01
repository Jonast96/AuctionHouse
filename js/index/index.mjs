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
    console.log(json[0])


    const bidClosingTime = json[5].endsAt
    console.log(bidClosingTime)


    const event = new Date(json[4].created);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' };

    const time = event.toLocaleDateString("en-us", options)
    console.log(time)

    for (let i = 0; i < 1; i++) {
        createHtml(json[i])
    }

}

getCall(getUrl)

const container = document.querySelector(".auctions_container")



function createHtml(json) {


    container.innerHTML += `          <div
class="row mt-5 border border-2 shadow-lg border-secondary rounded container m-auto p-2"
>
<div class="col-12 col-md-4 col-lg-4 col-sm-12">
  <div class="img_all_container">
    <img
      class="img_all rounded"
      src="/images/hasbuuuuuuuuuulla.jpg"
      alt=""
    />
  </div>
</div>
<div class="col-sm-12 col-md-8 col-lg-6">
  <h4 class="font-monospace">Bid closing in: 01:42:12</h4>
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
    <h3 class="text-center font-monospace">$${json.bids.pop().amount}</h3>
  </div>
  <div class="d-flex justify-content-center">
    <button class="btn btn-info">View auction</button>
  </div>
</div>
</div>`
}