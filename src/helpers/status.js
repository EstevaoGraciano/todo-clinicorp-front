export const getTargetStatus = (status, dir) => {
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
