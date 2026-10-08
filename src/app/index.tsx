import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { OfferRow } from "@/components/offer-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useCurrentOffers } from "@/hooks/use-current-offers";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function ProfileScreen() {
  const {
    data: user,
    isPending: isUserPending,
    isError: isUserError,
  } = useCurrentUser();
  const {
    data: offers,
    isPending: isOffersPending,
    isError: isOffersError,
  } = useCurrentOffers();

  if (isUserPending) {
    return (
      <ThemedText type="title" style={styles.title}>
        Loading...
      </ThemedText>
    );
  } else if (isUserError) {
    return (
      <ThemedText type="title" style={styles.title}>
        Error. Sad.
      </ThemedText>
    );
  }
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome back, {user.name}!
          </ThemedText>
          <ThemedText type="subtitle" style={styles.title}>
            Your offers:
          </ThemedText>
          {offers?.map((offer) => (
            <OfferRow key={offer.id} offer={offer} />
          ))}
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
