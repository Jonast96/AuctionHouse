import {
    logOutFunctions,
    baseUrl,
    userToken,
    profileUrl,
    displayCreditScore,
} from "../utils.mjs";

import {
    createPreview,
    populateAndDisplayImageArray,
} from "./create_listings_utils.mjs";

logOutFunctions();
displayCreditScore(profileUrl);

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const listingEndingInput = document.getElementById("date-picker");
const previewButton = document.querySelector(".preview_button");
const form = document.querySelector(".form_");
const postUrl = baseUrl + "/api/v1/auction/listings";
const addMediaBtn = document.querySelector(".add_media_button");
const errorMsg = document.querySelector(".error");

previewButton.addEventListener("click", () => {
    createPreview();
});

export let mediaArray = [];
addMediaBtn.addEventListener("click", () => {
    populateAndDisplayImageArray();
});

/**
 * Makes a POST request to the specified URL with the provided data.
 *
 * @param {string} url - The URL to make the POST request to.
 * @param {Object} [newListing] - The data to include in the request body.
 * @param {string} newListing.title - The title of the listing.
 * @param {string} newListing.description - The description of the listing.
 * @param {Array} newListing.media - The media (e.g. images) associated with the listing.
 * @param {string} newListing.endsAt - The date and time when the listing ends.
 * @param {string} userToken - The user's authorization token.
 *
 * @returns {Promise} Resolves with an alert if the request was successful, or
 *                    rejects with an error message if there was a problem.
 */
async function postCall(url) {
    try {
        const newListing = {
            title: titleInput.value,
            description: descriptionInput.value,
            media: mediaArray,
            endsAt: listingEndingInput.value,
        };

        const postData = {
            method: "post",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(newListing),
        };
        const response = await fetch(url, postData);

        if (response.ok) {
            alert("Listing successfully created");
        } else {
            errorMsg.innerHTML = "There has been a mistake, please try again";
        }
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    postCall(postUrl);
});
