import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

async function rollback() {
    await prisma.language.deleteMany();
    await prisma.postTranslation.deleteMany();
    await prisma.authorTranslation.deleteMany();
    await prisma.categoryTranslation.deleteMany();
    await prisma.tagTranslation.deleteMany();
    await prisma.post.deleteMany();
    await prisma.author.deleteMany();
    await prisma.category.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.image.deleteMany();
    await prisma.youtube.deleteMany();
}

rollback()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });