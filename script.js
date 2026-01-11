const overlay = document.getElementById("overlay");
const music = document.getElementById("bgMusic");

overlay.addEventListener("click", () => {
    music.play().then(() => {
        overlay.style.display = "none";
    }).catch(error => {
        console.log("Music play blocked:", error);
    });
});
