import { useCallback, useState } from "react";

function Creator(props) {
  const [description, setDescription] = useState("");
  const [responsable, setResponsable] = useState("");

  const handleCreate = useCallback(() => {
    const task = {
      description,
      responsable,
      status: "todo",
    };
    props.onCreate && props.onCreate(task);
  }, [description, responsable]);

  return (
    <div className="creatorWrapper">
      <div className="creatorInputWrapper">
        <div className="creatorInput">
          <p>Description</p>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="creatorInput">
          <p>Responsable</p>
          <input
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
          />
        </div>
      </div>
      <button onClick={() => handleCreate()}>Create Task</button>
    </div>
  );
}

export default Creator;
