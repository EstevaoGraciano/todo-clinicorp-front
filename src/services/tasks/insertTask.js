import axios from "axios";
import { getApiUrl } from "../../helpers/api";

export const insertTask = async (task) => {
  try {
    const result = await axios.post(`${getApiUrl()}/insert-tasks`, task);

    if (result.status === 201) {
      return result.data;
    }
  } catch (e) {
    if (e.response?.data) return e.response.data;
    console.error(e);
  }
};
