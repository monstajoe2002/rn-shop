import React from "react";
import { Redirect, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../providers/auth-provider";
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome {...props} size={24} color="#1d4ed8" />;
}
export default function TabsLayout() {
  const { session, mounting } = useAuth();
  if (mounting) return <ActivityIndicator />;
  if (!session) return <Redirect href="/auth" />;
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1d4ed8",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Shop",
            tabBarIcon(props) {
              return <TabBarIcon {...props} name="shopping-cart" />;
            },
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            tabBarIcon(props) {
              return <TabBarIcon {...props} name="book" />;
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
