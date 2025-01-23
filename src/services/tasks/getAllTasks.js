import axios from "axios";
import { getApiUrl } from "../../helpers/api";

export const getAllTasks = async () => {
    try {
        const result = await axios.get(`${getApiUrl()}/get-tasks`);
        return result.data
    } catch (e) {
        if (e.response?.data) return e.response.data
        console.error(e);
    }
}
