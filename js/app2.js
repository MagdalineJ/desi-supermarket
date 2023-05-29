// fetching data
const arr = [];

const loadProducts = (url) => {
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         arr.push(data);
         showProducts(data);
        //  console.log(data)
      });
};
loadProducts('https://fakestoreapi.com/products');


// showing products to ui 

const showProducts=(products)=>{

// console.log(products)
setInnerText('total_products', products.length);
document.getElementById("all-products").innerHTML = "";

for (const product of products) {
    const image = product.image;
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `<div class="single-product row-cols-3 ">
    <div>
  <img class="product-image" src=${image}></img>
    </div>
    <h3>${product.title}</h3>
    <p>Category: ${product.category}</p>
    <h2>Price: $ ${product.price}</h2>

    <button onclick="showProductDetails(${product.id})" id="details-btn"    data-bs-toggle="modal"
    data-bs-target="#exampleModal" class="btn btn-outline-secondary mb-2 rounded-1 mt-1">Details</button>
    
    <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success border-0 w-100 rounded-0 bg-main py-2">Add to cart</button>
    `;
    document.getElementById('all-products').appendChild(div);

}
}





let count =0;
// adding to cart
const addToCart = ( id,value) => {
   count = count + 1;
//    console.log(count );
   updatePrice('price', value);
   updateTaxAndCharge();
   updateTotal();
   document.getElementById('total-Products').innerText = count;
   return count;
};



// showing detail for each item in a modal
// fetching the data
const showProductDetails = (product_id) => {
    // console.log(product_id);
    fetch(`https://fakestoreapi.com/products/${product_id}`)
       .then((res) => res.json())
       .then((data) => showProductDetailsInModal(data));
 };

// showing the data
const showProductDetailsInModal = (product) => {
    // console.log(product);
    setInnerText('productId', product.id);
    setInnerText('rating', product.rating.rate);
    setInnerText('ratingCount', product.rating.count);
    document.getElementById('exampleModalLabel').innerText=product.title;
    document.getElementById('modal_body').innerText=product.description;

   

 };


// function to convert
const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
 };


// creating  a common get element by id function to set number innerText 
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = Math.round(value*100)/100;
 };



 // main price update function
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = Math.round(total*100)/100;
 };


 // update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue('price');
    if (priceConverted > 200) {
       setInnerText('delivery-charge', 30);
       setInnerText('total-tax', priceConverted * 0.2);
    }
    if (priceConverted > 400) {
       setInnerText('delivery-charge', 50);
       setInnerText('total-tax', priceConverted * 0.3);
    }
    if (priceConverted > 500) {
       setInnerText('delivery-charge', 60);
       setInnerText('total-tax', priceConverted * 0.4);
    }
 };
 
 //grandTotal update function
const updateTotal = () => {
    const grandTotal =
       getInputValue('price') +
       getInputValue('delivery-charge') +
       getInputValue('total-tax');
    document.getElementById('total').innerText = grandTotal;
 };

 // search by category
 const search =()=>{
    const inputField = document.getElementById("input-value").value;
    if(inputField!==''){ 
      

        const searchedProduct = arr[0].filter((p) =>
        p.category.startsWith(`${inputField}`)
      );
    if(searchedProduct.length ===0){
    alert('product not found!')
    }else{
        // console.log(searchedProduct)
        showProducts(searchedProduct);
        
    }
        // console.log(inputField)}
    }
    else{alert(' must not b empty')}
    document.getElementById("input-value").value='';
    
 }

 