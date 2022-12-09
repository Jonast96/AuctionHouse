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







