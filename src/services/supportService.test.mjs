import test from "node:test";
import assert from "node:assert/strict";
import { SupportService } from "./supportService.js";

test("individual support sends all selected documents under backend field names", async () => {
  const original = globalThis.fetch;
  let submitted;
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "/api/public/support/individual/store");
    submitted = options.body;
    return Response.json({ request_number: "123" }, { status: 201 });
  };
  try {
    await SupportService.submitIndividual({
      idImage: new File(["image"], "identity.png", { type: "image/png" }),
      educationImage: new File(["pdf"], "qualification.pdf", { type: "application/pdf" }),
      cvFile: new File(["pdf"], "cv.pdf", { type: "application/pdf" }),
      recommendationsFile: new File(["pdf"], "recommendation.pdf", { type: "application/pdf" }),
    });
    assert.equal(submitted.get("identity_image_path").name, "identity.png");
    assert.equal(submitted.get("academic_qualification_path").name, "qualification.pdf");
    assert.equal(submitted.get("cv_path").name, "cv.pdf");
    assert.equal(submitted.get("recommendation_path").name, "recommendation.pdf");
  } finally { globalThis.fetch = original; }
});
