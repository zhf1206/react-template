const GET_PRODUCT = 'GET_PRODUCT';


export function getProducts(list) {
  return { 
    type: GET_PRODUCT, 
    list 
  }
}