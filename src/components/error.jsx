import { useEffect } from "react";

export function Error(props) {
  useEffect(() => {
    setTimeout(() => {
      props.onFinish();
    }, 4000);
  }, []);

  return (
    <div onClick={() => props.onFinish()} className="errors">
      {props.errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  );
}

export default Error;
