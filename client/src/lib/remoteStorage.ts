import type { QueryRecord } from "./storage";

// Send a single query record to a remote endpoint (e.g. Google Apps Script).
// This is best-effort only: failures are logged but do not affect the UI.
export async function sendQueryToRemote(query: QueryRecord): Promise<void> {
  try {
    // Prefer env variable; fall back to the hard-coded URL only if present.
    const url =
      import.meta.env?.VITE_REMOTE_QUERIES_ENDPOINT ||
      "https://script.google.com/macros/s/AKfycbwBytEFes2_W42skE19kdfFawFu2mOxSebD5xx7sVSM9gzIL6RRk2NOnm6IHnX6JBQ/exec";

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

export async function fetchRemoteQueries(): Promise<QueryRecord[]> {
  const url = import.meta.env?.VITE_REMOTE_QUERIES_ENDPOINT || 
              "https://script.google.com/macros/s/AKfycbwBytEFes2_W42skE19kdfFawFu2mOxSebD5xx7sVSM9gzIL6RRk2NOnm6IHnX6JBQ/exec";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data as QueryRecord[];
  } catch (error) {
    console.error("Failed to fetch remote queries:", error);
    return [];
  }
}

