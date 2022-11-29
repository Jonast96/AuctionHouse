const loggedIn = document.querySelector(".logged_in")
const notLoggedIn = document.querySelector(".not_logged_in")
const logOutDesktop = document.querySelector(".log_out_desktop")
const logOutMobile = document.querySelector(".log_out_mobile")


export const baseUrl = "https://nf-api.onrender.com"
export const userToken = localStorage.getItem("userToken")




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