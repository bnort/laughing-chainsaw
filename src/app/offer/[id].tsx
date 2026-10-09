import { Button, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { useOffer } from "@/hooks/use-offer";
import { getRedemptionCode } from "@/logic/redemption-code";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import QRCode from "react-native-qrcode-svg";

function RedeemButton({ onPress }: { onPress: () => void }) {
  return <Button title="Redeem" onPress={onPress} />;
}

function RedemptionCode({ code }: { code: string }) {
  return (
    <View>
      <QRCode value={code} size={200} quietZone={16} />
      <ThemedText type="small">{code}</ThemedText>
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
    <ThemedView style={styles.content}>
      <Stack.Screen options={{ title: offer.type }} />
      <ThemedText type="small">{offer.type}</ThemedText>
      <ThemedText type="small">{offer.text}</ThemedText>
      {code ? (
        <RedemptionCode code={code} />
      ) : (
        <RedeemButton onPress={() => setCode(getRedemptionCode(offer.id))} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
