import db from "@/libs/prisma/db";

export const getUsers = async () => {
    const Users = await db.user.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(Users));
}

export const getUserById = async (id) => {
    const User = await db.user.findUnique({
        where: {
            id: id
        }
    });
    return JSON.parse(JSON.stringify(User));
}