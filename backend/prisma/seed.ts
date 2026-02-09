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
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645874/image-1_uacjej.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645874/image-2_ncewol.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645875/image-3_ql8csh.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645875/image-4_laqbbq.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645876/image-5_rx1dkd.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645877/image-6_k4yvml.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645877/image-7_lmqfoi.webp',
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
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645872/image-1_mimjdn.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645873/image-2_fkqraq.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645873/image-3_sokig0.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645873/image-4_kta6wq.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645873/image-5_lrv0kb.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645873/image-6_sojlnb.webp',
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
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645879/image-1_pz1att.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645878/image-2_l3tnvc.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645878/image-3_ybao00.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645879/image-4_r8fwon.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645880/image-5_pm2aod.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645880/image-6_bi4azp.webp',
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
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645872/image-1_ylte5e.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645872/image-2_vc5rug.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645872/image-3_ofzauf.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645872/image-4_xxqmw6.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645873/image-5_mgmfv7.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645873/image-6_eicshs.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645872/image-7_k1sqfa.webp',
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
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645880/image-1_qr20vy.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645881/image-2_rugszn.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645881/image-3_q6xyts.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645883/image-4_fbqy5x.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645881/image-5_il4yko.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645882/image-6_rir0uh.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645886/image-7_fglvam.webp',
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
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645877/image-1_ud0ot4.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645877/image-2_wzoaxu.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645877/image-3_zxkvt1.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645877/image-4_mt7vbv.webp',
      'https://res.cloudinary.com/dfzvex7py/image/upload/v1770645878/image-5_dtttq5.webp',
    ],
  },
]

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

function generateRandomSizeStock() {
  const sizes = [36, 37, 38, 39, 40, 41, 42]
  return sizes.map((size) => ({
    size,
    stock: Math.floor(Math.random() * 15),
  }))
}

function randomizePrice(basePrice: number): number {
  const variation = 0.3
  const multiplier = 1 + (Math.random() * 2 - 1) * variation
  return Math.round(basePrice * multiplier)
}

async function main() {
  await prisma.product.deleteMany()

  const totalProducts = 60
  console.log(`Seeding database with ${totalProducts} products...`)
  let createdCount = 0

  for (let i = 0; i < totalProducts; i++) {
    const baseProduct = baseProducts[i % baseProducts.length]

    const suffix = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)]
    const productNumber = i + 1

    const name = `${baseProduct.name} ${suffix} ${productNumber}`
    const price = randomizePrice(baseProduct.price)
    const hasDiscount = Math.random() > 0.7
    const oldPrice = hasDiscount
      ? Math.round(price * (1.1 + Math.random() * 0.3))
      : price
    const isFeatured = Math.random() > 0.8

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
