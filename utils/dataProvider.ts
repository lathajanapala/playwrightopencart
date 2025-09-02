import fs from 'fs';
import { parse } from 'csv-parse/sync'
export class Dataprovider {
    static getDataFromJson(filePath: string): string {
        let data: string = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data;
    }
    static getTestDataFromCsv(filePath:string){
        let data = parse(fs.readFileSync(filePath),{columns:true,skip_empty_lines:true})
        return data;
    }

}