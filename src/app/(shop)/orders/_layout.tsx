import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useOrderUpdateSubscription } from "../../../api/subscriptions";

export default function OrderLayout() {
  useOrderUpdateSubscription();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
