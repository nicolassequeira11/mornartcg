// Function to add products in the cart
export const handleAddToCart = (selectedProduct, quantity, cartProducts, setCartProducts, setCartQuantity, handleAlert) => {
  const newItem = {
    id: selectedProduct.id,
    name: selectedProduct.name,
    price: selectedProduct.price,
    img: selectedProduct.img[0],
    stock: selectedProduct.stock,
    quantity: quantity,
  };

  // Verificar si el producto ya existe en el carrito
  const updatedCartProducts = cartProducts.map(product => {
    
    if (product.id === newItem.id && (product.quantity + newItem.quantity <= selectedProduct.stock)) {
      handleAlert("success", "Se agrego el producto al carrito.");
      // Si el producto ya existe, aumentar la cantidad
      return {
        ...product,
        quantity: product.quantity + quantity
      };
    } 
    return product;
  });

  // If this product not exist, add it
  if (!updatedCartProducts.some(product => product.id === newItem.id)) {
    if(newItem.stock > 0){
      handleAlert("success", "Se agregó el producto al carrito.");
      updatedCartProducts.push(newItem);
    } else {
      handleAlert("error", "No hay stock disponible.");
    }
  }

  setCartQuantity(updatedCartProducts.length);
  localStorage.setItem("cartQuantity", updatedCartProducts.length);

  setCartProducts(updatedCartProducts);
  localStorage.setItem("cart", JSON.stringify(updatedCartProducts));
};

// Function to add effects in the buttons
export const handleButtonClick = (setButtonClicked) => {
  setButtonClicked(true);
  setTimeout(() => {
    setButtonClicked(false);
  }, 500);
} 
