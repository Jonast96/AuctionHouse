/**
 * Saves the provided user data to local storage.
 *
 * @param {Object} x - The user data to save.
 * @param {string} x.accessToken - The user's access token.
 * @param {string} x.name - The user's name.
 * @param {string} x.email - The user's email address.
 *
 */
export function sendUserDataToLocalStorage(x) {
    const userToken = x.accessToken;
    const userName = x.name;
    const userEmail = x.email

    localStorage.setItem('userToken', userToken)
    localStorage.setItem('userName', userName)
    localStorage.setItem('userEmail', userEmail)
}