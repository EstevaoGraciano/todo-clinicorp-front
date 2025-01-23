function Card(props) {
  return (
    <div
      onClick={props.onUpdate}
      className={`cardWrapper ${props.color} ${props.opening ? "opening" : ""} 
        ${props.closing ? "closing" : ""}`}
    >
      <div className="cardDescription">{props.description}</div>
      <div className="cardResponsable">{props.responsable}</div>
    </div>
  );
}

export default Card;
