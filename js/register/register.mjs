import {
    storeUserData
} from "./register_utils.mjs"

import {
    logOutFunctions,
} from "../utils.mjs"



logOutFunctions()
const registerForm = document.getElementById("form")

registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    storeUserData()
})