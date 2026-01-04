
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// If using adapter (as seen in src/lib/prisma.ts), we might need that.
// But for a simple script, we should just rely on standard connection if adapter is optional.
// Or just copy the singleton logic.

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const email = 'admin@example.com';
    const password = await bcrypt.hash('password123', 10);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
        await prisma.user.create({
            data: {
                name: 'Admin User',
                email,
                password,
                role: 'ADMIN',
            }
        });
        console.log('Admin user created');
    } else {
        console.log('Admin user already exists');
    }

    // Create some dummy patients
    for (let i = 0; i < 5; i++) {
        const patientEmail = `patient${i}@example.com`;
        const pExisting = await prisma.user.findUnique({ where: { email: patientEmail } });
        if (!pExisting) {
            await prisma.user.create({
                data: {
                    name: `Patient ${i}`,
                    email: patientEmail,
                    password,
                    role: 'USER'
                }
            });
        }
    }
    console.log('Dummy patients created');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
