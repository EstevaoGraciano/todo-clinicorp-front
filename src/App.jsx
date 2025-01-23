import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import axios from "axios";
import Container from "./components/container";
import Creator from "./components/creator";

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

  const handleAnimationOpening = (id) => {
    setClosing((val) => {
      let closingArray = [...val];
      closingArray.splice(
        val.findIndex((i) => i === id),
        1,
      );
      return [...closingArray];
    });
    setOpening((val) => [...val, id]);
    setTimeout(() => {
      setOpening((val) => {
        let openingArray = [...val];
        openingArray.splice(
          val.findIndex((i) => i === id),
          1,
        );
        return [...openingArray];
      });
    }, 300);
  };

  const handleAnimationClosing = (id, status) => {
    setClosing((val) => [...val, id]);
    setTimeout(() => {
      setTasks((val) => {
        let taskArray = [...val];
        const index = taskArray.findIndex((t) => t.id === id);
        let t = taskArray[index];
        t.status = status;
        taskArray[index] = t;
        console.log("index", taskArray[index]);
        return [...taskArray];
      });
      handleAnimationOpening(id);
    }, 300);
  };

  const getAllTasks = useCallback(async () => {
    try {
      const result = await axios.get("http://localhost:8080/get-tasks");
      setTasks(result.data.data);
    } catch (e) {
      console.error(e);
    }
  }, [setTasks]);

  const updateTaskStatus = useCallback(async (id, status) => {
    const targetStatus = getTargetStatus(status);
    try {
      const result = await axios.put("http://localhost:8080/update-tasks", {
        id,
        status: targetStatus,
      });

      if (result.status === 204) {
        handleAnimationClosing(id, targetStatus);
      }
    } catch (e) {
      console.error(e);
    }
  }, [handleAnimationClosing]);

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      <Creator />
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
    </>
  );
}

export default App;
