const API_URL = 'http://localhost:3000/api/products';

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const productIdInput = document.getElementById('productId');

const fetchProducts = async () => {
    const res = await fetch(API_URL);
    const products = await res.json();
    productList.innerHTML = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td>$${product.price}</td>
            <td>
                <button id="edit" onclick="editProduct(${product.id}, '${product.name}', '${product.category}', ${product.stock}, ${product.price})">✏ Editar</button>
                <button id="delete" onclick="deleteProduct(${product.id})">🗑 Eliminar</button>
            </td>
        </tr>
    `).join('');
};

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = productIdInput.value;
    const product = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        stock: document.getElementById('stock').value,
        price: document.getElementById('price').value
    };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    }

    productForm.reset();
    fetchProducts();
});

const editProduct = (id, name, category, stock, price) => {
    productIdInput.value = id;
    document.getElementById('name').value = name;
    document.getElementById('category').value = category;
    document.getElementById('stock').value = stock;
    document.getElementById('price').value = price;
};

const deleteProduct = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    fetchProducts();
}

fetchProducts();