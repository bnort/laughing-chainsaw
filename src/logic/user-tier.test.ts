import { Offer } from "@/api/types";
import { UserTier } from "@/constants/tiers";
import {
  getTier,
  getTierProgress,
  groupOffersByTier,
  isEligible
} from "@/logic/user-tier";

function makeOffer(id: number, tierEligible: UserTier): Offer {
  return { id, type: "discount", text: `Offer ${id}`, tierEligible };
}

describe("getTier", () => {
  test.each<[number, UserTier]>([
    [0, "bronze"],
    [499, "bronze"],
    [500, "silver"],
    [1999, "silver"],
    [2000, "gold"],
    [4999, "gold"],
    [5000, "platinum"],
    [1_000_000, "platinum"],
  ])("%i points is %s", (points, expected) => {
    expect(getTier(points)).toBe(expected);
  });

  it("falls back to bronze for negative points", () => {
    expect(getTier(-100)).toBe("bronze");
  });
});

describe("getTierProgress", () => {
  it("starts at zero progress for a new user", () => {
    expect(getTierProgress(0)).toEqual({
      tier: "bronze",
      nextTier: "silver",
      progress: 0,
      pointsToNext: 500,
    });
  });

  it("reports partial progress within a tier", () => {
    expect(getTierProgress(250)).toEqual({
      tier: "bronze",
      nextTier: "silver",
      progress: 0.5,
      pointsToNext: 250,
    });
    expect(getTierProgress(3500)).toEqual({
      tier: "gold",
      nextTier: "platinum",
      progress: 0.5,
      pointsToNext: 1500,
    });
  });

  it("resets progress on reaching a new tier", () => {
    expect(getTierProgress(500)).toEqual({
      tier: "silver",
      nextTier: "gold",
      progress: 0,
      pointsToNext: 1500,
    });
  });

  it("has no next tier at the top tier", () => {
    expect(getTierProgress(9000)).toEqual({
      tier: "platinum",
      nextTier: undefined,
      progress: 0,
      pointsToNext: 0,
    });
  });
});

describe("isEligible", () => {
  test.each<[number, UserTier, boolean]>([
    [0, "bronze", true],
    [0, "silver", false],
    [500, "silver", true],
    [500, "gold", false],
    [2000, "bronze", true],
    [5000, "platinum", true],
    [4999, "platinum", false],
  ])("%i points, %s offer -> %s", (points, offerTier, expected) => {
    expect(isEligible(points, makeOffer(1, offerTier))).toBe(expected);
  });
});

describe("groupOffersByTier", () => {
  const bronze = makeOffer(1, "bronze");
  const silver = makeOffer(2, "silver");
  const gold = makeOffer(3, "gold");
  const platinum = makeOffer(4, "platinum");
  const allOffers = [bronze, silver, gold, platinum];

  it("puts eligible offers in an unlocked section and the rest in locked sections by tier", () => {
    expect(groupOffersByTier(allOffers, 600)).toEqual([
      { tier: "silver", locked: false, data: [bronze, silver] },
      { tier: "gold", locked: true, data: [gold] },
      { tier: "platinum", locked: true, data: [platinum] },
    ]);
  });

  it("skips locked tiers that have no offers", () => {
    expect(groupOffersByTier([bronze, platinum], 0)).toEqual([
      { tier: "bronze", locked: false, data: [bronze] },
      { tier: "platinum", locked: true, data: [platinum] },
    ]);
  });

  it("unlocks everything for a top-tier user", () => {
    expect(groupOffersByTier(allOffers, 5000)).toEqual([
      { tier: "platinum", locked: false, data: allOffers },
    ]);
  });

  it("always includes the user's tier section, even when empty", () => {
    expect(groupOffersByTier([], 2000)).toEqual([
      { tier: "gold", locked: false, data: [] },
    ]);
    expect(groupOffersByTier([gold], 0)).toEqual([
      { tier: "bronze", locked: false, data: [] },
      { tier: "gold", locked: true, data: [gold] },
    ]);
  });

  it("preserves the original offer order within a section", () => {
    const extraBronze = makeOffer(5, "bronze");
    const [unlocked] = groupOffersByTier([silver, bronze, extraBronze], 1000);
    expect(unlocked.data).toEqual([silver, bronze, extraBronze]);
  });
});
