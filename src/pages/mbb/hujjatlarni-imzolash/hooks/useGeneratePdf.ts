import { useState } from "react";

const useGeneratePdf = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generatePdf = async (pdfPath: string): Promise<string> => {
    try {
      setIsGenerating(true);
      // "uploads/" yoki "uploads/temp/" bo'lsa tozalab olamiz
      const cleanPath = pdfPath.replace(/^(uploads\/temp\/|uploads\/)/, "");

      // Iframe PDF ni ochishi uchun to'g'ridan to'g'ri url qaytaramiz (Axios-da CORS bermasligi va keraksiz zapros ketmasligi uchun shuni o'zi yetarli)
      const url = `/api/temp-pdf/${cleanPath}`;
      
      // Ixtiyoriy: agar fayl URL'i shakllantirishda kechikish bo'lsa qisqa kuttiramiz
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return url;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePdf,
    isGenerating,
  };
};

export default useGeneratePdf;
