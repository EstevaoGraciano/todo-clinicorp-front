import { render, screen } from "@testing-library/react";
import Card from "../card";

describe("Card component", () => {
  test("should render normal card", () => {
    const task = {
      id: 1,
      description: "desc",
      responsable: "responsable",
      computer: "computer",
    };

    render(<Card color={"blue"} status={"todo"} {...task}/>);

    expect(screen.getByText("desc")).toBeInTheDocument();
    expect(screen.getByText("responsable")).toBeInTheDocument();
    expect(screen.getByText("computer")).toBeInTheDocument();
  });

  test("should render create card", () => {
    render(<Card color={"blue"} status={"todo"} createCard={true }/>);

    expect(screen.getByText("Create new Task")).toBeInTheDocument();
  });
});
