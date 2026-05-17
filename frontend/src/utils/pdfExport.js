import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDFReport = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const { analysis, consequence_simulator, risk_dashboard } = data;
      const doc = new jsPDF();
      
      // Brand Colors (Printer Friendly)
      const primaryPurple = [54, 5, 104]; // #360568
      const lavender = [200, 182, 255]; // #C8B6FF
      const textDark = [30, 30, 30];
      const textGrey = [100, 100, 100];
      
      const riskColorMap = {
        High: [239, 68, 68], // Red-500
        Medium: [245, 158, 11], // Amber-500
        Low: [16, 185, 129] // Emerald-500
      };

      const getSeverity = (score) => {
        if (score >= 70) return "High";
        if (score >= 40) return "Medium";
        return "Low";
      };

      // Header Section
      doc.setFillColor(...primaryPurple);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("MATILDA Risk Intelligence Report", 14, 20);

      // Document Summary
      const riskScore = risk_dashboard.overall_risk;
      const severity = getSeverity(riskScore);
      const sColor = riskColorMap[severity];

      doc.setTextColor(...textDark);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Date Analyzed: " + new Date().toLocaleDateString(), 14, 45);

      // Score Box
      doc.setDrawColor(...sColor);
      doc.setLineWidth(0.5);
      doc.setFillColor(sColor[0], sColor[1], sColor[2], 0.1); // 10% opacity roughly (jsPDF doesn't support alpha in fill directly in old versions, but we'll just use light fill or just stroke)
      
      doc.roundedRect(14, 55, 180, 25, 2, 2, 'S');
      
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...sColor);
      doc.text(`Overall Risk Score: ${riskScore}/100`, 20, 65);
      doc.setFontSize(10);
      doc.text(`Final Verdict: ${risk_dashboard.verdict.replace(/[^\w\s]/gi, '')}`, 20, 73);

      let currentY = 95;

      // Section 1: Analyzed Clauses
      doc.setTextColor(...primaryPurple);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Analyzed Clauses", 14, currentY);
      currentY += 5;

      const clauseData = analysis.clauses.map(c => [
        c.category,
        getSeverity(c.risk),
        c.original,
        c.translation
      ]);

      doc.autoTable({
        startY: currentY,
        head: [['Category', 'Severity', 'Original Text', 'MATILDA Translation']],
        body: clauseData,
        theme: 'grid',
        styles: {
          font: 'helvetica',
          fontSize: 9,
          textColor: textDark,
          lineColor: lavender,
          lineWidth: 0.1,
          cellPadding: 4,
          overflow: 'linebreak'
        },
        headStyles: {
          fillColor: primaryPurple,
          textColor: 255,
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { cellWidth: 25, fontStyle: 'bold' },
          1: { cellWidth: 20 },
          2: { cellWidth: 65, textColor: textGrey, fontStyle: 'italic' },
          3: { cellWidth: 70 }
        },
        didParseCell: function(data) {
          if (data.section === 'body' && data.column.index === 1) {
            const sev = data.cell.raw;
            if (sev === 'High') data.cell.styles.textColor = riskColorMap.High;
            if (sev === 'Medium') data.cell.styles.textColor = riskColorMap.Medium;
            if (sev === 'Low') data.cell.styles.textColor = riskColorMap.Low;
            data.cell.styles.fontStyle = 'bold';
          }
        }
      });

      currentY = doc.lastAutoTable.finalY + 15;

      // Check if we need a new page for the next section
      if (currentY > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        currentY = 20;
      }

      // Section 2: Consequence Simulator
      doc.setTextColor(...primaryPurple);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Consequence Simulator", 14, currentY);
      currentY += 5;

      const consequenceData = consequence_simulator.items.map(item => [
        item.immediate || item.short_term || "Action is taken against your account.",
        item.impact || item.long_term || "You may lose rights or incur liabilities."
      ]);

      doc.autoTable({
        startY: currentY,
        head: [['Scenario Description', 'Real-world Impact']],
        body: consequenceData,
        theme: 'striped',
        styles: {
          font: 'helvetica',
          fontSize: 9,
          textColor: textDark,
          lineColor: lavender,
          lineWidth: 0.1,
          cellPadding: 4,
          overflow: 'linebreak'
        },
        headStyles: {
          fillColor: primaryPurple,
          textColor: 255,
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { cellWidth: 85 },
          1: { cellWidth: 95, fontStyle: 'bold' }
        }
      });

      // Add Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(...textGrey);
        doc.text(
          `Page ${i} of ${pageCount} - Generated by MATILDA AI`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }

      doc.save("MATILDA_Analysis_Report.pdf");
      resolve();
    } catch (error) {
      console.error("PDF Generation Error:", error);
      reject(error);
    }
  });
};
