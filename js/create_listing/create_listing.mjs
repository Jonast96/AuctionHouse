import { logOutFunctions, baseUrl, userToken } from "../utils.mjs";
import { createPreview } from "./create_listings_utils.mjs"
logOutFunctions()


const titleInput = document.getElementById("title")
const mediaInput = document.getElementById("main_image")
const descriptionInput = document.getElementById("description")
const listingEndingInput = document.getElementById("date-picker")
const previewButton = document.querySelector(".preview_button")
const form = document.querySelector(".form_")


previewButton.addEventListener("click", () => {
    createPreview()
})


const postUrl = baseUrl + "/api/v1/auction/listings"



async function postCall(url) {
    try {
        const newListing = {
            "title": `${titleInput.value}`,
            "description": `${descriptionInput.value}`,
            "media": [`${mediaInput.value}`],
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
        console.log(json)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    postCall(postUrl)
})






