import axios from "axios";
import { useMutation } from "react-query";

// Change the IP address everytime change the connection
// const API_URL = "http://172.16.41.70:3000/payments/intents"; // LRC
const API_URL = "http://192.168.43.83:3000/payments/intents"; // Mobile Data

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
