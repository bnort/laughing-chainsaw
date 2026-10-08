import { Offer } from "@/api/types";
import { TIER_THRESHOLDS, TIERS, UserTier } from "@/constants/tiers";

export function getTier(lifetimePoints: number): UserTier {
  for (const tier of [...TIERS].reverse()) {
    if (lifetimePoints >= TIER_THRESHOLDS[tier]) {
      return tier;
    }
  }
  return "bronze";
}

export function pointsToTier(
  lifetimePoints: number,
  targetTier: UserTier,
): number {
  return Math.max(0, TIER_THRESHOLDS[targetTier] - lifetimePoints);
}

export type OfferSection = { title: string; data: Offer[] };
export function groupOffersByTier(offers: Offer[], lifetimePoints: number) {
  const userRank = TIERS.indexOf(getTier(lifetimePoints));

  const sections: OfferSection[] = [
    {
      title: "Your offers",
      data: offers.filter(
        (offer) => TIERS.indexOf(offer.tierEligible) <= userRank,
      ),
    },
  ];

  for (const tier of TIERS.slice(userRank + 1)) {
    const tierOffers = offers.filter((offer) => offer.tierEligible === tier);
    if (tierOffers.length === 0) continue;

    sections.push({
      title: `Earn ${pointsToTier(lifetimePoints, tier)} more points to unlock ${tier}, giving you these offers:`,
      data: tierOffers,
    });
  }

  return sections;
}
