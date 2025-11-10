export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      delivaryoptionid: "1"
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      delivaryoptionid: "2"
    }
  ];
}

// ✅ Save to localStorage
function savetostorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// ✅ Add item to cart
export function addToCart(cartId) {
  let matchingitem = cart.find((item) => item.productId === cartId);

  if (matchingitem) {
    matchingitem.quantity += 1;
  } else {
    cart.push({
      productId: cartId,
      quantity: 1,
      delivaryoptionid: '1'
    });
  }

  savetostorage();
}

// ✅ Remove item from cart
export function removefromcart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  savetostorage();
}

// ✅ Update delivery option (FIXED)
export function updatedelivaryoption(productId, delivaryoptionid) {
  const matchingitem = cart.find((item) => item.productId === productId);

  if (matchingitem) {
    matchingitem.delivaryoptionid = delivaryoptionid;
    savetostorage();
  }
}
