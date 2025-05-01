import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateRecipes = mutation({
  args: {
    jsonData: v.any(),
    imageUrl: v.optional(v.string()),
    uid: v.id("users"),
    recipeName: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("recipes", {
      jsonData: args.jsonData,
      imageUrl: args.imageUrl,
      recipeName: args.recipeName,
      uid: args.uid,
    });
    return result;
  },
});

export const getRecipeById = query({
  args: {
    id: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id);
    return result;
  },
});
