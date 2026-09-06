// This will later be replaced by an API call to your backend: /api/powerbi/token
export const powerbiConfig = {
  // Leave empty for now to show mock UI
  reportId: "",
  embedUrl: "",
  accessToken: "",

  // When you have them, fill like this:
  // reportId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  // embedUrl: "https://app.powerbi.com/reportEmbed?reportId=...",
  // accessToken: "eyJ0eXAiOiJKV1QiLCJhbGc..." // from backend
};

// Later your backend Node.js will do:
// const token = await fetch('https://api.powerbi.com/v1.0/myorg/groups/{groupId}/reports/{reportId}/GenerateToken')