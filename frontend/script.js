const API_URL = 'http://localhost:3000/api/products';

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const productIdInput = document.getElementById('productId');

const createProductRow = (product) => {
    const tr = document.createElement('tr');
    tr.className = 'product-caja'
    tr.classList = 'h-12 text-center'
    tr.dataset.id = product.id;
    
    tr.innerHTML = `
        <td class="font-light">${product.name}</td>
        <td class="font-light">${product.category}</td>
        <td class="font-light"">${product.stock}</td>
        <td class="font-light">$${product.price}</td>
        <td>
            <button class="editar" onclick="editProduct(${product.id}, '${product.name}', '${product.category}', ${product.stock}, ${product.price})">✏ Editar</button>
            <button class="eliminar" onclick="deleteProduct(${product.id})">🗑 Eliminar</button>
        </td>
    `;
    return tr;
};

const fetchProducts = async () => {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al cargar los productos");
        const products = await res.json();

        productList.innerHTML = "";
        products.forEach(product => productList.appendChild(createProductRow(product)));
    } catch (error) {
        console.error(error);
        alert("No se pudo cargar los productos.");
    }
};

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = productIdInput.value;
    const product = {
        name: document.getElementById('name').value.trim(),
        category: document.getElementById('category').value.trim(),
        stock: Number(document.getElementById('stock').value),
        price: Number(document.getElementById('price').value)
    };

    if (!product.name || !product.category || product.stock <= 0 || product.price <= 0) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    try {
        let res;
        if (id) {
            res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });

            if (res.ok) {
                const updatedRow = document.querySelector(`tr[data-id="${id}"]`);
                updatedRow.replaceWith(createProductRow({ ...product, id }));
            }
        } else {
            res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });

            if (res.ok) {
                const newProduct = await res.json();
                productList.appendChild(createProductRow(newProduct));
            }
        }
    } catch (error) {
        console.error(error);
        alert("Error al guardar el producto.");
    }

    productForm.reset();
    productIdInput.value = "";
});

const editProduct = (id, name, category, stock, price) => {
    productIdInput.value = id;
    document.getElementById('name').value = name;
    document.getElementById('category').value = category;
    document.getElementById('stock').value = stock;
    document.getElementById('price').value = price;
};

const deleteProduct = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Error al eliminar el producto");

        document.querySelector(`tr[data-id="${id}"]`).remove();
    } catch (error) {
        console.error(error);
        alert("No se pudo eliminar el producto.");
    }
};

fetchProducts();
