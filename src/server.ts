import express from "express";

const app = express();

app.get("/", (req, res) => res.json({ rockeaseat: "Hello World NLW 4" }));

// eslint-disable-next-line no-console
app.listen(3000, () => console.log("Server is running!!"));
