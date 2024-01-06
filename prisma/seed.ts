import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function seedMain() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: { connect: { id: 3 } },
      },
    });

    console.log(item);
  });
}

seedMain()
  .catch((e) => console.log("error", e))
  .finally(() => client.$disconnect());
