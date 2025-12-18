import { GoogleGenAI, Type, Schema } from "@google/genai";
import { WebAuditResult } from "../types";

const auditSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    performanceScore: { type: Type.INTEGER, description: "Điểm hiệu suất 0-100" },
    accessibilityScore: { type: Type.INTEGER, description: "Điểm khả năng truy cập 0-100" },
    bestPracticesScore: { type: Type.INTEGER, description: "Điểm thực hành tốt nhất 0-100" },
    seoScore: { type: Type.INTEGER, description: "Điểm SEO 0-100" },
    
    estimatedLoadTime: { type: Type.STRING, description: "Thời gian tải hiện tại (ví dụ: '2.5s')" },
    fcp: { type: Type.STRING, description: "First Contentful Paint" },
    lcp: { type: Type.STRING, description: "Largest Contentful Paint" },
    cls: { type: Type.STRING, description: "Cumulative Layout Shift" },
    carbonFootprint: { type: Type.STRING, description: "CO2 per view" },
    
    transferSize: { type: Type.STRING, description: "Dung lượng tải qua mạng (Compressed)" },
    resourcesSize: { type: Type.STRING, description: "Dung lượng thực (Uncompressed)" },
    totalPageSize: { type: Type.STRING, description: "Tổng dung lượng" },
    
    // New Fields
    potentialLoadTime: { type: Type.STRING, description: "Thời gian tải dự kiến sau khi tối ưu (ví dụ: '0.8s')" },
    potentialPageSize: { type: Type.STRING, description: "Dung lượng dự kiến sau khi tối ưu (ví dụ: '800 KB')" },
    savingsPercentage: { type: Type.INTEGER, description: "Phần trăm cải thiện hiệu suất ước tính (ví dụ: 40)" },

    resourceBreakdown: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          sizeKb: { type: Type.NUMBER },
          color: { type: Type.STRING }
        }
      }
    },
    opportunities: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          savings: { type: Type.STRING },
          severity: { type: Type.STRING, enum: ['high', 'medium', 'low'] }
        }
      }
    },
    codeSuggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          language: { type: Type.STRING },
          code: { type: Type.STRING },
          description: { type: Type.STRING }
        }
      }
    },
    techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
    summary: { type: Type.STRING }
  }
};

export const analyzeWebsite = async (url: string, device: 'mobile' | 'desktop', location: string): Promise<WebAuditResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key chưa được cấu hình.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `
      Bạn là HiHi Intelligence Engine - bộ não phân tích web hàng đầu thế giới.
      Nhiệm vụ: Phân tích trang web ${url}
      Thiết bị giả lập: ${device.toUpperCase()}
      Vị trí Server kiểm tra: ${location}
      
      Hãy đóng vai một chuyên gia khó tính của HiHi Team. Đưa ra các chỉ số dựa trên tech stack của trang web đó.
      
      Yêu cầu phân tích:
      1. Core Web Vitals phải thực tế với thiết bị và vị trí địa lý đã chọn.
      2. Tính toán cả trạng thái HIỆN TẠI và trạng thái TIỀM NĂNG (Sau khi tối ưu hết mức).
      3. Đưa ra các 'codeSuggestions' cực kỳ chi tiết.
      4. Phân biệt rõ transferSize và resourcesSize.
      
      Tuyệt đối KHÔNG nhắc đến tên các công cụ khác (như Lighthouse, PageSpeed...). Đây là báo cáo độc quyền của HiHi.
      Trả về JSON theo schema. Ngôn ngữ: Tiếng Việt vui vẻ, thân thiện.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: auditSchema
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("HiHi AI đang bận, thử lại nhé!");

    return JSON.parse(jsonText) as WebAuditResult;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};