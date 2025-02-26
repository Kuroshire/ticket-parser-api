import { GroceryItem, GroceryListWithPrice } from "./GroceryItem.model";
import { GroceryStore } from "./GroceryStore";
import { PriceFromStringToNumber, QuantityFromStringToNumber } from "./utils/PriceConversion";

export class CleanUpDataService {

    public cleanUpData({
        data, 
        store
    } : {
        data: string, 
        store: GroceryStore
    }): GroceryListWithPrice {
        
        data.trim();
        switch (store) {
            case GroceryStore.CARREFOUR:
                return this.parseCarrefour(data);
            case GroceryStore.AUCHAN:
                return this.parseAuchan(data);
            default:
                throw new Error("Store not supported");
        }
    }

    private parseCarrefour(data: string): GroceryListWithPrice {
        const dataWithoutHeader = data.split("TVA Produit QTExP.U. Montant €");
        if(dataWithoutHeader.length < 2) {
            throw new Error("Data is not in the expected format");
        }

        const groceryListData = dataWithoutHeader[1].split("Total à payer");
        const totalPrice = groceryListData[1].split("€")[0].trim();


        const groceryData: string[] = groceryListData[0].split("\n").map((item) => item.trim() );
        const groceryList: GroceryItem[] = groceryData.map((itemInfos) => {
            const currentItem = itemInfos.split(" ");
            const length = currentItem.length;
            let TVA = currentItem[0];
            let product = Array.from(currentItem).slice(1, length-4).join(" ");
            let quantity = QuantityFromStringToNumber(currentItem[length-3]);
            let unitPrice = PriceFromStringToNumber(currentItem[length-2]);
            let totalCost = PriceFromStringToNumber(currentItem[length-1]);

            return new GroceryItem({
                TVA,
                product,
                quantity,
                unitPrice,
                totalCost
            })
        })

        return {
            groceryList,
            totalPrice
        };
    }

    private parseAuchan(data: string): GroceryListWithPrice {
        const dataPerLine = data.split("\n");

        const totalPrice = dataPerLine.find(line => line.startsWith("Total"))?.split(" ")[1].trim() || "";

        const groceryList = dataPerLine.filter(line => line.startsWith("*"))
            .map(itemInfos => {

                const currentItem = itemInfos.split(" ");
                
                //example of line with dups: *LUSTUCRU TORTELLI.. 2*2,54 5,08
                //example of line without dups: *LAYS CHIP SAVEUR .. 1,99
                let TVA = "0";
                let totalCost = PriceFromStringToNumber(currentItem[currentItem.length-1]);

                let QuantityAndPrice = currentItem.find(item => item.match(/\d+\*\d+,\d{2}/));
                let quantity: number = QuantityAndPrice ? QuantityFromStringToNumber(QuantityAndPrice.split("*")[0]) : 1;
                let unitPrice: number = QuantityAndPrice ? PriceFromStringToNumber(QuantityAndPrice.split("*")[1]) : totalCost;

                let product = QuantityAndPrice ? 
                    currentItem.slice(1, currentItem.length - 3).join(" ") : 
                    currentItem.slice(1, currentItem.length-2).join(" ");

                return new GroceryItem({
                    TVA,
                    product,
                    quantity,
                    unitPrice,
                    totalCost
                })
            });

        return {
            groceryList,
            totalPrice
        }
    }
}

export default new CleanUpDataService();
