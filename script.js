const products = [
  {cat:"Watches", icon:"⌚", bn:"Premium Watch", en:"Premium Watch", price:"৳ 1,490"},
  {cat:"Shoes", icon:"👟", bn:"Classic Sneakers", en:"Classic Sneakers", price:"৳ 1,890"},
  {cat:"Clothing", icon:"👕", bn:"Premium T-Shirt", en:"Premium T-Shirt", price:"৳ 790"},
  {cat:"Accessories", icon:"👜", bn:"Fashion Bag", en:"Fashion Bag", price:"৳ 1,290"},
  {cat:"Watches", icon:"⌚", bn:"Elegant Watch", en:"Elegant Watch", price:"৳ 1,690"},
  {cat:"Shoes", icon:"👞", bn:"Casual Shoes", en:"Casual Shoes", price:"৳ 1,590"},
  {cat:"Clothing", icon:"👔", bn:"Men's Shirt", en:"Men's Shirt", price:"৳ 1,090"},
  {cat:"Accessories", icon:"🕶️", bn:"Fashion Sunglasses", en:"Fashion Sunglasses", price:"৳ 690"}
];

let lang = "bn";
let currentFilter = "All";

function renderProducts(){
  const grid = document.getElementById("productGrid");
  const list = currentFilter === "All" ? products : products.filter(p => p.cat === currentFilter);
  grid.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-image">${p.icon}</div>
      <div class="product-body">
        <div class="tag">${p.cat.toUpperCase()}</div>
        <h3>${lang === "bn" ? p.bn : p.en}</h3>
        <div class="price">${p.price}</div>
        <a class="order" target="_blank" rel="noopener"
          href="https://wa.me/8801770441617?text=${encodeURIComponent((lang==="bn"?"আমি এই পণ্যটি অর্ডার করতে চাই: ":"I want to order this product: ")+(lang==="bn"?p.bn:p.en)+" | "+p.price)}">
          ${lang === "bn" ? "WhatsApp-এ অর্ডার" : "Order on WhatsApp"}
        </a>
      </div>
    </article>
  `).join("");
}

function setLanguage(){
  document.querySelectorAll("[data-bn]").forEach(el => {
    el.textContent = lang === "bn" ? el.dataset.bn : el.dataset.en;
  });
  document.getElementById("langBtn").textContent = lang === "bn" ? "EN" : "বাংলা";
  renderProducts();
}

document.getElementById("langBtn").addEventListener("click", () => {
  lang = lang === "bn" ? "en" : "bn";
  setLanguage();
});

document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
    const matching = [...document.querySelectorAll(".filter")].find(x => x.dataset.filter === currentFilter);
    if (matching) matching.classList.add("active");
    renderProducts();
    document.getElementById("products").scrollIntoView({behavior:"smooth"});
  });
});

renderProducts();
