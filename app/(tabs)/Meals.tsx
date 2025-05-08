import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const Meals = () => {
  const recipeList = useQuery(api.Recipes.GetAllRecipes);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter recipes based on search term
  const filteredRecipes = recipeList?.filter(recipe => 
    recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (recipeId : any) => {
    router.push({
      pathname: "/added-recipe-deatil/AddedRecipeDetail",
      params: { recipeId: recipeId },
    });
  };

  const renderRecipeCard = ({ item } : {item: any}) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => handleViewDetails(item._id)}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <View style={styles.recipeOverlay}>
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeName}>{item.recipeName}</Text>
          <Text style={styles.recipeDescription} numberOfLines={2}>
            {item.jsonData?.description || "Delicious recipe awaits you!"}
          </Text>
          
          <View style={styles.recipeMetaContainer}>
            {item.jsonData?.cookTime && (
              <View style={styles.recipeMeta}>
                <Ionicons name="time-outline" size={16} color="#fff" />
                <Text style={styles.recipeMetaText}>{item.jsonData.cookTime} min</Text>
              </View>
            )}
            
            {item.jsonData?.serveTo && (
              <View style={styles.recipeMeta}>
                <Ionicons name="people-outline" size={16} color="#fff" />
                <Text style={styles.recipeMetaText}>{item.jsonData.serveTo} servings</Text>
              </View>
            )}
            
            {item.jsonData?.calories && (
              <View style={styles.recipeMeta}>
                <Ionicons name="flame-outline" size={16} color="#fff" />
                <Text style={styles.recipeMetaText}>{item.jsonData.calories} cal</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => handleViewDetails(item._id)}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Discover Recipes</Text>
      
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for recipes..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={() => setSearchTerm("")}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Generate meal card
      <GenerateMealRecipeCard /> */}
      
      {/* Recipe list */}
      {recipeList ? (
        filteredRecipes?.length > 0 ? (
          <FlatList
            data={filteredRecipes}
            renderItem={renderRecipeCard}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.recipeList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchTerm ? "No recipes found matching your search" : "No recipes available"}
            </Text>
          </View>
        )
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading recipes...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS == "ios" ? 40 : 30,
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  recipeList: {
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    height: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  recipeImage: {
    width: "100%",
    height: "100%",
  },
  recipeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  recipeDescription: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 10,
  },
  recipeMetaContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  recipeMetaText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 4,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    marginRight: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Meals;