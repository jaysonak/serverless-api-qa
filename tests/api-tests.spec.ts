import { test, expect } from "@playwright/test";

const API_URL =
  "https://wulkx06r8h.execute-api.us-east-1.amazonaws.com/Prod/users";

test.describe("SDET Portfolio - User API Tests", () => {
  test("POST - Successfully create a new user", async ({ request }) => {
    const userId = `playwright_user_${Math.floor(Math.random() * 1000)}`;

    const response = await request.post(API_URL, {
      data: {
        user_id: userId,
        name: "Automated Tester",
      },
    });

    // Validating the 201 status code you set in app.py
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.message).toBe("User created successfully!");
    expect(responseBody.received_id).toBe(userId);
  });

  test("should return 400 if user_id is missing", async ({ request }) => {
    const response = await request.post(API_URL, {
      data: {},
    });

    // --- ADD THIS SECTION ---
    if (response.status() !== 400) {
      console.log(">>> DEBUG: Received unexpected status:", response.status());
      const errorBody = await response.text(); // text() is safer than json() if it crashes
      console.log(">>> DEBUG: Response Body:", errorBody);
    }
    // ------------------------

    expect(response.status()).toBe(400);
  });

  // test('POST - Verify 400 error on empty body', async ({ request }) => {
  //   // This tests the safety check you wrote: if not event.get('body')
  //   const response = await request.post(API_URL, {
  //       data: {}
  //   });

  //   // Note: If you send an empty object {}, json.loads might still see a body.
  //   // To trigger your 'Empty body' check, we send no data at all.
  //   const emptyResponse = await request.post(API_URL, {
  //       data: null
  //   });

  //   expect(emptyResponse.status()).toBe(400);
  //   const body = await emptyResponse.json();
  //   expect(body.error).toBe('Missing required field: user_id');
  // });
});
