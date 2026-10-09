import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { User } from "@/api/types";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { OfferList } from "@/components/offer-list";
import { PointsCard } from "@/components/points-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useCurrentUser } from "@/hooks/use-current-user";

function HomeHeader({ user }: { user: User }) {
  return (
    <View style={styles.wrapper}>
      <ThemedText type="small" themeColor="textSecondary">
        Welcome back,
      </ThemedText>
      <ThemedText type="title">{user.name}!</ThemedText>
      <PointsCard balance={user.balance} lifetimePoints={user.lifetimePoints} />
    </View>
  );
}

export default function ProfileScreen() {
  const { data: user, isPending, isError, refetch } = useCurrentUser();

  if (isPending) {
    return <LoadingState />;
  } else if (isError) {
    return (
      <ErrorState
        message="Unable to load user profile"
        onRetry={() => refetch()}
      />
    );
  }
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <OfferList
          points={user.balance}
          lifetimePoints={user.lifetimePoints}
          header={<HomeHeader user={user} />}
        />
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
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  wrapper: {
    gap: Spacing.four,
    paddingTop: Spacing.four,
  },
  emptyState: {
    padding: Spacing.four,
  },
});
