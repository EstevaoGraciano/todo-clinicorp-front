import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import axios from "axios";
import Container from "./components/container";
import Creator from "./components/creator";
import { useAnimation } from "./hooks/animation";

const getTargetStatus = (status, dir) => {
  switch (status) {
    case "todo":
    case "done":
      return "doing";
    case "doing":
      return dir === "left" ? "todo" : "done";
    default:
      return "todo";
  }
};

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

  const insertTask = useCallback(
    async (task) => {
      try {
        const result = await axios.post(
          "http://localhost:8080/insert-tasks",
          task,
        );

        if (result.status === 201)
          setTasks((val) => [...val, result.data.data]);
      } catch (e) {
        console.error(e);
      }
    },
    [setTasks],
  );

  const updateTaskStatus = useCallback(
    async (id, status, dir) => {
      const targetStatus = getTargetStatus(status, dir);
      try {
        const result = await axios.put("http://localhost:8080/update-tasks", {
          id,
          status: targetStatus,
        });

        if (result.status === 204) {
                    useAnimation(id, targetStatus, setClosing, setOpening, setTasks)
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

  return (
    <div className="main">
      <h1>TODO List</h1>
      <Creator onCreate={insertTask} />
      <div className="taskContainerWrapper">
        <Container
          closing={closing}
          opening={opening}
          onUpdate={updateTaskStatus}
          color="blue"
          name="To do"
          tasks={tasks.filter((task) => task.status === "todo")}
        />
        <Container
          closing={closing}
          opening={opening}
          onUpdate={updateTaskStatus}
          color="orange"
          name="Doing"
          tasks={tasks.filter((task) => task.status === "doing")}
        />
        <Container
          closing={closing}
          opening={opening}
          onUpdate={updateTaskStatus}
          color="green"
          name="Done"
          tasks={tasks.filter((task) => task.status === "done")}
        />
      </div>
    </div>
  );
}

export default App;
