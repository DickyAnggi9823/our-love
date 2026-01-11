const images = document.querySelectorAll(".gallery img");

images.forEach(img => {
    img.addEventListener("click", () => {
        const popup = document.createElement("div");
        popup.className = "popup";

        popup.innerHTML = `
            <span class="close">&times;</span>
            <img src="${img.src}">
        `;

        document.body.appendChild(popup);

        popup.addEventListener("click", (e) => {
            if (e.target.classList.contains("popup") || 
                e.target.classList.contains("close")) {
                popup.remove();
            }
        });
    });
});