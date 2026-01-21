
import { GoogleGenAI, Type } from "@google/genai";
import { NLPResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseNaturalLanguageSchedule = async (input: string): Promise<NLPResult | null> => {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const currentTimeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following schedule input in Korean and extract structural data.
    Input Text: "${input}"
    Current Date: ${todayStr}
    Current Time: ${currentTimeStr}
    
    Guidelines:
    - title: Brief summary of the event.
    - date: YYYY-MM-DD format. If relative (e.g. "내일"), calculate from current date.
    - startTime: HH:mm format. If not specified, default to a sensible time based on current time or common sense.
    - durationMinutes: Estimated duration in minutes. Default to 60 if not clear.
    - tag: One of '미팅', '실무', '회계', '개발', '영업', '행정', '기타'.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          date: { type: Type.STRING },
          startTime: { type: Type.STRING },
          durationMinutes: { type: Type.NUMBER },
          tag: { type: Type.STRING }
        },
        required: ["title", "date", "startTime", "durationMinutes", "tag"]
      }
    }
  });

  try {
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as NLPResult;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return null;
  }
};
