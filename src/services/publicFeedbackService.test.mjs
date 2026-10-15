import test from "node:test";
import assert from "node:assert/strict";
import { PublicFeedbackService } from "./publicFeedbackService.js";

test("complaints and suggestions send a valid Arabic default category", async () => {
  const original = globalThis.fetch;
  const sent = [];
  globalThis.fetch = async (url, options) => {
    sent.push({ url, body: options.body });
    return Response.json({ message: "Submitted" }, { status: 201 });
  };
  try {
    const data = { name: "Test", email: "test@example.test", phone_number: "0500000000", message: "Message" };
    await PublicFeedbackService.submitComplaint(data);
    await PublicFeedbackService.submitSuggestion(data);
    for (const request of sent) {
      assert.equal(request.url, "/api/public/public/feedback-submissions");
      assert.equal(request.body.get("category"), "أخرى");
      assert.equal(request.body.get("phone"), "0500000000");
    }
  } finally { globalThis.fetch = original; }
});
