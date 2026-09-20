export function exportToCSV(filename: string, rows: Record<string, any>[]): void {
  if (!rows || !rows.length) return;
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map(row => {
        return keys
          .map(k => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k];
            cell = cell instanceof Date ? cell.toLocaleString() : cell.toString();
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function printFormattedReport(title: string, htmlBody: string): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} - POLAR ONE REPORT</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 40px;
            color: #111827;
            background: #ffffff;
          }
          .header {
            border-bottom: 2px solid #0284c7;
            padding-bottom: 12px;
            margin-bottom: 24px;
          }
          .header h1 {
            margin: 0;
            color: #0369a1;
            font-size: 24px;
          }
          .meta {
            font-size: 12px;
            color: #64748b;
            margin-top: 6px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
            font-size: 13px;
          }
          th, td {
            border: 1px solid #cbd5e1;
            padding: 8px 12px;
            text-align: left;
          }
          th {
            background-color: #f1f5f9;
            color: #334155;
            font-weight: 600;
          }
          tr:nth-child(even) {
            background-color: #f8fafc;
          }
          .footer {
            margin-top: 30px;
            font-size: 11px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>POLAR ONE // OPERATIONAL MISSION REPORT</h1>
          <div class="meta">
            <strong>DOCUMENT:</strong> ${title} | 
            <strong>GENERATED:</strong> ${new Date().toUTCString()} | 
            <strong>STATION:</strong> Bharati Research Station, Antarctica | 
            <strong>SECURITY:</strong> RESTRICTED EXPEDITION DATA
          </div>
        </div>
        <div class="content">
          ${htmlBody}
        </div>
        <div class="footer">
          Team CryoNauts — Integrated Polar Expedition Logistics & Asset Management System. Smart India Hackathon.
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
