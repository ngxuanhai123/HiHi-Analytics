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
    fcp: { type: Type.STRING },
    lcp: { type: Type.STRING },
    cls: { type: Type.STRING },
    carbonFootprint: { type: Type.STRING },
    
    transferSize: { type: Type.STRING },
    resourcesSize: { type: Type.STRING },
    totalPageSize: { type: Type.STRING },
    
    potentialLoadTime: { type: Type.STRING },
    potentialPageSize: { type: Type.STRING },
    savingsPercentage: { type: Type.INTEGER },

    // New: HiHi Rank
    hihiRank: {
      type: Type.OBJECT,
      properties: {
        tier: { type: Type.STRING, enum: ['S', 'A', 'B', 'C', 'D', 'F'] },
        name: { type: Type.STRING, description: "Tên danh hiệu vui nhộn (ví dụ: 'Thánh Tốc Độ', 'Rùa Hồ Gươm')" },
        emoji: { type: Type.STRING, description: "Emoji đại diện" },
        quote: { type: Type.STRING, description: "Câu châm biếm hoặc khen ngợi ngắn gọn" }
      }
    },
    // New: Social Preview
    socialPreview: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Tiêu đề hiển thị khi share Facebook (OG Title)" },
        description: { type: Type.STRING, description: "Mô tả hiển thị khi share (OG Description)" },
        image: { type: Type.STRING, description: "Mô tả ngắn về hình ảnh đại diện của web (vì AI không lấy được link ảnh thật)" },
        siteName: { type: Type.STRING }
      }
    },
    // New: Security
    security: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER },
        https: { type: Type.BOOLEAN },
        issues: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },

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
      Bạn là HiHi Intelligence Engine.
      Phân tích trang web ${url}. Thiết bị: ${device}. Location: ${location}.
      
      Yêu cầu mở rộng:
      1. Tạo "hihiRank": Đánh giá độ vui/tốt của web và gán danh hiệu hài hước (Ví dụ: Web nhanh thì gọi là "Tên lửa", chậm thì "Rùa bò"). Tier S là tốt nhất, F là tệ nhất.
      2. Giả lập "socialPreview": Dự đoán nội dung thẻ Meta OG (Open Graph) khi share link này lên Facebook.
      3. Kiểm tra "security": Dự đoán các lỗi bảo mật cơ bản (HTTPS, Headers).
      4. Các chỉ số Core Web Vitals và Data size vẫn phải chính xác.
      
      Trả về JSON. Ngôn ngữ: Tiếng Việt, phong cách vui vẻ, "bựa" một chút nhưng vẫn chuyên nghiệp ở số liệu.
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