import { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Container from "./components/container";
import { useAnimation } from "./hooks/animation";
import Header from "./components/header";
import { getTargetStatus } from "./helpers/status";

function App() {
  const [tasks, setTasks] = useState([]);
  const [closing, setClosing] = useState([]);
  const [opening, setOpening] = useState([]);

  const getAllTasks = useCallback(async () => {
    try {
      const result = await axios.get("http://localhost:8080/get-tasks");
      setTasks(result.data.data);
    } catch (e) {
      console.error(e);
    }
  }, [setTasks]);

  const updateTaskStatus = useCallback(
    async (id, status, dir) => {
      const targetStatus = getTargetStatus(status, dir);
      try {
        const result = await axios.put("http://localhost:8080/update-tasks", {
          id,
          status: targetStatus,
        });

        if (result.status === 204) {
          useAnimation(id, targetStatus, setClosing, setOpening, setTasks);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [setClosing, setOpening, setTasks],
  );

  useEffect(() => {
    getAllTasks();
  }, []);

  const updateTaskList = (task) => setTasks((val) => [...val, task]);

  return (
    <div className="main">
      <Header />
      <div className="taskContainerWrapper">
        <Container
          closing={closing}
          opening={opening}
          onUpdate={updateTaskStatus}
          color="blue"
          name="To do"
          tasks={tasks.filter((task) => task.status === "todo")}
          onCreate={updateTaskList}
          status={"todo"}
        />
        <Container
          closing={closing}
          opening={opening}
          onUpdate={updateTaskStatus}
          color="orange"
          name="Doing"
          tasks={tasks.filter((task) => task.status === "doing")}
          onCreate={updateTaskList}
          status={"doing"}
        />
        <Container
          closing={closing}
          opening={opening}
          onUpdate={updateTaskStatus}
          color="green"
          name="Done"
          tasks={tasks.filter((task) => task.status === "done")}
          onCreate={updateTaskList}
          status={"done"}
        />
      </div>
    </div>
  );
}

export default App;
