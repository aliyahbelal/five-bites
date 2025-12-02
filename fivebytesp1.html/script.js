// shahd
// Simple Order Management
let order = [];

// Get DOM elements
const orderItemsDiv = document.getElementById('order-items');
const totalPriceEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-button');

// Only run if order section exists
if (orderItemsDiv && totalPriceEl && checkoutBtn) {
    // Get all "Order now" buttons
    const orderButtons = document.querySelectorAll('.add.order');

    // Add click event to each order button
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const menuItem = button.closest('.menu-item');
            if (!menuItem) return;

            // Get item name and price
            const nameEl = menuItem.querySelector('h3');
            const priceEl = menuItem.querySelector('.price');

            if (!nameEl || !priceEl) return;

            const name = nameEl.innerText.trim();
            const price = parseFloat(priceEl.innerText.replace('$', '').trim());

            // Add to order (or increase quantity if exists)
            const existingItem = order.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                order.push({ name, price, quantity: 1 });
            }

            // Update display
            displayOrder();
        });
    });

    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (order.length === 0) {
            alert('Your order is empty!');
            return;
        }

        const total = calculateTotal();
        if (confirm(`Complete your order?\nTotal: $${total.toFixed(2)}`)) {
            alert(`✓ Order placed!\nTotal: $${total.toFixed(2)}`);
            order = [];
            displayOrder();
        }
    });

    
}

// Display order items
function displayOrder() {
    orderItemsDiv.innerHTML = '';

    if (order.length === 0) {
        orderItemsDiv.innerHTML = '<p style="color: #999; text-align: center;">Your order is empty</p>';
        totalPriceEl.textContent = 'Total: $0.00';
        return;
    }

    // Create order list
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';

    order.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;

        const li = document.createElement('li');
        li.style.padding = '10px';
        li.style.marginBottom = '8px';
        li.style.background = '#f5f5f5';
        li.style.borderRadius = '6px';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';

        // Item info
        const info = document.createElement('span');
        info.textContent = `${item.name} - $${item.price} x${item.quantity} = $${itemTotal.toFixed(2)}`;

        // --- Code to add to your scripts.js ---

function setupCartListeners() {
    // Select all buttons with the class 'add-to-cart-button'
    const cartButtons = document.querySelectorAll('.add-to-cart-button');

    cartButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            // Get the item ID from the button's data-id attribute
            const menuitemId = event.currentTarget.dataset.id; 
            const quantity = 1; // Assuming you add 1 item per click

            if (!menuitemId) {
                console.error("Error: Missing menu item ID on button.");
                alert("Cannot add item. Missing ID.");
                return;
            }

            try {
                // Send the data to the PHP script
                const response = await fetch('add_to_cart.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        'menuitemId': menuitemId,
                        'quantity': quantity
                    })
                });

                const result = await response.json();

                if (result.success) {
                    // Success! Provide feedback to the user
                    alert('✅ Success! "' + menuitemId + '" added to cart.');
                } else {
                    // Failure! Show error message
                    alert('❌ Error adding item: ' + result.error);
                }
            } catch (error) {
                console.error('Network or parsing error:', error);
                alert('A network error occurred. Check your server logs.');
            }
        });
    });
}

  document.getElementById('checkout-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get values directly from input fields
            const fullName = document.getElementById('full-name').value || 'Customer';
            const email = document.getElementById('email').value || 'your@email.com';
            const address = document.getElementById('address').value || 'your provided address';
            
            console.log('Checkout simulation completed.');
            
            // Display success message in the UI (replacement for alert/confirm)
            const checkoutDiv = document.getElementById('checkout');
            checkoutDiv.innerHTML = `
                <div class="text-center p-6">
                    <h2 class="text-3xl text-green-600 font-extrabold mb-4">Order Placed!</h2>
                    <p class="text-lg text-gray-700">Thank you for your order, <strong>${fullName}</strong>!</p>
                    <p class="text-sm text-gray-500 mt-4">We will send a confirmation to ${email}.</p>
                    <p class="text-sm text-gray-500 mt-2">Delivery is heading to: ${address}.</p>
                    <a href="menu.html" class="inline-block mt-6 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition">Return to Menu</a>
                </div>
            `;
        });

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.background = '#ff6b6b';
        removeBtn.style.color = 'white';
        removeBtn.style.border = 'none';
        removeBtn.style.padding = '5px 10px';
        removeBtn.style.borderRadius = '4px';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.fontSize = '12px';
        removeBtn.onclick = () => {
            order.splice(index, 1);
            displayOrder();
        };

        li.appendChild(info);
        li.appendChild(removeBtn);
        ul.appendChild(li);
    });

    orderItemsDiv.appendChild(ul);

    // Update total
    const total = calculateTotal();
    totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
}

// Calculate total price
function calculateTotal() {
    return order.reduce((sum, item) => sum + item.price * item.quantity, 0);
}


    // #region: Page 3 (Sherrien) - Interactive UI & Multilingual Support
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
    const yearEl = document.getElementById("year");
    const contactForm = document.getElementById("contact-form");
    const langSelector = document.getElementById("lang-selector");

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    if (langSelector) {
        const currentLangBtn = document.getElementById("current-lang");
        const langList = document.getElementById("lang-list");
        const STORAGE_KEY = "fb_lang";
        let currentLang = localStorage.getItem(STORAGE_KEY) || "en";

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

        function applyLanguage(lang) {
            const data = i18n[lang] || i18n.en;
            document.documentElement.lang = lang;
            document.documentElement.dir = data.dir;
            document.body.classList.toggle("rtl", data.dir === "rtl");

            currentLangBtn.textContent = data.langLabel;
            currentLangBtn.setAttribute("aria-label", `Language: ${lang}`);

            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                if (key && data[key] && typeof data[key] !== "function") {
                    if (el.tagName.toLowerCase() === "input" || el.tagName.toLowerCase() === "textarea") {
                        el.placeholder = data[key];
                    } else {
                        el.textContent = data[key];
                    }
                }
            });
            if(document.getElementById("name")) document.getElementById("name").placeholder = data.name_placeholder;
            if(document.getElementById("email")) document.getElementById("email").placeholder = data.email_placeholder;
            if(document.getElementById("message")) document.getElementById("message").placeholder = data.message_placeholder;
            if(document.getElementById("send-btn")) document.getElementById("send-btn").textContent = data.send_button;
            if(navToggle) navToggle.setAttribute("aria-label", data.nav_toggle_label);
            if(document.getElementById("cart")) document.getElementById("cart").setAttribute("title", data.cart_title);

            localStorage.setItem(STORAGE_KEY, lang);
            currentLang = lang;
        }

        currentLangBtn.addEventListener("click", () => {
            const expanded = currentLangBtn.getAttribute("aria-expanded") === "true";
            currentLangBtn.setAttribute("aria-expanded", String(!expanded));
            langList.classList.toggle("show");
        });

        langList.addEventListener("click", (e) => {
            const btn = e.target.closest("button[data-lang]");
            if (btn) {
                applyLanguage(btn.dataset.lang);
                langList.classList.remove("show");
                currentLangBtn.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("click", (e) => {
            if (!langSelector.contains(e.target)) {
                langList.classList.remove("show");
                currentLangBtn.setAttribute("aria-expanded", "false");
            }
        });

        applyLanguage(currentLang);
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const expanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!expanded));
            navLinks.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {
            if (navLinks.classList.contains("show") && !navLinks.contains(e.target) && e.target !== navToggle) {
                navLinks.classList.remove("show");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            if (navLinks && navLinks.classList.contains("show")) {
                navLinks.classList.remove("show");
                if (navToggle) navToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formFeedback = document.getElementById("form-feedback");
            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();
            const currentLang = localStorage.getItem("fb_lang") || "en";

            const getI18n = (key) => i18n[currentLang][key] || i18n.en[key];

            if (!name || !email || !message) {
                formFeedback.textContent = getI18n('form_fill_all');
                formFeedback.style.color = "#b00020";
                return;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                formFeedback.textContent = getI18n('form_invalid_email');
                formFeedback.style.color = "#b00020";
                return;
            }

            formFeedback.style.color = "#2b7a0b";
            formFeedback.textContent = getI18n('form_thanks');

            setTimeout(() => {
                contactForm.reset();
                formFeedback.textContent = "";
            }, 1200);
        });
    }
    // #endregion

    // #region: Gallery (Ola) - Image Effects
    const galleryImages = document.querySelectorAll('#gallery .img-gallery img');
    if (galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('mouseenter', function () {
                this.style.opacity = '1';
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'all 0.3s ease';
                this.style.cursor = 'pointer';
            });

            img.addEventListener('mouseleave', function () {
                this.style.opacity = '0.8';
                this.style.transform = 'scale(1)';
            });

            img.addEventListener('click', function () {
                alert('Food image clicked! 🍕');
                this.style.border = '2px solid #ff6b6b';
            });
        });
        console.log('Image gallery is ready to use!');
    }
    // #endregion

    // #region: Navigation Active Link
    const navLinksAll = document.querySelectorAll('header nav a');
    const currentPage = window.location.pathname.split('/').pop();

    if (navLinksAll.length > 0) {
        navLinksAll.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    // #endregion
;
