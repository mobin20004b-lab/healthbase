import { describe, it, expect, afterEach, beforeAll } from "bun:test"
import React from "react"
import { GlobalRegistrator } from "@happy-dom/global-registrator"

// Register Happy DOM before running tests
GlobalRegistrator.register()

// Import testing library after registering happy-dom
import { render, screen, cleanup } from "@testing-library/react"
import { StickyHeader } from "../components/ui/sticky-header"

describe("StickyHeader", () => {
  afterEach(() => {
    cleanup()
  })

  it("renders children correctly", () => {
    render(
      <StickyHeader>
        <span>Header Content</span>
      </StickyHeader>
    )

    // Using container querySelector because screen sometimes has issues with happy-dom global registration timing in bun test
    const content = document.body.textContent
    expect(content).toContain("Header Content")
  })

  it("applies sticky classes", () => {
    const { container } = render(
      <StickyHeader>
        <span>Test</span>
      </StickyHeader>
    )

    const header = container.querySelector("header")
    expect(header).toBeTruthy()
    expect(header?.className).toContain("sticky")
    expect(header?.className).toContain("top-0")
    expect(header?.className).toContain("backdrop-blur-md")
  })

  it("applies custom className", () => {
      const { container } = render(
          <StickyHeader className="custom-class">
              <span>Test</span>
          </StickyHeader>
      )

      const header = container.querySelector("header")
      expect(header?.className).toContain("custom-class")
  })
})
