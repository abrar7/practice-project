import axios from "axios";

// ====================================================

const backendUrl =
  "https://fyp-backend-abrar-ul-haqs-projects.vercel.app/insertPurchases";

export const useSavePurchase = async (data) => {
  try {
    const response = await axios.post(backendUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
