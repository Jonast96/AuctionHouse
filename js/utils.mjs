const loggedIn = document.querySelector(".logged_in")
const notLoggedIn = document.querySelector(".not_logged_in")
const logOutDesktop = document.querySelector(".log_out_desktop")
const logOutMobile = document.querySelector(".log_out_mobile")


export const baseUrl = "https://nf-api.onrender.com"
export const userToken = localStorage.getItem("userToken")

const localStorageUserName = localStorage.getItem("userName")
export const profileUrl = `${baseUrl}/api/v1/auction/profiles/${localStorageUserName}?_listings=true`



/**
 * If the user is logged in, shows the logged in elements and hides the not logged in elements.
 * If the user clicks the log out button (on desktop or mobile), it clears the local storage and reloads the page.
 *
 */
export function logOutFunctions() {

    if (userToken) {
        loggedIn.classList.remove("d-none")
        notLoggedIn.classList.add("d-none")
    }


    logOutDesktop.addEventListener("click", () => {
        localStorage.clear()
        location.reload()
    })
    logOutMobile.addEventListener("click", () => {
        localStorage.clear()
        location.reload()

    })
}

/**
 * If the provided token is not truthy, redirects the user to the index page.
 *
 * @param {string} token - The token to check.
 *
 */
export function redirectIfNotLoggedIn(token) {
    if (!token) {
        window.location.href = "index.html"
    }
}


/**
 * Makes a GET request to the specified URL and retrieves the user's credit score data.
 * Then it updates the credit score elements on the page with the user's credit score.
 *
 * @async
 * @param {string} url - The URL to make the GET request to for getting the user's credit score data.
 *
 */
export async function displayCreditScore(url) {
    const postData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userToken}`
        },
    }
    const response = await fetch(url, postData)
    const json = await response.json()
    console.log(json)
    const creditScore = document.querySelectorAll(".credits")
    for (let i = 0; i < creditScore.length; i++) {
        creditScore[i].innerHTML = `Credits: ${json.credits}`

    }
}


/**
 * If user has image in localStorage, display it on the navbar
 */
export function displayUserImage() {
    const imageContainer = document.querySelector(".profile_img_div")
    const localStorageAvatar = localStorage.getItem("userAvatar")
    if (localStorageAvatar) {
        imageContainer.innerHTML = `
        <img
        src="${localStorageAvatar}"
        class="rounded-circle img-fluid"
        alt=""
        style="width: 40px;height:40px;object-fit:cover;"
      />
        `
    }
}
