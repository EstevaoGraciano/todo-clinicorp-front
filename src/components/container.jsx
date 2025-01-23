import Card from "./card";

function Container(props) {
  return (
    <div>
      <h1 className={props.color}>{props.name}</h1>
      <div className={`taskContainer ${props.color}`}>
        {props.tasks.map((task) => (
          <Card
            closing={props.closing.includes(task.id)}
            opening={props.opening.includes(task.id)}
            onUpdate={(e) => {
console.log(e, e.button)
                            props.onUpdate(task.id, task.status, e.button === 1 ? "left" : "right")}
                        }
            key={task.id}
            color={props.color}
            {...task}
          />
        ))}
      </div>
    </div>
  );
}

export default Container;
