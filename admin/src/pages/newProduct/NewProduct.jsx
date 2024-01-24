import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [brand, setBrand] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setInputs((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Por favor, sube una imagen.");
      return;
    }

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Manejo del progreso de la carga
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Manejo de cargas fallidas
        toast.error("Error al subir la imagen: " + error.message);
      },
      () => {
        // Manejo de cargas exitosas
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat, brand: brand };
          addProduct(product, dispatch);
          toast.success("Producto creado con éxito");
          setTimeout(() => navigate('/products'), 2000);
        });
      }
    );
  };


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Nuevo Producto</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Imagen</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Titulo</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Descripcion</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Marca</label>
          <select name="brand" onChange={(e) => setBrand(e.target.value)}>
            <option value="">Elije Marca</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Dell">Dell</option>
            <option value="Lenovo">Lenovo</option>
            <option value="Asus">Asus</option>
            {/* Agrega más marcas según sea necesario */}
          </select>
        </div>
        <div className="addProductItem">
          <label>Modelo</label>
          <input
            name="model"
            type="text"
            placeholder="Modelo del producto"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Precio</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categoria</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input
            name="inStock"
            type="number"
            placeholder="0"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleClick} className="addProductButton">
          Crear
        </button>
      </form>
    </div>
  );
}
