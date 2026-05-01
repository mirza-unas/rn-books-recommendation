import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "../../store/authStore";
import styles from "../../assets/styles/create.styles";
import { router } from "expo-router";

const profile = () => {
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)");
  };
  return (
    <View>
      <Text>{user?.username}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
