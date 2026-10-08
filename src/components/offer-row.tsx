import { StyleSheet, View } from "react-native";

import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

import { Offer } from "@/api/types";
import { Spacing } from "@/constants/theme";

type OfferRowProps = {
  offer: Offer;
};

export function OfferRow(offer: OfferRowProps) {
  return (
    <View style={styles.stepRow}>
      <ThemedView type="backgroundSelected" style={styles.codeSnippet}>
        <ThemedText type="small">{offer.offer.type}</ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  codeSnippet: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
});
