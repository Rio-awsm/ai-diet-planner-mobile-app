import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
})

const AIMODELNAME = "tngtech/deepseek-r1t-chimera:free"

export const AiGenerateRecipeOptions = async (PROMPT : any) => {
  const completion = await openai.chat.completions.create({
    model: AIMODELNAME,
    messages: [
      { role: "user", content: PROMPT }
    ],
  })
  return completion
}

export const AiGenerateRecipe = async (PROMPT : any) => {
  const completion = await openai.chat.completions.create({
    model: AIMODELNAME,
    messages: [
      { role: "user", content: PROMPT }
    ],
  })
  return completion
}

