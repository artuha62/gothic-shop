import { PrismaClient, Category } from '@prisma/client'
import { generateSlug } from '../src/utils/generateSlug'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Очистка базы
  await prisma.product.deleteMany()

  // Создание тестовых продуктов
  const products = await prisma.product.createMany({
    data: [
      {
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
        sizes: [36, 37, 38, 39, 40, 41, 42],
        stock: 50,
        featured: true,
      },
      {
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
        sizes: [37, 38, 39, 40, 41, 42],
        stock: 20,
        featured: true,
      },
      {
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
        sizes: [36, 37, 38, 40, 41, 42],
        stock: 20,
        featured: true,
      },
      {
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
        sizes: [36, 37, 38, 39, 40, 41, 42],
        stock: 50,
        featured: true,
      },
      {
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
        sizes: [36, 37, 39, 40, 41, 42],
        stock: 12,
        featured: true,
      },
    ],
  })

  console.log(`Created ${products.count} products`)
}

main()
  .catch((error) => {
    console.error('Seed error:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
