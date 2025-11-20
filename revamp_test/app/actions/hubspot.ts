"use server";

import axios from "axios";

export async function submitContactToHubspot(
  formData: FormData
): Promise<{ success: boolean; message?: string }> {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;

  if (!portalId || !formGuid) {
    throw new Error("HubSpot configuration is missing.");
  }

  const hutk = formData.get("hutk") as string | undefined;

  // Extract form fields
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const message = formData.get("message") as string;
  const wantsDemo = formData.get("wantsDemo") as string;

  // Payload for HubSpot
  const hubspotPayload = {
    fields: [
      { name: "firstname", value: name.split(" ")[0] || name },
      { name: "lastname", value: name.split(" ").slice(1).join(" ") || "" },
      { name: "email", value: email },
      { name: "company", value: company || "" },
      { name: "message", value: message },
      { name: "wants_demo", value: wantsDemo || "No" },
    ],
    context: {
      hutk,
      pageUri: formData.get("pageUri") || "",
      pageName: "Contact Page",
    },
  };

  try {
    const response = await axios.post(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      hubspotPayload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return { success: true, message: "Form submitted successfully!" };
    } else {
      throw new Error("HubSpot submission failed.");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.errors?.[0]?.message || "Failed to submit form. Please try again.",
      };
    }
    throw error;
  }
}

/**
 * Submit email to HubSpot Signal Newsletter Form
 * This is a simplified form that only collects email addresses
 */
export async function submitSignalEmailToHubspot(
  email: string,
  pageUri?: string,
  hutk?: string
): Promise<{ success: boolean; message?: string }> {
  const portalId = process.env.HUBSPOT_SIGNAL_PORTAL_ID;
  const formId = process.env.HUBSPOT_SIGNAL_FORM_ID;

  if (!portalId || !formId) {
    throw new Error("HubSpot Signal form configuration is missing.");
  }

  // Payload for HubSpot - email only
  const hubspotPayload = {
    fields: [
      { name: "email", value: email },
    ],
    context: {
      hutk,
      pageUri: pageUri || "",
      pageName: "Signal Newsletter Signup",
    },
  };

  try {
    const response = await axios.post(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      hubspotPayload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return { success: true, message: "Successfully subscribed to The Signal!" };
    } else {
      throw new Error("HubSpot Signal subscription failed.");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.errors?.[0]?.message || "Failed to subscribe. Please try again.",
      };
    }
    throw error;
  }
}
