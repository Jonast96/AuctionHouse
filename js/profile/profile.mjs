import {
    logOutFunctions,
    redirectIfNotLoggedIn,
    displayCreditScore,
    baseUrl

} from "../utils.mjs"



logOutFunctions()

const userName = document.querySelector(".username")
const credits = document.querySelector(".current_credits")
const auctions = document.querySelector(".current_auctions")
const changeAvatar = document.querySelector(".change_avatar")
const changeAvatarInput = document.querySelector(".change_avatar_input")
const userImage = document.querySelector(".img_container_profile")


changeAvatar.addEventListener("click", () => {

    changeAvatarInput.classList.replace("d-none", "d-flex")
})


const userToken = localStorage.getItem("userToken")
const localStorageUserName = localStorage.getItem("userName")
const profileUrl = `${baseUrl}/api/v1/auction/profiles/${localStorageUserName}?_listings=true`
const updateUrl = `${baseUrl}/api/v1/auction/profiles/${localStorageUserName}/media
`

redirectIfNotLoggedIn(userToken)


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
    console.log(json)

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
    console.log(json)
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


displayCreditScore(profileUrl)