import jsPDF from "jspdf";

export function downloadReport(text) {
  const doc = new jsPDF();

  doc.text(text, 10, 10);

  doc.save("incident-report.pdf");
}