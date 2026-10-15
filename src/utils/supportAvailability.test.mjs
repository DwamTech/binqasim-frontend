import test from "node:test";
import assert from "node:assert/strict";
import { getSupportAvailability } from "./supportAvailability.js";

test("support banner follows available request types", () => {
  for (const individual of [true, false]) {
    for (const institutional of [true, false]) {
      assert.deepEqual(getSupportAvailability({ site_status: "open", individual_support_enabled: individual, institutional_support_enabled: institutional }),
        { individual, institutional, visible: individual || institutional });
    }
  }
});

test("closed site and missing settings never advertise support", () => {
  assert.deepEqual(getSupportAvailability({ site_status: "closed", individual_support_enabled: true, institutional_support_enabled: true }), { individual: false, institutional: false, visible: false });
  assert.equal(getSupportAvailability(null).visible, false);
  assert.equal(getSupportAvailability({ individual_support_enabled: "false" }).visible, false);
});
