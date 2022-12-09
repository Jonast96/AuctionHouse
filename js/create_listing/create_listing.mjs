import {
    logOutFunctions,
    baseUrl,
    userToken,
    profileUrl,
    displayCreditScore
} from "../utils.mjs";

import {
    createPreview,
    populateAndDisplayImageArray
} from "./create_listings_utils.mjs"

logOutFunctions()
displayCreditScore(profileUrl)


const titleInput = document.getElementById("title")
const descriptionInput = document.getElementById("description")
const listingEndingInput = document.getElementById("date-picker")
const previewButton = document.querySelector(".preview_button")
const form = document.querySelector(".form_")
const postUrl = baseUrl + "/api/v1/auction/listings"
const addMediaBtn = document.querySelector(".add_media_button")
const errorMsg = document.querySelector(".error")





previewButton.addEventListener("click", () => {
    createPreview()
})

export let mediaArray = []

addMediaBtn.addEventListener("click", () => {
    populateAndDisplayImageArray()

})


async function postCall(url) {
    try {
        const newListing = {
            "title": `${titleInput.value}`,
            "description": `${descriptionInput.value}`,
            "media": mediaArray,
            "endsAt": `${listingEndingInput.value}`
        }


        console.log(newListing)
        const postData = {
            method: "post",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify(newListing)
        }
        const response = await fetch(url, postData);
        const json = await response.json();

        if (response.ok) {
            alert("Listing successfully created")
        } else {
            errorMsg.innerHTML = "There has been a mistake, please try again"
        }
    } catch (error) {
        console.log(error)
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    postCall(postUrl)
})






