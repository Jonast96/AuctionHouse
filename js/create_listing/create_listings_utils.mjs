export function createPreview() {
    const previewContainer = document.querySelector(".preview_container")
    const listingEndingInput = document.getElementById("date-picker")
    const mediaInput = document.getElementById("main_image")
    const titleInput = document.getElementById("title")
    const descriptionInput = document.getElementById("description")

    const event = new Date(listingEndingInput.value);
    const options = { hour: 'numeric', minute: 'numeric' };
    const time = event.toLocaleDateString("en-us", options)



    previewContainer.innerHTML = `
    <img
    src="${mediaInput.value}"
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