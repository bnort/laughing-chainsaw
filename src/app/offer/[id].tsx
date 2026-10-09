import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { Offer, User } from "@/api/types";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useOffer } from "@/hooks/use-offer";
import { getRedemptionCode } from "@/logic/redemption-code";
import { isEligible, pointsToTier } from "@/logic/user-tier";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import QRCode from "react-native-qrcode-svg";

function ScreenContainer({ children }: { children: React.ReactNode }) {
  return (
    <ThemedView style={styles.wrapper}>
      <View style={styles.content}>{children}</View>
    </ThemedView>
  );
}

function RedeemButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
      accessibilityRole="button"
    >
      <ThemedView type="accent" style={styles.button}>
        <ThemedText themeColor="onAccent" type="smallBold">
          Redeem
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

function RedemptionCode({ code }: { code: string }) {
  return (
    <View style={styles.redemptionCode}>
      <ThemedText themeColor="textSecondary" type="small">
        Show this when you place your order
      </ThemedText>
      <QRCode value={code} size={200} quietZone={16} />
      <ThemedText type="code" style={styles.redemptionCodeText}>
        {code}
      </ThemedText>
    </View>
  );
}

function RedeemSection({ offer, user }: { offer: Offer; user: User }) {
  const [code, setCode] = useState<string | null>(null);
  if (!isEligible(user.lifetimePoints, offer)) {
    return (
      <ThemedText>
        You are not quite eligible for this offer, our apologies. Earn{" "}
        {pointsToTier(user.lifetimePoints, offer.tierEligible).toLocaleString()}{" "}
        more points to get this offer.
      </ThemedText>
    );
  } else if (code) {
    return <RedemptionCode code={code} />;
  }
  return <RedeemButton onPress={() => setCode(getRedemptionCode(offer.id))} />;
}

export default function OfferScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: offer, isPending, isError, refetch } = useOffer(Number(id));
  const {
    data: user,
    isPending: userPending,
    isError: userError,
    refetch: userRefetch,
  } = useCurrentUser();

  if (isPending || userPending) {
    return (
      <ScreenContainer>
        <LoadingState />
      </ScreenContainer>
    );
  } else if (isError || userError) {
    return (
      <ScreenContainer>
        <ErrorState
          message="Couldn't load this offer"
          onRetry={() => {
            if (isError) refetch();
            if (userError) userRefetch();
          }}
        />
      </ScreenContainer>
    );
  } else if (!offer) {
    return (
      <ScreenContainer>
        <ErrorState message="This offer doesn't exist" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: offer.type }} />
      <ThemedText type="subtitle">{offer.type}</ThemedText>
      <ThemedText type="default" themeColor="textSecondary">
        {offer.text}
      </ThemedText>
      <RedeemSection offer={offer} user={user} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    padding: Spacing.four,
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    width: "100%",
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    paddingVertical: Spacing.three,
    borderRadius: Spacing.one,
  },
  redemptionCode: {
    alignItems: "center",
    gap: Spacing.two,
  },
  redemptionCodeText: {
    letterSpacing: Spacing.one,
  },
});
