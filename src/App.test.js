import { fireEvent, render, screen } from "@testing-library/react";
import SignalStudy from "./components/SignalStudy";

test("the selected study remains identifiable when canvas is unavailable", () => {
  const context = jest
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  try {
    render(<SignalStudy />);
    const orbit = screen.getByRole("button", { name: "Show Orbit" });
    fireEvent.click(orbit);
    expect(orbit).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "Show Trefoil" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      screen.getByRole("img", { name: /Orbit sculpture/ }),
    ).toBeInTheDocument();
  } finally {
    context.mockRestore();
  }
});
