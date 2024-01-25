import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import axios from 'axios';
import { BASE_URL } from "../../utils/config";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    title: '',
    desc: '',
    brand: '',
    model: '',
    price: 0,
    inStock: 0,
    img: ''
  });

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  useEffect(() => {
    if (product) {
      setProductInfo({
        title: product.title || '',
        desc: product.desc || '',
        brand: product.brand || '',
        model: product.model || '',
        price: product.price || 0,
        inStock: product.inStock || 0,
        img: product.img || ''
      });
    }
  }, [product]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    setProductInfo(product);
  }, [product]);

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setProductInfo(prev => ({ ...prev, [e.target.name]: value }));
  };

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`${BASE_URL}orders/income?pid=${productId}`);
        const list = res.data.sort((a, b) => a._id - b._id);
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}products/${productId}`, productInfo);
      toast.success("Product updated successfully");
      setTimeout(() => navigate('/products'), 2000); // Redirige después de 2 segundos
    } catch (err) {
      console.error("Error al actualizar el producto: ", err);
      toast.error("Error updating product");
    }
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Producto</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Crear</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Rendimiento de ventas" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Ventas:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">En stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Nombre de Producto</label>
            <input type="text" name="title" value={productInfo.title} onChange={handleChange} />
            <label>Descripcion</label>
            <input type="text" name="desc" value={productInfo.desc} onChange={handleChange} />
            <label>Marca</label>
            <select name="brand" value={productInfo.brand} onChange={handleChange}>
              <option value="">Elije Marca</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Dell">Dell</option>
              <option value="Lenovo">Lenovo</option>
              <option value="Asus">Asus</option>
              {/* Agrega más marcas según sea necesario */}
            </select>
            <label>Modelo</label>
            <input
              type="text"
              name="model"
              value={productInfo.model}
              onChange={handleChange}
            />
            <label>Precio</label>
            <input type="number" name="price" value={productInfo.price} onChange={handleChange} />
            <label>Stock</label>
            <input
              type="number"
              name="inStock"
              value={productInfo.inStock}
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={handleUpdate}>Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
