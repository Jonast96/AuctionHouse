import {
    storeUserData,
    displayUserImage
} from "./register_utils.mjs"

import {
    logOutFunctions,
    displayCreditScore,
    profileUrl
} from "../utils.mjs"

displayUserImage()
displayCreditScore(profileUrl)

logOutFunctions()
const registerForm = document.getElementById("form")

registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    storeUserData()
})