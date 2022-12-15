import { sendUserDataToLocalStorage } from "./login_utils.mjs"
import {
    baseUrl,
    logOutFunctions,
    displayCreditScore,
    profileUrl,
    displayUserImage

} from "../utils.mjs"
displayCreditScore(profileUrl)
logOutFunctions()
displayUserImage()
const emailInput = document.querySelector(".email_input")
const passwordInput = document.querySelector(".password_input")
const loginForm = document.querySelector(".login_form")
const errorMessage = document.querySelector(".error_message")
const loginUrl = `${baseUrl}/api/v1/auction/auth/login`

/**
 * Handles the login form submission.
 *
 * @returns {Promise} Resolves with the user data if the login was successful,
 *                    or rejects with an error if there was a problem.
 */
loginForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault()
        const userToLogin = {
            email: `${emailInput.value}`,
            password: `${passwordInput.value}`
        }

        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToLogin)
        }
        const response = await fetch(loginUrl, postData)
        const json = await response.json()
        sendUserDataToLocalStorage(json)
        if (response.ok === true) {
            window.location = "profile.html"
            errorMessage.classList.add("d-none")
        } else {
            errorMessage.classList.remove("d-none")
            errorMessage.innerHTML = `${json.errors[0].message}`
        }
    } catch (error) {
        console.log(error)
    }
})


