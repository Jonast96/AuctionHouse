import {
    logOutFunctions,
    redirectIfNotLoggedIn,
    displayCreditScore,
    baseUrl,
    userToken

} from "../utils.mjs";
import {
    populateListingsHtml,
    displayUserData
} from "./profile_utils.mjs";

logOutFunctions()
redirectIfNotLoggedIn(userToken)



const changeAvatar = document.querySelector(".change_avatar")
const changeAvatarInput = document.querySelector(".change_avatar_input")
const localStorageUserName = localStorage.getItem("userName")
const profileUrl = `${baseUrl}/api/v1/auction/profiles/${localStorageUserName}`
const listingsUrl = `${baseUrl}/api/v1/auction/profiles/${localStorageUserName}/listings?_seller=true&_bids=true&sort=endsAt&sortOrder=asc`
const updateUrl = `${baseUrl}/api/v1/auction/profiles/${localStorageUserName}/media`
displayCreditScore(profileUrl)


changeAvatar.addEventListener("click", () => {
    changeAvatarInput.classList.replace("d-none", "d-flex")
})

/**
 * Makes a GET request to the specified profile and listings URLs using the provided user token.
 * Displays the user data and populates the listings HTML with the returned data.
 *
 * @async
 * @param {string} profileUrl - The URL to make the GET request to for the user's profile data.
 * @param {string} listingsUrl - The URL to make the GET request to for the user's listings data.
 * @param {string} userToken - The user's authorization token to include in the request headers.
 *
 */
async function getUser() {
    const postData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userToken}`
        },
    }
    const response = await fetch(profileUrl, postData)
    const json = await response.json()
    const listingsResponse = await fetch(listingsUrl, postData)
    const listingJson = await listingsResponse.json()

    displayUserData(json)
    populateListingsHtml(listingJson)
}
getUser()


/**
 * Makes a PUT request to the specified URL with the updated avatar data, using the provided user token.
 *
 * @async
 * @param {string} url - The URL to make the PUT request to for updating the user's avatar data.
 * @param {string} userToken - The user's authorization token to include in the request headers.
 * @param {object} updatedAvatar - The updated avatar data to include in the request body.
 *
 */
async function putUser(url, updatedAvatar) {
    const postData = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(updatedAvatar)
    }
    const response = await fetch(url, postData)
    const json = await response.json()
}

/**
 * Retrieves the updated avatar input value from the DOM, creates an object with the new avatar data,
 * and makes a PUT request to the specified URL with the updated avatar data.
 *
 * @param {string} updateUrl - The URL to make the PUT request to for updating the user's avatar data.
 *
 */
function updatedAvatarFunction() {
    const updatedAvatarInput = document.querySelector(".updated_avatar_input")
    console.log(updatedAvatarInput.value)
    const newAvatar = { avatar: `${updatedAvatarInput.value}` }

    putUser(updateUrl, newAvatar)
}

const avatarButton = document.querySelector(".avatar_button")
avatarButton.addEventListener("click", () => {
    updatedAvatarFunction()
})







