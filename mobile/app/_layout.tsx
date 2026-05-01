import {
  Stack,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants/api";
export default function RootLayout() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  const segments = useSegments();

  const { checkAuth, user, token } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // handle navigation based on the auth state (only after root navigator mounts)
  // useEffect(() => {
  //   if (!navigationState?.key || !navigationState.routes.length) return;

  //   const inAuthScreen = segments[0] === "(auth)";
  //   const isSignedIn = user && token;

  //   if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
  //   else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  // }, [
  //   navigationState?.key,
  //   navigationState?.routes.length,
  //   user,
  //   token,
  //   segments,
  //   router,
  // ]);

  const [isNavReady, setIsNavReady] = useState(false);

  useEffect(() => {
    if (navigationState?.key) setIsNavReady(true);
  }, [navigationState?.key]);

  useEffect(() => {
    if (!isNavReady) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [isNavReady, user, token, segments, router]);

 

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
