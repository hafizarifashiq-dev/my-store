import ProductManager from "./ProductManager";


function AdminProducts({
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
      role="admin"
    />

  );

}

export default AdminProducts;