import { describe, it, expect, beforeEach, afterEach, beforeAll } from "bun:test"
import { cleanup, render } from "@testing-library/react"
import { StickyHeader } from "@/web/components/ui/sticky-header"
import * as React from "react"
describe("StickyHeader", () => {
  afterEach(() => {
    cleanup()
  })

  it("renders children correctly", () => {
    const { getByTestId, getByText } = render(
      <StickyHeader>
        <div data-testid="child">Header Content</div>
      </StickyHeader>
    )
    expect(getByTestId("child")).toBeTruthy()
    expect(getByText("Header Content")).toBeTruthy()
  })

  it("applies glassmorphic styles", () => {
    const { container } = render(
      <StickyHeader>Content</StickyHeader>
    )
    const header = container.firstChild as HTMLElement
    expect(header.className).toContain("sticky")
    expect(header.className).toContain("top-0")
    expect(header.className).toContain("backdrop-blur-md")
    expect(header.className).toContain("bg-background/70")
  })

  it("allows custom className", () => {
    const { container } = render(
      <StickyHeader className="custom-class">Content</StickyHeader>
    )
    const header = container.firstChild as HTMLElement
    expect(header.className).toContain("custom-class")
  })
})
