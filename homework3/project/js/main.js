const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = []; //массив товаров из JSON документа
    this._getProducts().then((data) => {
      //data - объект js
      this.goods = data;
      //                 console.log(data);
      this.render();
    });
  }
  // _fetchProducts(cb){
  //     getRequest(`${API}/catalogData.json`, (data) => {
  //         this.goods = JSON.parse(data);
  //         console.log(this.goods);
  //         cb();
  //     })
  // }
  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
      });
  }
  calcSum() {
    return this.allProducts.reduce((accum, item) => (accum += item.price), 0);
  }
  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObj = new ProductItem(product);
      //            this.allProducts.push(productObj);
      block.insertAdjacentHTML("beforeend", productObj.render());
    }
  }
}

class ProductItem {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }
  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

class CartList {
  constructor(container = ".cart-window") {
    this.container = container;
    this.goods = []; //массив товаров из JSON документа
    this._getProducts().then((data) => {
      //data - объект js
      this.goods = data.contents;
      //                 console.log(data);
      this.render();
    });
  }
  // _fetchProducts(cb){
  //     getRequest(`${API}/catalogData.json`, (data) => {
  //         this.goods = JSON.parse(data);
  //         console.log(this.goods);
  //         cb();
  //     })
  // }
  _getProducts() {
    return fetch(`${API}/getBasket.json`)
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productCartObj = new CartItem(product);
      //            this.allProducts.push(productObj);
      block.insertAdjacentHTML("beforeend", productCartObj.render());
    }
  }
}

class CartItem {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.quantity = product.quantity;
    this.img = img;
  }
  render() {
    return `<div class="flex-box">
    <div class="cart-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.title}</h3>
                      <p>${this.price} $</p>
                  </div>
              </div>
              <p class="cart-quantity">${this.quantity} шт</p>
              <button class="add cart-btn">Добавить</button>
              <button class="remove cart-btn">Удалить</button>
              </div>`;
  }
}
let list = new ProductsList();
let cartlist = new CartList();
console.log(cartlist);
let cartWindowEl = document.querySelector(".cart-window");
document
  .querySelector(".btn-cart")
  .addEventListener("click", () => cartWindowEl.classList.toggle("hidden"));
cartWindowEl.addEventListener("click", (event) => {
  if (event.target.classList.value === "add cart-btn") {
    console.dir(event.target.parentElement);
  }
  //не успеваю доделать.
});
