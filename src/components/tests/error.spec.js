import { render, screen } from "@testing-library/react"
import Error from "../error"

describe("Error component", () => {
    test("should render fine", () => {
        const errors = ["fine"]
        render(<Error errors={errors} />)

        expect(screen.getByText("fine")).toBeInTheDocument();
    })
})
