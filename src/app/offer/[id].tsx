import { Button, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { useOffer } from "@/hooks/use-offer";
import { useLocalSearchParams } from "expo-router";

export default function OfferScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: offer, isPending, isError } = useOffer(Number(id));

  if (isPending) {
    return <ThemedText type="small">Loading...</ThemedText>;
  } else if (isError) {
    return <ThemedText type="small">Error</ThemedText>;
  } else if (!offer) {
    return <ThemedText type="small">No Offer Found</ThemedText>;
  }
  return (
    <View>
      <ThemedView type="backgroundSelected">
        <ThemedText type="small">{offer.type}</ThemedText>
        <Button title="redeem" />
      </ThemedView>
    </View>
  );
}
