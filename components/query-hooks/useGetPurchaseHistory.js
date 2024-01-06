import axios from "axios";

// =============================

export const useGetPurchaseHistory = async (id) => {
  const getPurchaseHistoryBackendURL = `https://fyp-backend-abrar-ul-haqs-projects.vercel.app/purchaseHistory/${id}`;
  try {
    const response = await axios.get(getPurchaseHistoryBackendURL);
    return response.data;
  } catch (err) {
    console.error("Error occur while fetching data, Try again later", err);
    throw err;
  }
};
