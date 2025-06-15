import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';

const xmlParser = (filePath: string) => {
  const fullPath = path.resolve(filePath);
  const xmlData = fs.readFileSync(fullPath, 'utf-8');

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });

  const result: string = parser.parse(xmlData);
  return result;
};

export default xmlParser;
