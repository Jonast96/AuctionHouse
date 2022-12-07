import { mediaArray } from "./create_listing.mjs"

export function createPreview() {
    const previewContainer = document.querySelector(".preview_container")
    const listingEndingInput = document.getElementById("date-picker")
    const mediaInput = document.querySelector("#images")
    const titleInput = document.getElementById("title")
    const descriptionInput = document.getElementById("description")

    const event = new Date(listingEndingInput.value);
    const options = { hour: 'numeric', minute: 'numeric' };
    const time = event.toLocaleDateString("en-us", options)

    console.log(mediaInput)

    previewContainer.innerHTML = `
    <img
    src="${mediaArray[0]}"
    class="img-fluid rounded"
    alt=""
    />
    <div class="mt-2 d-flex justify-content-between">
    <h3>${titleInput.value}</h3>
    <p>${time}</p>
    </div>
    <div>
    <p>
    ${descriptionInput.value}
    </p>
    </div>
`
}


export function populateAndDisplayImageArray() {

    const multipleMediaContainer = document.querySelector(".image_display")
    let multipleMediaValue = document.querySelector("#images")

    mediaArray.push(multipleMediaValue.value)
    multipleMediaContainer.innerHTML += `
    <img
    class="mx-1 mb-2 rounded shadow"
    style="width: 75px; height: 75px"
    src="${multipleMediaValue.value}"
    alt=""
  />
    `

    multipleMediaValue.value = ""
    console.log(mediaArray)
}
