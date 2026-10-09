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

function getNextTier(tier: UserTier): UserTier | undefined {
  return TIERS[TIERS.indexOf(tier) + 1];
}

export function pointsToTier(
  lifetimePoints: number,
  targetTier: UserTier,
): number {
  return Math.max(0, TIER_THRESHOLDS[targetTier] - lifetimePoints);
}

export type TierProgress = {
  tier: UserTier;
  nextTier: UserTier | undefined;
  progress: number;
  pointsToNext: number;
};

export function getTierProgress(lifetimePoints: number): TierProgress {
  const currentTier = getTier(lifetimePoints);
  const nextTier = getNextTier(currentTier);
  let progress = 0;
  let pointsToNext = 0;

  if (nextTier) {
    progress =
      (lifetimePoints - TIER_THRESHOLDS[currentTier]) /
      (TIER_THRESHOLDS[nextTier] - TIER_THRESHOLDS[currentTier]);
    pointsToNext = pointsToTier(lifetimePoints, nextTier);
  }

  return {
    tier: currentTier,
    nextTier,
    progress,
    pointsToNext,
  };
}

export type OfferSection = { tier: UserTier; locked: boolean; data: Offer[] };
export function groupOffersByTier(offers: Offer[], lifetimePoints: number) {
  const userTier = getTier(lifetimePoints);
  const userRank = TIERS.indexOf(userTier);

  const sections: OfferSection[] = [
    {
      locked: false,
      tier: userTier,
      data: offers.filter(
        (offer) => TIERS.indexOf(offer.tierEligible) <= userRank,
      ),
    },
  ];

  for (const tier of TIERS.slice(userRank + 1)) {
    const tierOffers = offers.filter((offer) => offer.tierEligible === tier);
    if (tierOffers.length === 0) continue;

    sections.push({
      locked: true,
      tier,
      data: tierOffers,
    });
  }

  return sections;
}
