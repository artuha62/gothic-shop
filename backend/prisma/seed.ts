import { PrismaClient, Category } from '@prisma/client'
import { generateSlug } from '../src/utils/generateSlug'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Очистка базы (SizeStock удалится автоматически из-за onDelete: Cascade)
  await prisma.product.deleteMany()

  // Создание продукта с размерами
  const crashDoll = await prisma.product.create({
    data: {
      name: 'CRASH DOLL',
      slug: generateSlug('туфли на тракторной подошве черные 1'),
      price: 5999,
      oldPrice: 5999,
      category: Category.SANDALS,
      color: 'black',
      sku: 'CD-001',
      description: '',
      images: [
        'http://localhost:3001/images/CRASH_DOLL/image-1.webp',
        'http://localhost:3001/images/CRASH_DOLL/image-2.webp',
        'http://localhost:3001/images/CRASH_DOLL/image-3.webp',
        'http://localhost:3001/images/CRASH_DOLL/image-4.webp',
        'http://localhost:3001/images/CRASH_DOLL/image-5.webp',
        'http://localhost:3001/images/CRASH_DOLL/image-6.webp',
        'http://localhost:3001/images/CRASH_DOLL/image-7.webp',
      ],
      featured: true,
      sizeStock: {
        create: [
          { size: 36, stock: 5 },
          { size: 37, stock: 8 },
          { size: 38, stock: 10 },
          { size: 39, stock: 7 },
          { size: 40, stock: 6 },
          { size: 41, stock: 9 },
          { size: 42, stock: 5 },
        ],
      },
    },
  })

  const candyKill = await prisma.product.create({
    data: {
      name: 'CANDY KILL',
      slug: generateSlug('розовые ботинки на высокой подошве 1'),
      price: 8459,
      oldPrice: 8459,
      category: Category.BOOTS,
      color: 'pink',
      sku: 'CK-005',
      description: '',
      images: [
        'http://localhost:3001/images/CANDY_KILL/image-1.webp',
        'http://localhost:3001/images/CANDY_KILL/image-2.webp',
        'http://localhost:3001/images/CANDY_KILL/image-3.webp',
        'http://localhost:3001/images/CANDY_KILL/image-4.webp',
        'http://localhost:3001/images/CANDY_KILL/image-5.webp',
        'http://localhost:3001/images/CANDY_KILL/image-6.webp',
      ],
      featured: true,
      sizeStock: {
        create: [
          { size: 37, stock: 4 },
          { size: 38, stock: 5 },
          { size: 39, stock: 3 },
          { size: 40, stock: 2 },
          { size: 41, stock: 4 },
          { size: 42, stock: 2 },
        ],
      },
    },
  })

  const tiedToRule = await prisma.product.create({
    data: {
      name: 'TIED TO RULE',
      slug: generateSlug('сапоги готические с ремнями 1'),
      price: 14999,
      oldPrice: 14999,
      category: Category.HIGHBOOTS,
      color: 'black',
      sku: 'TTR-025',
      description: '',
      images: [
        'http://localhost:3001/images/TIED_TO_RULE/image-1.webp',
        'http://localhost:3001/images/TIED_TO_RULE/image-2.webp',
        'http://localhost:3001/images/TIED_TO_RULE/image-3.webp',
        'http://localhost:3001/images/TIED_TO_RULE/image-4.webp',
        'http://localhost:3001/images/TIED_TO_RULE/image-5.webp',
        'http://localhost:3001/images/TIED_TO_RULE/image-6.webp',
      ],
      featured: true,
      sizeStock: {
        create: [
          { size: 36, stock: 0 },
          { size: 37, stock: 4 },
          { size: 38, stock: 3 },
          { size: 39, stock: 0 },
          { size: 40, stock: 5 },
          { size: 41, stock: 3 },
          { size: 42, stock: 2 },
        ],
      },
    },
  })

  const bloodlink = await prisma.product.create({
    data: {
      name: 'BLOODLINK',
      slug: generateSlug('туфли на тракторной подошве красные 1'),
      price: 7999,
      oldPrice: 7999,
      category: Category.SANDALS,
      color: 'red',
      sku: 'B-002',
      description: '',
      images: [
        'http://localhost:3001/images/BLOODLINK/image-1.webp',
        'http://localhost:3001/images/BLOODLINK/image-2.webp',
        'http://localhost:3001/images/BLOODLINK/image-3.webp',
        'http://localhost:3001/images/BLOODLINK/image-4.webp',
        'http://localhost:3001/images/BLOODLINK/image-5.webp',
        'http://localhost:3001/images/BLOODLINK/image-6.webp',
        'http://localhost:3001/images/BLOODLINK/image-7.webp',
      ],
      featured: true,
      sizeStock: {
        create: [
          { size: 36, stock: 7 },
          { size: 37, stock: 9 },
          { size: 38, stock: 8 },
          { size: 39, stock: 6 },
          { size: 40, stock: 8 },
          { size: 41, stock: 7 },
          { size: 42, stock: 5 },
        ],
      },
    },
  })

  const warAngel = await prisma.product.create({
    data: {
      name: 'WAR ANGEL',
      slug: generateSlug('зеленые ботинки на высокой подошве 1'),
      price: 12999,
      oldPrice: 12999,
      category: Category.BOOTS,
      color: 'green',
      sku: 'WA-011',
      description: '',
      images: [
        'http://localhost:3001/images/WAR_ANGEL/image-1.webp',
        'http://localhost:3001/images/WAR_ANGEL/image-2.webp',
        'http://localhost:3001/images/WAR_ANGEL/image-3.webp',
        'http://localhost:3001/images/WAR_ANGEL/image-4.webp',
        'http://localhost:3001/images/WAR_ANGEL/image-5.webp',
        'http://localhost:3001/images/WAR_ANGEL/image-6.webp',
        'http://localhost:3001/images/WAR_ANGEL/image-7.webp',
      ],
      featured: true,
      sizeStock: {
        create: [
          { size: 36, stock: 2 },
          { size: 37, stock: 3 },
          { size: 39, stock: 2 },
          { size: 40, stock: 2 },
          { size: 41, stock: 2 },
          { size: 42, stock: 1 },
        ],
      },
    },
  })

  console.log('Created 5 products with size stocks')
}

main()
  .catch((error) => {
    console.error('Seed error:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
