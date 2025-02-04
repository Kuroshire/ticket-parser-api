import CleanUpDataService from './cleanUpData';
import { GroceryListWithPrice } from './GroceryItem.model';
import { GroceryStore } from './GroceryStore';

test('CARREFOUR: cleanUpData returns empty when data is empty', () => {
    const input = {
        data: "",
        store: GroceryStore.CARREFOUR
    };
    const expectedOutput = new Error("Data is not in the expected format");
    try {
        CleanUpDataService.cleanUpData(input);
    } catch (error) {
        expect(error).toEqual(expectedOutput);
    }
});

test('AUCHAN: cleanUpData returns empty when data is empty', () => {
    const input = {
        data: "",
        store: GroceryStore.AUCHAN
    };
    const expectedOutput = {
        groceryList: [],
        totalPrice: ""
    }
    expect(CleanUpDataService.cleanUpData(input)).toEqual(expectedOutput);
});

test('cleanUpData returns correct input when given Auchan ticket result with the correct store', () => {
    const input = {
        data: AuchanInputsFromTicket,
        store: GroceryStore.AUCHAN
    }

    const expectedOutput: GroceryListWithPrice = {
        groceryList: [
            {
              TVA: "0",
              product: "FOURNEE DOREE GAC..",
              quantity: 1,
              totalCost: 2.89,
              unitPrice: 2.89,
            },
            {
              TVA: "0",
              product: "HARRYS PAIN MIE C..",
              quantity: 1,
              totalCost: 1.85,
              unitPrice: 1.85,
            },
            {
              TVA: "0",
              product: "BANANE BIO 5 DOIGTS",
              quantity: 1,
              totalCost: 1.99,
              unitPrice: 1.99,
            },
            {
              TVA: "0",
              product: "LUSTUCRU TORTELLI..",
              quantity: 2,
              totalCost: 5.08,
              unitPrice: 2.54,
            },
            {
              TVA: "0",
              product: "PRIX BAS HACHE BF..",
              quantity: 1,
              totalCost: 2.00,
              unitPrice: 2.00,
            },
            {
              TVA: "0",
              product: "LAYS CHIP SAVEUR ..",
              quantity: 1,
              totalCost: 1.99,
              unitPrice: 1.99,
            },
            {
              TVA: "0",
              product: "BARILLA FARFALLE ..",
              quantity: 1,
              totalCost: 2.35,
              unitPrice: 2.35,
            },
            {
              TVA: "0",
              product: "ANDROS DESSERT PO..",
              quantity: 1,
              totalCost: 1.99,
              unitPrice: 1.99,
            },
            {
              TVA: "0",
              product: "AUCHAN 12 P TITS ..",
              quantity: 1,
              totalCost: 1.92,
              unitPrice: 1.92,
            },
        ],
        totalPrice: "22,06"
    };
    expect(CleanUpDataService.cleanUpData(input)).toEqual(expectedOutput);
});

test('cleanUpData handles array with no null values', () => {
    const input = {
        data: CarrefourInputsFromTicket,
        store: GroceryStore.CARREFOUR
    }
    const expectedOutput : GroceryListWithPrice = {
        groceryList: [],
        totalPrice: "22,06"
    };
    expect(CleanUpDataService.cleanUpData(input)).toEqual(expectedOutput);
});

const AuchanInputsFromTicket = "Vous avez été accueilli par SCO\nLe 25 octobre 2024 à 20:56:38\nCaisse : 132 Ticket : 57586\nHôte(sse) : 10881\n*FOURNEE DOREE GAC.. 2,89\n*HARRYS PAIN MIE C.. 1,85\n*BANANE BIO 5 DOIGTS 1,99\n*LUSTUCRU TORTELLI.. 2*2,54 5,08\n*PRIX BAS HACHE BF.. 2,00\n*LAYS CHIP SAVEUR .. 1,99\n*BARILLA FARFALLE .. 2,35\n*ANDROS DESSERT PO.. 1,99\n*AUCHAN 12 P TITS .. 1,92\nTotal 22,06 €\nTVA% TVA Net Brut\n5,50 1,13 20,93 22,06\nBrut 1,13 20,93 22,06\nReçu CARTE BANCAIRE 22,06\nTOT. ARTICLES ELIGIBLES TR 22,06\nTOT. PAIEMENTS PAR TR 0,00\n10 Articles\nAvec votre carte Auchan ou Accord\nAUCHAN 12 PTITS TRIANGLE 200G 0,10\nTotal EUROS 0,10\nVOTRE COMPTE WAAOH !\nNuméro de carte : #0491**#*4*#40#\nNuméro compte WAAO.. : 68478165\nCher(e) Client (e)\nVotre solde étai..: 5,31\nCrédit du jour : 0,10\nDébit du jour : 0,00\nNouveau solde : 5,41\nEuros utilisables\nJusqu'au 31/01/25 5,41\nwww.auchan. fr/disponibilitepiecesdetac..\nMerci de votre visite. À bientôt.\nA CONSERVER\nwww.auchan. fr/disponibilitepiecesdetac..\nDu lundi au samedi de 8h à 21h30\nLe dimanche de 8h30 à 13h00 et de 13h..\nHER\nCARTE BANCAIRE\nSANS CONTACT\nA00000006041010\nDebit MasterCard\nle 25/10/24 a 20:58:04\nAUCHAN SUPERMAR\n75PARIS\n4724723\n30004\n41040901502416\n0432\n2E887DA539D2EF6D\n132 110 089156\nc @\nNo AUTO : NKEXMQ\nMONTANT\n22,06 EUR\nDEBIT\nTICKET CLIENT\nA CONSERVER\n4410881320167280102524\n";
const CarrefourInputsFromTicket = "";