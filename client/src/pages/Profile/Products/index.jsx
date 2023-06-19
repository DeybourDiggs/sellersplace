import { Button } from "antd";
import { useState } from "react";
import ProductsForm from "./ProductsForm";

const Products = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const columns = [
    {
      title: "  Name",
      dataIndex: "name"
    },
    {
      title: "Description",
      dataIndex: "description"
    },
    {
      title: "Price",
      dataIndex: "price"
    },
    {
      title: "Category",
      dataIndex: "category"
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status"
    },

    {
      title: "Action",
      dataIndex: "action"
    }
  ]
  return (
    <div>
      <div className="flex justify-end">
        <Button type="default" onClick={() => setShowProductForm(true)}>
          Add Product
        </Button>
      </div>

      {showProductForm && <ProductsForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} />}
    </div>
  );
};

export default Products;
