import { Offer } from "@/api/types";
import { Spacing } from "@/constants/theme";
import { useCurrentOffers } from "@/hooks/use-current-offers";
import { groupOffersByTier, OfferSection } from "@/logic/user-tier";
import {
  SectionList,
  SectionListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import { OfferRow } from "./offer-row";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const renderOfferRow: SectionListRenderItem<Offer, OfferSection> = ({
  item,
  section,
}) => {
  return <OfferRow offer={item} locked={section.locked} />;
};

export type OfferListProps = {
  lifetimePoints: number;
  points: number;
  header?: React.ReactElement;
};

function getSectionHeader(section: OfferSection) {
  if (!section.locked) {
    return <ThemedText type="subtitle">Your offers</ThemedText>;
  } else {
    return (
      <ThemedText type="subtitle">
        Unlock at {section.tier.toUpperCase()}
      </ThemedText>
    );
  }
}

function Separator() {
  return <View style={styles.separator} />;
}

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
      renderSectionHeader={({ section }) => getSectionHeader(section)}
      keyExtractor={(offer) => String(offer.id)}
      renderSectionFooter={({ section }) =>
        !section.locked && section.data.length === 0 ? (
          <ThemedText type="small">No offers yet, stay tuned.</ThemedText>
        ) : null
      }
      ListHeaderComponent={props.header}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={Separator}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.four,
  },
  separator: {
    height: Spacing.two,
  },
});
