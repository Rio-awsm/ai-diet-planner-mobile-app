import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

const AIMODELNAME = "tngtech/deepseek-r1t-chimera:free";

export const AiGenerateRecipeOptions = async (PROMPT: any) => {
  const completion = await openai.chat.completions.create({
    model: AIMODELNAME,
    messages: [{ role: "user", content: PROMPT }],
  });
  return completion;
};

export const AiGenerateRecipe = async (PROMPT: any) => {
  const completion = await openai.chat.completions.create({
    model: AIMODELNAME,
    messages: [{ role: "user", content: PROMPT }],
  });
  return completion;
};

export const AIgeneratedIamge = async (prompt: any) => {
  const BASE_URL = "https://aigurulab.tech";
  const result = await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: prompt,
      model: "sdxl",
      aspectRatio: "1:1",
    },
    {
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_IMAGE_GENERATION_AI_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  return result
};
