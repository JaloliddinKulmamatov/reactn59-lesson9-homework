const container = document.querySelector(".cards");
const loading = document.querySelector(".loading")

init();
async function fetchData(api) {
    let data = await fetch(api)
    data 
    .json()
    .then(res => createCard(res.products))
    .catch(err => console.log(err))
    .finally(() => {
        loading.style.display = "none"
    })
}

async function init() {
  checkToken();

  const products = await fetchProducts(); // array
  render(products);
}

function checkToken() {
  const token = localStorage.getItem("token");

  // no token
  if (!token) {
    window.location.href = "http://127.0.0.1:5500/login.html";
  }
}

async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  return products;
}

function render(products) {
  products.forEach(function(product) {
    let card = document.createElement("div");
    card.classList.add("wrapper__card");
    card.innerHTML = `
      <div class="wrapper__card__top">
        <img src="${product.image}" alt="abc">
      </div>
      <div class="wrapper__card__button">
        <h3>${product.title}</h3>
        <p class="description">${product.description}% </p>
        <p class="rating">${product.rating.rate}</p>
        <p class="rating">[${product.rating.count}]</p>
        <span>
          <p class="price">${product.price}$ </p>
        </span>
      </div>`;
    container.appendChild(card);

    card.addEventListener("click", () => singleRoute(product.id));
  });
}


  function singleRoute(id) {
    window.open(`product.html?id=${id}`, "_self")
}