import axios from "axios";
import { useCallback, useState } from "react";

function Card(props) {
  const [creating, setCreating] = useState(false);
  const [responsable, setResponsable] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = useCallback(async () => {
    const task = {
      description,
      responsable,
      status: props.status
    };

    try {
      const result = await axios.post(
        "http://localhost:8080/insert-tasks",
        task,
      );

      if (result.status === 201) {
        props.onCreate && props.onCreate(result.data.data);
        setCreating(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [description, responsable, props]);

  return (
    <div
      onMouseDown={props.onUpdate}
      className={`cardWrapper ${props.color} ${props.opening ? "opening" : ""} 
        ${props.closing ? "closing" : ""}`}
    >
      {props.createCard && !creating && (
        <div onClick={() => setCreating(true)} className="createTask">
          Create new Task
        </div>
      )}
      {creating ? (
        <div className="createWrapper">
          <div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <input
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              placeholder="Responsable"
            />
          </div>
          <div onClick={() => handleCreate()} className="addButton">
            <div>+</div>
          </div>
          <div onClick={() => setCreating(false)} className="cancelButton">
            <div>x</div>
          </div>
        </div>
      ) : (
        <>
          <div className="cardDescription">{props.description}</div>
          <div className="cardResponsable">{props.responsable}</div>
        </>
      )}
    </div>
  );
}

export default Card;
