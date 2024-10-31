import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

// Fonction pour récupérer les produits
const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};

// Fonction pour créer un produit
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);
  return response.data;
};

// Fonction pour supprimer un produit
const deleteProduct = async (productId) => {
  const response = await axios.delete(`${base_url}product/${productId}`, config);
  return response.data;
};

// Fonction pour mettre à jour un produit
const updateProduct = async (productId, productData) => {
  const response = await axios.put(`${base_url}product/${productId}`, productData, config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
