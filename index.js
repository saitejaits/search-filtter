(async () => {
    
    const productContainerEl = document.getElementById("productContainer");
    const searchInputEl = document.getElementById("searchInput");

    const url ="https://fakestoreapi.com/products";

const fetchProducts = async() => {

    try {
        const responce = await fetch(url);
        return await responce.json();
    } catch (error) {
        return error;
    }
};
// console.log('fetchProducts:', await fetchProducts());

const products = await fetchProducts();

const generateProducts = (product) => {

    return `
    <div class="product-card">
    <div class="image-container">
        <img src="${product.image}"  
        alt="image">
    </div>
    <div class="product-content">
        <h2>${product.title}</h2>
        <p>${product.description.split(" ").slice(0,20).join(" ")}</p>
        <button>${product.price}$</button>
    </div>
</div>
    `;

};

    const renderProducts = (products) => {
        productContainerEl.innerHTML = "";
        products.forEach((product) => {
            productContainerEl.innerHTML += generateProducts(product);
        });
    };

    const filterHandler = (event) => {

        const searchText = event.target.value.toLowerCase();

        const filteredProducts = products.filter((product) => {
            return( 
                product.title.toLowerCase().includes(searchText) || 
            product.description.toLowerCase().includes(searchText)) ;
        })
        renderProducts(filteredProducts);
    }

    searchInputEl.addEventListener("keyup", filterHandler)
    renderProducts(products);
})();