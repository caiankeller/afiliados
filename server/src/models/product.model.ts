import ITypeReference from "./typeReference.model";

interface IProduct {
  name: string;
  sellers: {
    name: string;
    total: number;
    transactions: {
      type: string;
      date: string;
      priceTag: number;
      typeReference: ITypeReference;
    }[];
  }[];
}

export default IProduct;
