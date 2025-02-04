
export enum GroceryStore {
    CARREFOUR = "CARREFOUR",
    AUCHAN = "AUCHAN"
}

export function FindGroceryStoreFromString(groceryStoreName: string): GroceryStore {
    switch(groceryStoreName.toLowerCase()) {
        case "carrefour":
            return GroceryStore.CARREFOUR;
        case "auchan":
            return GroceryStore.AUCHAN;
        default:
            throw new Error("Store not supported");
    }
}