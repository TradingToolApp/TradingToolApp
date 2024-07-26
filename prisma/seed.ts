import { PrismaClient } from "@prisma/client";
import categories from "./seeds/category";
import { dataEN, dataVN } from "./seeds/posts";
import images from "./seeds/images";
const prisma = new PrismaClient();

async function main() {
  const mockPostsEN = await prisma.postEnglish.createMany({
    data: dataEN,
  });
  const mockPostsVN = await prisma.postVietnamese.createMany({
    data: dataVN,
  });
  const mockImages = await prisma.image.createMany({
    data: images,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
