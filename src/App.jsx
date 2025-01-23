import { useEffect, useState } from "react";
import "./App.css";
import Container from "./components/container";
import { useAnimation } from "./hooks/useAnimation";
import Header from "./components/header";
import Error from "./components/error";
import { getAllTasks } from "./services/tasks/getAllTasks";
import { updateTaskStatus } from "./services/tasks/updateTaskStatus";

function App() {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]);
  const [closing, setClosing] = useState([]);
  const [opening, setOpening] = useState([]);

  const handleUpdateTaskStatus = (id, status, dir) => {
    updateTaskStatus(id, status, dir)
      .then((val) => {
        useAnimation(val.id, val.status, setClosing, setOpening, setTasks);
      })
      .catch((err) => {
        if (err.errors) handleError(err.errors);
      });
  };

  useEffect(() => {
    getAllTasks().then((val) => setTasks(val.data));
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
          onUpdate={handleUpdateTaskStatus}
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
          onUpdate={handleUpdateTaskStatus}
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
          onUpdate={handleUpdateTaskStatus}
          tasks={tasks.filter((task) => task.status === "done")}
          onCreate={updateTaskList}
          onError={handleError}
        />
      </div>
    </div>
  );
}

export default App;
