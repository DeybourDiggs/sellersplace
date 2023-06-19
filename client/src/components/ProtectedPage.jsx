import { message } from "antd";
import { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
import { setUser } from "../redux/usersSlice";

const ProtectedPage = ({ children }) => {

  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <div>
        <div className="flex justify-between items-center bg-primary p-5">
          <h1 className="text-2xl text-white cursor-pointer" onClick={() => navigate('/')}>PickIt Store</h1>

          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
            <i className="ri-user-2-fill"></i>
            <span className="underline cursor-pointer uppercase" onClick={() => navigate('/profile')}>
              {user.name}
            </span>
            <i
              className="ri-logout-circle-r-line ml-10"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>

        <div className="p-5">{children}</div>
      </div>
    )
  );
};

export default ProtectedPage;
