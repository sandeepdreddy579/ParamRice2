/* ============================================================
   PARAM RICE — Site Content & Configuration
   Edit THIS file to change contact info, products, and copy.
   No build step required — just edit and refresh.
   ============================================================ */

/* ---- Brand / contact config — single source of truth ---- */
const brandConfig = {
  name: "Param Rice",
  tagline: "From Paddy to Purity.",
  phone: "+917676949494",
  phoneDisplay: "+91 76769 49494",
  email: "", // add once available, e.g. "hello@paramrice.in"
  whatsapp: "+917676949494",
  instagram: "", // add full URL once available
  facebook: "", // add full URL once available
  youtube: "", // add full URL once available
  location: "Bangalore, Karnataka, India",
};

/* ---- Photography ----------------------------------------
   Temporary licensed stock photography (Unsplash License —
   free for commercial use). Swap these for real Param Rice
   photography by replacing the URLs below, or point them at
   local files, e.g. "assets/brand/mill.jpg".
   See /assets/IMAGE-CREDITS.md for photographer credits.
   ------------------------------------------------------------ */
const siteImages = {
  logo: "assets/brand/param-rice-logo.png",
  heroPaddyField:
    "https://images.unsplash.com/photo-1761549849498-8cf23a31329d?w=1920&q=80&auto=format&fit=crop",
  harvestWoman:
    "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?w=1400&q=80&auto=format&fit=crop",
  biryaniBowl: "assets/brand/biryani.jpg",
  friedrice: "assets/brand/friedrice.jpg",
  jeerarice: "assets/brand/jeerarice.jpg",
  lemonrice: "assets/brand/lemonice.jpg",
  pulao: "assets/brand/pulao.jpg",

  southIndianPlate:
    "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=1000&q=80&auto=format&fit=crop",
  basmathirice: "assets/brand/basmathi.jpg",
  boiledrice: "assets/brand/boiledrice.jpg",
  brokenrice: "assets/brand/broken.jpg",
  brownrice: "assets/brand/brownrice.jpg",
  bulkpaddy: "assets/brand/bulkpaddy.webp",
  rawrice: "assets/brand/rawrice.jpg",
  sonamasori: "assets/brand/sonamasori.jpg",
  steamed: "assets/brand/steamed.jpg",
};

/* ---- Product catalogue ------------------------------------
   Add, edit or remove rice varieties here. Only pack sizes you
   list will be shown — nothing is invented on the front end.
   ------------------------------------------------------------ */
const products = [
  {
    id: 1,
    name: "Param Royale Basmati",
    slug: "royale-basmati",
    category: "Basmati Rice",
    tag: "Premium",
    shortDescription:
      "Long, aromatic grains suited to fragrant biryanis, pulao and special occasions.",
    packSizes: ["1 KG", "5 KG", "10 KG", "26 KG"],
    price: 1450,
    unit: "26 KG bag",
    image: "basmathirice",
  },
  {
    id: 2,
    name: "Param Everyday Sona Masoori",
    slug: "sona-masoori",
    category: "Sona Masoori",
    tag: "Everyday",
    shortDescription:
      "Light, aromatic and easy to digest — a household staple for daily meals.",
    packSizes: ["5 KG", "10 KG", "25 KG", "26 KG"],
    price: 1180,
    unit: "26 KG bag",
    image: "sonamasori",
  },
  {
    id: 3,
    name: "Param Raw Rice",
    slug: "raw-rice",
    category: "Raw Rice",
    tag: "Traditional",
    shortDescription:
      "Unpolished and minimally processed, retaining a firmer bite and traditional character.",
    packSizes: ["5 KG", "10 KG", "25 KG"],
    price: 990,
    unit: "25 KG bag",
    image: "rawrice",
  },
  {
    id: 4,
    name: "Param Boiled Rice",
    slug: "boiled-rice",
    category: "Boiled Rice",
    tag: "Traditional",
    shortDescription:
      "Parboiled for firmer grains that hold their shape well in everyday cooking.",
    packSizes: ["5 KG", "10 KG", "25 KG"],
    price: 1020,
    unit: "25 KG bag",
    image: "boiledrice",
  },
  {
    id: 5,
    name: "Param Steam Rice",
    slug: "steam-rice",
    category: "Steam Rice",
    tag: "Everyday",
    shortDescription:
      "Steamed and processed for consistent texture, ideal for daily household cooking.",
    packSizes: ["5 KG", "10 KG", "25 KG"],
    price: 1050,
    unit: "25 KG bag",
    image: "steamed",
  },
  {
    id: 6,
    name: "Param Brown Rice",
    slug: "brown-rice",
    category: "Brown Rice",
    tag: "Wholegrain",
    shortDescription:
      "Milder milling retains the bran layer for a nuttier taste and heartier texture.",
    packSizes: ["1 KG", "5 KG", "10 KG"],
    price: 210,
    unit: "1 KG pack",
    image: "brownrice",
  },
  {
    id: 7,
    name: "Param Broken Rice",
    slug: "broken-rice",
    category: "Broken Rice",
    tag: "Value",
    shortDescription:
      "Economical broken grains, well suited for porridge, idli batter and bulk kitchens.",
    packSizes: ["25 KG", "50 KG"],
    price: 1650,
    unit: "50 KG bag",
    image: "brokenrice",
  },
  {
    id: 8,
    name: "Param Bulk Paddy",
    slug: "bulk-paddy",
    category: "Paddy / Raw Paddy",
    tag: "Bulk",
    shortDescription:
      "Raw paddy supplied in bulk quantities for mills, traders and institutional buyers.",
    packSizes: ["Bulk / On Request"],
    price: null,
    unit: "On request",
    image: "bulkpaddy",
  },
];
const categories = ["All", ...new Set(products.map((p) => p.category))];

/* ---- Paddy-to-rice journey ---- */
const journeySteps = [
  {
    n: "01",
    t: "Paddy Field",
    d: "Sourcing begins where the grain does — carefully selected paddy.",
  },
  {
    n: "02",
    t: "Harvest",
    d: "Paddy is harvested and prepared for transport to our mill.",
  },
  {
    n: "03",
    t: "Arrival at Mill",
    d: "Incoming paddy is received and checked at our Bangalore facility.",
  },
  {
    n: "04",
    t: "Cleaning",
    d: "Foreign matter and impurities are removed before processing.",
  },
  {
    n: "05",
    t: "Processing",
    d: "Paddy is milled using our own equipment and expertise.",
  },
  {
    n: "06",
    t: "Sorting & Grading",
    d: "Grains are sorted and graded for size and consistency.",
  },
  {
    n: "07",
    t: "Packing",
    d: "Rice is packed in the sizes our customers need.",
  },
  {
    n: "08",
    t: "Your Kitchen",
    d: "From our mill to homes, hotels and businesses across the region.",
  },
];

/* ---- Quality process ---- */
const qualitySteps = [
  {
    n: "01",
    t: "Selected Paddy",
    d: "We start with paddy chosen for our processing standards.",
  },
  {
    n: "02",
    t: "Cleaning",
    d: "Thorough cleaning removes impurities before milling begins.",
  },
  {
    n: "03",
    t: "Sorting",
    d: "Grains are sorted for size and quality consistency.",
  },
  {
    n: "04",
    t: "Processing",
    d: "Milled at our own facility with care at every stage.",
  },
  {
    n: "05",
    t: "Grading",
    d: "Rice is graded to maintain consistency across every batch.",
  },
  {
    n: "06",
    t: "Quality Check",
    d: "Checked before packaging to uphold our standards.",
  },
  {
    n: "07",
    t: "Packaging",
    d: "Packed for freshness in the sizes customers need.",
  },
  {
    n: "08",
    t: "Delivery",
    d: "Delivered to retail, household and bulk customers alike.",
  },
];

/* ---- Why Param Rice ---- */
const whyPoints = [
  {
    t: "Own Mill",
    d: "We operate our own rice mill in Bangalore, giving us control over the entire process.",
  },
  {
    t: "Quality Focus",
    d: "Careful attention at every stage, from paddy intake to final packaging.",
  },
  {
    t: "Wide Variety",
    d: "A range of rice varieties for different kitchens, cuisines and occasions.",
  },
  {
    t: "Consistent Processing",
    d: "Standardised processing so every batch meets the same expectations.",
  },
  {
    t: "Customer Trust",
    d: "Serving households and businesses with reliability at the centre of what we do.",
  },
];

/* ---- Recipes ---- */
const recipes = [
  {
    t: "Biryani",
    cat: "Festive",
    d: "Layered rice and spice, best made with long-grain basmati.",
    rice: "Param Royale Basmati",
    image: "biryaniBowl",
  },
  {
    t: "Pulao",
    cat: "Everyday",
    d: "A fragrant one-pot rice dish for weekday meals.",
    rice: "Param Royale Basmati",
    image: "biryaniBowl",
    image: "pulao",
  },
  {
    t: "Jeera Rice",
    cat: "Everyday",
    d: "Simple, cumin-tempered rice that pairs with most curries.",
    rice: "Param Everyday Sona Masoori",
    image: "jeerarice",
  },
  {
    t: "white Rice",
    cat: "South Indian",
    d: "A cooling, comforting classic finished with a tempering.",
    rice: "Param Steam Rice",
    image: "southIndianPlate",
  },
  {
    t: "Lemon Rice",
    cat: "South Indian",
    d: "Tangy, quick and ideal for lunchboxes.",
    rice: "Param Everyday Sona Masoori",
    image: "lemonrice",
  },
  {
    t: "Fried Rice",
    cat: "Indo-Chinese",
    d: "A weeknight favourite that works well with day-old rice.",
    rice: "Param Steam Rice",
    image: "friedrice",
  },
];
