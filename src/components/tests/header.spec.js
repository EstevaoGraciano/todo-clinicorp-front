import { render, screen } from "@testing-library/react"
import Header from "../header"

describe("Header", () => {
    test("should render fine", () => {
        render(<Header />)

        expect(screen.getByText("TODO List")).toBeInTheDocument();
    })
})
