import * as fs from 'fs';
import { User } from './interfaces';

const DB_PATH = './db.json';

export const readDatabase = (): User[] => {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }

  const data = fs.readFileSync(DB_PATH, 'utf-8').trim();

  if (!data) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
    return [];
  }

  return JSON.parse(data);
};

export const writeDatabase = (data: User[]): void => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};
