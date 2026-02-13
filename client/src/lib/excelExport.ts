// Excel export utility using xlsx library
// We'll use a CDN approach or add xlsx to package.json

export interface ExcelRow {
  [key: string]: any;
}

// Simple CSV export as fallback (works without external libraries)
export function exportToCSV(data: ExcelRow[], filename: string): void {
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values with commas or quotes
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Excel export using SheetJS (xlsx) - will be loaded dynamically
export async function exportToExcel(data: ExcelRow[], filename: string): Promise<void> {
  try {
    // Try to use xlsx if available
    // @ts-ignore - xlsx may not be in types
    if (typeof window !== 'undefined' && (window.XLSX || (window as any).XLSX)) {
      const XLSX = window.XLSX || (window as any).XLSX;
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Queries');
      XLSX.writeFile(wb, `${filename}.xlsx`);
      return;
    }

    // Fallback to CSV if xlsx is not available
    console.warn('xlsx library not found, exporting as CSV instead');
    exportToCSV(data, filename);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    // Fallback to CSV
    exportToCSV(data, filename);
  }
}

// Load xlsx from CDN if not available
export function loadXLSXLibrary(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    // @ts-ignore
    if (typeof window !== 'undefined' && (window.XLSX || (window as any).XLSX)) {
      resolve();
      return;
    }

    // Load from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js';
    script.onload = () => resolve();
    script.onerror = () => {
      console.warn('Failed to load xlsx from CDN, will use CSV fallback');
      resolve(); // Resolve anyway, we'll use CSV fallback
    };
    document.head.appendChild(script);
  });
}
