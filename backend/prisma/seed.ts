import { Category, PrismaClient } from '@prisma/client'
import { generateSlug } from '../src/utils/GenerateSlug'
import { normalizeForSearch } from '../src/utils/NormalizeSearch'

const prisma = new PrismaClient()

const baseProducts = [
  {
    name: 'CRASH DOLL',
    baseSlug: 'туфли на тракторной подошве черные',
    price: 5999,
    category: Category.SANDALS,
    color: 'black',
    baseSku: 'CD',
    description:
      'Дерзкие черные туфли на массивной тракторной подошве. Идеальное сочетание грубой эстетики и утонченного стиля. Высокая подошва добавляет роста и уверенности, а классический черный цвет подходит под любой образ. Прочная конструкция обеспечивает комфорт на весь день.',
    images: [
      'http://localhost:3001/images/CRASH_DOLL/image-1.webp',
      'http://localhost:3001/images/CRASH_DOLL/image-2.webp',
      'http://localhost:3001/images/CRASH_DOLL/image-3.webp',
      'http://localhost:3001/images/CRASH_DOLL/image-4.webp',
      'http://localhost:3001/images/CRASH_DOLL/image-5.webp',
      'http://localhost:3001/images/CRASH_DOLL/image-6.webp',
      'http://localhost:3001/images/CRASH_DOLL/image-7.webp',
    ],
  },
  {
    name: 'CANDY KILL',
    baseSlug: 'розовые ботинки на высокой подошве',
    price: 8459,
    category: Category.BOOTS,
    color: 'pink',
    baseSku: 'CK',
    description:
      'Экстравагантные розовые ботинки на головокружительной платформе. Яркий цвет и необычный дизайн привлекают внимание и выделяют из толпы. Высокая подошва визуально удлиняет ноги, а удобная колодка позволяет носить их целый день. Для тех, кто не боится быть в центре внимания.',
    images: [
      'http://localhost:3001/images/CANDY_KILL/image-1.webp',
      'http://localhost:3001/images/CANDY_KILL/image-2.webp',
      'http://localhost:3001/images/CANDY_KILL/image-3.webp',
      'http://localhost:3001/images/CANDY_KILL/image-4.webp',
      'http://localhost:3001/images/CANDY_KILL/image-5.webp',
      'http://localhost:3001/images/CANDY_KILL/image-6.webp',
    ],
  },
  {
    name: 'TIED TO RULE',
    baseSlug: 'сапоги готические с ремнями',
    price: 14999,
    category: Category.HIGHBOOTS,
    color: 'black',
    baseSku: 'TTR',
    description:
      'Высокие готические сапоги с множеством ремней и пряжек. Воплощение темной эстетики и бунтарского духа. Функциональные ремни позволяют регулировать посадку, а высокое голенище создает драматичный силуэт. Качественные материалы и надежная фурнитура гарантируют долговечность.',
    images: [
      'http://localhost:3001/images/TIED_TO_RULE/image-1.webp',
      'http://localhost:3001/images/TIED_TO_RULE/image-2.webp',
      'http://localhost:3001/images/TIED_TO_RULE/image-3.webp',
      'http://localhost:3001/images/TIED_TO_RULE/image-4.webp',
      'http://localhost:3001/images/TIED_TO_RULE/image-5.webp',
      'http://localhost:3001/images/TIED_TO_RULE/image-6.webp',
    ],
  },
  {
    name: 'BLOODLINK',
    baseSlug: 'туфли на тракторной подошве красные',
    price: 7999,
    category: Category.SANDALS,
    color: 'red',
    baseSku: 'BL',
    description:
      'Яркие красные туфли на массивной тракторной подошве. Смелый выбор для тех, кто хочет заявить о себе. Насыщенный красный цвет притягивает взгляды, а устойчивая платформа обеспечивает комфорт при ходьбе. Отлично сочетаются как с повседневными, так и с вечерними образами.',
    images: [
      'http://localhost:3001/images/BLOODLINK/image-1.webp',
      'http://localhost:3001/images/BLOODLINK/image-2.webp',
      'http://localhost:3001/images/BLOODLINK/image-3.webp',
      'http://localhost:3001/images/BLOODLINK/image-4.webp',
      'http://localhost:3001/images/BLOODLINK/image-5.webp',
      'http://localhost:3001/images/BLOODLINK/image-6.webp',
      'http://localhost:3001/images/BLOODLINK/image-7.webp',
    ],
  },
  {
    name: 'WAR ANGEL',
    baseSlug: 'зеленые ботинки на высокой подошве',
    price: 12999,
    category: Category.BOOTS,
    color: 'green',
    baseSku: 'WA',
    description:
      'Необычные зеленые ботинки на высокой платформе. Уникальный оттенок выделяет эту модель из ряда классических вариантов. Высокая подошва создает эффектный силуэт и добавляет роста. Прочная конструкция подходит для городских прогулок в любую погоду. Для смелых и уверенных в себе.',
    images: [
      'http://localhost:3001/images/WAR_ANGEL/image-1.webp',
      'http://localhost:3001/images/WAR_ANGEL/image-2.webp',
      'http://localhost:3001/images/WAR_ANGEL/image-3.webp',
      'http://localhost:3001/images/WAR_ANGEL/image-4.webp',
      'http://localhost:3001/images/WAR_ANGEL/image-5.webp',
      'http://localhost:3001/images/WAR_ANGEL/image-6.webp',
      'http://localhost:3001/images/WAR_ANGEL/image-7.webp',
    ],
  },
  {
    name: 'SWEET DAMAGE',
    baseSlug: 'сапоги с шипами',
    price: 14499,
    category: Category.HIGHBOOTS,
    color: 'black',
    baseSku: 'SD',
    description:
      'Брутальные высокие сапоги с металлическими шипами и заклепками. Агрессивный дизайн для самых смелых образов. Шипы и декоративные элементы создают неповторимый рок-н-ролльный стиль. Высокое голенище и устойчивая подошва обеспечивают комфорт и уверенность. Настоящий must-have для любителей альтернативной моды.',
    images: [
      'http://localhost:3001/images/SWEET_DAMAGE/image-1.webp',
      'http://localhost:3001/images/SWEET_DAMAGE/image-2.webp',
      'http://localhost:3001/images/SWEET_DAMAGE/image-3.webp',
      'http://localhost:3001/images/SWEET_DAMAGE/image-4.webp',
      'http://localhost:3001/images/SWEET_DAMAGE/image-5.webp',
    ],
  },
]

// Дополнительные названия для вариаций
const nameSuffixes = [
  'PRO',
  'LTE',
  'X',
  'MAX',
  'TS',
  'JS',
  'CSS',
  'S',
  'D',
  'W',
]

// Функция генерации случайного stock для размеров
function generateRandomSizeStock() {
  const sizes = [36, 37, 38, 39, 40, 41, 42]
  return sizes.map((size) => ({
    size,
    stock: Math.floor(Math.random() * 15), // 0-14 штук
  }))
}

// Функция генерации случайной цены с вариацией ±30%
function randomizePrice(basePrice: number): number {
  const variation = 0.3
  const multiplier = 1 + (Math.random() * 2 - 1) * variation
  return Math.round(basePrice * multiplier)
}

async function main() {
  console.log('Seeding database with 200 products...')

  // Очистка базы (SizeStock удалится автоматически из-за onDelete: Cascade)
  await prisma.product.deleteMany()

  const totalProducts = 200
  let createdCount = 0

  for (let i = 0; i < totalProducts; i++) {
    // Выбираем случайный базовый товар
    const baseProduct = baseProducts[i % baseProducts.length]

    // Генерируем вариации
    const suffix = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)]
    const productNumber = i + 1

    const name = `${baseProduct.name} ${suffix} ${productNumber}`
    const price = randomizePrice(baseProduct.price)
    const hasDiscount = Math.random() > 0.7 // 30% товаров со скидкой
    const oldPrice = hasDiscount
      ? Math.round(price * (1.1 + Math.random() * 0.3))
      : price
    const isFeatured = Math.random() > 0.8 // 20% featured

    await prisma.product.create({
      data: {
        name,
        searchName: normalizeForSearch(name),
        slug: generateSlug(
          `${baseProduct.baseSlug} ${suffix} ${productNumber}`
        ),
        price,
        oldPrice,
        category: baseProduct.category,
        color: baseProduct.color,
        sku: `${baseProduct.baseSku}-${String(productNumber).padStart(3, '0')}`,
        description: baseProduct.description,
        images: baseProduct.images,
        featured: isFeatured,
        sizeStock: {
          create: generateRandomSizeStock(),
        },
      },
    })

    createdCount++
    if (createdCount % 50 === 0) {
      console.log(`Created ${createdCount} products...`)
    }
  }

  console.log(`Successfully created ${createdCount} products!`)
}

main()
  .catch((error) => {
    console.error('Seed error:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
