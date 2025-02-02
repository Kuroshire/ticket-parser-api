export class GroceryItem {
    TVA: string;
    product: string;
    quantity: string;
    unitPrice: string;
    totalCost: string;

    constructor({
        TVA, 
        product,
        quantity,
        unitPrice,
        totalCost
    }: {
        TVA: string, 
        product: string, 
        quantity: string, 
        unitPrice: string, 
        totalCost: string
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
