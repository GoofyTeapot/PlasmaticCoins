export async function onRequestPost(context) {
  const { request, env } = context;

  const body = await request.json();
  const { purchaseId, status, purchaserId } = body;

  if (!purchaseId || !status || !purchaserId) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  // Firestore REST API endpoint
  const url = `https://firestore.googleapis.com/v1/projects/plasmaticcoins-server/databases/(default)/documents/purchases/${purchaseId}`;

  const firestoreBody = {
    fields: {
      purchaseId: { stringValue: purchaseId },
      status: { stringValue: status },
      purchaserId: { stringValue: purchaserId },
      timestamp: { integerValue: Date.now() }
    }
  };

  const firestoreRes = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(firestoreBody)
  });

  const data = await firestoreRes.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
