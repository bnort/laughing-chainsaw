import { fetchCurrentOffers } from "@/api/offers";
import { useQuery } from "@tanstack/react-query";
import { currentOfferKey } from "./use-current-offers";

export function useOffer(id: number) {
  return useQuery({
    queryKey: currentOfferKey,
    queryFn: fetchCurrentOffers,
    select: (offers) => offers.find((o) => o.id === id),
  });
}
