import { Button, Upload, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loaderSlice";
import { EditProduct, UploadProductImage } from "../../../apicalls/products";

const Images = ({
  selectedProduct,
  setSelectedProduct,
  setShowProductForm,
  getData,
}) => {
  const [showPreview = false, setShowPreview] = useState(true);
  const [images = [], setImages] = useState(selectedProduct.images);
  const [file = null, setFile] = useState(null);
  const dispatch = useDispatch();
  const upload = async () => {
    try {
      dispatch(setLoader(true));
      // Upload Image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null);
        getData();
        // setShowProductForm(false)
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const deleteImage = async (image) => {
    try {
      const updatedImagesArray = images.filter((img) => img !== image);
      const updatedProduct = { ...selectedProduct, images: updatedImagesArray };
      const response = await EditProduct(selectedProduct._id, updatedProduct);
      if(response.success) {
        message.success(response.message)
        setImages(updatedImagesArray)
        getData()
      }else {
        throw new Error(response.message)
      }
      dispatch(setLoader(true));
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex gap-5 mb-5">
        {images.map((image) => {
          return (
            <div
              className="flex gap-2 border border-solid border-gray-500 rounded p-2 items-end"
              key={image}
            >
              <img className="h-20 w-20 object-cover" src={image} alt="" />
              <i
                className="ri-delete-bin-line"
                onClick={() => deleteImage(image)}
              ></i>
            </div>
          );
        })}
      </div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        showUploadList={showPreview}
      >
        <Button type="dashed">Upload Image</Button>
      </Upload>
      <div className="flex justify-end gap-5 mt-5">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(false);
          }}
        >
          Cancel
        </Button>

        <Button type="primary" disabled={!file} onClick={upload}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Images;
