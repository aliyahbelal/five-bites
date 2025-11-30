// page 2 shahd//
// Array to store cart items
let cart = [];

// Select all "Add to Cart" buttons
const buttons = document.querySelectorAll('.add-to-cart');
const cartList = document.getElementById('cart-items');

// Attach click event to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
    const item = button.parentElement;
    const name = item.querySelector('h3').innerText;
    const price = parseFloat(item.querySelector('.price').innerText.replace('$',''));

    // Add item to cart
    cart.push({ name, price });

    // Re-render cart
    renderCart();
    });
});

// Function to render cart items
function renderCart() {
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((product, index) => {
    total += product.price;

    const li = document.createElement('li');
    li.textContent = `${product.name} - $${product.price.toFixed(2)}`;

    // Add a remove button for each item
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.marginLeft = '10px';
    removeBtn.onclick = () => {
        cart.splice(index, 1);
        renderCart();
    };

    li.appendChild(removeBtn);
    cartList.appendChild(li);
    });

  // Show total at the bottom
    const totalLi = document.createElement('li');
    totalLi.textContent = `Total: $${total.toFixed(2)}`;
    totalLi.style.fontWeight = 'bold';
    cartList.appendChild(totalLi);
}


// page 3 Sherrien//






// Simple interactive JavaScript for Five Bites (with multilingual support)
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const navLinkEls = document.querySelectorAll(".nav-link");
  const ctaExplore = document.getElementById("cta-explore");
  const menuGrid = document.getElementById("menu-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cartCountEl = document.getElementById("cart-count");
  const toast = document.getElementById("toast");
  const yearEl = document.getElementById("year");
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");

  // Lang selector
  const langSelector = document.getElementById("lang-selector");
  const currentLangBtn = document.getElementById("current-lang");
  const langList = document.getElementById("lang-list");

  // Set year
  yearEl.textContent = new Date().getFullYear();

  // --- Multilingual data ---
  const i18n = {
    en: {
      langLabel: "EN ▾",
      dir: "ltr",
      nav_home: "Home",
      nav_menu: "Menu",
      nav_about: "About",
      nav_contact: "Contact",
      hero_title: "Welcome to Five Bites",
      hero_sub: "Quick, Fresh, and Delicious Fast Food",
      cta_explore: "Explore Our Menu",
      menu_title: "Our Menu",
      filter_all: "All",
      filter_burgers: "Burgers",
      filter_sides: "Sides",
      filter_drinks: "Drinks",
      about_title: "About Us",
      about_text: "Five Bites brings you fast, tasty and fresh meals using locally sourced ingredients. We combine classic flavors with modern twists to make every bite memorable.",
      contact_title: "Contact Us",
      name_placeholder: "Your name",
      email_placeholder: "Your email",
      message_placeholder: "Your message",
      send_button: "Send Message",
      cart_title: "Cart",
      toast_added: (name) => `${name} added to cart.`,
      form_fill_all: "Please fill all fields.",
      form_invalid_email: "Please enter a valid email address.",
      form_thanks: "Thanks! Your message has been sent.",
      nav_toggle_label: "Open menu"
    },
    ar: {
      langLabel: "عربى ▾",
      dir: "rtl",
      nav_home: "الرئيسية",
      nav_menu: "القائمة",
      nav_about: "من نحن",
      nav_contact: "اتصل بنا",
      hero_title: "مرحباً بكم في فايف بايتس",
      hero_sub: "وجبات سريعة، طازجة ولذيذة",
      cta_explore: "استكشف قائمتنا",
      menu_title: "قائمتنا",
      filter_all: "الكل",
      filter_burgers: "برجر",
      filter_sides: "أطباق جانبية",
      filter_drinks: "مشروبات",
      about_title: "من نحن",
      about_text: "فايف بايتس تقدم لكم وجبات سريعة ولذيذة باستخدام مكونات محلية الطزاجة. ندمج النكهات الكلاسيكية مع لمسات عصرية لتصبح كل لقمة لا تُنسى.",
      contact_title: "تواصل معنا",
      name_placeholder: "الاسم",
      email_placeholder: "البريد الإلكتروني",
      message_placeholder: "رسالتك",
      send_button: "إرسال الرسالة",
      cart_title: "سلة الطلبات",
      toast_added: (name) => `تمت إضافة ${name} إلى السلة.`,
      form_fill_all: "من فضلك املأ جميع الحقول.",
      form_invalid_email: "من فضلك أدخل عنوان بريد إلكتروني صالح.",
      form_thanks: "شكراً! تم إرسال رسالتك.",
      nav_toggle_label: "فتح القائمة"
    },
    fr: {
      langLabel: "FR ▾",
      dir: "ltr",
      nav_home: "Accueil",
      nav_menu: "Menu",
      nav_about: "À propos",
      nav_contact: "Contact",
      hero_title: "Bienvenue chez Five Bites",
      hero_sub: "Repas rapides, frais et délicieux",
      cta_explore: "Découvrez notre menu",
      menu_title: "Notre Menu",
      filter_all: "Tous",
      filter_burgers: "Burgers",
      filter_sides: "Accompagnements",
      filter_drinks: "Boissons",
      about_title: "À propos de nous",
      about_text: "Five Bites vous propose des repas rapides, savoureux et frais, préparés à partir d'ingrédients locaux. Nous combinons les saveurs classiques avec des touches modernes pour rendre chaque bouchée mémorable.",
      contact_title: "Contactez-nous",
      name_placeholder: "Votre nom",
      email_placeholder: "Votre e-mail",
      message_placeholder: "Votre message",
      send_button: "Envoyer",
      cart_title: "Panier",
      toast_added: (name) => `${name} ajouté au panier.`,
      form_fill_all: "Veuillez remplir tous les champs.",
      form_invalid_email: "Veuillez entrer une adresse e-mail valide.",
      form_thanks: "Merci ! Votre message a été envoyé.",
      nav_toggle_label: "Ouvrir le menu"
    }
  };

  // Initial language
  const STORAGE_KEY = "fb_lang";
  let currentLang = localStorage.getItem(STORAGE_KEY) || "en";

  // Apply language to the page
  function applyLanguage(lang) {
    const data = i18n[lang] || i18n.en;
    // set document lang and dir
    document.documentElement.lang = lang;
    document.documentElement.dir = data.dir;
    // add/remove rtl class for styling
    if (data.dir === "rtl") document.body.classList.add("rtl");
    else document.body.classList.remove("rtl");

    // update current lang button label
    currentLangBtn.textContent = data.langLabel;
    currentLangBtn.setAttribute("aria-label", `Language: ${lang}`);

    // update any element with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const val = data[key];
      if (typeof val === "function") return; // skip functions
      if (val === undefined) return;
      if (el.tagName.toLowerCase() === "input" || el.tagName.toLowerCase() === "textarea") {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });

    // update placeholders manually (inputs not using data-i18n attribute directly)
    document.getElementById("name").placeholder = data.name_placeholder;
    document.getElementById("email").placeholder = data.email_placeholder;
    document.getElementById("message").placeholder = data.message_placeholder;
    document.getElementById("send-btn").textContent = data.send_button;

    // update nav toggle aria-label
    navToggle.setAttribute("aria-label", data.nav_toggle_label);

    // update cart title
    document.getElementById("cart").setAttribute("title", data.cart_title);

    // persist
    localStorage.setItem(STORAGE_KEY, lang);
    currentLang = lang;
  }

  // Toggle language list visibility
  currentLangBtn.addEventListener("click", (e) => {
    const expanded = currentLangBtn.getAttribute("aria-expanded") === "true";
    currentLangBtn.setAttribute("aria-expanded", String(!expanded));
    langList.classList.toggle("show");
  });

  // Choose language from list
  langList.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-lang]");
    if (!btn) return;
    const lang = btn.dataset.lang;
    applyLanguage(lang);
    langList.classList.remove("show");
    currentLangBtn.setAttribute("aria-expanded", "false");
  });

  // close language list on outside click
  document.addEventListener("click", (e) => {
    if (!langSelector.contains(e.target)) {
      langList.classList.remove("show");
      currentLangBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Mobile nav toggle
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("show");
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // close mobile nav if open
      if (navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Sample menu items data
  const menuData = [
    {
      id: 1,
      category: "burgers",
      name: "Classic Beef Burger",
      desc: "100% beef, cheddar, lettuce, tomato and special sauce.",
      price: 7.5,
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a5d4be3fb45b9d0c9d5a7b8f7b7d2e1"
    },
    {
      id: 2,
      category: "burgers",
      name: "Spicy Chicken Burger",
      desc: "Crispy chicken fillet, spicy mayo, pickles.",
      price: 6.9,
      img: "https://images.unsplash.com/photo-1606755962772-3f2f0a2a7a2b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=b1a6d6b7f1a3a9eccc7a50fd0a3b9a55"
    },
    {
      id: 3,
      category: "sides",
      name: "Crispy Fries",
      desc: "Golden fries with sea salt.",
      price: 2.5,
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=b24f2c8cb2c4a7a1e7b0c4c5f5eda3d7"
    },
    {
      id: 4,
      category: "drinks",
      name: "Fresh Lemonade",
      desc: "Homemade lemonade, slightly sweet.",
      price: 1.9,
      img: "https://images.unsplash.com/photo-1562440499-64c7a9f4fcc4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=620a9e2b3bde1d3e1a6f9a4bf3f02b8c"
    },
    {
      id: 5,
      category: "sides",
      name: "Onion Rings",
      desc: "Crispy beer-battered onion rings.",
      price: 3.2,
      img: "https://images.unsplash.com/photo-1613891995044-4f3f2a4b6be8?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=29d9b9f3f264aef3a8b1b6f6ad9d3c1d"
    },
    {
      id: 6,
      category: "drinks",
      name: "Iced Cola",
      desc: "Classic cola with ice.",
      price: 1.2,
      img: "https://images.unsplash.com/photo-1541542684-1a09f11f0396?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7f9d3d9c7b8a6f6c6d7b8a9c2d1e7f0a"
    }
  ];

  // Render menu items (optionally filtered)
  function renderMenu(filter = "all") {
    menuGrid.innerHTML = "";
    const list = menuData.filter(item => filter === "all" ? true : item.category === filter);
    list.forEach(item => {
      const card = document.createElement("article");
      card.className = "menu-card";
      card.innerHTML = `
        <img src="${item.img}" alt="${escapeHtml(item.name)}" loading="lazy" />
        <div class="card-body">
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.desc)}</p>
        </div>
        <div class="card-footer">
          <div class="price">$${item.price.toFixed(2)}</div>
          <button class="add-btn" data-id="${item.id}">Add</button>
        </div>
      `;
      menuGrid.appendChild(card);
    });
  }

  // Simple HTML escape to avoid accidental injection when using template strings
  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  }

  // Initial render
  renderMenu();

  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      renderMenu(filter);
    });
  });

  // Delegated click for Add buttons
  menuGrid.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-btn");
    if (!addBtn) return;
    const id = Number(addBtn.dataset.id);
    addToCart(id);
  });

  // Cart state (very small demo)
  let cartCount = 0;
  function addToCart(id) {
    const item = menuData.find(m => m.id === id);
    cartCount++;
    cartCountEl.textContent = cartCount;
    showToast(getI18n('toast_added', item.name));
  }

  // Toast helper
  let toastTimer = null;
  function showToast(message, duration = 2200) {
    if (toastTimer) {
      clearTimeout(toastTimer);
      toastTimer = null;
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
    toastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(12px)";
    }, duration);
  }

  // i18n helper to retrieve strings (supports functions)
  function getI18n(key, ...args) {
    const data = i18n[currentLang] || i18n.en;
    const val = data[key];
    if (typeof val === "function") return val(...args);
    return val === undefined ? (i18n.en[key] || "") : val;
  }

  // Simple contact form validation & feedback
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formFeedback.textContent = getI18n('form_fill_all');
      formFeedback.style.color = "#b00020";
      return;
    }
    // Minimal email check
    if (!/\S+@\S+\.\S+/.test(email)) {
      formFeedback.textContent = getI18n('form_invalid_email');
      formFeedback.style.color = "#b00020";
      return;
    }

    formFeedback.style.color = "#2b7a0b";
    formFeedback.textContent = getI18n('form_thanks');

    // Reset form after small delay to simulate send
    setTimeout(() => {
      contactForm.reset();
      formFeedback.textContent = "";
    }, 1200);
  });

  // Accessibility: close nav when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (!navLinks.classList.contains("show")) return;
    if (!navLinks.contains(e.target) && e.target !== navToggle) {
      navLinks.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // --- Initialize language on load ---
  applyLanguage(currentLang);

  // Also translate static attributes that don't use data-i18n
  // (already handled inside applyLanguage)

  // Optional: expose applyLanguage for debugging
  window.applyLanguage = applyLanguage;
});

// ola

ocument.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('#gallery .img-gallery img');
    
    // Add hover effects to images
    galleryImages.forEach(img => {
        // Mouse enter effect
        img.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
            this.style.cursor = 'pointer';
        });
        
        // Mouse leave effect
        img.addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(1)';
        });
        
        // Click effect on image
        img.addEventListener('click', function() {
            alert('Food image clicked! 🍕');
            this.style.border = '2px solid #ff6b6b';
        });
    });
    
    console.log('Image gallery is ready to use!');
});
