import Card from "./card";

function Container(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <div className={`taskContainer ${props.color}`}>
        {props.tasks.length === 0 && (
          <Card color={props.color} description="Vazio" />
        )}
        {props.tasks.map((task) => (
          <Card
            closing={props.closing.includes(task.id)}
            opening={props.opening.includes(task.id)}
            onUpdate={() => props.onUpdate(task.id, task.status)}
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
