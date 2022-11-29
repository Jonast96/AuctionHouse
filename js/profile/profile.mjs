
const userName = document.querySelector(".username")
const credits = document.querySelector(".current_credits")
const auctions = document.querySelector(".current_auctions")

const userToken = localStorage.getItem("userToken")
const localStorageUserName = localStorage.getItem("userName")
const baseUrl = "https://nf-api.onrender.com"
const profileUrl = `${baseUrl}/api/v1/auction/profiles/${localStorageUserName}?_listings=true`


async function getUser() {
    const postData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userToken}`
        },
    }
    const response = await fetch(profileUrl, postData)
    const json = await response.json()
    console.log(json)

    userName.innerHTML = `Hello ${json.name}!`
    credits.innerHTML = `${json.credits}`
    auctions.innerHTML = `${json._count.listings}`


}

getUser()

