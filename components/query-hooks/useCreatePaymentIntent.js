import axios from "axios";
import { useMutation } from "react-query";

// ====================================================

const backendUrl =
  "https://fyp-backend-abrar-ul-haqs-projects.vercel.app/payments/intents";

const API_URL = backendUrl;

const createPaymentIntent = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export function useCreatePaymentIntent() {
  return useMutation(createPaymentIntent);
}
