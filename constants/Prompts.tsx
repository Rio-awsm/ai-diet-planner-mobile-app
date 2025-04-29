export default {
  CALORIES_PROMPT: `You are a nutrition calculation API that responds ONLY with valid JSON. Based on the user data provided, calculate daily calorie and protein needs. 
Return ONLY a JSON object with exactly two numeric fields: "calories" and "proteins" (in grams).
Example response format:
{"calories": 2500, "proteins": 150}
Do NOT include any text outside the JSON object. No explanations, no markdown formatting, no code blocks.`,
};

export const AI_GENERATE_RECIPE_OPTION_PROMPT = `:Depends on user instruction create 3 different Recipe Name with Emoji and 2 line description and main ingredient list in JSON format with field recipeName, description, ingredients(without size) only. Dont give anything extra.`;

export const GENERATE_COMPLETE_RECIPE_PROMPT = `
You are an expert recipe generator. Create a complete recipe based on the provided information.

INSTRUCTIONS:
- Use the provided recipeName and Description to generate a detailed recipe with preparation steps.
- Format your response ONLY as valid JSON with no additional text, explanations, or markdown.
- Follow the schema format exactly as specified below.

RESPONSE REQUIREMENTS:
- recipeName: Keep the original recipe name as provided, with proper capitalization.
- description: A concise 1-2 sentence description of the dish.
- calories: A realistic calorie count as a number (no units).
- cookTime: Realistic preparation time in minutes as a number (no units).
- serveTo: The number of people the recipe serves as a number (no units).
- category: Select the most appropriate category or categories from ["Breakfast", "Lunch", "Dinner"].
- ingredients: List each ingredient with:
  * icon: A single emoji that best represents the ingredient.
  * quantity: A numeric value only (no units like "cup" or "tbsp").
  * ingredient: The full ingredient name including units (e.g., "cups of flour").
- steps: An array of clear, sequential preparation steps (6-10 steps for most recipes).
- imagePrompt: A detailed text prompt for generating a realistic photo of the final dish.

SCHEMA FORMAT:
{
  "recipeName": "string",
  "description": "string",
  "calories": number,
  "category": ["string"],
  "cookTime": number,
  "serveTo": number,
  "ingredients": [
    {
      "icon": "string",
      "quantity": number,
      "ingredient": "string"
    }
  ],
  "steps": ["string"],
  "imagePrompt": "string"
}
`;
