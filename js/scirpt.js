const API__URL = "https://fakestoreapi.com/products"
const wrapper = document.querySelector(" .cards")
const loading = document.querySelector(".loading")

async function fetchData(api) {
    let data = await fetch(api)
    data 
    .json()
    .then(res => createCard(res))
    .catch(err => console.log(err))
    .finally(() => {
        loading.style.display = "none"
    })
}
fetchData(API__URL)

function createCard(data) {
  data.forEach(({ title, image, price, rating,description }) => {
    let card = document.createElement("div");
    card.classList.add("wrapper__card");
    card.innerHTML = `
    <div class="wrapper__card__top">
      <img src="${image}" alt="abc">
    </div>
    <div class="wrapper__card__button">
     <h3>${title.slice(0,16)}</h3>
      <p class="rating">${rating.rate}[${rating.count}]</p>
      <p class="description">${description.slice(0,70)}</p>
      <span>
      <p class="price">${price}$ </p>
      </span>
    </div>
    `;
        wrapper.appendChild(card);
  });
}
