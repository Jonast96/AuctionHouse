const loggedIn = document.querySelector(".logged_in")
const notLoggedIn = document.querySelector(".not_logged_in")
const logOutDesktop = document.querySelector(".log_out_desktop")
const logOutMobile = document.querySelector(".log_out_mobile")


export const baseUrl = "https://nf-api.onrender.com"
export const userToken = localStorage.getItem("userToken")

const localStorageUserName = localStorage.getItem("userName")
export const profileUrl = `${baseUrl}/api/v1/auction/profiles/${localStorageUserName}?_listings=true`




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


export function redirectIfNotLoggedIn(token) {
    if (!token) {
        window.location.href = "index.html"
    }
}



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

