import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {GetProducts} from "../../apicalls/products"
import {setLoader} from "../../redux/loaderSlice"
import {message} from 'antd'
import Divider from '../../components/Divider'
import {useNavigate} from "react-router-dom"

const Home = () => {
  

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved"
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(setLoader(true))
      const response = await GetProducts(filters)
      dispatch(setLoader(false))
      if(response.success) {
        setProducts(response.data)
      }
    } catch (error) {
      dispatch(setLoader(false))
      message.error(error.message)
    }
  }
  

  useEffect(()=> {
    getData()
  }, [])
  return (
    <div>
      <div className="grid grid-cols-5 gap-5 pb-2 cursor-pointer">
      {products.map((product) => {
        return <div className="border border-gray-300 rounded border-solid flex flex-col" key={product._id}
        onClick={() => navigate(`/product/${product._id}`)}
        >
          <img src={product.images[0]} className="w-full h-40 object-cover" alt=""  />
          <Divider/>

          <div className="px-5 flex flex-col gap-2">
            <h1 className="text-lg font-semibold">{product.name}</h1>
            <p className="text-sm">{product.description}</p>
            <Divider/>
            <span className="text-xl font-semibold text-green-900">
              $ {product.price}
            </span>
          </div>
        </div>
      })}
      </div>
    </div>
  );
};

export default Home;
