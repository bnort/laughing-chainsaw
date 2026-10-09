import { Spacing } from "@/constants/theme";
import { formatTier, getTierProgress } from "@/logic/user-tier";
import { StyleSheet, View } from "react-native";
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
      <ThemedText
        type="smallBold"
        themeColor="accentText"
        style={styles.tierText}
      >
        TIER: {formatTier(tier)}
      </ThemedText>
      <View style={styles.pointsText}>
        <ThemedText type="title">{balance.toLocaleString()}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          points
        </ThemedText>
      </View>
      {nextTier ? (
        <View style={styles.progressBarWrapper}>
          <ThemedView
            style={styles.progressBarOuter}
            type={"backgroundSelected"}
          >
            <ThemedView
              style={[styles.progressBarInner, { width: `${progress * 100}%` }]}
              type="accent"
            />
          </ThemedView>
          <ThemedText type="small" themeColor="textSecondary">
            {pointsToNext.toLocaleString()} more lifetime points needed to get
            to {formatTier(nextTier)}
          </ThemedText>
        </View>
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
  progressBarWrapper: {
    gap: Spacing.two,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.one,
    gap: Spacing.two,
  },
  tierText: {
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  pointsText: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: Spacing.two,
  },
});
