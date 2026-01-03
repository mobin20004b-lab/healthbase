import { describe, it, expect, afterEach } from "bun:test";
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { BentoGrid, BentoItem } from "./bento-grid";

afterEach(() => {
  cleanup();
});

describe("BentoGrid", () => {
  it("renders children correctly", () => {
    render(
      <BentoGrid data-testid="bento-grid">
        <BentoItem>Item 1</BentoItem>
        <BentoItem>Item 2</BentoItem>
      </BentoGrid>
    );

    const grid = screen.getByTestId("bento-grid");
    expect(grid).toBeTruthy();
    expect(screen.getByText("Item 1")).toBeTruthy();
    expect(screen.getByText("Item 2")).toBeTruthy();
  });

  it("applies default grid classes", () => {
    render(<BentoGrid data-testid="bento-grid">Content</BentoGrid>);
    const grid = screen.getByTestId("bento-grid");
    expect(grid.className).toContain("grid");
    expect(grid.className).toContain("grid-cols-1");
    expect(grid.className).toContain("md:grid-cols-4");
  });
});

describe("BentoItem", () => {
  it("applies correct colSpan classes", () => {
    render(
      <BentoItem colSpan={2} data-testid="bento-item-2">
        Item
      </BentoItem>
    );
    const item = screen.getByTestId("bento-item-2");
    expect(item.className).toContain("md:col-span-2");
    expect(item.className).toContain("col-span-1"); // Mobile default
  });

  it("applies correct rowSpan classes", () => {
    render(
      <BentoItem rowSpan={2} data-testid="bento-item-row-2">
        Item
      </BentoItem>
    );
    const item = screen.getByTestId("bento-item-row-2");
    expect(item.className).toContain("md:row-span-2");
  });

  it("defaults to span 1 if not specified", () => {
    render(<BentoItem data-testid="bento-item-default">Item</BentoItem>);
    const item = screen.getByTestId("bento-item-default");
    expect(item.className).toContain("md:col-span-1");
    expect(item.className).toContain("md:row-span-1");
  });
});
