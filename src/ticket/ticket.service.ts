import CleanUpDataService from "../storeDataParsing/cleanUpData";
import { GroceryListWithPrice } from "../storeDataParsing/GroceryItem.model";
import { FindGroceryStoreFromString, GroceryStore } from "../storeDataParsing/GroceryStore";
import { readTicketData } from "./readTicketFromPaper";
import { Request, Response } from "express";

class TicketService {
    
    public getGroceryListFromTicket: GetGroceryListFromTicketType = async (req, res) => {
        const store = req.body.store;
        try {
            const ticketFrom: GroceryStore = FindGroceryStoreFromString(store);
            const readTicketResult = await readTicketData(req, res);
            switch(readTicketResult.status) {
                case 200:
                    const groceryListWithPrice: GroceryListWithPrice = CleanUpDataService.cleanUpData({
                        data: readTicketResult.data, 
                        store: ticketFrom
                    });
                    res.json(groceryListWithPrice);
                    return;
                default:
                    res.status(readTicketResult.status).send(readTicketResult.data);
                    return;
            }
        } catch (error) {
            res.status(400).send("Store not supported");
            return;
        }
    }
}

type GetGroceryListFromTicketType = (req: Request, res: Response) => Promise<void>

export default new TicketService();