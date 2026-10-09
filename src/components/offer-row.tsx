import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

import { Offer } from "@/api/types";
import { Spacing } from "@/constants/theme";
import { Link } from "expo-router";

type OfferRowProps = {
  offer: Offer;
  locked: boolean;
};

export function OfferRow(props: OfferRowProps) {
  const { offer, locked } = props;

  const card = (
    <ThemedView
      type="backgroundElement"
      style={[locked && styles.locked, styles.card]}
    >
      <ThemedText type="small" style={styles.title}>
        {offer.type}
      </ThemedText>
      <ThemedText type="small">{locked ? "🔒" : ">"}</ThemedText>
    </ThemedView>
  );

  if (locked) return card;

  return (
    <Link href={{ pathname: "/offer/[id]", params: { id: offer.id } }} asChild>
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        {card}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.one,
    alignItems: "center",
    flexDirection: "row",
    gap: Spacing.three,
  },
  pressed: { opacity: 0.7 },
  locked: {
    opacity: 0.5,
  },
});
