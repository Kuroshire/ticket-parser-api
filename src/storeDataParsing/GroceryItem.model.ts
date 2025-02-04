export class GroceryItem {
    TVA: string;
    product: string;
    quantity: number;
    unitPrice: number;
    totalCost: number;

    constructor({
        TVA, 
        product,
        quantity,
        unitPrice,
        totalCost
    }: {
        TVA: string, 
        product: string, 
        quantity: number, 
        unitPrice: number, 
        totalCost: number
    }) {
        this.TVA = TVA;
        this.product = product;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalCost = totalCost;
    }

    public toString(): string {
        return `TVA: ${this.TVA}, Produit: ${this.product}, quantity: ${this.quantity}, Unit Price: ${this.unitPrice}, Montant: ${this.totalCost}`;
    }
}

export interface GroceryListWithPrice {
    groceryList: GroceryItem[],
    totalPrice: string
}
