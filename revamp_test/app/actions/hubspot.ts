"use server";

import axios from "axios";

export async function submitContactToHubspot(
  formData: FormData
): Promise<{ success: boolean; message?: string }> {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;

  if (!portalId || !formGuid) {
    console.error("Missing HubSpot environment variables");
    throw new Error("HubSpot configuration is missing.");
  }

  const hutk = formData.get("hutk") as string | undefined;

  // Extract form fields
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const message = formData.get("message") as string;

  // Payload for HubSpot
  const hubspotPayload = {
    fields: [
      { name: "firstname", value: name.split(" ")[0] || name },
      { name: "lastname", value: name.split(" ").slice(1).join(" ") || "" },
      { name: "email", value: email },
      { name: "company", value: company || "" },
      { name: "message", value: message },
    ],
    context: {
      hutk,
      pageUri: formData.get("pageUri") || "",
      pageName: "Contact Page",
    },
  };

  console.log("=== HubSpot Submission Debug ===");
  console.log("Portal ID:", portalId);
  console.log("Form GUID:", formGuid);
  console.log("Payload:", JSON.stringify(hubspotPayload, null, 2));
  console.log("URL:", `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`);

  try {
    const response = await axios.post(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      hubspotPayload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("✅ HubSpot Response Status:", response.status);
    console.log("✅ HubSpot Response Data:", response.data);

    if (response.status >= 200 && response.status < 300) {
      return { success: true, message: "Form submitted successfully!" };
    } else {
      console.error("❌ [HubSpot Error]", response.data);
      throw new Error("HubSpot submission failed.");
    }
  } catch (error) {
    console.error("❌ [HubSpot Submission Error]", error);
    if (axios.isAxiosError(error)) {
      console.error("❌ Error Response:", error.response?.data);
      console.error("❌ Error Status:", error.response?.status);
      console.error("❌ Error Headers:", error.response?.headers);
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.errors?.[0]?.message || "Failed to submit form. Please try again.",
      };
    }
    throw error;
  }
}
