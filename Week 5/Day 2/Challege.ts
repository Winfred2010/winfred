type JSDataType = "string" | "number" | "boolean" | "object" | "function" | "undefined" | "symbol" | "bigint";

function validateUnionType(value: unknown, allowedTypes: JSDataType[]): boolean {
  const currentType = typeof value;
  return allowedTypes.some((type) => currentType === type.toLowerCase());
}

const isValue1Valid = validateUnionType("Hello TypeScript", ["string", "number"]);
const isValue2Valid = validateUnionType(true, ["string", "number"]);
const isValue3Valid = validateUnionType(42, ["number", "boolean", "object"]);