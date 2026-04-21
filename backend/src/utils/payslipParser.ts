import * as pdfjsLib from 'pdfjs-dist';

export interface PayslipData {
  employeeName: string;
  designation: string;
  company: string;
  salary: number;
  month: string;
  year: number;
  currency: string;
  isFirstPayslip?: boolean;
}

export async function extractPayslipData(pdfBuffer: Buffer): Promise<PayslipData> {
  const pdf = await pdfjsLib.getDocument(pdfBuffer).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    fullText += textContent.items.map((item: any) => item.str).join(' ');
  }

  const salaryMatch = fullText.match(/(?:salary|gross|ctc)[:\s]+(?:₹|\$)?[\s]*(\d+[,(\d]*)/i);
  const nameMatch = fullText.match(/(?:employee|name)[:\s]+([A-Za-z\s]+)/i);
  const designationMatch = fullText.match(/(?:designation|position)[:\s]+([A-Za-z\s]+)/i);
  const companyMatch = fullText.match(/(?:company|employer)[:\s]+([A-Za-z\s&.]+)/i);

  const salary = salaryMatch ? parseInt(salaryMatch[1].replace(/,/g, '')) : 0;

  return {
    employeeName: nameMatch ? nameMatch[1].trim() : 'Employee',
    designation: designationMatch ? designationMatch[1].trim() : 'Professional',
    company: companyMatch ? companyMatch[1].trim() : 'Your Company',
    salary,
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear(),
    currency: fullText.includes('₹') ? 'INR' : 'USD',
    isFirstPayslip: false,
  };
}