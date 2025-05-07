
// import SafeScreen from "../components/SafeScreen"; // corrected path
// import { Stack, useSegments, useRouter, Slot } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { useAuthStore } from "@/store/authStore";
// import { useEffect, useState } from "react";
// import { AuthState } from "@/types/data";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import { useFonts } from 'expo-font';
// import { SplashScreen } from 'expo-router';
// import SplashScreenHome from "../components/SplashScreenHome";

// const queryClient = new QueryClient();

// export default function RootLayout() {
//   const [fontsLoaded] = useFonts({
//     "myFont": require("../assets/fonts/JetBrainsMono-Bold.ttf"),
//     "mySecondFont": require("../assets/fonts/DMSans_18pt-SemiBold.ttf"),
//   });

//   useEffect(() => {
//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }
//   const { checkAuth, user, token } = useAuthStore() as AuthState;
//   const router = useRouter();
//   const segment = useSegments() as string[];
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initAuth = async () => {
//       console.log("Starting auth check");
//       const result = await checkAuth();
//       console.log("Auth check result:", result);
//       setLoading(false);
//     };
//     initAuth();
//   }, []);

//   useEffect(() => {
//     console.log("Routing effect triggered", { loading, user, token, segment });
//     if (loading) {
//       console.log("Still loading, skipping routing");
//       return;
//     }

//     const isAuthScreen = segment.includes("(auth)");
//     const isSigned = !!user && !!token;
//     const isRootRoute = segment.length === 0;

//     console.log("Routing decision:", { isAuthScreen, isSigned, isRootRoute });

//     if (isRootRoute && isSigned) {
//       console.log("Root route detected, redirecting to tabs");
//       router.replace("/(tabs)");
//     } else if (isRootRoute && !isSigned) {
//       console.log("Root route detected, redirecting to login");
//       router.replace("/(auth)/login");
//     } else if (!isAuthScreen && !isSigned) {
//       console.log("Redirecting to login");
//       router.replace("/(auth)/login");
//     } else if (isAuthScreen && isSigned) {
//       console.log("Redirecting to tabs");
//       router.replace("/(tabs)");
//     }
//   }, [user, segment, token, loading]);

//   return (
//     <SafeAreaProvider>
//       <QueryClientProvider client={queryClient}>
//         <SafeScreen>
//           <Stack
//             screenOptions={{
//               headerShown: false,
//             }}
//             initialRouteName={user && token ? "(tabs)" : "(auth)"}
//           />
//           {loading && <SplashScreenHome />}
//         </SafeScreen>
//       </QueryClientProvider>
//     </SafeAreaProvider>
//   );
// }


import SafeScreen from "../components/SafeScreen";
import { Stack, useSegments, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { AuthState } from "@/types/data";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import SplashScreenHome from "../components/SplashScreenHome";

const queryClient = new QueryClient();

export default function RootLayout() {
  // ✅ ALWAYS CALL HOOKS AT THE TOP
  const [fontsLoaded] = useFonts({
    "myFont": require("../assets/fonts/JetBrainsMono-Bold.ttf"),
    "mySecondFont": require("../assets/fonts/DMSans_18pt-SemiBold.ttf"),
  });

  const { checkAuth, user, token } = useAuthStore() as AuthState;
  const router = useRouter();
  const segment = useSegments() as string[];
  const [loading, setLoading] = useState(true);

  // ✅ Use effects AFTER all hooks are declared
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const initAuth = async () => {
      const result = await checkAuth();
      setLoading(false);
    };
    initAuth();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAuthScreen = segment.includes("(auth)");
    const isSigned = !!user && !!token;
    const isRootRoute = segment.length === 0;

    if (isRootRoute && isSigned) {
      router.replace("/(tabs)");
    } else if (isRootRoute && !isSigned) {
      router.replace("/(auth)/login");
    } else if (!isAuthScreen && !isSigned) {
      router.replace("/(auth)/login");
    } else if (isAuthScreen && isSigned) {
      router.replace("/(tabs)");
    }
  }, [user, segment, token, loading]);

  // ✅ Now it's safe to return early based on hook data
  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }} />
          {loading && <SplashScreenHome />}
        </SafeScreen>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
