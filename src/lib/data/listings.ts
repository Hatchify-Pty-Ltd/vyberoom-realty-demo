// Seed listings for the investor demo target repo.
// Required shape per the vyberoom investor-demo spec:
//   Array<{ id: string; title: string; price: number; featured: boolean }>
// with at least 3 entries flagged `featured: true`.
//
// The agent will mutate this file during the live demo (typically toggling
// `featured` or adding a new listing). Branch protection on `main` ensures
// any change goes through a PR + code-owner review.

export interface Listing {
  id: string;
  title: string;
  price: number;
  featured: boolean;
}

export const listings: Listing[] = [
  {
    id: "listing-001",
    title: "Penthouse — Saigon Riverside",
    price: 1_850_000,
    featured: true,
  },
  {
    id: "listing-002",
    title: "Townhouse — District 2 Thao Dien",
    price: 920_000,
    featured: true,
  },
  {
    id: "listing-003",
    title: "Loft — Bitexco Heritage",
    price: 1_240_000,
    featured: true,
  },
  {
    id: "listing-004",
    title: "Garden Villa — Phu My Hung",
    price: 2_450_000,
    featured: false,
  },
  {
    id: "listing-005",
    title: "Studio — District 1 Ben Thanh",
    price: 380_000,
    featured: false,
  },
];
