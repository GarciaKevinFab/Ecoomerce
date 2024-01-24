import axios from 'axios';
import { toast } from 'react-toastify';
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

import { BASE_URL } from "../utils/config";

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get(`${BASE_URL}products`);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
    toast.error("No se han podido recuperar los productos.");
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete(`${BASE_URL}products/${id}`);
    dispatch(deleteProductSuccess(id));
    toast.success("Producto eliminado exitosamente");
  } catch (err) {
    dispatch(deleteProductFailure());
    toast.error("No se pudo eliminar el producto");
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await axios.put(`${BASE_URL}products/${id}`, product);
    dispatch(updateProductSuccess({ id, product: res.data }));
    toast.success("Producto actualizado exitosamente");
  } catch (err) {
    dispatch(updateProductFailure());
    toast.error("No se pudo actualizar el producto");
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await axios.post(`${BASE_URL}products`, product);
    dispatch(addProductSuccess(res.data));
    toast.success("Producto agregado exitosamente");
  } catch (err) {
    dispatch(addProductFailure());
    toast.error("No se pudo agregar el producto");
  }
};