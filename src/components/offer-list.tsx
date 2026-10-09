import { Offer } from "@/api/types";
import { Spacing } from "@/constants/theme";
import { useCurrentOffers } from "@/hooks/use-current-offers";
import { groupOffersByTier } from "@/logic/user-tier";
import { ListRenderItem, SectionList, StyleSheet } from "react-native";
import { OfferRow } from "./offer-row";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const renderOfferRow: ListRenderItem<Offer> = ({ item }) => {
  return <OfferRow offer={item} />;
};

export type OfferListProps = {
  lifetimePoints: number;
  points: number;
  header?: React.ReactElement;
};

export function OfferList(props: OfferListProps) {
  const { data: offers, isPending, isError } = useCurrentOffers();

  if (isPending) {
    return (
      <ThemedView>
        {props.header}
        <ThemedText> Loading... </ThemedText>
      </ThemedView>
    );
  } else if (isError) {
    return (
      <ThemedView>
        {props.header}
        <ThemedText> Error... </ThemedText>
      </ThemedView>
    );
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
      ListHeaderComponent={props.header}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.four,
  },
});
