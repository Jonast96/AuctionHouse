import { Button } from "bootstrap"

const registerForm = document.getElementById("form")
const name = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const repeatPassword = document.getElementById("repeat_password")
const avatar = document.getElementById("avatar")
const banner = document.getElementById("banner")


const invalidEmail = document.querySelector(".invalid_email")
const invalidRepeatPassword = document.querySelector(".invalid_repeat_password")

const errorMessage = document.querySelector(".response_error")



function passwordIsSameAsRepeatPassword() {
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

function emailIsValid() {
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



registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    storeUserData()
})


const baseURL = 'https://nf-api.onrender.com'
const registerUrl = `${baseURL}/api/v1/auction/auth/register`;

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
            alert("User successfully created!")
        } else {
            errorMessage.innerHTML = `${json.errors[0].message}`
        }
    } catch (error) {
        console.log(error);
    }
}



function storeUserData() {

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
        console.log("something went wrong")
    }
}

