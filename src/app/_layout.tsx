import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
export default function RootLayout() {
  return (
    <ToastProvider>
      <Stack>
        <Stack.Screen
          name="(shop)"
          options={{ headerShown: true, title: "Shop" }}
        />
        <Stack.Screen
          name="categories"
          options={{ headerShown: true, title: "Categories" }}
        />
        <Stack.Screen
          name="product"
          options={{ headerShown: false, title: "Product" }}
        />
        <Stack.Screen
          name="cart"
          options={{
            headerShown: true,
            title: "Shopping Cart",
            presentation: "modal",
          }}
        />
        <Stack.Screen name="auth" options={{ headerShown: true }} />
      </Stack>
    </ToastProvider>
  );
}
