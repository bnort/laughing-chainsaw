import { Spacing } from "@/constants/theme";
import { getTierProgress } from "@/logic/user-tier";
import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export function PointsCard({
  balance,
  lifetimePoints,
}: {
  balance: number;
  lifetimePoints: number;
}) {
  const { progress, tier, pointsToNext, nextTier } =
    getTierProgress(lifetimePoints);
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedText type="smallBold" themeColor="accentText">
        TIER: {tier.toUpperCase()}
      </ThemedText>
      <ThemedText type="subtitle">
        Points: {balance.toLocaleString()}
      </ThemedText>
      {nextTier ? (
        <ThemedView type="backgroundElement">
          <ThemedView
            style={styles.progressBarOuter}
            type={"backgroundSelected"}
          >
            <ThemedView
              style={[styles.progressBarInner, { width: `${progress * 100}%` }]}
              type="accent"
            />
          </ThemedView>
          <ThemedText type="small">
            {pointsToNext.toLocaleString()} more lifetime points needed to get
            to {nextTier.toUpperCase()}
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedText type="small">Top tier reached.</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  progressBarOuter: {
    height: Spacing.two,
    borderRadius: Spacing.one,
    overflow: "hidden",
  },
  progressBarInner: {
    height: "100%",
  },
  card: {
    padding: Spacing.two,
    borderRadius: 4,
    gap: Spacing.two,
  },
});
