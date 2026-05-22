export async function onRequestPost(context) {
  const { request } = context;

  const body = await request.json();
  const { purchaseId, status, purchaserId } = body;

  if (!purchaseId) {
    return new Response(JSON.stringify({ error: "Missing purchaseId" }), { status: 400 });
  }

  const url = `https://firestore.googleapis.com/v1/projects/plasmaticcoins-server/databases/(default)/documents/purchases/${purchaseId}`;

  const updateFields = {};

  if (status) updateFields.status = { stringValue: status };
  if (purchaserId) updateFields.purchaserId = { stringValue: purchaserId };

  const firestoreBody = { fields: updateFields };

  const firestoreRes = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(firestoreBody)
  });

  const data = await firestoreRes.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
