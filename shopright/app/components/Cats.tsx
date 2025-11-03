export default async function Cats() {
  try {
    const res = await fetch("https://api.ipapi.is/?q=52.46.64.223", {
      // revalidate every 60 seconds when using Next.js incremental static regeneration
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      // Return a simple error UI when the fetch failed
      return (
        <div>
          <strong>Error</strong>: failed to fetch data ({res.status})
        </div>
      );
    }

    const data = await res.json();

    // Render the returned object as JSON. For production, render specific fields instead.
    return (
      <div>
        <h3>IP Info</h3>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  } catch (err) {
    // Log and show a friendly message
    // eslint-disable-next-line no-console
    console.error("Failed to load IP info", err);
    return <div>Unable to load data right now.</div>;
  }
}