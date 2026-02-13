import type { QueryRecord } from "./storage";

// Send a single query record to a remote endpoint (e.g. Google Apps Script).
// This is best-effort only: failures are logged but do not affect the UI.
export async function sendQueryToRemote(query: QueryRecord): Promise<void> {
  try {
    // Prefer env variable; fall back to the hard-coded URL only if present.
    const url =
      import.meta.env?.VITE_REMOTE_QUERIES_ENDPOINT ||
      "https://script.google.com/macros/s/AKfycbzlg_pH_6eiWbWO5PTfRpytZYRcM6ueLaoRZ3d14gkSASGOtZkQuS4MIN-RPIyu-YQk/exec";

    if (!url) {
      return;
    }

    // Use a \"simple\" POST with mode: no-cors to avoid CORS preflight issues.
    // We don't need to read the response, just fire-and-forget.
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(query),
    });
  } catch (error) {
    console.error("Failed to send query to remote endpoint:", error);
  }
}

