export function paramCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function snakeCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
}

type SnaketoCamel<S extends string> = S extends `${infer T}_${infer U}${infer Rest}`
  ? `${T}${Capitalize<U>}${SnaketoCamel<Rest>}`
  : S;

type ConvertObjectKeys<T> = T extends Array<infer U>
  ? Array<ConvertObjectKeys<U>>
  : T extends object
  ? { [K in keyof T as SnaketoCamel<K & string>]: ConvertObjectKeys<T[K]> }
  : T;

function snakeToCamel(str: string): string {
  return str.replace(/(_\w)/g, m => m[1].toUpperCase());
}

export function convertKeysToCamelCase<T extends object>(obj: T): ConvertObjectKeys<T> {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToCamelCase(item)) as ConvertObjectKeys<T>;
  } else if (obj !== null && typeof obj === 'object') {
    const newObj = {} as ConvertObjectKeys<T>;
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = snakeToCamel(key) as keyof typeof newObj;
      newObj[newKey] = typeof value === 'object' && value !== null
        ? convertKeysToCamelCase(value)
        : value;
    });
    return newObj;
  } else {
    return obj as ConvertObjectKeys<T>;
  }
}

type CamelToSnake<S extends string> = S extends `${infer T}${infer U}${infer Rest}`
  ? U extends Capitalize<U>
    ? `${T}_${Lowercase<U>}${CamelToSnake<Rest>}`
    : `${T}${U}${CamelToSnake<Rest>}`
  : S;

type ConvertObjectKeysToSnake<T> = T extends Array<infer U>
  ? Array<ConvertObjectKeysToSnake<U>>
  : T extends object
  ? { [K in keyof T as CamelToSnake<K & string>]: ConvertObjectKeysToSnake<T[K]> }
  : T;

function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function convertKeysToSnakeCase<T extends object>(obj: T): ConvertObjectKeysToSnake<T> {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToSnakeCase(item)) as ConvertObjectKeysToSnake<T>;
  } else if (obj !== null && typeof obj === 'object') {
    const newObj = {} as ConvertObjectKeysToSnake<T>;
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = camelToSnake(key) as keyof typeof newObj;
      newObj[newKey] = typeof value === 'object' && value !== null
        ? convertKeysToSnakeCase(value)
        : value;
    });
    return newObj;
  } else {
    return obj as ConvertObjectKeysToSnake<T>;
  }
}
