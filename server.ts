import express from "express";
import multer from "multer";
import { readTicketData } from "./src/ticket/readTicketFromPaper";

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload-receipt", upload.single("receipt"), readTicketData);

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
