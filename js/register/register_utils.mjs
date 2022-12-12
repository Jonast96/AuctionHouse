const invalidEmail = document.querySelector(".invalid_email")
const invalidRepeatPassword = document.querySelector(".invalid_repeat_password")
const repeatPassword = document.getElementById("repeat_password")

const baseURL = 'https://nf-api.onrender.com'
const registerUrl = `${baseURL}/api/v1/auction/auth/register`;

const name = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const avatar = document.getElementById("avatar")
const banner = document.getElementById("banner")

const successBorder = document.querySelector(".card")
const loginButton = document.querySelector(".login_button")
const loginSuccessText = document.querySelector(".login_succes_text")




const errorMessage = document.querySelector(".response_error")

/**
 * Checks if the password and repeat password inputs are the same.
 * If they are the same, it removes any error styling and messages.
 * If they are not the same, it adds success styling and shows an success message.
 *
 * @returns {boolean} - Whether the password and repeat password inputs are the same.
 */
export function passwordIsSameAsRepeatPassword() {
    if (password.value === repeatPassword.value) {
        repeatPassword.classList.remove("border-danger")
        repeatPassword.classList.remove("border")
        invalidRepeatPassword.classList.replace("d-block", "d-none")
        return true
    } else {
        repeatPassword.classList.add("border-danger")
        repeatPassword.classList.add("border")
        invalidRepeatPassword.classList.replace("d-none", "d-block")
        return false
    }
}


/**
 * Checks if the email input is a valid "noroff.no" email address.
 * If it is a valid email, it removes any error styling and messages.
 * If it is not a valid email, it adds error styling and shows an error message.
 *
 * @returns {boolean} - Whether the email input is a valid "noroff.no" email address.
 */
export function emailIsValid() {
    if (email.value.includes("noroff.no")) {
        email.classList.remove("border-danger")
        email.classList.remove("border")
        invalidEmail.classList.replace("d-block", "d-none")

        return true
    } else {
        email.classList.add("border-danger")
        email.classList.add("border")
        invalidEmail.classList.replace("d-none", "d-block")
        return false
    }
}


/**
 * Makes a POST request to the specified URL with the provided user data.
 * If the request is successful, it adds success styling and shows a success message.
 * If the request is not successful, it shows an error message.
 *
 * @async
 * @param {string} url - The URL to make the POST request to for registering the user.
 * @param {object} userData - The user data to include in the request body.
 *
 */
async function registerUser(url, userData) {
    try {
        const postData = {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        };
        const response = await fetch(url, postData);
        const json = await response.json();

        if (response.ok === true) {
            successBorder.classList.add("border")
            successBorder.classList.add("border-success")
            loginButton.classList.replace("d-none", "d-block")
            loginSuccessText.classList.replace("d-none", "d-block")
            errorMessage.innerHTML = ``

            console.log(response)

        } else {
            errorMessage.innerHTML = `${json.errors[0].message}`
            console.log(response)
            loginSuccessText.classList.replace("d-block", "d-none")

        }
    } catch (error) {
        console.log(error);
    }
}


/**
 * Retrieves the user data from the input fields, checks if the password and email inputs are valid,
 * and if they are, makes a POST request to register the user.
 *
 */
export function storeUserData() {

    const userToRegister = {
        name: `${name.value.toLowerCase()}`,
        email: `${email.value.toLowerCase()}`,
        password: `${password.value}`,
        avatar: `${avatar.value}`,
        banner: `${banner.value}`
    }

    if (passwordIsSameAsRepeatPassword() && emailIsValid()) {
        registerUser(registerUrl, userToRegister)
    } else {
    }
}