export const ROUTER = {
  HOME: "/calculator",
  OPERATION: "/calculator/:type/:num1/:num2",
};

// buildPath köməkçi funksiyası — route path-ə real dəyərləri yazır
export function buildPath(num1, num2, type) {
  return `/calculator/${type}/${num1}/${num2}`;
}
