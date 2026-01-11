const tapScreen = document.getElementById("tapScreen");
const content = document.getElementById("content");
const music = document.getElementById("music");
const gallery = document.getElementById("gallery");

const API = "https://our-love-backend.onrender.com";

// TAP TO START
tapScreen.addEventListener("click", function () {
    tapScreen.style.display = "none";
    content.classList.remove("hidden");
    music.play();
    loadPhotos();
});

// LOAD PHOTOS
function loadPhotos() {
    fetch(API + "/photos")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            gallery.innerHTML = "";
            data.forEach(function (img) {
                const image = document.createElement("img");
                image.src = API + img;
                gallery.appendChild(image);
            });
        })
        .catch(function (err) {
            console.error(err);
        });
}

// UPLOAD PHOTO
function uploadPhoto() {
    const input = document.getElementById("photoInput");

    if (!input.files || !input.files[0]) {
        alert("Pilih foto dulu 💗");
        return;
    }

    const formData = new FormData();
    formData.append("photo", input.files[0]);

    fetch(API + "/upload", {
        method: "POST",
        body: formData
    })
        .then(function (res) {
            return res.json();
        })
        .then(function () {
            input.value = "";
            loadPhotos();
        })
        .catch(function (err) {
            console.error(err);
        });
}

