import { Form, Input, Modal, message } from "antd";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { PlaceNewBid } from "../../apicalls/products";

const BidModal = ({ showBidModal, setShowBidModal, product, reloadData }) => {
  const {user}= useSelector((state) => state.users)
  const formRef = useRef(null);
  const rules = [
    {
      required: true,
      message: "This field is required",
    },
  ];
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true))
      const response = await PlaceNewBid({
        ...values,
        product: product.seller._id,
        buyer: user._id
      })
      dispatch(setLoader(false))
      if(response.success){
        message.success("Bid placed successfully")
        reloadData()
        setShowBidModal(false)
      }else {
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message)
      dispatch(setLoader(false))
    }
  };
  return (
    <div>
      <Modal
        onCancel={() => setShowBidModal(false)}
        open={showBidModal}
        centered
        width={500}
        onOk={() => formRef.current.submit()}
      >
        <div className="flex flex-col gap-5 mb-5">
          <h1 className="text-zxl font-semibold text-orange-800 text-center">
            New Bid
          </h1>

          <Form layout="vertical" ref={formRef} onFinish={onFinish}>
            <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
              <Input />
            </Form.Item>

            <Form.Item label="Message" name="message" rules={rules}>
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Mobile" name="mobile" rules={rules}>
              <Input type="number" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default BidModal;
