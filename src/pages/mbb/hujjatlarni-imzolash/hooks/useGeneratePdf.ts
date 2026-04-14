import { useState, useCallback } from "react";

const useGeneratePdf = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdf = useCallback(async (pdfPath?: string): Promise<string> => {
    try {
      setIsGenerating(true);

      if (!pdfPath) {
        return "";
      }

      // "uploads/" yoki "uploads/temp/" bo'lsa tozalab olamiz
      const cleanPath = pdfPath.replace(/^(uploads\/temp\/|uploads\/)/, "");

      // Iframe PDF ni ochishi uchun to'g'ridan to'g'ri url qaytaramiz
      const url = `/api/temp-pdf/${cleanPath}`;

      await new Promise((resolve) => setTimeout(resolve, 300));

      return url;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    generatePdf,
    isGenerating,
  };
};

export default useGeneratePdf;
