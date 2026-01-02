
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL!
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Clearing database...')
  await prisma.review.deleteMany()
  await prisma.service.deleteMany()
  await prisma.clinic.deleteMany()
  await prisma.user.deleteMany()
  await prisma.category.deleteMany()
  await prisma.specialty.deleteMany()
  await prisma.insurance.deleteMany()

  console.log('Seeding database...')

  // Create Taxonomies
  const catCardiology = await prisma.category.create({
    data: {
      name: 'Cardiology',
      translations: {
        create: [
          { locale: 'en', name: 'Cardiology' },
          { locale: 'fa', name: 'قلب و عروق' },
        ],
      },
    },
  })

  const catDiagnostics = await prisma.category.create({
    data: {
      name: 'Diagnostics',
      translations: {
        create: [
          { locale: 'en', name: 'Diagnostics' },
          { locale: 'fa', name: 'تشخیصی' },
        ],
      },
    },
  })

  const specCardiology = await prisma.specialty.create({
    data: {
      name: 'Cardiology',
      translations: {
        create: [
          { locale: 'en', name: 'Cardiology' },
          { locale: 'fa', name: 'متخصص قلب' },
        ],
      },
    },
  })

  const insTamin = await prisma.insurance.create({
    data: {
      name: 'Tamin Ejtemaei',
      translations: {
        create: [
          { locale: 'en', name: 'Tamin Ejtemaei' },
          { locale: 'fa', name: 'تأمین اجتماعی' },
        ],
      },
    },
  })

  const insAsia = await prisma.insurance.create({
    data: {
      name: 'Asia',
      translations: {
        create: [
          { locale: 'en', name: 'Asia' },
          { locale: 'fa', name: 'بیمه آسیا' },
        ],
      },
    },
  })

  // Create Users
  const hashedPassword = '$2a$10$T8VqU8NqC1BqH.y1Nq8vQuNqC1BqH.y1Nq8vQuNqC1BqH.y1Nq8vQu'; // "password"

  const user1 = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: { password: hashedPassword },
    create: {
      email: 'user@example.com',
      name: 'Alice User',
      password: hashedPassword,
      role: 'USER',
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@example.com',
      name: 'Bob Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Create Clinic
  const clinic = await prisma.clinic.create({
    data: {
      name: 'Yazd Heart Center',
      description: 'Specialized cardiology clinic in Yazd.',
      city: 'Yazd',
      address: '123 Health St',
      isVerified: true,
      insurances: {
        connect: [{ id: insTamin.id }, { id: insAsia.id }],
      },
      specialties: {
        connect: [{ id: specCardiology.id }],
      },
      services: {
        create: [
          {
            name: 'Cardiology Consultation',
            categoryId: catCardiology.id,
            description: 'General heart checkup.',
            priceMin: 5000000,
            priceMax: 7000000,
          },
          {
            name: 'ECG',
            categoryId: catDiagnostics.id,
            priceMin: 2000000,
            priceMax: 2000000,
          },
        ],
      },
      reviews: {
        create: {
          rating: 5,
          comment: 'Excellent service!',
          userId: user1.id,
          status: 'APPROVED',
        },
      },
    },
  })

  console.log('Seeding completed sucessfully.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
