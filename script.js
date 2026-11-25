const products = [
  {
    id: 1,
    name: "Camiseta Raglan Dry-Tech",
    category: "masculino",
    description: "Malha fria de alta densidade com assinatura minimalista na manga.",
    price: 169.90,
    sizes: ["P", "M", "G", "GG"],
    selectedSize: "M",
    selectedColor: "preto",
    colors: [
      { key: "preto", name: "Preto Fosco", hex: "#141518", image: "assets/lynx-tshirt.jpg" },
      { key: "verde", name: "Verde Escuro", hex: "#133822", image: "assets/lynx-tshirt-green.jpg" },
      { key: "marinho", name: "Azul Marinho", hex: "#122444", image: "assets/lynx-tshirt-navy.jpg" }
    ]
  },
  {
    id: 2,
    name: "Top Racerback Sculpt",
    category: "feminino",
    description: "Alta sustentação com forro duplo zero transparência e toque acetinado fosco.",
    price: 139.90,
    sizes: ["PP", "P", "M", "G"],
    selectedSize: "P",
    selectedColor: "verde",
    colors: [
      { key: "preto", name: "Preto Fosco", hex: "#141518", image: "assets/lynx-top.jpg" },
      { key: "verde", name: "Verde Escuro", hex: "#133822", image: "assets/lynx-top-green.jpg" },
      { key: "marinho", name: "Azul Marinho", hex: "#122444", image: "assets/lynx-top-navy.jpg" }
    ]
  },
  {
    id: 3,
    name: "Duo Pack Essential 01",
    category: "feminino",
    description: "Conjunto essencial composto pela Camiseta Raglan + Top Racerback.",
    price: 279.90,
    sizes: ["P", "M", "G"],
    selectedSize: "M",
    selectedColor: "marinho",
    colors: [
      { key: "preto", name: "Preto Fosco", hex: "#141518", image: "assets/lynx-combo.jpg" },
      { key: "verde", name: "Verde Escuro", hex: "#133822", image: "assets/lynx-combo-green.jpg" },
      { key: "marinho", name: "Azul Marinho", hex: "#122444", image: "assets/lynx-combo-navy.jpg" }
    ]
  }
];

let cart = [];
let currentCategory = "todos";

const productsGrid = document.getElementById("products-grid");
const filterButtons = document.querySelectorAll(".filter-tab");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function selectSize(productId, size) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.selectedSize = size;
    renderProducts(currentCategory);
  }
}

function selectColor(productId, colorKey) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.selectedColor = colorKey;
    renderProducts(currentCategory);
  }
}

function renderProducts(category = "todos") {
  currentCategory = category;
  const filtered = category === "todos"
    ? products
    : products.filter(p => p.category === category);

  productsGrid.innerHTML = filtered.map(product => {
    const activeColor = product.colors.find(c => c.key === product.selectedColor) || product.colors[0];

    return `
      <article class="product-card">
        <div class="product-media">
          <img src="${activeColor.image}" alt="${product.name} — ${activeColor.name}" />
        </div>
        <div class="product-meta">
          <span class="product-cat">${product.category}</span>
          <span class="product-price">${formatBRL(product.price)}</span>
        </div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description}</p>

        <div class="product-colors">
          <div class="color-swatches" role="radiogroup" aria-label="Escolha a cor">
            ${product.colors.map(c => `
              <button
                type="button"
                class="color-swatch ${product.selectedColor === c.key ? 'active' : ''}"
                style="background-color: ${c.hex};"
                title="${c.name}"
                aria-label="${c.name}"
                onclick="selectColor(${product.id}, '${c.key}')"
              ></button>
            `).join("")}
          </div>
          <span class="color-label">${activeColor.name}</span>
        </div>

        <div class="product-controls">
          <div class="size-group">
            ${product.sizes.map(s => `
              <button
                type="button"
                class="size-btn ${product.selectedSize === s ? 'selected' : ''}"
                onclick="selectSize(${product.id}, '${s}')"
              >${s}</button>
            `).join("")}
          </div>
          <button type="button" class="add-bag-btn" onclick="addToCart(${product.id})">
            Adicionar +
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const activeColor = product.colors.find(c => c.key === product.selectedColor) || product.colors[0];

  cart.push({
    ...product,
    size: product.selectedSize,
    colorName: activeColor.name
  });
  updateCartUI();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Sua sacola está vazia.</p>`;
    cartTotalEl.textContent = "R$ 0,00";
    return;
  }

  cartItemsContainer.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>${item.colorName} · Tam. ${item.size} — ${formatBRL(item.price)}</span>
      </div>
      <button class="remove-item" onclick="removeFromCart(${idx})">Remover</button>
    </div>
  `).join("");

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  cartTotalEl.textContent = formatBRL(total);
}

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.category);
  });
});

document.getElementById("open-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Selecione uma peça antes de finalizar.");
    return;
  }
  alert("Pedido confirmado. Disciplina move resultados.");
  cart = [];
  updateCartUI();
  closeCart();
});

document.getElementById("newsletter-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("E-mail confirmado na Lista Privada LYNX.");
  e.target.reset();
});

// Destacar link ativo no menu ao rolar entre Coleção, Conceito e Engenharia
const navLinks = document.querySelectorAll(".nav a");
const trackedSections = document.querySelectorAll("#colecao, #conceito, #engenharia");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-35% 0px -50% 0px" }
);

trackedSections.forEach((sec) => sectionObserver.observe(sec));

renderProducts();
