import { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Container from "./components/container";
import { useAnimation } from "./hooks/animation";
import Header from "./components/header";
import { getTargetStatus } from "./helpers/status";
import { getApiUrl } from "./helpers/api";
import Error from "./components/error";

function App() {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]);
  const [closing, setClosing] = useState([]);
  const [opening, setOpening] = useState([]);

  const getAllTasks = useCallback(async () => {
    try {
      const result = await axios.get(`${getApiUrl()}/get-tasks`);
      setTasks(result.data.data);
    } catch (e) {
      if (e.response?.data) handleError(e.response.data.error);
      console.error(e);
    }
  }, [setTasks]);

  const updateTaskStatus = useCallback(
    async (id, status, dir) => {
      const targetStatus = getTargetStatus(status, dir);
      try {
        const result = await axios.put(`${getApiUrl()}/update-tasks`, {
          id,
          status: targetStatus,
        });

        if (result.status === 204) {
          useAnimation(id, targetStatus, setClosing, setOpening, setTasks);
        }
      } catch (e) {
        if (e.response?.data) handleError(e.response.data.error);
        console.error(e);
      }
    },
    [setClosing, setOpening, setTasks],
  );

  useEffect(() => {
    getAllTasks();
  }, []);

  const updateTaskList = (task) => setTasks((val) => [...val, task]);
  const handleError = (errors) => setErrors((_) => [...errors]);

  return (
    <div className="main">
      <Header />
      {errors.length > 0 && (
        <Error errors={errors} onFinish={() => setErrors([])} />
      )}
      <div className="taskContainerWrapper">
        <Container
          color="blue"
          status={"todo"}
          name="To do"
          closing={closing}
          opening={opening}
          onUpdate={updateTaskStatus}
          tasks={tasks.filter((task) => task.status === "todo")}
          onCreate={updateTaskList}
          onError={handleError}
        />
        <Container
          color="orange"
          name="Doing"
          status={"doing"}
          closing={closing}
          opening={opening}
          onUpdate={updateTaskStatus}
          tasks={tasks.filter((task) => task.status === "doing")}
          onCreate={updateTaskList}
          onError={handleError}
        />
        <Container
          color="green"
          name="Done"
          status={"done"}
          closing={closing}
          opening={opening}
          onUpdate={updateTaskStatus}
          tasks={tasks.filter((task) => task.status === "done")}
          onCreate={updateTaskList}
          onError={handleError}
        />
      </div>
    </div>
  );
}

export default App;
