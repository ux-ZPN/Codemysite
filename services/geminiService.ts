import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Helper to check if API key is available
export const isGeminiConfigured = () => !!apiKey;

export const generateSiteCopy = async (prompt: string, currentContext: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return "API Key missing. Please configure process.env.API_KEY.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Using a performant model for text generation
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are a world-class expert copywriter for a premium digital agency.
        Context: ${currentContext}
        Task: ${prompt}
        Tone: Bold, Professional, High-Converting, Modern.
        Output: Return ONLY the improved text/copy. No explanations or markdown wrapper unless asked.
      `,
    });

    return response.text || "Could not generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};