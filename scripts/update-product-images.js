// Script to update product images in data.ts with fetched Unsplash images
const fs = require('fs');
const path = require('path');

// Read all image JSON files
const imagesDir = path.join(__dirname, '../public/images');
const whiskyImages = JSON.parse(fs.readFileSync(path.join(imagesDir, 'whisky.json'), 'utf8'));
const bourbonImages = JSON.parse(fs.readFileSync(path.join(imagesDir, 'bourbon.json'), 'utf8'));
const singlemaltImages = JSON.parse(fs.readFileSync(path.join(imagesDir, 'singlemalt.json'), 'utf8'));
const ginImages = JSON.parse(fs.readFileSync(path.join(imagesDir, 'gin.json'), 'utf8'));
const vodkaImages = JSON.parse(fs.readFileSync(path.join(imagesDir, 'vodka.json'), 'utf8'));
const tequilaImages = JSON.parse(fs.readFileSync(path.join(imagesDir, 'tequila.json'), 'utf8'));
const beerImages = JSON.parse(fs.readFileSync(path.join(imagesDir, 'beer.json'), 'utf8'));
const rumImages = JSON.parse(fs.readFileSync(path.join(imagesDir, 'rum.json'), 'utf8'));
const liqueursImages = JSON.parse(fs.readFileSync(path.join(imagesDir, 'liqueurs.json'), 'utf8'));

// Create a mapping of categories to image pools
const categoryImageMap = {
  'BEER': beerImages.map(img => img.url),
  'LIQUEURS': liqueursImages.map(img => img.url),
  'TEQUILA': tequilaImages.map(img => img.url),
  'BOURBON': bourbonImages.map(img => img.url),
  'GIN': ginImages.map(img => img.url),
  'RUM': rumImages.map(img => img.url),
  'VODKA': vodkaImages.map(img => img.url),
  'WHISKY': whiskyImages.map(img => img.url),
  'SINGLE MALT': singlemaltImages.map(img => img.url)
};

// Read data.ts file
const dataFilePath = path.join(__dirname, '../lib/data.ts');
let dataContent = fs.readFileSync(dataFilePath, 'utf8');

// Function to get a random image from a category pool
function getImageForCategory(category, index) {
  const images = categoryImageMap[category];
  if (!images || images.length === 0) {
    return 'https://images.unsplash.com/photo-1608270586620-248524c67de9'; // fallback
  }
  return images[index % images.length];
}

// Parse products and update images
const productsMatch = dataContent.match(/export const PRODUCTS: Product\[\] = \[([\s\S]*?)\];/);
if (productsMatch) {
  let productsString = productsMatch[1];
  
  // Extract all product objects - Updated regex to handle multiline objects
  const productRegex = /\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*price:\s*([\d.]+),\s*category:\s*"([^"]+)",\s*volume:\s*"([^"]+)",\s*abv:\s*"([^"]*)",\s*desc:\s*"([^"]*)",\s*image:\s*"([^"]*)",\s*tags:\s*\[([^\]]*)\],\s*time:\s*"([^"]*)"[^}]*\}/g;
  
  let match;
  let updatedProducts = [];
  let categoryIndex = {};
  
  while ((match = productRegex.exec(productsString)) !== null) {
    const [full, id, name, brand, price, category, volume, abv, desc, oldImage, tags, time] = match;
    
    // Initialize category index
    if (!categoryIndex[category]) {
      categoryIndex[category] = 0;
    }
    
    // Get new image for this product
    const newImage = getImageForCategory(category, categoryIndex[category]);
    categoryIndex[category]++;
    
    updatedProducts.push({
      id, name, brand, price, category, volume, abv, desc, 
      image: newImage, tags, time
    });
  }
  
  // Rebuild the products array string
  let newProductsString = updatedProducts.map(p => 
    `  {\n    id: ${p.id}, name: "${p.name}", brand: "${p.brand}", price: ${p.price}, category: "${p.category}", volume: "${p.volume}", abv: "${p.abv}", desc: "${p.desc}", image: "${p.image}", tags: [${p.tags}], time: "${p.time}",\n    stock: 0,\n    status: ''\n  }`
  ).join(',\n');
  
  // Replace in file
  dataContent = dataContent.replace(
    /export const PRODUCTS: Product\[\] = \[[\s\S]*?\];/,
    `export const PRODUCTS: Product[] = [\n${newProductsString}\n];`
  );
  
  // Write back to file
  fs.writeFileSync(dataFilePath, dataContent, 'utf8');
  
  console.log('✅ Updated product images in data.ts');
  console.log(`   Total products updated: ${updatedProducts.length}`);
  console.log('\n📊 Images per category:');
  Object.keys(categoryIndex).forEach(cat => {
    console.log(`   ${cat}: ${categoryIndex[cat]} products`);
  });
}
