import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Example: Seeding a User table
    await prisma.user.create({
        data: {
            name: "postgres",
            email: "eric.marvelboy@gmail.com",
            password: "password", // Hash your passwords in production!
        },
    });
    console.log("Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
