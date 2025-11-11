console.log("✅ checkout.js loaded successfully");

import { renderordersummary } from './checkout/ordersummary.js';
import { renderpaymentsummary } from './checkout/paymentsummary.js';

renderordersummary();
renderpaymentsummary();