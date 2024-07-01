import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, vi } from "vitest";
import Booking from "./Booking";
import Confirmation from "./Confirmation";
import router from "../router";
import Shoes from "../components/Shoes/Shoes";
import { RouterProvider } from "react-router-dom";

describe("make a booking", () => {
  beforeEach(() => {
    render(
      <RouterProvider router={router}>
        <Booking />
      </RouterProvider>
    );
  });

  it("should include fields for booking details and a submit button", () => {
    waitFor(() => {
      expect(screen.queryByTestId("when")).toBeInTheDocument();
    });

    waitFor(() => {
      expect(screen.queryByTestId("time")).toBeInTheDocument();
    });

    waitFor(() => {
      expect(screen.queryByTestId("people")).toBeInTheDocument();
    });

    waitFor(() => {
      expect(screen.queryByTestId("lanes")).toBeInTheDocument();
    });

    waitFor(() => {
      expect(
        screen.queryByRole("button", { name: "strIIIIIike!" })
      ).toBeInTheDocument();
    });
  });

  it("should allow to type in booking request details", async () => {
    waitFor(() => {
      fireEvent.change(screen.queryByTestId("when"), {
        target: { value: "2024-07-14" },
      });
      fireEvent.change(screen.queryByTestId("time"), {
        target: { value: "19:00" },
      });
      fireEvent.change(screen.queryByTestId("people"), {
        target: { value: "2" },
      });
      fireEvent.change(screen.queryByTestId("lanes"), {
        target: { value: "1" },
      });
    });

    waitFor(() => {
      expect(screen.queryByTestId("when")).toBe("2024-07-14");
      expect(screen.queryByTestId("time")).toBe("19:00");
      expect(screen.queryByTestId("people")).toBe("2");
      expect(screen.queryByTestId("lanes")).toBe("1");
    });
  });
});

describe("add and remove shoes", () => {
  it("should include fields to add or remove shoes", () => {
    waitFor(() => {
      expect(screen.queryByRole("button", { name: "+" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "-" })).toBeInTheDocument();
    });
  });

  it("should allow to add shoes with requested size", () => {
    const updateSize = vi.fn();
    const addShoe = vi.fn();
    const removeShoe = vi.fn();
    const shoes = [];

    const { rerender } = render(
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={shoes}
      />
    );

    waitFor(() => {
      fireEvent.click(screen.queryByRole("button", { name: "+" }));
    });

    shoes.push({ id: vi.fn().mockReturnValue("1"), size: "" });
    rerender(
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={shoes}
      />
    );

    waitFor(() => {
      expect(screen.queryAllByRole("textbox").toHaveLength(shoes.length));
      expect(addShoe).toHaveBeenCalled();
    });
  });

  it("should allow to remove shoes with requested size", () => {
    const updateSize = vi.fn();
    const addShoe = vi.fn();
    const removeShoe = vi.fn();
    const shoes = [{ id: "1", size: "38" }];

    const { rerender } = render(
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={shoes}
      />
    );

    waitFor(() => {
      fireEvent.click(screen.queryByRole("button", { name: "-" }));
    });

    shoes.pop();
    rerender(
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={shoes}
      />
    );

    waitFor(() => {
      expect(removeShoe).toHaveBeenCalledWith("1");
      expect(shoes).toHaveLength(0);
    });
  });

  describe("redirect to confirmation", () => {
    render(
      <RouterProvider router={router}>
        <Confirmation />
      </RouterProvider>
    );

    it("should redirect to confirmation", () => {
      waitFor(() => {
        expect(screen.queryByTestId("when")).toBe("2024-07-14");
        expect(screen.queryByTestId("time")).toBe("19:00");
        expect(screen.queryByTestId("people")).toBe("2");
        expect(screen.queryByTestId("lanes")).toBe("1");
        expect(screen.queryByText("sek").toBe("340 sek"));
        expect(screen.queryByTitle("BookingId")).toBe("STR123BOW45");
        expect(screen.queryByText("See you soon!")).toBeInTheDocument();
      });
    });
  });
});
