import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export function LoadingState() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.accentText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.four,
  },
});
