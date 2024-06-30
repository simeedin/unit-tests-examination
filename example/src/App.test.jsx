import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect } from "vitest";
import App from "./App";

describe("Navigation menu", () => {
  beforeEach(() => {
    render(<App />);
    fireEvent.click(screen.getByAltText("nav-icon"));
  });

  it("should include two navigation links", () => {
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0].textContent).toBe("Booking");
    expect(links[1].textContent).toBe("Confirmation");
  });

  it("should navigate to booking view if Booking is clicked", async () => {
    const links = screen.getAllByRole("link");
    fireEvent.click(links[0]);
    await waitFor(() => {
      expect(screen.queryByText("When, WHAT & Who")).toBeInTheDocument();
    });
  });

  it("should navigate to confirmation view if Confirmation is clicked", async () => {
    const links = screen.getAllByRole("link");
    fireEvent.click(links[1]);
    await waitFor(() => {
      expect(screen.queryByText("Inga bokning gjord!")).toBeInTheDocument();
    });
  });
});
