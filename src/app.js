const shop = document.getElementById("shop");
console.log(shop);
const cartIcon = document.getElementsByClassName("cartAmount");

const databaseMock = [
  {
    id: "jdkajla",
    name: "kiss",
    img: "photos/kizz.jpg",
    desc: "wan ta na me na",
    price: "30",
  },
  {
    id: "orirwoi",
    name: "wizkid",
    img: "photos/wiz.jpg",
    desc: "wan ta na me na",
    price: "34",
  },
  {
    id: "encjrruw",
    name: "Omah Lay",
    img: "photos/omah.webp",
    desc: "wan ta na me na",
    price: "33",
  },
  {
    id: "ie2cj",
    name: "davido",
    img: "photos/davido.webp",
    desc: "wan ta na me na",
    price: "39",
  },
];

let basket = [] || JSON.parse(localStorage.getItem("data"));

function generateShoppingOptions() {
  return (shop.innerHTML = databaseMock
    .map((data) => {
        let search = basket.find((x) => x.id === data.id) || []
      return `
    <div id=1 class="item">
    <img src= ${data.img} width="220" alt="Vibes">
    <div class="about-product">
        <h3>${data.name}</h3>
        <p>${data.desc}</p>
        <div class="quantity">
            <h3>$ ${data.price}</h3>
            <div class="buttons">   
            <i onclick="decrement(${data.id})"class="bi bi-dash-circle"></i>
            <div id= ${data.id} class="howMany">
            ${search.item === undefined? 0 : search.item}
            </div>
            <i onclick="increment(${data.id})" class="bi bi-plus-circle"></i>
            </div>
        </div>
    </div>
</div>  
    `;
    })
    .join(" "));
}

generateShoppingOptions();

function decrement(id) {
  let selectedItem = id;
  let search = basket.find((vibe) => vibe.id === selectedItem.id);


  if(search === undefined) return
  else if (!search || search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }


  basket = basket.filter((p) => p.item !== 0)

  localStorage.setItem("data", JSON.stringify(basket))
  updateCount(selectedItem.id);
}

function increment(id) {
  let selectedItem = id;
  let search = basket.find((vibe) => vibe.id === selectedItem.id);

  if (!search) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket))
  updateCount(selectedItem.id);
}

function updateCount(id) {
  let search = basket.find((item) => item.id === id);

  document.getElementById(id).innerHTML = search.item;

  calculation();
}

function calculation() {
    const iconValues = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
    //Add all the values in the array
    cartIcon.innerHTML = iconValues
}

calculation()
