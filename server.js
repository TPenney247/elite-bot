import express from "express";

const app = express();

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === "elite_verify_token") {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

app.get("/", (req, res) => {
  res.send("Elite bot running");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on " + port));
