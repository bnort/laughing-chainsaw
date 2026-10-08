import { Offer } from "@/api/types";
import { useCurrentOffers } from "@/hooks/use-current-offers";
import { groupOffersByTier } from "@/logic/user-tier";
import { ListRenderItem, SectionList } from "react-native";
import { OfferRow } from "./offer-row";
import { ThemedText } from "./themed-text";

const renderOfferRow: ListRenderItem<Offer> = ({ item }) => {
  return <OfferRow offer={item} />;
};

export type OfferListProps = {
  lifetimePoints: number;
  points: number;
};

export function OfferList(props: OfferListProps) {
  const { data: offers, isPending, isError } = useCurrentOffers();

  if (isPending) {
    return <ThemedText> Loading... </ThemedText>;
  } else if (isError) {
    return <ThemedText> Error... </ThemedText>;
  }

  const sections = groupOffersByTier(offers, props.lifetimePoints);
  return (
    <SectionList
      sections={sections}
      renderItem={renderOfferRow}
      renderSectionHeader={({ section }) => (
        <ThemedText type="subtitle">{section.title}</ThemedText>
      )}
      keyExtractor={(offer) => String(offer.id)}
    />
  );
}
