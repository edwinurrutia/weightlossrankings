interface SubscribeOptions {
  source?: string;
  formId?: string;
}

export async function subscribeToConvertKit(
  email: string,
  options: SubscribeOptions = {}
): Promise<{ success: boolean }> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const resolvedFormId = options.formId ?? process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !resolvedFormId) {
    console.error("ConvertKit: missing CONVERTKIT_API_KEY or CONVERTKIT_FORM_ID");
    return { success: false };
  }

  try {
    const body: Record<string, unknown> = {
      api_key: apiKey,
      email,
    };

    // Pass the source page as a custom field so it shows on each subscriber in Kit
    if (options.source) {
      body.fields = { source: options.source };
    }

    const res = await fetch(
      `https://api.kit.com/v3/forms/${resolvedFormId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error(`Kit subscribe failed (${res.status}): ${text}`);
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    console.error("Kit subscribe error:", err);
    return { success: false };
  }
}
