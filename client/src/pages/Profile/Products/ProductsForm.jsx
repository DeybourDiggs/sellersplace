import { Col, Form, Input, Modal, Row, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from '../../../redux/loaderSlice';
import { AddProduct } from "../../../apicalls/products";

const addOns = [
  {
    label: "Bill Available",
    name: "billavailable",
  },

  {
    label: "Warranty Available",
    name: "warrantyavailable",
  },

  {
    label: "Accessories Available",
    name: "accessoriesavailable",
  },

  {
    label: "Box Available",
    name: "boxavailable",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];

const ProductsForm = ({ showProductForm, setShowProductForm }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const onFinish = async (values) => {
    try {
      values.seller = user._id;
      values.status = "pending";
      dispatch(setLoader(true));
      const response = await AddProduct(values);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const formRef = useRef(null);
  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="General" key="1">
          <Form layout="vertical" ref={formRef} onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={rules}>
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={rules}>
              <TextArea type="text" />
            </Form.Item>

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Price" name="price" rules={rules}>
                  <Input type="number" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Category" name="category" rules={rules}>
                  <select name="" id="">
                    <option value="">Select</option>
                    <option value="electronics">Electronics</option>

                    <option value="fashion">Fashion</option>

                    <option value="home">Home</option>

                    <option value="Sports">Sports</option>
                  </select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Age" name="age" rules={rules}>
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>

            <div className="flex gap-10">
              {addOns.map((item) => {
                return (
                  <Form.Item label={item.label} name={item.name} key={item}>
                    <Input
                      type="checkbox"
                      value={item.name}
                      onChange={(e) => {
                        formRef.current.setFieldsValue({
                          [item.name]: e.target.checked,
                        });
                      }}
                      checked={formRef.current?.getFieldValue(item.name)}
                    />
                  </Form.Item>
                );
              })}
            </div>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Images" key="2">
          <h1>Images</h1>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default ProductsForm;
