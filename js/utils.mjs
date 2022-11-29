const loggedIn = document.querySelector(".logged_in")
const notLoggedIn = document.querySelector(".not_logged_in")
const userToken = localStorage.getItem("userToken")

console.log(userToken)

if (userToken) {
    loggedIn.classList.remove("d-none")
    notLoggedIn.classList.add("d-none")
}