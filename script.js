const angleLabels = [
  "1/8 · 0° FRENTE",
  "2/8 · 45° FRONTAL DIR.",
  "3/8 · 90° PERFIL DIR.",
  "4/8 · 135° COSTAS DIR.",
  "5/8 · 180° COSTAS",
  "6/8 · 225° COSTAS ESQ.",
  "7/8 · 270° PERFIL ESQ.",
  "8/8 · 315° FRONTAL ESQ."
];

const products = [
  {
    id: 1,
    slug: "tshirt",
    name: "Camiseta Raglan Dry-Tech",
    category: "masculino",
    description: "Malha fria de alta densidade com assinatura minimalista na manga.",
    fullDescription:
      "Desenvolvida para treinos de alta intensidade, a Camiseta Raglan Dry-Tech combina corte anatômico nos ombros com microfibras de poliamida que dissipam o calor rapidamente. Acabamento fosco anti-odor com símbolo LYNX em micro-relevo prateado no peito e assinatura na manga.",
    price: 169.90,
    installments: "em até 3x de R$ 56,63 sem juros",
    sizes: ["P", "M", "G", "GG"],
    selectedSize: "M",
    selectedColor: "preto",
    specs: [
      { label: "Composição", value: "90% Poliamida · 10% Elastano" },
      { label: "Modelagem", value: "Athletic Fit Raglan" },
      { label: "Tecnologia", value: "Dry-Tech · UV 50+ · Anti-Odor" },
      { label: "Acabamento", value: "Micro-Relevo Prata Fosco" }
    ],
    colors: [
      { key: "preto", name: "Preto Fosco", hex: "#141518", image: "assets/lynx-tshirt.jpg" },
      { key: "verde", name: "Verde Escuro", hex: "#133822", image: "assets/lynx-tshirt-green.jpg" },
      { key: "marinho", name: "Azul Marinho", hex: "#122444", image: "assets/lynx-tshirt-navy.jpg" }
    ]
  },
  {
    id: 2,
    slug: "set-legging",
    name: "Conjunto Sculpt Top + Legging",
    category: "feminino",
    description: "Top racerback de alta sustentação combinado com legging de cintura alta e compressão zero transparência.",
    fullDescription:
      "O Conjunto Sculpt une o Top Racerback de forro duplo estruturado à Legging de cintura alta anatômica. Construído em malha de alta gramatura (310g/m²) com elasticidade 4-Way que modela a silhueta e garante 0% de transparência mesmo em agachamentos profundos.",
    price: 269.90,
    installments: "em até 3x de R$ 89,96 sem juros",
    sizes: ["PP", "P", "M", "G"],
    selectedSize: "P",
    selectedColor: "verde",
    specs: [
      { label: "Composição", value: "86% Poliamida · 14% Elastano Lycra" },
      { label: "Gramatura", value: "310g/m² · Zero Transparência" },
      { label: "Sustentação", value: "Alta Compressão · Cós Duplo" },
      { label: "Peças Inclusas", value: "Top Racerback + Legging Sculpt" }
    ],
    colors: [
      { key: "preto", name: "Preto Fosco", hex: "#141518", image: "assets/lynx-set-legging.jpg" },
      { key: "verde", name: "Verde Escuro", hex: "#133822", image: "assets/lynx-set-legging-green.jpg" },
      { key: "marinho", name: "Azul Marinho", hex: "#122444", image: "assets/lynx-set-legging-navy.jpg" }
    ]
  },
  {
    id: 3,
    slug: "set-short",
    name: "Conjunto Aero Top + Short",
    category: "feminino",
    description: "Top racerback combinado com short feminino de compressão anatômica e cós firme que não enrola.",
    fullDescription:
      "Projetado para máxima liberdade de movimento em dias quentes, corridas e treinos funcionais. O Conjunto Aero combina o Top Racerback ao Short feminino de compressão intermediária com barras siliconadas que permanecem firmes sem subir durante o exercício.",
    price: 229.90,
    installments: "em até 3x de R$ 76,63 sem juros",
    sizes: ["PP", "P", "M", "G"],
    selectedSize: "M",
    selectedColor: "marinho",
    specs: [
      { label: "Composição", value: "88% Poliamida · 12% Elastano" },
      { label: "Gramatura", value: "290g/m² · Toque Gelado" },
      { label: "Modelagem", value: "Cós Anatômico · Barra Firme" },
      { label: "Peças Inclusas", value: "Top Racerback + Short Aero" }
    ],
    colors: [
      { key: "preto", name: "Preto Fosco", hex: "#141518", image: "assets/lynx-set-short.jpg" },
      { key: "verde", name: "Verde Escuro", hex: "#133822", image: "assets/lynx-set-short-green.jpg" },
      { key: "marinho", name: "Azul Marinho", hex: "#122444", image: "assets/lynx-set-short-navy.jpg" }
    ]
  }
];

let cart = [];
let currentCategory = "todos";
let activeModalProductId = null;
let activeModalAngle = 0;

const productsGrid = document.getElementById("products-grid");
const filterButtons = document.querySelectorAll(".filter-tab");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");

// Modal DOM Elements
const productModal = document.getElementById("product-modal");
const modalCloseBtn = document.getElementById("modal-close");
const modalImg = document.getElementById("modal-img");
const anglePrevBtn = document.getElementById("angle-prev");
const angleNextBtn = document.getElementById("angle-next");
const angleLabelEl = document.getElementById("angle-label");
const angleDotsEl = document.getElementById("angle-dots");
const modalCatEl = document.getElementById("modal-cat");
const modalTitleEl = document.getElementById("modal-title");
const modalPriceEl = document.getElementById("modal-price");
const modalInstallmentsEl = document.getElementById("modal-installments");
const modalDescEl = document.getElementById("modal-desc");
const modalSpecsEl = document.getElementById("modal-specs");
const modalColorsEl = document.getElementById("modal-colors");
const modalColorNameEl = document.getElementById("modal-color-name");
const modalSizesEl = document.getElementById("modal-sizes");
const modalSizeNameEl = document.getElementById("modal-size-name");
const modalAddBtn = document.getElementById("modal-add-btn");

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getAngleImageUrl(product, colorKey, angleIndex) {
  return `assets/angles/${product.slug}-${colorKey}-${angleIndex}.jpg`;
}

function preloadProductAngles(product, colorKey) {
  for (let i = 0; i < 8; i++) {
    const img = new Image();
    img.src = getAngleImageUrl(product, colorKey, i);
  }
}

function selectSize(productId, size) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.selectedSize = size;
    renderProducts(currentCategory);
    if (activeModalProductId === productId) {
      renderModalContent();
    }
  }
}

function selectColor(productId, colorKey) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.selectedColor = colorKey;
    renderProducts(currentCategory);
    if (activeModalProductId === productId) {
      preloadProductAngles(product, colorKey);
      renderModalContent();
    }
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
        <div
          class="product-media"
          onclick="openProductModal(${product.id})"
          role="button"
          tabindex="0"
          aria-label="Ampliar e ver detalhes em 360 graus de ${product.name}"
        >
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

// Modal 360° Functions
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  activeModalProductId = productId;
  activeModalAngle = 0;
  preloadProductAngles(product, product.selectedColor);
  renderModalContent();

  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeModalProductId = null;
}

function setModalAngle(newAngleIndex) {
  const product = products.find(p => p.id === activeModalProductId);
  if (!product) return;

  activeModalAngle = (newAngleIndex + 8) % 8;
  updateModalViewerImage(product);
}

function updateModalViewerImage(product) {
  const activeColor = product.colors.find(c => c.key === product.selectedColor) || product.colors[0];
  const imgUrl = getAngleImageUrl(product, activeColor.key, activeModalAngle);

  modalImg.src = imgUrl;
  modalImg.alt = `${product.name} — ${activeColor.name} (${angleLabels[activeModalAngle]})`;
  angleLabelEl.textContent = angleLabels[activeModalAngle];

  angleDotsEl.innerHTML = angleLabels.map((lbl, idx) => `
    <button
      type="button"
      class="angle-dot ${idx === activeModalAngle ? 'active' : ''}"
      title="${lbl}"
      aria-label="Ver ângulo ${lbl}"
      onclick="setModalAngle(${idx})"
    ></button>
  `).join("");
}

function renderModalContent() {
  const product = products.find(p => p.id === activeModalProductId);
  if (!product) return;

  const activeColor = product.colors.find(c => c.key === product.selectedColor) || product.colors[0];

  updateModalViewerImage(product);

  modalCatEl.textContent = `${product.category} // VISÃO 360° (8 ÂNGULOS)`;
  modalTitleEl.textContent = product.name;
  modalPriceEl.textContent = formatBRL(product.price);
  modalInstallmentsEl.textContent = product.installments;
  modalDescEl.textContent = product.fullDescription;

  modalSpecsEl.innerHTML = product.specs.map(spec => `
    <div class="modal-spec-item">
      <span>${spec.label}</span>
      <strong>${spec.value}</strong>
    </div>
  `).join("");

  modalColorNameEl.textContent = activeColor.name;
  modalColorsEl.innerHTML = product.colors.map(c => `
    <button
      type="button"
      class="color-swatch ${product.selectedColor === c.key ? 'active' : ''}"
      style="background-color: ${c.hex};"
      title="${c.name}"
      aria-label="${c.name}"
      onclick="selectColor(${product.id}, '${c.key}')"
    ></button>
  `).join("");

  modalSizeNameEl.textContent = product.selectedSize;
  modalSizesEl.innerHTML = product.sizes.map(s => `
    <button
      type="button"
      class="size-btn ${product.selectedSize === s ? 'selected' : ''}"
      onclick="selectSize(${product.id}, '${s}')"
    >${s}</button>
  `).join("");
}

anglePrevBtn.addEventListener("click", () => {
  setModalAngle(activeModalAngle - 1);
});

angleNextBtn.addEventListener("click", () => {
  setModalAngle(activeModalAngle + 1);
});

modalCloseBtn.addEventListener("click", closeProductModal);

productModal.addEventListener("click", (e) => {
  if (e.target === productModal) {
    closeProductModal();
  }
});

modalAddBtn.addEventListener("click", () => {
  if (activeModalProductId) {
    const id = activeModalProductId;
    closeProductModal();
    addToCart(id);
  }
});

document.addEventListener("keydown", (e) => {
  if (!activeModalProductId) return;
  if (e.key === "Escape") {
    closeProductModal();
  } else if (e.key === "ArrowLeft") {
    setModalAngle(activeModalAngle - 1);
  } else if (e.key === "ArrowRight") {
    setModalAngle(activeModalAngle + 1);
  }
});

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

// Destacar link ativo no menu ao rolar entre Coleção, Conceito, Engenharia e Feedbacks
const navLinks = document.querySelectorAll(".nav a");
const trackedSections = document.querySelectorAll("#colecao, #conceito, #engenharia, #feedbacks");

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

// Feedbacks de Clientes (3 colunas, abre de 2 em 2 linhas com efeito Fade)
const feedbacksData = [
  {
    name: "Lucas",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    comment: "A Camiseta Raglan não retém suor mesmo nos treinos mais pesados. O corte no ombro veste perfeitamente."
  },
  {
    name: "Mariana",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    comment: "O Conjunto Sculpt de top e legging tem zero transparência real no agachamento e modela sem apertar demais."
  },
  {
    name: "Rafael",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    comment: "Minimalismo no nível certo. Comprei a camiseta no Preto Fosco e no Verde Escuro, o tecido é gelado e muito leve."
  },
  {
    name: "Camila",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
    comment: "O short do Conjunto Aero não sobe na coxa durante a corrida. Melhor roupa de treino que já comprei."
  },
  {
    name: "Gabriel",
    stars: 4,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    comment: "Acabamento impecável na gola e na manga. Mesmo depois de várias lavagens a peça continua com aspecto de nova."
  },
  {
    name: "Beatriz",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    comment: "O tom Azul Marinho pessoalmente é lindo e super elegante. O top dá muita segurança para treinar."
  },
  {
    name: "Thiago",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=160&q=80",
    comment: "A assinatura discreta na manga e a logo prateada no peito passam uma presença absurda na academia."
  },
  {
    name: "Fernanda",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=160&q=80",
    comment: "Cós alto que não enrola no abdômen e tecido super macio. Já quero o conjunto de legging em todas as cores."
  },
  {
    name: "Matheus",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80",
    comment: "Caimento atlético de verdade, valoriza os ombros e não fica larga na cintura. Qualidade acima da média."
  },
  {
    name: "Juliana",
    stars: 4,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    comment: "Uso o conjunto de short e top tanto para musculação quanto para o crossfit. Sustentação nota dez."
  },
  {
    name: "Rodrigo",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=160&q=80",
    comment: "Finalmente uma marca fitness sem estampas exageradas. Só corte preciso, conforto térmico e foco no treino."
  },
  {
    name: "Larissa",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=160&q=80",
    comment: "A compressão da legging LYNX ajuda muito na estabilidade das pernas no treino de inferiores."
  },
  {
    name: "Bruno",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    comment: "Tecido Dry-Tech seca muito rápido e não deixa cheiro. Vale cada centavo pelo conforto."
  },
  {
    name: "Amanda",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=160&q=80",
    comment: "O Conjunto Sculpt Verde Escuro virou meu uniforme favorito de treino. Caimento perfeito no corpo."
  },
  {
    name: "Felipe",
    stars: 4,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80",
    comment: "Costuras planas que realmente não incomodam nem em treinos longos de corrida de rua."
  },
  {
    name: "Carolina",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=160&q=80",
    comment: "A entrega foi super rápida e a qualidade da malha surpreendeu. O toque fosco é muito sofisticado."
  },
  {
    name: "Diego",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80",
    comment: "Comprei uma camiseta para testar e na semana seguinte já garanti as outras duas cores."
  },
  {
    name: "Isabela",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=160&q=80",
    comment: "Forro duplo no top que traz segurança total e design nadador nas costas que deixa as escápulas livres."
  }
];

const FEEDBACK_COLS = 3;
let visibleFeedbackRows = 2;

const feedbacksGridEl = document.getElementById("feedbacks-grid");
const feedbackPeekWrapperEl = document.getElementById("feedback-peek-wrapper");
const feedbackPeekGridEl = document.getElementById("feedback-peek-grid");
const feedbackMoreBtnEl = document.getElementById("feedback-more-btn");

function renderStarsHTML(count) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= count) {
      html += `<span>★</span>`;
    } else {
      html += `<span class="star-empty">★</span>`;
    }
  }
  return html;
}

function createFeedbackCardHTML(item) {
  return `
    <article class="feedback-card">
      <div class="feedback-top">
        <div class="feedback-user">
          <img src="${item.avatar}" alt="Foto de ${item.name}" class="feedback-avatar" loading="lazy" />
          <strong class="feedback-name">${item.name}</strong>
        </div>
        <div class="feedback-stars" aria-label="${item.stars} de 5 estrelas">
          ${renderStarsHTML(item.stars)}
        </div>
      </div>
      <p class="feedback-quote">"${item.comment}"</p>
    </article>
  `;
}

function renderFeedbacks() {
  const visibleCount = visibleFeedbackRows * FEEDBACK_COLS;
  const visibleItems = feedbacksData.slice(0, visibleCount);
  const peekItems = feedbacksData.slice(visibleCount, visibleCount + FEEDBACK_COLS);

  feedbacksGridEl.innerHTML = visibleItems.map(createFeedbackCardHTML).join("");

  if (peekItems.length > 0) {
    feedbackPeekGridEl.innerHTML = peekItems.map(createFeedbackCardHTML).join("");
    feedbackPeekWrapperEl.classList.remove("hidden");
  } else {
    feedbackPeekGridEl.innerHTML = "";
    feedbackPeekWrapperEl.classList.add("hidden");
  }
}

feedbackMoreBtnEl.addEventListener("click", () => {
  visibleFeedbackRows += 2;
  renderFeedbacks();
});

renderFeedbacks();

// Controle de Tema (Claro / Escuro / Sistema)
const themeButtons = document.querySelectorAll(".theme-btn");
const systemDarkMatcher = window.matchMedia("(prefers-color-scheme: dark)");
let currentThemeMode = localStorage.getItem("lynx-theme-mode") || "system";

function applyThemeMode(mode) {
  currentThemeMode = mode;
  localStorage.setItem("lynx-theme-mode", mode);

  const resolvedTheme =
    mode === "system"
      ? (systemDarkMatcher.matches ? "dark" : "light")
      : mode;

  document.documentElement.setAttribute("data-theme", resolvedTheme);

  themeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.themeMode === mode);
  });
}

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyThemeMode(btn.dataset.themeMode);
  });
});

systemDarkMatcher.addEventListener("change", () => {
  if (currentThemeMode === "system") {
    applyThemeMode("system");
  }
});

applyThemeMode(currentThemeMode);
renderProducts();
