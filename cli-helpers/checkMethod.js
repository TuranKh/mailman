import log from "./logger.js";
export const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const availableMethods = new Set(methods);

export default function checkMethod(userEnteredMethod) {
  if (!userEnteredMethod) {
    log.error("Enter method from available method list: ", methods.join(', '));
    return [false, null];
  }

  const formatted = userEnteredMethod.toUpperCase();

  if (availableMethods.has(formatted)) {
    return [true, formatted];
  }

  log.error(`Method: ${userEnteredMethod} is not supported, choose method from list: ${methods.join(', ')}`)
  return [false, null];
}
