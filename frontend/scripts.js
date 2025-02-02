const API_URL = "http://90.156.171.151:5000/products";
const EMAIL_URL = "http://90.156.171.151:5000/send-email";


document.addEventListener("DOMContentLoaded", loadProducts);


document.getElementById("addProductForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const deadline = document.getElementById("deadline").value;

    if (!name || !price || !deadline) {
        alert("All fields are required!");
        return;
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: parseFloat(price), deadline: parseInt(deadline) })
    });

    if (response.ok) {
        loadProducts();
        document.getElementById("addProductForm").reset();
    } else {
        alert("Error adding product.");
    }
});


async function loadProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();

    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} - Buy in ${product.deadline} days 
                        <button onclick="deleteProduct(${product.id})">Delete</button>`;
        productList.appendChild(li);
    });
}


async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (response.ok) loadProducts();
}


async function sortProducts(type, order) {
    const response = await fetch(`${API_URL}/sort?type=${type}&order=${order}`);
    const products = await response.json();

    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} - Buy in ${product.deadline} days 
                        <button onclick="deleteProduct(${product.id})">Delete</button>`;
        productList.appendChild(li);
    });
}


async function calculateTotal() {
    const days = document.getElementById("daysInput").value;
    if (!days) {
        alert("Enter the number of days.");
        return;
    }

    const response = await fetch(`${API_URL}/sum/${days}`);
    const data = await response.json();

    document.getElementById("totalPrice").textContent = `Total: $${data.total}`;
}


async function sendEmail() {
    const email = document.getElementById("emailInput").value;
    if (!email) {
        alert("Enter an email.");
        return;
    }

    const response = await fetch(EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    if (response.ok) {
        alert("Email sent successfully!");
    } else {
        alert("Error sending email.");
    }
}
