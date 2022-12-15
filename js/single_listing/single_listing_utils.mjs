import {
  userToken,
  displayUserImage
} from "../utils.mjs"
displayUserImage()

/**
 * Generates the HTML for a single listing, using the provided listing data.
 *
 * @param {object} json - The listing data to use to generate the HTML.
 *
 */
export function createHtml(json) {
  const container = document.querySelector(".single_listing_container");

  // Find the highest bid
  let highestBid = "0";
  if (json.bids.length >= 1) {
    for (let i = 0; i < json.bids.length; i++) {
      highestBid = json.bids[i].amount
    }
  } else {
    highestBid = "0"
  }

  // Format the created and expires timestamps
  const createdTime = new Date(json.created);
  const options = { hour: "numeric", minute: "numeric" };
  const created = createdTime.toLocaleDateString("en-us", options);
  const expireTime = new Date(json.endsAt);
  const expires = expireTime.toLocaleDateString("en-us", options);

  // Calculate the countdown time
  const currentDate = new Date();
  const diff = expireTime - currentDate;
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  let countdown = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Create the media array
  let mediaArray = "";
  for (let i = 0; i < json.media.length; i++) {
    mediaArray += `
      <div class="carousel-item${!i ? " active" : ""}">
      <img src="${json.media[i]}" class="d-block w-100" alt="...">
      </div>
      `;
  }

  // Generate the final HTML
  container.innerHTML = `
      <div class="row mb-md-3">
            <div class="col-6">
              <h3>${json.title}</h3>
              <p>${created}</p>
            </div>
            <div class="col-6 justify-content-end d-flex">
            <div class="dropdown">
            <button class="btn btn-info dropdown-toggle d-none edit_button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Edit post
            </button>
            <ul class="dropdown-menu">
              <li><button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Edit
            </button></li>
              <li><button class="dropdown-item delete_button" href="#">Delete</button></li>
            </ul>
          </div>
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
            <ul class="list-group mb-3 mb-md-0">
              <li class="list-group-item mb-md-2">Seller: ${json.seller.name}</li>
              <li class="list-group-item mb-md-2">Email: ${json.seller.email}</li>
              <li class="list-group-item mb-md-2">Bids: ${json.bids.length}</li>
              <li class="list-group-item mb-md-2">Created: ${created}</li>
              <li class="list-group-item mb-md-2">Ends at: ${expires}</li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col-md-7 col-12 mb-3 mb-md-0">
            <p>
            ${json.description}
            </p>
          </div>
          <div class="col-md-5 col-12 bg-light rounded py-3">
            <ul class="d-flex list-unstyled justify-content-between">
              <li class="">Current bid: $${highestBid}</li>
              <li class="">Ends in: ${countdown}</li>
            </ul>
            <div class="col-12 col-md-7 mx-auto">
              <div class="input-group mb-3 d-none add_bid">
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

              <div class="d-flex justify-content-center sign_in_to_bid">
                  <a href="login.html" class="btn btn-info bid_btn" type="button">
                  Sign in to place a bid
                  </a>
              </div>
              <p class="text-center error_msg text-danger"></p>
            </div>
          </div>
        </div>
    `

}

// Check if the user has a valid token
function isUserLoggedIn() {
  return userToken ? true : false;
}


/**
 * Shows the add bid container if the user is logged in, and hides it if the user is not logged in.
 * Also shows the sign in button if the user is not logged in, and hides it if the user is logged in.
 *
 */
export function onlyLoggedInUserCanBid() {
  // Select the sign in button and add bid container
  const signInButton = document.querySelector(".sign_in_to_bid");
  const addBidContainer = document.querySelector(".add_bid");

  // If the user is logged in, show the add bid container and hide the sign in button
  if (isUserLoggedIn()) {
    addBidContainer.classList.replace("d-none", "d-flex");
    signInButton.classList.add("d-none");
    // If the user is not logged in, hide the add bid container and show the sign in button
  } else {
    addBidContainer.classList.replace("d-flex", "d-none");
    signInButton.classList.add("d-block");
  }
}



/**
*
Function that displays an edit button on a listing if the currently logged in user is the owner of the listing.
@param {Object} json - The JSON object representing the listing.
@param {string} json.seller.email - The email of the seller of the listing.
*/
export function displayEditButton(json) {
  const editButton = document.querySelector(".edit_button")
  const loggedInEmail = localStorage.getItem("userEmail")
  const listingOwner = json.seller.email

  if (loggedInEmail === listingOwner) {
    editButton.classList.replace("d-none", "d-flex")
  }
}

/**
 * Updates a listing on the server using the specified URL.
 *
 * @param {string} url - The URL to use for updating the listing.
 *
 * @return {Promise} - A promise that resolves when the listing has been successfully updated, or rejects
 * if there is an error.
 */
export async function updateListing(url) {
  const titleValue = document.querySelector("#title").value
  const descriptionValue = document.querySelector("#description").value
  const updatedListing = {
    "title": titleValue,
    "description": descriptionValue,
    "media": mediaArray
  }
  const postData = {
    method: "put",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(updatedListing),
  }
  const response = await fetch(url, postData)
  const json = await response.json()
  if (response.ok === true) {
    window.location.reload()
  } else {
    console.log(error)
  }

  console.log(response)
  console.log(json)
}