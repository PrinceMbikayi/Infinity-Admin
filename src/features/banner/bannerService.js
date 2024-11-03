import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

// Get all banners
const getBanners = async () => {
  const response = await axios.get(`${base_url}banner/banners`);
  return response.data;
};

// Get single banner
const getBanner = async (id) => {
  const response = await axios.get(`${base_url}banner/banner/${id}`);
  return response.data;
};

// Create a banner
const createBanner = async (banner) => {
  const response = await axios.post(`${base_url}banner/admin/banner/new`, banner, config);
  return response.data;
};

// Delete a banner
const deleteBanner = async (bannerId) => {
  const response = await axios.delete(`${base_url}banner/admin/banner/${bannerId}`, config);
  return response.data;
};

// Update a banner
const updateBanner = async (bannerId, bannerData) => {
  const response = await axios.put(`${base_url}banner/admin/banner/${bannerId}`, bannerData, config);
  return response.data;
};

const bannerService = {
  getBanners,
  getBanner,
  createBanner,
  deleteBanner,
  updateBanner,
};

export default bannerService;
