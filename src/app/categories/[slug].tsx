import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";

import ProductListItem from "../../components/product-list-item";
import { getCatgeoryAndProducts } from "../../api";

export default function Category() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, error, isLoading } = getCatgeoryAndProducts(slug);
  if (isLoading) return <ActivityIndicator />;
  if (error || !data) return <Text>Error:{error?.message}</Text>;
  if (!data.category || !data.products) return <Redirect href={"/404"} />;
  const { category, products } = data;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: category.name }} />
      <Image
        source={{ uri: category.image_url }}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
        data={products}
        keyExtractor={(product) => product.id.toString()}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  categoryImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productsList: {
    flexGrow: 1,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
