const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/"

class Basket {
  constructor(container = '#basket-list'){
    this.container = container;
    this.goodsBasket = [];
    this.allProducts = [];
    this.getProductsBasket()
      .then(data => {
        this.goodsBasket = [...data.contents]
        this._render();
      })

  }

  getProductsBasket(){
    return fetch(`${API}/getBasket.json`)
    .then(result => result.json())
    .catch(error => {
      console.log(error);
    })
  }

  _render() {
    const block = document.querySelector(this.container);

    this.goodsBasket.forEach((product) => {
      const productObject = new ElBasket(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    });
  }
  //Удаление из корзины
  // removeItem(){
  // }

  // менять количество товара
  // changeQuantityItem(){
  // }

  // пересчет итоговой суммы
  // recaltotalPrice(){
  // }

  // заполение формы доставки
  // completionForm(){
  // }

}

class ElBasket {
  constructor(product) {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.quantity = product.quantity;
  }

  render() {
    return `<div class="basket-item" data-id="${this.id}">
              <div class="desc">
                  <h3>${this.product_name}</h3>
                  <p>${this.price} \u20bd</p>
                  <p>${this.quantity}</p>
              </div>
          </div>`;
  }
} 


class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts()
      .then(data => {
        this.goods = [...data];
        this._render();
      });
  }

  _getProducts(){
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

  totalPrice() {
    return this.goods.reduce((sum, {price}) => sum + price, 0);
  }
  
  _render() {
    const block = document.querySelector(this.container);

    this.goods.forEach((product) => {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    });
    const totalPrice = this.totalPrice();
    block.insertAdjacentHTML('beforeend', `Итог: ${totalPrice}`);
  }
}

class ProductItem {
  constructor(product, img='img/cat.jpg') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.product_name}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

const productList = new ProductList();

// Первое ДЗ

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = ({ title, price }, img='https://placehold.it/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${title}</h3>
//                   <p>${price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
// document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);
