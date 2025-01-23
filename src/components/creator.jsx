import { useState } from "react";

function Creator() {
  const [description, setDescription] = useState("");
  const [responsable, setResponsable] = useState("");

  return (
    <div className="creatorWrapper">
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
      <button>LOL</button>
    </div>
  );
}

export default Creator;
