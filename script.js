let lang = "bn";
let currentFilter = "All";

function renderProducts() {
  const productsEl = document.getElementById("products");

  const filteredProducts =
    currentFilter === "All"
      ? products
      : products.filter(p => p.cat === currentFilter);

  productsEl.innerHTML = filteredProducts.map((p, index) => `
    <article class="product-card">

      <div class="product-image">
        ${p.images.map((img, imgIndex) => `
          <img
            src="${img}"
            alt="${p.en}"
            onclick="openImage('${img}')"
          >
        `).join("")}
      </div>

      <div class="product-body">

        <div class="product-category">
          ${p.cat}
        </div>

        <h3>
          ${lang === "bn" ? p.bn : p.en}
        </h3>

        <div class="price">
          ${p.price}
        </div>

        <a
          class="order-btn"
          target="_blank"
          rel="noopener"
          href="https://wa.me/8801770441617?text=${
            lang === "bn"
              ? "আমি এই পণ্যটি অর্ডার করতে চাই: " + p.bn + " - " + p.price
              : "I want to order this product: " + p.en + " - " + p.price
          }"
        >
          WhatsApp-এ অর্ডার
        </a>

      </div>

    </article>
  `).join("");
}


function openImage(src) {
  const viewer = document.createElement("div");

  viewer.className = "image-viewer";

  viewer.innerHTML = `
    <span class="close-image">&times;</span>
    <img src="${src}" alt="Product Image">
  `;

  document.body.appendChild(viewer);

  viewer.addEventListener("click", function(e) {
    if (
      e.target === viewer ||
      e.target.classList.contains("close-image")
    ) {
      viewer.remove();
    }
  });
}


function setLanguage() {
  document.querySelectorAll("[data-bn]").forEach(el => {
    el.textContent =
      lang === "bn"
        ? el.dataset.bn
        : el.dataset.en;
  });

  document.getElementById("langBtn").textContent =
    lang === "bn" ? "EN" : "বাংলা";

  renderProducts();
}


document.getElementById("langBtn").addEventListener("click", () => {
  lang = lang === "bn" ? "en" : "bn";
  setLanguage();
});


document.querySelectorAll("[data-filter]").forEach(btn => {

  btn.addEventListener("click", () => {

    currentFilter = btn.dataset.filter;

    document.querySelectorAll(".filter").forEach(x => {
      x.classList.remove("active");
    });

    const matching = [
      ...document.querySelectorAll(".filter")
    ].find(
      x => x.dataset.filter === currentFilter
    );

    if (matching) {
      matching.classList.add("active");
    }

    renderProducts();

    document
      .getElementById("products")
      .scrollIntoView({
        behavior: "smooth"
      });

  });

});


renderProducts();
