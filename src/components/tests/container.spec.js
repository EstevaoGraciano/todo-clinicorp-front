import { render, screen } from "@testing-library/react";
import Container from "../container";

describe("Container component", () => {
  test("should render fine", () => {
    const task = {
      id: 1,
      description: "desc",
      responsable: "responsable",
      computer: "computer",
    };
    const tasks = [task];
    render(
      <Container
        tasks={tasks}
        name={"To do"}
        status={"todo"}
        opening={[]}
        closing={[]}
        color="blue"
      />,
    );

    expect(screen.getByText("desc")).toBeInTheDocument();
    expect(screen.getByText("responsable")).toBeInTheDocument();
    expect(screen.getByText("computer")).toBeInTheDocument();
    expect(screen.getByText("Create new Task")).toBeInTheDocument();
    expect(screen.getByText("To do")).toBeInTheDocument();
  });
});
