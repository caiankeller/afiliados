import ITypeReference from "./typeReference.model";

interface ITransaction {
  id: string;
  type: string;
  date: string;
  name: string;
  priceTag: number;
  seller: string;
  typeReference: ITypeReference;
}

export default ITransaction;
