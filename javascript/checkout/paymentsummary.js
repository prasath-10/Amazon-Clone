import { cart } from '../../backend/cart.js';
import { getproduct } from '../../backend/products.js';
import { getdeliveryoption } from '../../javascript/delivaryoption.js';
import {formatcurrency} from '../utlis/money.js';

export function renderpaymentsummary() {
  let productprice = 0;
  let shippingprice = 0;

  cart.forEach((cartItem) => {
    const product = getproduct(cartItem.productId);
    productprice += product.priceCents * cartItem.quantity;

    const deliveryoption = getdeliveryoption(cartItem.delivaryoptionid);
    shippingprice += deliveryoption.priceCents;
  });

  console.log('Product Price:', productprice);
  console.log('Shipping Price:', shippingprice);

  const totalbeforecents=productprice+ shippingprice;
  const taxprice=totalbeforecents * 0.1;
  const totalcents=totalbeforecents+taxprice;
  
  const paymenthtml=` <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
          <div>Items (3):</div>
          <div class="payment-summary-money">$${formatcurrency(productprice)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">${formatcurrency(shippingprice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">${formatcurrency(totalbeforecents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">${formatcurrency(taxprice)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">${formatcurrency(totalcents)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>


  `;
  document.querySelector('.js-payment-summary').innerHTML=paymenthtml;

}
