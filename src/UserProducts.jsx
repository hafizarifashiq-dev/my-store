import ProductManager from "./ProductManager";


function UserProducts({
  products,
  addProduct,
  updateProduct,
  deleteProduct
}) {

  return (

    <ProductManager
      products={products}
      addProduct={addProduct}
      updateProduct={updateProduct}
      deleteProduct={deleteProduct}
      role="user"
    />

  );

}

export default UserProducts;