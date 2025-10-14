import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class Dataprovider {
  // Read JSON test data
  static getTestDataFromJson<T = any>(filePath: string): T {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data: T = JSON.parse(raw);
    return data;
  }

  // Read CSV test data
  static getTestDataFromCsv(filePath: string) {
    const data = parse(fs.readFileSync(filePath), {
      columns: true,
      skip_empty_lines: true
    });
    return data;
  }
}
