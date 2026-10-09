import { Offer } from "@/api/types";
import { Spacing } from "@/constants/theme";
import { useCurrentOffers } from "@/hooks/use-current-offers";
import { formatTier, groupOffersByTier, OfferSection } from "@/logic/user-tier";
import {
  SectionList,
  SectionListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import { ErrorState } from "./error-state";
import { LoadingState } from "./loading-state";
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
    return (
      <ThemedText
        type="smallBold"
        themeColor="textSecondary"
        style={styles.headerText}
      >
        Your offers
      </ThemedText>
    );
  } else {
    return (
      <ThemedText
        type="smallBold"
        themeColor="textSecondary"
        style={styles.headerText}
      >
        Unlock at {formatTier(section.tier)}
      </ThemedText>
    );
  }
}

function Separator() {
  return <View style={styles.separator} />;
}

export function OfferList(props: OfferListProps) {
  const { data: offers, isPending, isError, refetch } = useCurrentOffers();

  if (isPending) {
    return (
      <ThemedView style={styles.content}>
        {props.header}
        <LoadingState />
      </ThemedView>
    );
  } else if (isError) {
    return (
      <ThemedView style={styles.content}>
        {props.header}
        <ErrorState message="Error loading offers" onRetry={() => refetch()} />
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
      stickySectionHeadersEnabled={false}
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
  headerText: {
    textTransform: "uppercase",
    letterSpacing: 1.5,
    paddingVertical: Spacing.one,
  },
});
