import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
export default function Index() {
  const { checkAuth, user, token } = useAuthStore();

  console.log("user", user);
  console.log("token", token);
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>home {user?.username} </Text>
      <Link href="/(auth)">Login</Link>
      <Link href="/(auth)/signup">Signup</Link>
    </View>
  );
}
