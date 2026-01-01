
import { GET } from "@/app/api/search/route"
import { NextRequest } from "next/server"

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    clinic: {
      findMany: jest.fn().mockResolvedValue([{ id: "1", name: "Test Clinic" }]),
    },
  },
}))

describe("Search API", () => {
  it("should return empty list if no query", async () => {
    const req = new NextRequest("http://localhost/api/search")
    const res = await GET(req)
    const json = await res.json()
    expect(json).toEqual([])
  })

  it("should return results if query provided", async () => {
    const req = new NextRequest("http://localhost/api/search?q=Test")
    const res = await GET(req)
    const json = await res.json()
    expect(json).toHaveLength(1)
    expect(json[0].name).toBe("Test Clinic")
  })
})
