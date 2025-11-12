
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  // In a real app, you might show an error to the user or have a fallback.
  // For this environment, we assume the key is present.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: "추천 메뉴의 이름",
        },
        description: {
          type: Type.STRING,
          description: "메뉴에 대한 1~2문장의 짧고 흥미로운 설명",
        },
      },
      required: ["name", "description"],
    },
};

export const fetchFoodRecommendations = async (restAreaName, direction, highway) => {
  const prompt = `${highway}에 위치한 '${restAreaName}(${direction})'의 대표적인 인기 먹거리 메뉴 3가지를 추천해줘. 각 메뉴에 대한 간단한 설명을 포함해줘.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);

    // Basic validation to ensure we get an array of objects with the correct keys
    if (Array.isArray(data) && data.every(item => 'name' in item && 'description' in item)) {
        return data;
    } else {
        throw new Error("Invalid data structure received from API.");
    }

  } catch (error) {
    console.error("Error fetching recommendations from Gemini API:", error);
    throw new Error("Failed to fetch recommendations.");
  }
};