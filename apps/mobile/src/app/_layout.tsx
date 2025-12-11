import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* This <Stack> component creates the navigation context */}
      <Stack>
        {/* We can set default options for all screens here */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="factor-analysis" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}