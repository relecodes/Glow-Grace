
// GLOW & GRACE BEAUTY
// Product Catalogue - Rele Codes

// Replace this with the business owner's WhatsApp number.
// South African format: 27 followed by the number without the first 0.
const WHATSAPP_NUMBER = "27600000000";

// PRODUCT DATABASE

const products = [
    {
        id: 1,
        name: "Luxury Body Wave Wig",
        category: "Wigs",
        price: 1850,
        description: "Soft, flowing waves for an elegant look.",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600"
    },
    {
        id: 2,
        name: "Silky Straight Wig",
        category: "Wigs",
        price: 1600,
        description: "A sleek and timeless everyday style.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600"
    },
    {
        id: 3,
        name: "Hydrating Hair Oil",
        category: "Haircare",
        price: 180,
        description: "Give your hair some extra love and moisture.",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600"
    },
    {
        id: 4,
        name: "Hair Growth Serum",
        category: "Haircare",
        price: 220,
        description: "A nourishing addition to your haircare routine.",
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600"
    },
    {
        id: 5,
        name: "Beauty Essentials Set",
        category: "Beauty",
        price: 350,
        description: "Everyday beauty favourites in one collection.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
    },
    {
        id: 6,
        name: "Luxury Makeup Kit",
        category: "Beauty",
        price: 480,
        description: "Your beauty routine deserves a little luxury.",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600"
    },
    {
        id: 7,
        name: "Curly Bob Wig",
        category: "Wigs",
        price: 1450,
        description: "Beautiful curls with a confident finish.",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600"
    },
    {
        id: 8,
        name: "Daily Hair Conditioner",
        category: "Haircare",
        price: 160,
        description: "Keep your hair feeling soft and manageable.",
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600"
    }
];

// BASKET

const basket = {};

// PAGE ELEMENTS

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categoryFilters = document.getElementById("category-filters");
const cartCount = document.getElementById("cart-count");
const emptyMessage = document.getElementById("empty-message");
const contactButton = document.getElementById("contact-button");

// FORMAT PRICES

function formatPrice(price) {
    return "R" + price.toLocaleString("en-ZA");
}

// DISPLAY PRODUCTS

function displayProducts(productList) {

    productGrid.innerHTML = "";

    emptyMessage.hidden = productList.length !== 0;

    productList.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="product-category">
                    ${product.category}
                </span>
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        class="add-button"
                        data-product-id="${product.id}"
                    >
                        + Add to basket
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);
    });
}

// ADD TO BASKET

function addToBasket(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) return;

    basket[productId] = (basket[productId] || 0) + 1;

    updateBasket();

    const button = document.querySelector(
        `[data-product-id="${productId}"]`
    );

    if (button) {
        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = "+ Add to basket";
        }, 1000);
    }
}

// UPDATE BASKET COUNT

function updateBasket() {

    const totalItems = Object.values(basket).reduce(
        (total, quantity) => total + quantity,
        0
    );

    cartCount.textContent = totalItems;
}

// SEARCH AND CATEGORY FILTERING

let activeCategory = "All";

function filterProducts() {

    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            activeCategory === "All" ||
            product.category === activeCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    displayProducts(filteredProducts);
}

// CATEGORY BUTTON EVENTS

categoryFilters.addEventListener("click", event => {

    const button = event.target.closest(".category-button");

    if (!button) return;

    activeCategory = button.dataset.category;

    document.querySelectorAll(".category-button").forEach(item => {
        item.classList.remove("active");
    });

    button.classList.add("active");

    filterProducts();
});

// SEARCH EVENT

searchInput.addEventListener("input", filterProducts);

// BASKET BUTTON EVENTS

productGrid.addEventListener("click", event => {

    const button = event.target.closest(".add-button");

    if (!button) return;

    const productId = Number(button.dataset.productId);

    addToBasket(productId);
});

// WHATSAPP CHECKOUT

contactButton.addEventListener("click", event => {

    event.preventDefault();

    const selectedProducts = products.filter(product => basket[product.id]);

    let message = "Hello Glow & Grace Beauty! I'd like to enquire about:";

    if (selectedProducts.length > 0) {

        message += "\n\n";

        selectedProducts.forEach(product => {

            const quantity = basket[product.id];

            message +=
                `${product.name} x ${quantity} - ${formatPrice(product.price * quantity)}\n`;
        });

        const total = selectedProducts.reduce(
            (sum, product) => sum + product.price * basket[product.id],
            0
        );

        message += `\nEstimated total: ${formatPrice(total)}`;

    } else {

        message += "\n\nPlease share your available products and prices.";
    }

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

// INITIALISE CATALOGUE

displayProducts(products);

updateBasket();

console.log("Glow & Grace Beauty catalogue is running!");
