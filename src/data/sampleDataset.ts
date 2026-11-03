import { BorrowerRecord } from '../types';

export const PLACEHOLDER_BORROWER: BorrowerRecord = {
  id: 'placeholder-preview',
  lanNumber: '000-000-000-000000',
  accountName: '[Borrower Full Name]',
  contactNo: '0000000000',
  emiAmt: '0',
  bucket: 'X',
  totalOverdue: '0',
  mailId: 'borrower@example.com',
  emiDueFrom: 'DD-MM-YYYY',
};

export function parseCSV(csvText: string): BorrowerRecord[] {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  // Parse header
  const headerLine = lines[0];
  const headers = headerLine.split(',').map((h) => h.trim().toLowerCase());

  const findIdx = (possibleNames: string[]) => {
    return headers.findIndex((h) => possibleNames.some((p) => h.includes(p)));
  };

  const lanIdx = findIdx(['lan', 'account no', 'loan no']);
  const nameIdx = findIdx(['account name', 'name', 'borrower']);
  const contactIdx = findIdx(['contact', 'mobile', 'phone']);
  const emiAmtIdx = findIdx(['emi amt', 'emi amount', 'instalment']);
  const bucketIdx = findIdx(['bucket']);
  const totalOdIdx = findIdx(['emi od', 'total overdue', 'overdue', 'od amt']);
  const mailIdx = findIdx(['mail', 'email']);
  const dueFromIdx = findIdx(['due from', 'due date', 'emi due']);

  const records: BorrowerRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Simple CSV parse handling potential commas or standard split
    const cols = line.split(',').map((c) => c.trim());
    if (cols.length < 4) continue;

    records.push({
      id: `row-${i}-${cols[lanIdx >= 0 ? lanIdx : 0] || Math.random()}`,
      lanNumber: lanIdx >= 0 ? cols[lanIdx] : cols[0] || '',
      accountName: nameIdx >= 0 ? cols[nameIdx] : cols[1] || '',
      contactNo: contactIdx >= 0 ? cols[contactIdx] : cols[2] || '',
      emiAmt: emiAmtIdx >= 0 ? cols[emiAmtIdx] : cols[3] || '0',
      bucket: bucketIdx >= 0 ? cols[bucketIdx] : cols[4] || '',
      totalOverdue: totalOdIdx >= 0 ? cols[totalOdIdx] : cols[5] || '0',
      mailId: mailIdx >= 0 ? cols[mailIdx] : cols[6] || '',
      emiDueFrom: dueFromIdx >= 0 ? cols[dueFromIdx] : cols[7] || '',
    });
  }

  return records;
}

export const INITIAL_SAMPLE_RECORDS: BorrowerRecord[] = [];
