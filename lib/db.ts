import * as fs from "fs";

export class HighDB<T extends object> {
  data: T;
  location: string;

  constructor(location: string, defaultData: T) {
    this.location = location;
    if (!fs.existsSync(this.location)) {
      fs.writeFileSync(this.location, JSON.stringify(defaultData, null, 2));
      this.data = defaultData;
    } else {
      const fileContent = fs.readFileSync(this.location, "utf8");
      this.data = JSON.parse(fileContent);
    }
  }

  async setConfig(data: Partial<T>): Promise<void> {
    Object.assign(this.data, data);
    await fs.promises.writeFile(
      this.location,
      JSON.stringify(this.data, null, 2)
    );
  }
}

export const expDB = new HighDB<{ [id: string]: number }>('db.json', {});
