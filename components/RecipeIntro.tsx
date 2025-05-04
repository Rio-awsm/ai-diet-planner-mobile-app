import Colors from "@/constants/Colors";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RecipeIntro = ({ recipeDetail }: any) => {
  const RecipeDataJson = recipeDetail?.jsonData;
  
  const infoItems = [
    {
      label: "Calories",
      icon: <MaterialCommunityIcons name="fire" size={22} color="#fff" />,
      value: RecipeDataJson?.calories,
    },
    {
      label: "Time",
      icon: <Ionicons name="time-outline" size={22} color="#fff" />,
      value: `${RecipeDataJson?.cookTime} min`,
    },
    {
      label: "Servings",
      icon: <FontAwesome5 name="user-friends" size={20} color="#fff" />,
      value: RecipeDataJson?.serveTo,
    },
  ];

  const renderCategories = () => {
    if (!RecipeDataJson?.category || RecipeDataJson.category.length === 0) return null;
    
    return (
      <View style={styles.categoryContainer}>
        {RecipeDataJson.category.map((cat: string, index: number) => (
          <View key={index} style={styles.categoryTag}>
        <Text style={styles.categoryText}>{cat}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: recipeDetail?.imageUrl }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.recipeName}>{recipeDetail?.recipeName}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {renderCategories()}

        <Text style={styles.description}>{RecipeDataJson?.description}</Text>

        <View style={styles.infoContainer}>
          {infoItems.map((item, index) => (
            <View key={index} style={styles.infoBox}>
              <View style={styles.iconCircle}>
                {item.icon}
              </View>
              <Text style={styles.infoValue}>{item.value}</Text>
              <Text style={styles.infoLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default RecipeIntro;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  imageWrapper: {
    width: '100%',
    height: 280,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    flexShrink: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 14,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
});