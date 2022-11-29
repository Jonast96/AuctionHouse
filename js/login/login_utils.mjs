export function sendUserDataToLocalStorage(x) {
    const userToken = x.accessToken;
    const userName = x.name;
    const userEmail = x.email

    localStorage.setItem('userToken', userToken)
    localStorage.setItem('userName', userName)
    localStorage.setItem('userEmail', userEmail)
}