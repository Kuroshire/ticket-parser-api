export function PriceFromStringToNumber(priceString: string): number {
    return parseFloat(priceString.replace(",", "."));
}

export function QuantityFromStringToNumber(quantityString: string): number {
    return parseInt(quantityString, 10);
}