import { expect, test, describe } from "bun:test";
import { getClinics } from "../../services/clinics";

describe("Clinic Service", () => {
  test("returns all clinics without filters", async () => {
    const result = await getClinics();
    expect(result.data.length).toBeGreaterThan(0);
  });

  test("filters by city", async () => {
    const result = await getClinics({ city: "Tehran" });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every(c => c.city === "Tehran")).toBe(true);
  });

  test("filters by specialty (single)", async () => {
    const result = await getClinics({ specialty: ["Cardiology"] });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every(c => c.specialties.some(s => s.name === "Cardiology"))).toBe(true);
  });

  test("filters by rating", async () => {
    const result = await getClinics({ minRating: 4.0 });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every(c => (c.averageRating || 0) >= 4.0)).toBe(true);
  });

  test("pagination works", async () => {
     const result1 = await getClinics({ limit: 1, page: 1 });
     const result2 = await getClinics({ limit: 1, page: 2 });
     expect(result1.data.length).toBe(1);
     expect(result2.data.length).toBe(1);
     expect(result1.data[0].id).not.toBe(result2.data[0].id);
  });
});
