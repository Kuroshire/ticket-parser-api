import { Request, Response } from 'express';
import Tesseract from 'tesseract.js';
import fs from "fs";

export const readTicketData = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send("Aucun fichier reçu.");
    return;
  }

  try {
    // Analyse OCR avec Tesseract.js
    const result = await Tesseract.recognize(
      req.file.path,
      "fra",
      { logger: m => console.log(m) } // pour voir les logs
    );
    const text = result.data.text;

    // Extraction du prix total (exemple simple)
    const totalMatch = text.match(/Total\s*:\s*(\d+,\d{2})/);
    const totalPrice = totalMatch ? totalMatch[1] : "Non trouvé";

    // Supprime l'image après traitement
    fs.unlinkSync(req.file.path);

    res.json({ text, totalPrice });
  } catch (error) {
    res.status(500).send("Erreur lors du traitement du ticket.");
  }
}