import express, {Request, Response} from "express";
import multer from "multer";
import { readTicketData } from "./src/ticket/readTicketFromPaper";
import TicketService from "./src/ticket/ticket.service";

const app = express();
const upload = multer({ dest: "uploads/" });

const uploadTicket = (req : Request, res : Response) => {
  readTicketData(req, res);
  return;
}

app.post("/upload-receipt", upload.single("receipt"), TicketService.getGroceryListFromTicket);

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
