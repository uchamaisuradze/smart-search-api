import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to perform a case-insensitive partial match query
const partialMatchQuery = async (model, word) => {
  return await prisma[model].findMany({
    where: { name: { contains: word, mode: 'insensitive' } }
  });
};

async function extractEntities(searchTerm) {
  // Split the search term into words and filter out common/short words
  const commonWords = new Set(['the', 'and']);
  const words = searchTerm.split(/\s+/).filter(word => word.length > 2 && !commonWords.has(word.toLowerCase()));
  console.log('Words extracted from search term:', words);

  // Fetch all matching entities with partial matches
  const results = await Promise.all(words.map(async (word) => {
    const cities = await partialMatchQuery('city', word);
    const brands = await partialMatchQuery('brand', word);
    const dishTypes = await partialMatchQuery('dishType', word);
    const diets = await partialMatchQuery('diet', word);

    return { word, cities, brands, dishTypes, diets };
  }));
  const mergedResults = mergeEntities(results);
  // results[2].cities = [{ id: 1, name: 'London' }, { id: 5, name: 'Manchester' }];

  console.log('Results:', results);

  // Generate all possible combinations recursively
  const generateCombinations = (results, index = 0, currentCombination = {}) => {
    if (index === results.length) {
      return [currentCombination];
    }

    const { word, cities, brands, dishTypes, diets } = results[index];
    const combinations = [];

    const addCombination = (type, entity) => {
      if (currentCombination[type] && currentCombination[type] !== entity) {
        combinations.push(...generateCombinations(results, index + 1, currentCombination));
      }
      const newCombination = { ...currentCombination, [type]: entity };
      combinations.push(...generateCombinations(results, index + 1, newCombination));
    };

    cities.forEach(city => addCombination('city', city));
    brands.forEach(brand => addCombination('brand', brand));
    dishTypes.forEach(dishType => addCombination('dishType', dishType));
    diets.forEach(diet => addCombination('diet', diet));

    if (cities.length === 0 && brands.length === 0 && dishTypes.length === 0 && diets.length === 0) {
      combinations.push(...generateCombinations(results, index + 1, currentCombination));
    }

    return combinations;
  };

  const combinations = generateCombinations(results);
  // Remove duplicate combinations
  const uniqueCombinations = combinations.reduce((unique, combination) => {
    const key = JSON.stringify(combination);
    if (!unique.some(c => JSON.stringify(c) === key)) {
      unique.push(combination);
    }
    return unique;
  }, []);

  console.log('Unique combinations:', uniqueCombinations);

  return uniqueCombinations;
}

const mergeEntities = (results) => {
  const mergedResult = {
    cities: [],
    brands: [],
    dishTypes: [],
    diets: []
  };

  results.forEach(result => {
    mergedResult.cities.push(...result.cities);
    mergedResult.brands.push(...result.brands);
    mergedResult.dishTypes.push(...result.dishTypes);
    mergedResult.diets.push(...result.diets);
  });

  return mergedResult;
};


export { extractEntities };
