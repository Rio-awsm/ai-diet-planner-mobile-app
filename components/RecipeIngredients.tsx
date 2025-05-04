import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const RecipeIngredients = ({ recipeDetail }: any) => {
  const ingredients = recipeDetail?.jsonData?.ingredients;

  if (!ingredients || !ingredients.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noIngredientsText}>No ingredients available</Text>
      </View>
    );
  }

  const renderIngredient = ({ item, index }: { item: any, index: number }) => (
    <View 
      style={[
        styles.ingredientItem, 
        index % 2 === 0 ? styles.evenItem : styles.oddItem
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.ingredientIcon}>{item.icon}</Text>
      </View>
      <View style={styles.ingredientInfo}>
        <Text style={styles.ingredientName}>
          {item.ingredient || item.ingreedient}
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="food-variant" size={24} color={Colors.PRIMARY} />
        <Text style={styles.headerText}>Ingredients</Text>
      </View>
      
      <View style={styles.servingInfoContainer}>
        <Text style={styles.servingText}>
          For {recipeDetail?.jsonData?.serveTo || 2} servings
        </Text>
      </View>
      
      <FlatList
        data={ingredients}
        renderItem={renderIngredient}
        keyExtractor={(item, index) => `ingredient-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default RecipeIngredients;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginLeft: 8,
  },
  servingInfoContainer: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  servingText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  noIngredientsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    padding: 20,
  },
  listContainer: {
    paddingVertical: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  evenItem: {
    backgroundColor: '#f9f9f9',
  },
  oddItem: {
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  ingredientIcon: {
    fontSize: 22,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textTransform: 'capitalize',
  },
  quantityContainer: {
    backgroundColor: Colors.PRIMARY + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 40,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.PRIMARY,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 2,
  },
});
