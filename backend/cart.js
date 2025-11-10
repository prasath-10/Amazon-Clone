export let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart=[{
   productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
   quantity:2,
},{
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1,
}];
}


function savetostorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
 export function addToCart (cartId){
 let matchingitem;
         cart.forEach((item)=>{
           if(cartId===item.productId){
             matchingitem=item;
           }
         });
         if(matchingitem){
             matchingitem.quantity+=1;
         }
         else{
          cart.push({
              productId:cartId,
              quantity:1
            });
         }
         savetostorage();
        }

export function removefromcart(productId){
     const newcart=[];
     cart.forEach((cartitem)=>{
      if(cartitem.productId!==productId){
        newcart.push(cartitem);
      }
     });
     cart=newcart;
     savetostorage();
}
  
