import { User, Product } from './types';

export const MOCK_USER: User = {
  name: "Arjun Mehta",
  phone: "+65 9123 4567",
  email: "arjun.m@example.sg",
  tier: "Gold",
  addresses: [
    { id: 1, type: "Home", text: "38 Draycott Dr, #12-04, Singapore 259428", isDefault: true },
    { id: 2, type: "Work", text: "MBFC Tower 1, 8 Marina Blvd, Singapore 018981", isDefault: false }
  ],
  orders: [
    { id: "SG-7782", date: "Dec 10", total: 345.50, items: "Hibiki Harmony + 2", status: "Delivered" },
    { id: "SG-7701", date: "Dec 02", total: 85.00, items: "Roku Gin", status: "Delivered" }
  ]
};

export const PRODUCTS: Product[] = [
  {
    id: 1, name: "ANCHOR STRONG BEER CAN 490ML X 24", brand: "Anchor", price: 98, category: "BEER", volume: "CTN", abv: "6.0%", desc: "Strong full-bodied beer with a smooth finish.", image: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYm90dGxlfGVufDB8MXx8fDE3NjYzMzI1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["strong", "beer", "party"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 2, name: "CARLSBERG BEER CAN 500ML X 24", brand: "Carlsberg", price: 88, category: "BEER", volume: "CTN", abv: "5.0%", desc: "Crisp and refreshing Danish lager.", image: "https://images.unsplash.com/photo-1644085159285-5fd924740cb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHxsYWdlciUyMGJlZXJ8ZW58MHwxfHx8MTc2NjMzMjU0NXww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["lager", "smooth"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 3, name: "GUINNESS DRAUGHT 440ML X 24", brand: "Guinness", price: 108, category: "BEER", volume: "CTN", abv: "4.2%", desc: "Classic Irish stout with creamy texture.", image: "https://images.unsplash.com/photo-1600213903598-25be92abde40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwzfHxiZWVyJTIwYm90dGxlfGVufDB8MXx8fDE3NjYzMzI1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["stout", "irish"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 4, name: "GUINNESS STOUT CAN 320ML X 24", brand: "Guinness", price: 88, category: "BEER", volume: "CTN", abv: "4.2%", desc: "Dark stout with roasted malt notes.", image: "https://images.unsplash.com/photo-1587669284207-e8ee0fc74144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw0fHxiZWVyJTIwYm90dGxlfGVufDB8MXx8fDE3NjYzMzI1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["stout"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 5, name: "HEINEKEN LONG CAN 500ML X 24", brand: "Heineken", price: 88, category: "BEER", volume: "CTN", abv: "5.0%", desc: "Smooth European lager with mild bitterness.", image: "https://images.unsplash.com/photo-1605306792171-9394b91eb0d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw1fHxiZWVyJTIwYm90dGxlfGVufDB8MXx8fDE3NjYzMzI1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["lager"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 6, name: "HEINEKEN SLIM CAN 320ML X 24", brand: "Heineken", price: 63, category: "BEER", volume: "CTN", abv: "5.0%", desc: "Light and refreshing slim can lager.", image: "https://images.unsplash.com/photo-1581927903420-941a127cc108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXJ8ZW58MHwxfHx8MTc2NjMzMjU0NHww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["light"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 7, name: "KINGFISHER STRONG 490ML X 24", brand: "Kingfisher", price: 95, category: "BEER", volume: "CTN", abv: "8.0%", desc: "Strong Indian lager with bold taste.", image: "https://images.unsplash.com/photo-1584225065152-4a1454aa3d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwyfHxjcmFmdCUyMGJlZXJ8ZW58MHwxfHx8MTc2NjMzMjU0NHww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["strong"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 8, name: "KINGFISHER STRONG 650ML X 12", brand: "Kingfisher", price: 0, category: "BEER", volume: "CTN", abv: "8.0%", desc: "Large bottle strong lager.", image: "https://images.unsplash.com/photo-1608232385022-8ba61bec6c59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwzfHxjcmFmdCUyMGJlZXJ8ZW58MHwxfHx8MTc2NjMzMjU0NHww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["strong"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 9, name: "TIGER BEER CAN 500ML X 24", brand: "Tiger", price: 93, category: "BEER", volume: "CTN", abv: "5.0%", desc: "Asian lager with clean finish.", image: "https://images.unsplash.com/photo-1632173517757-1e87c79de596?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw0fHxjcmFmdCUyMGJlZXJ8ZW58MHwxfHx8MTc2NjMzMjU0NHww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["lager"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 10, name: "TIGER BEER SLIM CAN 320ML X 24", brand: "Tiger", price: 54, category: "BEER", volume: "CTN", abv: "5.0%", desc: "Slim can easy-drinking lager.", image: "https://images.unsplash.com/photo-1720513840843-fd295b4acc35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw1fHxjcmFmdCUyMGJlZXJ8ZW58MHwxfHx8MTc2NjMzMjU0NHww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["light"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 11, name: "JAGERMEISTER HERBAL 700ML", brand: "Jagermeister", price: 42.8, category: "LIQUEURS", volume: "BOT", abv: "35%", desc: "German herbal liqueur, best served ice-cold.", image: "https://images.unsplash.com/photo-1765895815525-90c9c2bf9b3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHxsaXF1ZXVyJTIwYm90dGxlfGVufDB8MXx8fDE3NjYzMzI1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["herbal", "shots"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 12, name: "1848 PREMIUM XO BRANDY 180ML", brand: "1848", price: 0, category: "LIQUEURS", volume: "BOT", abv: "40%", desc: "Smooth XO-style brandy.", image: "https://images.unsplash.com/photo-1702399129748-afb48d93ed67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwyfHxsaXF1ZXVyJTIwYm90dGxlfGVufDB8MXx8fDE3NjYzMzI1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["brandy"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 13, name: "MARTELL VSOP 700ML (W/O BOX)", brand: "Martell", price: 95.8, category: "LIQUEURS", volume: "BOT", abv: "40%", desc: "Refined VSOP cognac without box.", image: "https://images.unsplash.com/photo-1765895815353-902bea84fae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwzfHxsaXF1ZXVyJTIwYm90dGxlfGVufDB8MXx8fDE3NjYzMzI1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["cognac"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 14, name: "MARTELL VSOP 700ML (WITH BOX)", brand: "Martell", price: 95.8, category: "LIQUEURS", volume: "BOT", abv: "40%", desc: "Premium VSOP cognac with gift box.", image: "https://images.unsplash.com/photo-1759283378565-1c42b0be92f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw0fHxsaXF1ZXVyJTIwYm90dGxlfGVufDB8MXx8fDE3NjYzMzI1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["cognac", "gift"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 15, name: "JOSE CUERVO TEQUILA GOLD 75CL", brand: "Jose Cuervo", price: 48.8, category: "TEQUILA", volume: "BOT", abv: "38%", desc: "Gold tequila with smooth oak notes.", image: "https://images.unsplash.com/photo-1516535794938-6063878f08cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHx0ZXF1aWxhJTIwYm90dGxlfGVufDB8MXx8fDE3NjYzMzIyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["tequila"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 16, name: "JOSE CUERVO TEQUILA SILVER 70CL", brand: "Jose Cuervo", price: 49, category: "TEQUILA", volume: "BOT", abv: "38%", desc: "Clean silver tequila, ideal for cocktails.", image: "https://images.unsplash.com/photo-1718881949298-b658a109bf0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwyfHx0ZXF1aWxhJTIwYm90dGxlfGVufDB8MXx8fDE3NjYzMzIyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["silver"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 17, name: "TERESA DC CASTILLO TEQUILA GOLD", brand: "Castillo", price: 0, category: "TEQUILA", volume: "BOT", abv: "38%", desc: "Traditional gold tequila.", image: "https://images.unsplash.com/photo-1698288547419-407ca6bafe2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwzfHx0ZXF1aWxhJTIwYm90dGxlfGVufDB8MXx8fDE3NjYzMzIyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["tequila"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 18, name: "JACK DANIELS 70CL", brand: "Jack Daniels", price: 54.8, category: "BOURBON", volume: "BOT", abv: "40%", desc: "Classic Tennessee whiskey.", image: "https://images.unsplash.com/photo-1618513033174-cfe319656ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwyfHxhbWVyaWNhbiUyMHdoaXNrZXl8ZW58MHwxfHx8MTc2NjMzMjgxMnww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["whiskey"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 19, name: "JACK DANIELS HONEY 70CL", brand: "Jack Daniels", price: 54.8, category: "BOURBON", volume: "BOT", abv: "35%", desc: "Whiskey blended with honey liqueur.", image: "https://images.unsplash.com/photo-1623357322803-7ffaebc63cf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwzfHxhbWVyaWNhbiUyMHdoaXNrZXl8ZW58MHwxfHx8MTc2NjMzMjgxMnww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["honey"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 20, name: "JIM BEAM BOURBON 700ML", brand: "Jim Beam", price: 49.8, category: "BOURBON", volume: "BOT", abv: "40%", desc: "Classic American bourbon.", image: "https://images.unsplash.com/photo-1653834724695-96065e0268d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMHdoaXNrZXl8ZW58MHwxfHx8MTc2NjMzMjgxMnww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["bourbon"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 21, name: "BOMBAY SAPPHIRE GIN 70CL", brand: "Bombay Sapphire", price: 58, category: "GIN", volume: "BOT", abv: "40%", desc: "London dry gin with botanical blend.", image: "https://images.unsplash.com/photo-1571488207231-42641b018e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHxnaW4lMjBib3R0bGV8ZW58MHwxfHx8MTc2NjMzMjI0MHww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["gin"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 22, name: "TANQUERAY GIN 700ML", brand: "Tanqueray", price: 58.8, category: "GIN", volume: "BOT", abv: "43.1%", desc: "Bold gin with juniper-forward taste.", image: "https://images.unsplash.com/photo-1611425541089-033a53eb2f6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwyfHxnaW4lMjBib3R0bGV8ZW58MHwxfHx8MTc2NjMzMjI0MHww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["classic"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 23, name: "HENDRICKS GIN 70CL", brand: "Hendricks", price: 79.8, category: "GIN", volume: "BOT", abv: "41.4%", desc: "Infused with cucumber and rose.", image: "https://images.unsplash.com/photo-1542895324-076f3fb6c2cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwzfHxib3RhbmljYWwlMjBnaW58ZW58MHwxfHx8MTc2NjMzMjI0MXww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["premium"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 24, name: "ROKU GIN 70CL", brand: "Roku", price: 65.8, category: "GIN", volume: "BOT", abv: "43%", desc: "Japanese gin with seasonal botanicals.", image: "https://images.unsplash.com/photo-1633219663563-5614a3c91d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw0fHxnaW4lMjBib3R0bGV8ZW58MHwxfHx8MTc2NjMzMjI0MHww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["japanese"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 25, name: "BACARDI GOLD RUM 75CL", brand: "Bacardi", price: 60, category: "RUM", volume: "BOT", abv: "40%", desc: "Golden rum aged in oak barrels.", image: "https://images.unsplash.com/photo-1613140506142-277c6241b858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHxkYXJrJTIwcnVtfGVufDB8MXx8fDE3NjYzMzI1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["gold"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 26, name: "BACARDI LIMON 70CL", brand: "Bacardi", price: 50, category: "RUM", volume: "BOT", abv: "35%", desc: "Citrus-flavoured rum.", image: "https://images.unsplash.com/photo-1583552188783-709c90220745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwyfHxydW0lMjBib3R0bGV8ZW58MHwxfHx8MTc2NjMzMjU0Nnww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["citrus"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 27, name: "BACARDI RUM 70CL", brand: "Bacardi", price: 46, category: "RUM", volume: "BOT", abv: "40%", desc: "Classic white rum.", image: "https://images.unsplash.com/photo-1613140505986-c64dd5894d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwyfHxkYXJrJTIwcnVtfGVufDB8MXx8fDE3NjYzMzI1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["white"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 28, name: "BACARDI MOJITO 70CL", brand: "Bacardi", price: 45.8, category: "RUM", volume: "BOT", abv: "32%", desc: "Ready-to-serve mojito rum.", image: "https://images.unsplash.com/photo-1584474891920-82ecfc9f8868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw0fHxydW0lMjBib3R0bGV8ZW58MHwxfHx8MTc2NjMzMjU0Nnww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["mojito"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 29, name: "BELVEDERE VODKA 700ML", brand: "Belvedere", price: 73.8, category: "VODKA", volume: "BOT", abv: "40%", desc: "Premium Polish rye vodka.", image: "https://images.unsplash.com/photo-1645784125144-4c06a561fc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHx2b2RrYSUyMGJvdHRsZXxlbnwwfDF8fHwxNzY2MzMyMjQyfDA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["premium"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 30, name: "GREY GOOSE ORIGINAL 70CL", brand: "Grey Goose", price: 67.8, category: "VODKA", volume: "BOT", abv: "40%", desc: "French vodka with smooth finish.", image: "https://images.unsplash.com/photo-1550985543-f47f38aeee65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwyfHx2b2RrYSUyMGJvdHRsZXxlbnwwfDF8fHwxNzY2MzMyMjQyfDA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["smooth"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 31, name: "SMIRNOFF VODKA 700ML", brand: "Smirnoff", price: 44, category: "VODKA", volume: "BOT", abv: "37.5%", desc: "Popular triple-distilled vodka.", image: "https://images.unsplash.com/photo-1539606494565-02e568638d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwzfHx2b2RrYSUyMGJvdHRsZXxlbnwwfDF8fHwxNzY2MzMyMjQyfDA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["classic"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 32, name: "ABSOLUT VODKA 700ML", brand: "Absolut", price: 49.8, category: "VODKA", volume: "BOT", abv: "40%", desc: "Swedish vodka made from winter wheat.", image: "https://images.unsplash.com/photo-1650477021184-6fe8ef5b846e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw0fHx2b2RrYSUyMGJvdHRsZXxlbnwwfDF8fHwxNzY2MzMyMjQyfDA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["swedish"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 33, name: "CHIVAS REGAL 18YRS 75CL", brand: "Chivas", price: 115.8, category: "WHISKY", volume: "BOT", abv: "40%", desc: "Aged blended Scotch whisky.", image: "https://images.unsplash.com/photo-1580537922571-ca7180cd700e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHx3aGlza3klMjBib3R0bGV8ZW58MHwxfHx8MTc2NjMzMjIzN3ww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["aged"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 34, name: "CHIVAS REGAL 1000ML (W BOX)", brand: "Chivas", price: 74.8, category: "WHISKY", volume: "BOT", abv: "40%", desc: "Smooth blended whisky with box.", image: "https://images.unsplash.com/photo-1595505467869-8cb257b13be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHxibGVuZGVkJTIwd2hpc2t5fGVufDB8MXx8fDE3NjYzMzI4MDl8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["gift"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 35, name: "CHIVAS REGAL 70CL (W/O BOX)", brand: "Chivas", price: 57.8, category: "WHISKY", volume: "BOT", abv: "40%", desc: "Everyday blended Scotch whisky.", image: "https://images.unsplash.com/photo-1592620352607-53100d32f9fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwzfHx3aGlza3klMjBib3R0bGV8ZW58MHwxfHx8MTc2NjMzMjIzN3ww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["daily"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 36, name: "JAMESON IRISH WHISKY 70CL", brand: "Jameson", price: 55.8, category: "WHISKY", volume: "BOT", abv: "40%", desc: "Smooth triple-distilled Irish whisky.", image: "https://images.unsplash.com/photo-1602166242292-93a00e63e8e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw0fHx3aGlza3klMjBib3R0bGV8ZW58MHwxfHx8MTc2NjMzMjIzN3ww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["irish"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 37, name: "FIREBALL WHISKY", brand: "Fireball", price: 49.8, category: "WHISKY", volume: "BOT", abv: "33%", desc: "Cinnamon-flavoured whisky.", image: "https://images.unsplash.com/photo-1610639538258-95eadbed7406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw1fHx3aGlza3klMjBib3R0bGV8ZW58MHwxfHx8MTc2NjMzMjIzN3ww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["flavoured"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 38, name: "GLENFIDDICH 12YRS 70CL", brand: "Glenfiddich", price: 82.8, category: "SINGLE MALT", volume: "BOT", abv: "40%", desc: "Fresh and fruity Speyside single malt.", image: "https://images.unsplash.com/photo-1609607284704-e403ef63bd33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHxzaW5nbGUlMjBtYWx0JTIwc2NvdGNofGVufDB8MXx8fDE3NjYzMzI4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["speyside"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 39, name: "GLENFIDDICH 15YRS 75CL", brand: "Glenfiddich", price: 115, category: "SINGLE MALT", volume: "BOT", abv: "40%", desc: "Rich and complex aged single malt.", image: "https://images.unsplash.com/photo-1609607285369-e1ffc4de918b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwyfHxzaW5nbGUlMjBtYWx0JTIwc2NvdGNofGVufDB8MXx8fDE3NjYzMzI4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["aged"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 40, name: "GLENFIDDICH 18YRS 70CL", brand: "Glenfiddich", price: 142, category: "SINGLE MALT", volume: "BOT", abv: "40%", desc: "Deep oak and dried fruit notes.", image: "https://images.unsplash.com/photo-1760464022274-648edc208472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwzfHxzaW5nbGUlMjBtYWx0JTIwc2NvdGNofGVufDB8MXx8fDE3NjYzMzI4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["premium"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 41, name: "GLENLIVET 12YRS DOUBLE OAK 70CL", brand: "Glenlivet", price: 94.8, category: "SINGLE MALT", volume: "BOT", abv: "40%", desc: "Double oak matured smooth whisky.", image: "https://images.unsplash.com/photo-1647688574782-149a12e6bdb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw0fHxzaW5nbGUlMjBtYWx0JTIwc2NvdGNofGVufDB8MXx8fDE3NjYzMzI4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["oak"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 42, name: "GLENLIVET 15YRS 700ML", brand: "Glenlivet", price: 114, category: "SINGLE MALT", volume: "BOT", abv: "40%", desc: "French oak influenced single malt.", image: "https://images.unsplash.com/photo-1640877434990-329af580d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwzfHxnbGVubGl2ZXR8ZW58MHwxfHx8MTc2NjMzMjgxNHww&ixlib=rb-4.1.0&q=80&w=1080", tags: ["smooth"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 43, name: "GLENLIVET 18YRS 700ML", brand: "Glenlivet", price: 165, category: "SINGLE MALT", volume: "BOT", abv: "40%", desc: "Complex and well-aged Speyside malt.", image: "https://images.unsplash.com/photo-1746422029200-51af8d27a0da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwxfHxnbGVuZmlkZGljaHxlbnwwfDF8fHwxNzY2MzMyODEzfDA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["luxury"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 44, name: "SINGLETON 12YRS 700ML", brand: "Singleton", price: 65.8, category: "SINGLE MALT", volume: "BOT", abv: "40%", desc: "Smooth and approachable single malt.", image: "https://images.unsplash.com/photo-1638741279987-edcad3da1c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwyfHxnbGVuZmlkZGljaHxlbnwwfDF8fHwxNzY2MzMyODEzfDA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["easy"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 45, name: "SINGLETON 15YRS 700ML", brand: "Singleton", price: 98, category: "SINGLE MALT", volume: "BOT", abv: "40%", desc: "Balanced whisky with rich character.", image: "https://images.unsplash.com/photo-1749532973022-df59ed8b7a78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHwzfHxnbGVuZmlkZGljaHxlbnwwfDF8fHwxNzY2MzMyODEzfDA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["balanced"], time: "Today",
    stock: 0,
    status: ''
  },
  {
    id: 46, name: "SINGLETON 18YRS 700ML", brand: "Singleton", price: 136, category: "SINGLE MALT", volume: "BOT", abv: "40%", desc: "Deep and refined aged single malt.", image: "https://images.unsplash.com/photo-1762528459102-edf593b19239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM1NTB8MHwxfHNlYXJjaHw0fHxnbGVuZmlkZGljaHxlbnwwfDF8fHwxNzY2MzMyODEzfDA&ixlib=rb-4.1.0&q=80&w=1080", tags: ["aged"], time: "Today",
    stock: 0,
    status: ''
  }
];

export const CATEGORIES = [
  'All',
  'BEER',
  'LIQUEURS',
  'TEQUILA',
  'BOURBON',
  'GIN',
  'RUM',
  'VODKA',
  'WHISKY',
  'SINGLE MALT'
];
