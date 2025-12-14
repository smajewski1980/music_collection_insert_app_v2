export default function isActualNumber(value) {
  if (typeof value !== "number") {
    throw new Error("Input must be of type number");
  }
  return true;
}
