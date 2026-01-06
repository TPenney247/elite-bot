import express from "express";

const app = express();
app.use(express.json()); // lets us read Meta's POST body

// Meta webhook verification (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Meta sends real events here (POST)
app.post("/webhook", (req, res) => {
  console.log("✅ Meta webhook event received:");
  console.log(JSON.stringify(req.body, null, 2));
  return res.sendStatus(200);
});

app.get("/", (req, res) => res.send("Elite bot running"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on " + port));
