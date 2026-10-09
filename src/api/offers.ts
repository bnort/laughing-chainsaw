import { Offer } from "@/api/types";

const defaultOfferList: Offer[] = [
  {
    id: 0,
    type: "Buy 1 Get 1 Free",
    text: "Buy any drink of $15 or more, and get another drink free!",
    tierEligible: "bronze",
  },
  {
    id: 1,
    type: "20% off a Meal",
    text: "Buy any main and get 20% off!",
    tierEligible: "bronze",
  },
  {
    id: 2,
    type: "Free Cocktail with a Meal",
    text: "Buy any main and get a free cocktail!",
    tierEligible: "gold",
  },
];

let fetchCount = 0;

export async function fetchCurrentOffers(): Promise<Offer[]> {
  fetchCount++;
  if (fetchCount % 2 === 0) {
    throw new Error("Mock failure: every second request fails");
  }
  return defaultOfferList;
}
