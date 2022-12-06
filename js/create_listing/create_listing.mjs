import { logOutFunctions, baseUrl, userToken, profileUrl, displayCreditScore } from "../utils.mjs";
import { createPreview } from "./create_listings_utils.mjs"
logOutFunctions()
displayCreditScore(profileUrl)

const titleInput = document.getElementById("title")
const descriptionInput = document.getElementById("description")
const listingEndingInput = document.getElementById("date-picker")
const previewButton = document.querySelector(".preview_button")
const form = document.querySelector(".form_")
const postUrl = baseUrl + "/api/v1/auction/listings"


previewButton.addEventListener("click", () => {
    createPreview()
})

let mediaArray = []

const addMediaBtn = document.querySelector(".add_media_button")
addMediaBtn.addEventListener("click", () => {
    const multipleMediaContainer = document.querySelector(".image_display")
    let multipleMediaValue = document.querySelector("#images")

    mediaArray.push(multipleMediaValue.value)
    multipleMediaContainer.innerHTML += `
    <img
    class="mx-1 mb-2"
    style="width: 50px; height: 50px"
    src="${multipleMediaValue.value}"
    alt=""
  />
    `

    multipleMediaValue.value = ""
    console.log(mediaArray)
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
        console.log(response)

        if (response.ok) {
            alert("Listing successfully created")
        } else {
            console.log("not ok")
        }
    } catch (error) {
        console.log(error)
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    postCall(postUrl)
})






