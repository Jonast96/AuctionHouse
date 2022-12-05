export function createHtml(json, time) {
  const container = document.querySelector(".auctions_container")



  let highestBid = ""

  if (json.bids.length >= 1) {
    highestBid = json.bids.pop().amount
  } else {
    highestBid = "0"
  }



  if (json.media[0]) {

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
          <h3 class="text-center ">$${highestBid}</h3>
        </div>
        <div class="d-flex justify-content-center">
          <a href="single_listing.html?id=${json.id}" class="btn btn-info">View auction</a>
        </div>
      </div>
      </div>`

  } else {
    container.innerHTML += ""
  }

}