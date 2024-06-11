import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed cities
  const cities = [
    { name: 'London' },
    { name: 'New York' },
    { name: 'Los Angeles' },
    { name: 'Chicago' },
    { name: 'Manchester' }
  ];

  // Seed brands
  const brands = [
    { name: "McDonald's" },
    { name: 'KFC' },
    { name: 'Burger King' },
    { name: 'Sushimania' }
  ];

  // Seed dish types
  const dishTypes = [
    { name: 'Sushi' },
    { name: 'Pizza' },
    { name: 'Burger' },
    { name: 'Pasta' }
  ];

  // Seed diets
  const diets = [
    { name: 'Vegetarian' },
    { name: 'Vegan' },
    { name: 'Keto' },
    { name: 'Gluten-Free' }
  ];

  await prisma.city.createMany({ data: cities });
  await prisma.brand.createMany({ data: brands });
  await prisma.dishType.createMany({ data: dishTypes });
  await prisma.diet.createMany({ data: diets });
}

main()
    .catch(e => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
