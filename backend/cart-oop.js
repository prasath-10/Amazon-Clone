

const cart={
  cartItems:undefined,
  loadfromStorage(){

   this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));

if (!this.cartItems) {
  this.cartItems = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      delivaryoptionid: "1"
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      delivaryoptionid: "2"
    }];
  }
},

savetostorage() {
  localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
},

 addToCart(cartId) {
  let matchingitem = this.cartItems.find((item) => item.productId === cartId);

  if (matchingitem) {
    matchingitem.quantity += 1;
  } else {
    this.cartItems.push({
      productId: cartId,
      quantity: 1,
      delivaryoptionid: '1'
    });
  }

  this.savetostorage();
},

removefromcart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
 this. savetostorage();
},

updatedelivaryoption(productId, delivaryoptionid) {
  const matchingitem = cart.find((item) => item.productId === productId);

  if (matchingitem) {
    matchingitem.delivaryoptionid = delivaryoptionid;
   this. savetostorage();
  }
}



};

cart.loadfromStorage();


console.log(cart);

