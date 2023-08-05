import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.transactionType.createMany({
    data: [
      {
        type: "1",
        description: "Venda produtor",
        nature: "Entrada",
        signal: "+"
      },
      {
        type: "2",
        description: "Venda afiliado",
        nature: "Entrada",
        signal: "+"
      },
      {
        type: "3",
        description: "Comissão paga",
        nature: "Saída",
        signal: "-"
      },
      {
        type: "4",
        description: "Comissão recebida",
        nature: "Entrada",
        signal: "+"
      },
    ],
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
