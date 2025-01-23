import axios from "axios";
import { getApiUrl } from "../../helpers/api";
import { getTargetStatus } from "../../helpers/status";

export const updateTaskStatus = async (id, status, dir) => {
  const targetStatus = getTargetStatus(status, dir);
  try {
    const result = await axios.put(`${getApiUrl()}/update-tasks`, {
      id,
      status: targetStatus,
    });

    if (result.status === 204) {
            return { id, status: targetStatus }
    }
  } catch (e) {
    if (e.response?.data) return e.response.data
    console.error(e);
  }
};
