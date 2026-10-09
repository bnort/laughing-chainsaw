import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Button, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState(props: ErrorStateProps) {
  const theme = useTheme();
  const { message, onRetry } = props;
  return (
    <View style={styles.container}>
      <ThemedText themeColor="textSecondary">{message}</ThemedText>
      {onRetry && <Button title="Retry" onPress={onRetry} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.four,
    gap: Spacing.three,
  },
});
