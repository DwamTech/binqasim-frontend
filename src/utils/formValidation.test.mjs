import test from "node:test";
import assert from "node:assert/strict";
import { validateSAIBAN } from "./formValidation.js";

test("Saudi IBAN format accepts 24 characters and printed separators", () => {
  assert.equal(validateSAIBAN("SA0380000000608010167519").isValid, true);
  assert.equal(validateSAIBAN("sa03 8000 0000 6080 1016 7519").isValid, true);
});
