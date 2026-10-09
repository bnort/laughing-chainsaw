import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useOffer } from "@/hooks/use-offer";
import { getRedemptionCode } from "@/logic/redemption-code";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import QRCode from "react-native-qrcode-svg";

function RedeemButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
      accessibilityRole="button"
    >
      <ThemedView type="accent" style={styles.button}>
        <ThemedText themeColor="onAccent">Redeem</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

function RedemptionCode({ code }: { code: string }) {
  return (
    <View style={styles.redemptionCode}>
      <ThemedText type="small">Show this when you place your order</ThemedText>
      <QRCode value={code} size={200} quietZone={16} />
      <ThemedText type="code" style={styles.redemptionCodeText}>
        {code}
      </ThemedText>
    </View>
  );
}

export default function OfferScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: offer, isPending, isError } = useOffer(Number(id));
  const [code, setCode] = useState<string | null>(null);

  if (isPending) {
    return <ThemedText type="small">Loading...</ThemedText>;
  } else if (isError) {
    return <ThemedText type="small">Error</ThemedText>;
  } else if (!offer) {
    return <ThemedText type="small">No Offer Found</ThemedText>;
  }

  return (
    <ThemedView style={styles.wrapper}>
      <Stack.Screen options={{ title: offer.type }} />
      <View style={styles.content}>
        <ThemedText type="subtitle">{offer.type}</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          {offer.text}
        </ThemedText>
        {code ? (
          <RedemptionCode code={code} />
        ) : (
          <RedeemButton onPress={() => setCode(getRedemptionCode(offer.id))} />
        )}
      </View>
    </ThemedView>
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
