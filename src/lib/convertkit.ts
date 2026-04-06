export async function subscribeToConvertKit(
  email: string,
  formId?: string
): Promise<{ success: boolean }> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const resolvedFormId = formId ?? process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !resolvedFormId) {
    console.error("ConvertKit: missing CONVERTKIT_API_KEY or CONVERTKIT_FORM_ID");
    return { success: false };
  }

  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${resolvedFormId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ api_key: apiKey, email }),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error(`ConvertKit subscribe failed (${res.status}): ${body}`);
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    console.error("ConvertKit subscribe error:", err);
    return { success: false };
  }
}
