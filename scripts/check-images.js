// scripts/fetchImages.js
const fs = require('fs');
const path = require('path');
const { createApi } = require('unsplash-js');
const fetch = require('node-fetch');
const { default: nodeFetch } = fetch;

// Initialize Unsplash API with your credentials
const unsplash = createApi({
  accessKey: 'FKzNqtQ2xyhnuVmo18SHzcUqhWkbV7sju6-G0aHWO1Y',
  fetch: nodeFetch
});

// Categories and their search terms
const categories = [
  { 
    name: 'whisky', 
    terms: ['whisky bottle', 'scotch whisky', 'blended whisky', 'irish whiskey'] 
  },
  { 
    name: 'bourbon', 
    terms: ['bourbon whiskey', 'jack daniels', 'jim beam bourbon', 'american whiskey'] 
  },
  { 
    name: 'singlemalt', 
    terms: ['single malt scotch', 'glenfiddich', 'glenlivet', 'speyside whisky'] 
  },
  { 
    name: 'gin', 
    terms: ['gin bottle', 'london dry gin', 'botanical gin'] 
  },
  { 
    name: 'vodka', 
    terms: ['vodka bottle', 'premium vodka', 'grey goose'] 
  },
  { 
    name: 'wine', 
    terms: ['red wine', 'white wine', 'wine bottle'] 
  },
  { 
    name: 'champagne', 
    terms: ['champagne bottle', 'champagne glass'] 
  },
  { 
    name: 'tequila', 
    terms: ['tequila bottle', 'premium tequila'] 
  },
  { 
    name: 'beer', 
    terms: ['beer bottle', 'craft beer', 'beer can', 'lager beer'] 
  },
  { 
    name: 'rum', 
    terms: ['rum bottle', 'bacardi rum', 'dark rum'] 
  },
  { 
    name: 'liqueurs', 
    terms: ['liqueur bottle', 'brandy bottle', 'cognac bottle'] 
  }
];

async function fetchImages() {
  const results = {};
  
  // Create images directory if it doesn't exist
  const imagesDir = path.join(__dirname, '../public/images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  for (const category of categories) {
    console.log(`Fetching images for ${category.name}...`);
    const imageUrls = [];
    
    for (const term of category.terms) {
      try {
        console.log(`  - Searching for: ${term}`);
        const response = await unsplash.search.getPhotos({
          query: term,
          page: 1,
          perPage: 5,
          orientation: 'portrait'
        });
        
        if (response.type === 'success') {
          const images = response.response.results.map(photo => ({
            id: photo.id,
            url: photo.urls.regular,
            alt: photo.alt_description || `${term} image`,
            photographer: photo.user.name,
            photographerUrl: `${photo.user.links.html}?utm_source=your_app_name&utm_medium=referral`
          }));
          
          console.log(`    ✓ Found ${images.length} images for "${term}"`);
          imageUrls.push(...images);
        }
      } catch (error) {
        console.error(`    ✗ Error fetching "${term}":`, error.message);
      }
    }
    
    // Remove duplicates and limit to 10 images per category
    results[category.name] = [...new Map(imageUrls.map(item => [item.id, item])).values()].slice(0, 10);
    
    // Save each category's images to a separate JSON file
    fs.writeFileSync(
      path.join(imagesDir, `${category.name}.json`),
      JSON.stringify(results[category.name], null, 2)
    );
  }
  
  // Save all images to a single JSON file
  fs.writeFileSync(
    path.join(imagesDir, 'allImages.json'),
    JSON.stringify(results, null, 2)
  );
  
  console.log('\n✅ Image data saved to:');
  console.log(`   - public/images/allImages.json`);
  categories.forEach(cat => {
    console.log(`   - public/images/${cat.name}.json`);
  });
  
  return results;
}

// Run the script
fetchImages().catch(console.error);