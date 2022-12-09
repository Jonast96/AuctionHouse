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








export function createExpiringHtml(array) {
  const container = document.querySelector(".expiring_container")

  let highestBid = ""
  for (let i = 0; i < 4; i++) {

    if (array[i].bids.length >= 1) {
      highestBid = array[i].bids.pop().amount
    } else {
      highestBid = "0"
    }

    const targetDate = new Date(array[i].endsAt);

    const currentDate = new Date();
    const diff = targetDate - currentDate;

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    let test = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

    container.innerHTML += `
  <div class="col">
  <div class="card m-3 deals_card m-auto shadow-lg m-auto">
    <img
      src="${array[i].media[0]}"
      class="card-img-top expiring_img"
      alt="${array[i].title}"
    />

    <ul class="list-group list-group-flush">
      <li class="list-group-item">${array[i].title}</li>
      <li class="list-group-item">Current bid: ${highestBid}</li>
    </ul>
    <div class="card-body">
      <p class="text-center expires_container h4">Expires in:${test}</p>
      <div class="d-grid">
        <a href="single_listing.html?id=${array[i].id}" class="btn btn-info">Join auction</a>
      </div>
    </div>
  </div>
</div>
  `
  }
}