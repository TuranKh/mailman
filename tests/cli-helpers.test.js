import checkMethod from "../cli-helpers/checkMethod.js";
import checkUrl from "../cli-helpers/checkUrl.js";
import { methods } from "../cli-helpers/checkMethod.js";

describe("checkMethod", () => {
  it("returns [true, 'GET'] if given 'GET'", () => {
    const [isValid, method] = checkMethod("GET");
    expect(isValid).toBe(true);
    expect(method).toBe("GET");
  });

  it("returns [false, null] if given an empty string", () => {
    const [isValid, method] = checkMethod("");
    expect(isValid).toBe(false);
    expect(method).toBeNull();
  });

  it("returns [false, null] if given an unsupported method", () => {
    const [isValid, method] = checkMethod("UNKNOWN");
    expect(isValid).toBe(false);
    expect(method).toBeNull();
  });

  it("works case-insensitively (should pass 'post')", () => {
    const [isValid, method] = checkMethod("post");
    expect(isValid).toBe(true);
    expect(method).toBe("POST");
  });

  it("only allows methods from the set [GET, POST, PUT, PATCH, DELETE]", () => {
    methods.forEach(m => {
      const [isValid] = checkMethod(m);
      expect(isValid).toBe(true);
    });
  });
});

describe("checkUrl", () => {
  it("returns true for a valid URL", () => {
    expect(checkUrl("https://example.com")).toBe(true);
    expect(checkUrl("http://127.0.0.1")).toBe(true);
    expect(checkUrl("https://192.168.1.1:8080/path")).toBe(true);
  });

  it("returns false for empty or invalid URLs", () => {
    expect(checkUrl("")).toBe(false);
    expect(checkUrl("not-a-valid-url")).toBe(false);
  });
});
