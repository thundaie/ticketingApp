const { func } = require("joi");

let basket = [] || JSON.parse(localStorage.getItem("data"));
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
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

function calculation() {
  const iconValues = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  //Add all the values in the array
  cartIcon.innerHTML = iconValues;
}

calculation();

function generareCart() {
  if (basket.length === 0) {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="homeBtn">Back to Home</button>
        </a>
        `;
  } else {
    return (shoppingCart.innerHTML = basket
      .map((things) => {
        let search = databaseMock.find((x) => x.id === things.id) || [];
        return `
            <div class="cart-item">
            <img src=${search.img} width="100" alt="vibes">
            <div class="details">
            <div class="title-price">
            <h4 class="view-price">
            <p>${search.name}</p>
            <p class="cart-item-price"> $ ${search.price}</p>
            </h4>
            <i onclick="deleteItem(${things.id})" class="bi bi-x-lg"></i>
            </div>
            <div class="buttons">   
            <i onclick="decrement(${things.id})"class="bi bi-dash-circle"></i>
            <div id= ${things.id} class="howMany">
            ${things.item}
            </div>
            <i onclick="increment(${things.id})" class="bi bi-plus-circle"></i>
            </div>
            <h3>$ ${things.item * search.price}</h3>
            </div>

            </div>
            `;
      })
      .join(" "));
  }
}

generareCart();

function decrement(id) {
    let selectedItem = id;
    let search = basket.find((vibe) => vibe.id === selectedItem.id);
  
  
    if(search === undefined) return
    else if (!search || search.item === 0) {
      return;
    } else {
      search.item -= 1;
    }
  
    updateCount(selectedItem.id)
    basket = basket.filter((p) => p.item !== 0)
    generareCart()
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
    
    generareCart()
  
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
  


  function deleteItem(id) {
    let selctedItem = id
    basket = basket.filter((y) => y.id !== selctedItem.id)
    generareCart()
    localStorage.setItem("data", JSON.stringify(basket))
    
  }

  function totalAmount() {
    if(basket.length !== 0){

    }
    else return

  }


  function clearCart(){

  }