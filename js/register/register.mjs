import {
    storeUserData
} from "./register_utils.mjs"

const registerForm = document.getElementById("form")

registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    storeUserData()
})










