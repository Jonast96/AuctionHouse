import {
    storeUserData,
} from "./register_utils.mjs"

import {
    logOutFunctions,
    displayCreditScore,
    profileUrl
} from "../utils.mjs"

displayCreditScore(profileUrl)

logOutFunctions()
const registerForm = document.getElementById("form")

registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    storeUserData()
})