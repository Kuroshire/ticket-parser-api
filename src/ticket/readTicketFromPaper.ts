import { Request, Response } from 'express';
import Tesseract from 'tesseract.js';
import fs from "fs";

export const readTicketData: ReadTicketDataType = async (req, res) => {
  if (!req.file) {
    res.status(400).send("Aucun fichier reçu.");
    return {
      status: 400,
      data: "Aucun fichier reçu."
    };
  }

  try {
    // Analyse OCR avec Tesseract.js
    const result = await Tesseract.recognize(
      req.file.path,
      "fra",
      { logger: m => console.log(m) } // pour voir les logs
    );
    const text = result.data.text;

    // Supprime l'image après traitement
    fs.unlinkSync(req.file.path);

    res.status(200).json(text);

    return {
      status: 200,
      data: text
    }
  } catch (error) {
    res.status(500).send("Erreur lors du traitement du ticket.");
  } finally {
    return {
      status: 500,
      data : "Erreur lors du traitement du ticket."
    };
  }
}

type ReadTicketDataType = (req: Request, res: Response) => Promise<ResponseType>
type ResponseType = {
  status: 200,
  data: string
} | {
  status: 400 | 500,
  data: string
}