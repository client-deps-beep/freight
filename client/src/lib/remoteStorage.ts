import type { QueryRecord } from "./storage";

// Send a single query record to a remote endpoint (e.g. Google Apps Script).
// This is best-effort only: failures are logged but do not affect the UI.
export async function sendQueryToRemote(query: QueryRecord): Promise<void> {
  try {
    const url = "https://script.google.com/macros/s/AKfycbzlg_pH_6eiWbWO5PTfRpytZYRcM6ueLaoRZ3d14gkSASGOtZkQuS4MIN-RPIyu-YQk/exec";
    if (!url) {
      // No remote endpoint configured; nothing to do.
      return;
    }

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
      mode: "cors",
    });
  } catch (error) {
    console.error("Failed to send query to remote endpoint:", error);
  }
}

