let url = "https://api.mercadolibre.com/sites/MLA/search?q=";
let urlItems = "https://api.mercadolibre.com/items/"
let urlDescription = "/description";
let ajax = new XMLHttpRequest();
let totalPrice = 0;

const respHandler = (e) => {
      e.preventDefault();
      let consulta = document.querySelector('input[type="text"]').value;
      let lista = document.querySelector("template")
      let container = document.querySelector("div#search")
      container.appendChild(lista.content);
      fetch(url + consulta)
            .then(response => response.json())
            .then(data => data.results)
            .then(listado => {
                  let ul = document.querySelector('ul#items')
                  if (ul.hasChildNodes) {
                        deleteList(ul);
                  }
                  listado.forEach(item => {
                        appendItem(item);
                  })
            })

}
let btn = document.querySelector('input[type="submit"]');
btn.addEventListener("click", respHandler);

function appendItem(item) {
      let liTitle = document.createElement('span');
      liTitle.appendChild(document.createTextNode(item.title));
      liTitle.title = "Ver descripción"
      liTitle.style.cursor = "pointer";
      liTitle.itemPrice = item.price
      liTitle.itemId = item.id;
      liTitle.itemTitle = item.title;
      liTitle.setAttribute("data-toggle", "modal");
      liTitle.setAttribute("data-target", "#descriptionModal");
      let liItem = document.createElement('li');
      liItem.className = 'list-group-item';
      let divCart = document.createElement('div');
      divCart.classList.add("navbar-right");
      let cart = document.createElement('div');
      cart.classList.add("buy-cart");
      cart.itemPrice = item.price;
      cart.itemTitle = item.title;
      let divPrice = document.createElement('div');
      divPrice.classList.add("navbar-right");
      let price = document.createElement('span');
      price.innerText = item.price;
      price.classList.add("price");
      let liImg = document.createElement('li');
      liImg.className = 'list-group-item';
      let img = document.createElement('img');
      img.setAttribute("data-toggle", "modal");
      img.setAttribute("data-target", "#imgModal");
      img.style.cursor = "pointer";
      img.src = item.thumbnail;
      let itemFragment = document.createDocumentFragment();
      itemFragment.appendChild(liTitle);
      divCart.appendChild(cart);
      itemFragment.appendChild(divCart);
      divPrice.appendChild(price);
      itemFragment.appendChild(divPrice);
      liItem.appendChild(itemFragment);
      liImg.appendChild(img);
      itemsFragment = document.createDocumentFragment();
      itemsFragment.appendChild(liItem);
      itemsFragment.appendChild(liImg);
      items.appendChild(itemsFragment);
      liTitle.addEventListener("click", showDescription);
      img.addEventListener("click", showImage);
      divCart.addEventListener("click", changeMainCartImage)
      divCart.addEventListener("click", addToCart);
}
function deleteList(nodo) {
      while (nodo.firstChild) { //borro listado de productos actual
            nodo.removeChild(nodo.firstChild);
      }
};

/*
let deleteList = (function () {
      let executed = false;
      return function () {
            if (executed === false) {
                  executed = true;
            }
            else {
                  let ul = document.querySelector('ul#items')
                  while (ul.firstChild) { //borro listado de productos actual
                        ul.removeChild(ul.firstChild);
                  }
            }
      }
})();
*/


function showDescription(e) {
      let descripcion = urlItems + e.target.itemId + urlDescription;
      fetch(descripcion).then(respuesta => respuesta.json()).then(descrip => {
            document.querySelector('.modal-title').innerText = e.target.itemTitle;
            document.querySelector('.modal-body').innerText = descrip.plain_text;;
      });
}
let changeMainCartImage = (function () {
      let executed = false;
      return function () {
            if (!executed) {
                  executed = true;
                  document.querySelector('.empty-cart').className = 'filled-cart btn'
            }
      };
})();
function showImage(e) {
      let img = document.querySelector(".modal-body-img");
      img.src = e.target.src;
}
function addToCart(e) {
      e.stopPropagation();
      e.target.className = "added-cart"
      let tr = document.createElement('tr');
      let itemQty = document.createElement('td');
      itemQty.className = "quantity"
      itemQty.innerText = 1;
      let itemName = document.createElement('td');
      itemName.className = 'item-name';
      itemName.innerText = e.target.itemTitle;
      let itemPrice = document.createElement('td');
      itemPrice.className = "price";
      itemPrice.innerText = e.target.itemPrice
      let price = Number.parseFloat(e.target.itemPrice, 10);
      totalPrice += price
      tr.appendChild(itemQty);
      tr.appendChild(itemName);
      tr.appendChild(itemPrice);
      let tbody = document.querySelector('tbody');
      tbody.appendChild(tr);
      document.querySelector("th.price").innerText = totalPrice;
}


/*function showList(e) {
      //document.querySelector(".modal-shoppingList-body p").innerText = shoppingList[0];
}

let cartList = document.querySelector(".cart-list");

cartList.addEventListener("click", showList);
*/

