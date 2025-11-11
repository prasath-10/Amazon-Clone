export const delivaryoption = [
  {
    id: '1',
    delivarydate: 7,
    priceCents: 0
  },
  {
    id: '2',
    delivarydate: 3,
    priceCents: 499
  },
  {
    id: '3',
    delivarydate: 1,
    priceCents: 999
  }
];

// ✅ Corrected getdeliveryoption function
export function getdeliveryoption(deliveryoptionid) {
  let matchingoption = null;

  for (let i = 0; i < delivaryoption.length; i++) {
    if (delivaryoption[i].id === deliveryoptionid) {
      matchingoption = delivaryoption[i];
      break;
    }
  }

  // default to first option if not found
  return matchingoption || delivaryoption[0];
}
