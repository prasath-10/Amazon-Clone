export const cart=[];
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

}
  
