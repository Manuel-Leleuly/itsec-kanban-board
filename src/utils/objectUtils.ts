export class ObjectUtils {
  static keys = <T extends Record<string, unknown>>(data: T): [keyof T] => {
    return Object.keys(data) as [keyof T];
  };

  static cloneObject = <T extends Record<string, unknown>>(data: T): T => {
    const result = JSON.parse(JSON.stringify(data)) as T;
    return result;
  };

  static cleanObject = <T extends Record<string, unknown>>(data: T) => {
    const newObject = this.cloneObject(data);
    for (const [key, value] of Object.entries(newObject)) {
      if (value === null || value === undefined) {
        delete newObject[key];
      }
    }
    return newObject;
  };
}
