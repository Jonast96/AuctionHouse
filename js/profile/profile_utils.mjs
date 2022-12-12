const container = document.querySelector(".listings_container")


/**
 * Populates the HTML container with the provided auction listings data.
 *
 * @param {Array} array - The array of auction listings data to use.
 *
 */
export function populateListingsHtml(array) {
  for (let i = 0; i < array.length; i++) {
    const targetDate = new Date(array[i].endsAt);
    const currentDate = new Date();
    const diff = targetDate - currentDate;

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    let countdown = "";

    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      countdown = "This listing is expired";
    } else {
      countdown = `Expires in: ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    if (array[i].media.length !== 0) {
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
              <li class="list-group-item">Current bid: </li>
            </ul>
            <div class="card-body">
              <p class="text-center expires_container h4">${countdown}</p>
              <div class="d-grid">
                <a href="single_listing.html?id=${array[i].id}" class="btn btn-info">View</a>
              </div>
            </div>
          </div>
        </div>
            `
    } else {
      container.innerHTML += `
            <div class="col">
      <div class="card m-3 deals_card m-auto shadow-lg m-auto">
        <img
          src="https://lesemester.no/wp-content/uploads/2019/01/no-image.jpg"
          class="card-img-top expiring_img"
          alt="${array[i].title}"
        />
    
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${array[i].title}</li>
          <li class="list-group-item">Current bid: </li>
        </ul>
        <div class="card-body">
          <p class="text-center expires_container h4">${countdown}</p>
          <div class="d-grid">
            <a href="single_listing.html?id=${array[i].id}" class="btn btn-info">Join auction</a>
          </div>
        </div>
      </div>
    </div>
    `

    }
  }
}

/**
 * Displays the provided user data on the page.
 *
 * @param {Object} json - The user data to display.
 * @param {string} json.name - The user's name.
 * @param {number} json.credits - The user's current credits.
 * @param {Object} json._count - The user's count of auctions and listings.
 * @param {number} json._count.listings - The number of listings owned by the user.
 * @param {string} json.avatar - The URL of the user's avatar image.
 *
 */
export function displayUserData(json) {
  const userName = document.querySelector(".username")
  const credits = document.querySelector(".current_credits")
  const auctions = document.querySelector(".current_auctions")
  const userImage = document.querySelector(".img_container_profile")
  userName.innerHTML = `Hello ${json.name}!`
  credits.innerHTML = `${json.credits}`
  auctions.innerHTML = `${json._count.listings}`
  userImage.innerHTML = `
    <img
    class="img-fluid rounded-circle"
    style="width:200px;height:200px;object-fit:cover;"
    src="${json.avatar}"
    alt=""
  />
    `
}