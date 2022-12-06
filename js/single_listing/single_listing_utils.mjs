export function createHtml(json) {
  const container = document.querySelector(".single_listing_container")

  let highestBid = ""

  if (json.bids.length >= 1) {
    highestBid = json.bids.pop().amount
  } else {
    highestBid = "0"
  }
  const createdTime = new Date(json.created);
  const options = { hour: 'numeric', minute: 'numeric' };
  const created = createdTime.toLocaleDateString("en-us", options)

  const expireTime = new Date(json.endsAt)
  const expires = expireTime.toLocaleDateString("en-us", options)


  let mediaArray = ""
  for (let i = 0; i < json.media.length; i++) {
    mediaArray += `
    <div class="carousel-item${!i ? " active" : ""}">
    <img src="${json.media[i]}" class="d-block w-100" alt="...">
    </div>
    `
  }

  container.innerHTML = `
    <div class="row mb-md-3">
          <div>
            <h3>${json.title}</h3>
            <p>${created}</p>
          </div>
          <div class="col-12 col-md-7">
          <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
          <div class="carousel-inner">


          ${mediaArray}


          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
          </div>
          <div class="col-12 col-md-5">
            <ul class="list-group">
              <li class="list-group-item mb-2">Seller: ${json.seller.name}</li>
              <li class="list-group-item mb-2">Email: ${json.seller.email}</li>
              <li class="list-group-item mb-2">Bids: ${json.bids.length}</li>
              <li class="list-group-item mb-2">Created: ${created}</li>
              <li class="list-group-item mb-2">Ends at: ${expires}</li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col-md-7 col-12">
            <p>
            ${json.description}
            </p>
          </div>
          <div class="col-md-5 col-12 bg-light rounded py-3">
            <ul class="d-flex list-unstyled justify-content-between">
              <li class="">Current bid: ${highestBid}</li>
              <li class="">Countdown: add this</li>
            </ul>
            <div class="col-12 col-md-7 mx-auto">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control input_value"
                  placeholder="Place bid here"
                  aria-label="Place bid here"
                />
                <button class="btn btn-outline-info bid_btn" type="button">
                  Place bid
                </button>
              </div>
              <p class="text-center error_msg text-danger"></p>
            </div>
          </div>
        </div>
    `

}