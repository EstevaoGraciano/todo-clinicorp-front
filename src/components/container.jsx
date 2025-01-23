import Card from "./card";

function Container(props) {
  return (
    <div className="taskContainer">
      <div className={`taskContainerHeader ${props.color}`}>
        <h1>{props.name}</h1>
        <p>{props.tasks.length}</p>
      </div>
      <div className={`taskContainerBody ${props.color}`}>
        {props.tasks.map((task) => (
          <Card
            closing={props.closing.includes(task.id)}
            opening={props.opening.includes(task.id)}
            onUpdate={(e) => {
              props.onUpdate(
                task.id,
                task.status,
                e.button === 1 ? "left" : "right",
              );
            }}
            key={task.id}
            color={props.color}
            {...task}
          />
        ))}
        <Card
          color={props.color}
          createCard={true}
          status={props.status}
          onCreate={props.onCreate}
          onError={props.onError}
        />
      </div>
    </div>
  );
}

export default Container;
