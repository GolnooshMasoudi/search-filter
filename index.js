const btns = document.querySelectorAll(".btn");
const productsDOM = document.querySelector(".products-center");
// const storeProducts = document.querySelectorAll(".product");
const searchInput = document.querySelector("#search");

let allProductsData = [];
const filters = {
  searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      console.log(res.data);
      allProductsData = res.data;
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(products, _filters) {
  const filteredProducts = products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });
  productsDOM.innerHTML = "";
  console.log(filteredProducts);
  //render to DOM
  filteredProducts.forEach((item, index) => {
    //create
    //content
    //append to products
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    productsDiv.innerHTML = `
      <div class="img-container">
            <img src=${item.image} alt="p-${index}"/>
      </div>
      <div class="product-desc">
            <p class="product-price">$ ${item.price}</p>
            <p class="product-title">${item.title}</p>
      </div>`;
    //appen to DOM
    productsDOM.appendChild(productsDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

//filter base on groups:
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    console.log(e.target.dataset.filter);
    filters.searchItems = filter;
    renderProducts(allProductsData, filters);
  });
});
