import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/users";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";

const rules = [
  {
    required: true,
    message: "Field is required",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true))
      const response = await LoginUser(values);
      dispatch(setLoader(false))
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false))
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate('/');
    }
  }, []);

  return (
    <div className="bg-primary h-screen flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-center text-gray-400 text-2xl">Login</h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email :" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Password :" name="password" rules={rules}>
            <Input type="password" placeholder="Name" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="mt-2">
            Login
          </Button>

          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Dont have an account?
              <Link to="/register" className="text-primary">
                Register here
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
