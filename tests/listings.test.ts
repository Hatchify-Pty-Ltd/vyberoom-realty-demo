import { describe, it, expect } from "vitest";
import { listings, type Listing } from "@/lib/data/listings";

describe("listings fixture", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(listings)).toBe(true);
    expect(listings.length).toBeGreaterThan(0);
  });

  it("every row has the required shape", () => {
    for (const l of listings) {
      expect(typeof l.id).toBe("string");
      expect(l.id.length).toBeGreaterThan(0);
      expect(typeof l.title).toBe("string");
      expect(l.title.length).toBeGreaterThan(0);
      expect(typeof l.price).toBe("number");
      expect(l.price).toBeGreaterThan(0);
      expect(typeof l.featured).toBe("boolean");
    }
  });

  it("at least 3 entries are featured", () => {
    const featured = listings.filter((l: Listing) => l.featured);
    expect(featured.length).toBeGreaterThanOrEqual(3);
  });

  it("every id is unique", () => {
    const ids = listings.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
