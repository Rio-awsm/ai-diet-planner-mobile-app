export function calculateNutritionNeeds(userData : any) {
    const { weight, height, gender, age, goal } = userData;
    
    const heightInCm = height > 3 ? height : height * 100;
    
    let bmr;
    if (gender === "Male" || gender === "male") {
      bmr = (10 * weight) + (6.25 * heightInCm) - (5 * age) + 5;
    } else if (gender === "Female" || gender === "female") {
      bmr = (10 * weight) + (6.25 * heightInCm) - (5 * age) - 161;
    } else {
      const maleBmr = (10 * weight) + (6.25 * heightInCm) - (5 * age) + 5;
      const femaleBmr = (10 * weight) + (6.25 * heightInCm) - (5 * age) - 161;
      bmr = (maleBmr + femaleBmr) / 2;
    }
    
    const activityMultipliers = {
      sedentary: 1.2,
      lightActive: 1.375,
      modActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9
    };
    
    const activityFactor = activityMultipliers.modActive;
    const tdee = bmr * activityFactor;
    
    let calories;
    if (goal === "Weight Loss") {
      calories = Math.round(tdee - 500);
    } else if (goal === "Muscle Gain") {
      calories = Math.round(tdee + 350);
    } else if (goal === "Weight Gain") {
      calories = Math.round(tdee + 500);
    } else {
      calories = Math.round(tdee);
    }
    
    let proteins;
    if (goal === "Weight Loss") {
      proteins = Math.round(weight * 2.2);
    } else if (goal === "Muscle Gain") {
      proteins = Math.round(weight * 2.2);
    } else if (goal === "Weight Gain") {
      proteins = Math.round(weight * 1.8);
    } else {
      proteins = Math.round(weight * 1.8);
    }
    
    const minCalories = (gender === "Male" || gender === "male") ? 1500 : 1200;
    calories = Math.max(calories, minCalories);
    proteins = Math.max(proteins, 50);
    
    return { calories, proteins };
   }