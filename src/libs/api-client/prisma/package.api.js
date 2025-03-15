import db from "@/libs/prisma/db";

export const getPackages = async () => {
    const packages = await db.package.findMany({
        include: {
            translations: true,
        },
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(packages));
}