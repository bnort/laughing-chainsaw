import { fetchCurrentOffers } from "@/api/offers";
import { useQuery } from "@tanstack/react-query";

export const currentOfferKey = ["currentOffers"];

export function useCurrentOffers() {
  return useQuery({ queryKey: currentOfferKey, queryFn: fetchCurrentOffers });
}
