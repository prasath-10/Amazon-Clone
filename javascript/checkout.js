import { cart, removefromcart, updatedelivaryoption } from '../backend/cart.js';
import { products } from '../backend/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { delivaryoption as deliveryOptions } from '../javascript/delivaryoption.js'; // keep name consistent

function formatcurrency(priceCents) {
  return `$${(priceCents / 100).toFixed(2)}`;
}

let summaryhtml = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  const matchingproduct = products.find((product) => product.id === productId);

  const deliveryOptionId = cartItem.delivaryoptionid;
  let selectedDeliveryOption;

  // ✅ Find the matching delivery option
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      selectedDeliveryOption = option;
    }
  });

  // ✅ Calculate delivery date
  const today = dayjs();
  const deliverydate = today.add(selectedDeliveryOption.delivarydate, 'days');
  const datestring = deliverydate.format('dddd, MMMM D');

  summaryhtml += `
    <div class="cart-item-container js-cart-container-${matchingproduct.id}">
      <div class="delivery-date">
        Delivery date: ${datestring}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingproduct.image}">

        <div class="cart-item-details">
          <div class="product-name">${matchingproduct.name}</div>
          <div class="product-price">$${(matchingproduct.priceCents / 100).toFixed(2)}</div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">Update</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          ${deliveryoptionhtml(matchingproduct, cartItem)}
        </div>
      </div>
    </div>
  `;
});

// ✅ Generate delivery options HTML
function deliveryoptionhtml(matchingproduct, cartItem) {
  let html = '';
  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliverydate = today.add(option.delivarydate, 'days');
    const datestring = deliverydate.format('dddd, MMMM D');

    const pricestring =
      option.priceCents === 0 ? 'Free' : `${formatcurrency(option.priceCents)} -`;

    const ischecked = option.id === cartItem.delivaryoptionid;

    html += `
      <div 
        class="delivery-option js-delivery-option" 
        data-product-id="${matchingproduct.id}" 
        data-delivery-option-id="${option.id}">
        
        <input 
          type="radio"
          ${ischecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingproduct.id}">
          
        <div>
          <div class="delivery-option-date">${datestring}</div>
          <div class="delivery-option-price">${pricestring} Shipping</div>
        </div>
      </div>
    `;
  });
  return html;
}

document.querySelector('.js-summary').innerHTML = summaryhtml;

// ✅ Delete button functionality
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const id = link.dataset.productId;
    removefromcart(id);

    const container = document.querySelector(`.js-cart-container-${id}`);
    container.remove();
  });
});

// ✅ Update delivery option on click
document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const { productId, deliveryOptionId } = element.dataset;
    updatedelivaryoption(productId, deliveryOptionId);
  });
});
