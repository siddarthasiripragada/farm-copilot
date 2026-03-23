/* ============================================================
   CANADIAN FARM COPILOT — Shared Data & Utilities v2.0
   ============================================================ */

const Profile = {
  save(d) { localStorage.setItem('farmProfile', JSON.stringify(d)); },
  load() { try { return JSON.parse(localStorage.getItem('farmProfile')); } catch { return null; } },
  clear() { localStorage.removeItem('farmProfile'); },
  requireOrRedirect() { const p = Profile.load(); if (!p) { window.location.href = 'index.html'; return null; } return p; }
};

const PROVINCES = ["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland & Labrador","Nova Scotia","Ontario","P.E.I.","Quebec","Saskatchewan"];
const FARM_TYPES = ["Grain & Oilseeds","Dairy","Livestock","Produce / Vegetables","Greenhouse","Specialty Crops","Mixed Farm","Aquaculture","Poultry"];
const PAIN_POINTS = ["Labour Shortage","Rising Input Costs","Feed / Pasture Costs","Market Access","Technology Adoption","Funding Discovery","Cash Flow","Compliance & Paperwork"];
const SIZES = ["Small (< 100 acres / < 50 head)","Medium (100–500 acres / 50–200 head)","Large (500+ acres / 200+ head)","Commercial / Corporate scale"];

const PROGRAMS = [
  { id:1, name:"AgriStability", category:"Risk Management", provinces:"All", type:"Federal-Provincial", amount:"Up to 70% of margin loss", deadline:"Apr 30, 2026", deadlineDate:"2026-04-30", match:95, urgent:true, tags:["income stabilization","all farm types","risk"], desc:"Provides support when a producer's allowable net sales margin falls more than 30% below their reference margin. Expanded in February 2026 to include pasture-related feed costs as an allowable expense.", applyUrl:"https://agriculture.canada.ca/en/programs/agristability" },
  { id:2, name:"AgriMarketing – Market Diversification", category:"Market Access", provinces:"All", type:"Federal", amount:"Up to $500,000", deadline:"Rolling", deadlineDate:null, match:88, urgent:false, tags:["export","market diversification","2026"], desc:"New stream announced February 2026. Supports Canadian agri-food exporters in accessing new international markets amid global trade instability and increasing risks from trade barriers and tariffs.", applyUrl:"https://agriculture.canada.ca/en/programs/agrimarketing" },
  { id:3, name:"B.C. On-Farm Technology Adoption", category:"Technology", provinces:"British Columbia", type:"Provincial", amount:"Up to $100,000", deadline:"Jun 15, 2026", deadlineDate:"2026-06-15", match:74, urgent:false, tags:["technology","labour","automation","BC"], desc:"Funds technology solutions that directly address labour shortages and improve labour-intensive farm processes. Covers planning, equipment purchase, installation, and integration costs.", applyUrl:"#" },
  { id:4, name:"Local Food Infrastructure Fund", category:"Food Security", provinces:"All", type:"Federal", amount:"$30M total pool (2026)", deadline:"May 31, 2026", deadlineDate:"2026-05-31", match:67, urgent:false, tags:["food security","local food","infrastructure","community"], desc:"Announced 2026. Up to $30M supporting projects that strengthen community food security, local food supply chains, and access to fresh food in communities across Canada.", applyUrl:"https://agriculture.canada.ca/en/programs/local-food-infrastructure-fund" },
  { id:5, name:"Resilient Agricultural Landscape Program", category:"Resilience", provinces:"Ontario", type:"Federal-Provincial", amount:"$14.6M pool (Ontario)", deadline:"Mar 31, 2026", deadlineDate:"2026-03-31", match:80, urgent:false, tags:["farmland","resilience","Ontario","environment","land"], desc:"Canada-Ontario partnership announced 2025. Supports farmland improvements, land stewardship, and long-term agricultural resilience including wetland restoration and beneficial management practices.", applyUrl:"#" },
  { id:6, name:"Canadian Agricultural Partnership (CAP)", category:"General Support", provinces:"All", type:"Federal-Provincial-Territorial", amount:"Varies by province & stream", deadline:"Ongoing", deadlineDate:null, match:92, urgent:false, tags:["capacity","all farm types","general","innovation","supply chain"], desc:"The overarching federal-provincial-territorial program framework delivering support across farm business risk management, innovation, agri-food supply chains, and market development for all farm types.", applyUrl:"https://agriculture.canada.ca/en/programs/canadian-agricultural-partnership" },
  { id:7, name:"AgriInnovate", category:"Innovation", provinces:"All", type:"Federal", amount:"Up to $10M per project", deadline:"Rolling", deadlineDate:null, match:58, urgent:false, tags:["innovation","technology","scale-up","R&D","commercialization"], desc:"Accelerates the commercialization and adoption of innovative agri-food products, processes, and services in Canada. Supports projects that improve competitiveness and productivity.", applyUrl:"https://agriculture.canada.ca/en/programs/agriinnovate" },
  { id:8, name:"NRC-IRAP Agriculture Stream", category:"R&D", provinces:"All", type:"Federal", amount:"$50K – $500K", deadline:"Rolling", deadlineDate:null, match:53, urgent:false, tags:["R&D","SME","innovation","prototype","tech development"], desc:"National Research Council Industrial Research Assistance Program support for SMEs developing or adopting innovative technologies in agriculture, food processing, agri-tech, and related sectors.", applyUrl:"https://nrc.canada.ca/en/support-technology-innovation/nrc-industrial-research-assistance-program" }
];

const SPRING_CHECKLIST = [
  "Submit AgriStability enrollment before April 30 deadline",
  "Review and update farm insurance and asset coverage",
  "Service, calibrate, and inspect all planting equipment",
  "Confirm seed orders, genetics, and delivery schedule",
  "Review seasonal labour contracts and staffing plan",
  "Check and test irrigation system components",
  "Update farm input cost budget for the season",
  "File weather damage or business disruption reports if applicable",
  "Review crop rotation plan and soil nutrient assessments",
  "Register for local extension service spring programming",
  "Research new technology adoption funding programs",
  "Prepare documentation for any pending grant applications",
];

const SUGGESTED_QUESTIONS = [
  "What funding programs apply to my farm in Ontario?",
  "Should I invest in automated packing this season?",
  "Explain AgriStability in plain language",
  "What labour-saving technologies qualify for funding?",
  "Give me a spring planting checklist",
  "How do pasture feed costs affect AgriStability?",
];

/* ══════════════════════════════════════════════════════
   WEATHER & CROP INTELLIGENCE DATA
══════════════════════════════════════════════════════ */

const PROVINCE_COORDS = {
  "Alberta":                 { lat:51.05, lon:-114.07, city:"Calgary",       tz:"America%2FEdmonton" },
  "British Columbia":        { lat:49.25, lon:-123.12, city:"Vancouver",     tz:"America%2FVancouver" },
  "Manitoba":                { lat:49.90, lon:-97.14,  city:"Winnipeg",      tz:"America%2FWinnipeg" },
  "New Brunswick":           { lat:45.94, lon:-66.64,  city:"Fredericton",   tz:"America%2FMoncton" },
  "Newfoundland & Labrador": { lat:47.56, lon:-52.71,  city:"St. John's",    tz:"America%2FSt_Johns" },
  "Nova Scotia":             { lat:44.65, lon:-63.58,  city:"Halifax",       tz:"America%2FHalifax" },
  "Ontario":                 { lat:43.70, lon:-79.42,  city:"Toronto",       tz:"America%2FToronto" },
  "P.E.I.":                  { lat:46.24, lon:-63.13,  city:"Charlottetown", tz:"America%2FHalifax" },
  "Quebec":                  { lat:45.51, lon:-73.55,  city:"Montréal",      tz:"America%2FMontreal" },
  "Saskatchewan":            { lat:52.13, lon:-106.67, city:"Saskatoon",     tz:"America%2FRegina" },
};

const WMO = {
  0:  { label:"Clear Sky",              icon:"☀️",  farm:"Ideal for fieldwork & spraying" },
  1:  { label:"Mainly Clear",           icon:"🌤️", farm:"Good conditions for field ops" },
  2:  { label:"Partly Cloudy",          icon:"⛅",  farm:"Moderate — check before spraying" },
  3:  { label:"Overcast",               icon:"☁️",  farm:"Monitor — delay spraying if humid" },
  45: { label:"Foggy",                  icon:"🌫️", farm:"Delay all fieldwork" },
  48: { label:"Icy Fog",                icon:"🌫️", farm:"Dangerous — avoid equipment use" },
  51: { label:"Light Drizzle",          icon:"🌦️", farm:"Limit spraying operations" },
  53: { label:"Moderate Drizzle",       icon:"🌦️", farm:"Postpone spraying" },
  55: { label:"Dense Drizzle",          icon:"🌧️", farm:"Halt field operations" },
  61: { label:"Light Rain",             icon:"🌧️", farm:"Pause field equipment use" },
  63: { label:"Moderate Rain",          icon:"🌧️", farm:"Field operations halted" },
  65: { label:"Heavy Rain",             icon:"🌧️", farm:"Monitor low areas for flooding" },
  71: { label:"Light Snow",             icon:"🌨️", farm:"Check livestock shelter" },
  73: { label:"Moderate Snow",          icon:"❄️",  farm:"Livestock check priority" },
  75: { label:"Heavy Snow",             icon:"❄️",  farm:"Emergency livestock protocol" },
  77: { label:"Snow Grains",            icon:"🌨️", farm:"Monitor road & field conditions" },
  80: { label:"Light Rain Showers",     icon:"🌦️", farm:"Brief delays expected" },
  81: { label:"Moderate Rain Showers",  icon:"🌧️", farm:"Pause outdoor operations" },
  82: { label:"Violent Showers",        icon:"⛈️", farm:"Shelter livestock — high alert" },
  85: { label:"Snow Showers",           icon:"🌨️", farm:"Monitor livestock & standing crops" },
  86: { label:"Heavy Snow Showers",     icon:"❄️",  farm:"All-hands livestock check" },
  95: { label:"Thunderstorm",           icon:"⛈️", farm:"Halt ALL field operations" },
  96: { label:"Thunderstorm + Hail",    icon:"⛈️", farm:"Crop damage risk — document now" },
  99: { label:"Thunderstorm + Hail",    icon:"⛈️", farm:"Emergency — contact crop insurer" },
};

/* Seasonal averages by province [Jan–Dec] for dashboard widget */
const PROVINCE_SEASONS = {
  "Ontario":        [{high:-1,low:-9,icon:"❄️",cond:"Cold & Snow"},{high:0,low:-9,icon:"❄️",cond:"Cold & Snow"},{high:6,low:-3,icon:"🌨️",cond:"Mild & Wet"},{high:14,low:3,icon:"🌦️",cond:"Spring Rain"},{high:21,low:10,icon:"⛅",cond:"Warm & Cloudy"},{high:26,low:15,icon:"🌤️",cond:"Warm & Sunny"},{high:28,low:18,icon:"☀️",cond:"Hot & Humid"},{high:27,low:17,icon:"☀️",cond:"Hot & Sunny"},{high:22,low:12,icon:"⛅",cond:"Cooling Down"},{high:14,low:6,icon:"🌦️",cond:"Fall Rain"},{high:6,low:1,icon:"🌧️",cond:"Cold & Wet"},{high:0,low:-6,icon:"❄️",cond:"Cold & Snow"}],
  "Alberta":        [{high:-7,low:-15,icon:"❄️",cond:"Deep Winter"},{high:-4,low:-13,icon:"❄️",cond:"Cold & Clear"},{high:3,low:-6,icon:"🌨️",cond:"Late Winter"},{high:12,low:1,icon:"🌦️",cond:"Spring Showers"},{high:18,low:6,icon:"⛅",cond:"Warm Spells"},{high:23,low:11,icon:"🌤️",cond:"Warm & Sunny"},{high:26,low:13,icon:"☀️",cond:"Hot & Dry"},{high:25,low:12,icon:"☀️",cond:"Hot & Sunny"},{high:19,low:6,icon:"⛅",cond:"Cooling Down"},{high:11,low:1,icon:"🌦️",cond:"Frosty Nights"},{high:-1,low:-9,icon:"🌨️",cond:"Early Winter"},{high:-6,low:-14,icon:"❄️",cond:"Deep Winter"}],
  "British Columbia":[{high:7,low:1,icon:"🌧️",cond:"Rainy & Mild"},{high:8,low:2,icon:"🌧️",cond:"Wet & Cool"},{high:11,low:4,icon:"🌦️",cond:"Partly Rainy"},{high:14,low:7,icon:"⛅",cond:"Cool & Cloudy"},{high:18,low:10,icon:"⛅",cond:"Mild & Pleasant"},{high:22,low:13,icon:"🌤️",cond:"Warm & Sunny"},{high:25,low:15,icon:"☀️",cond:"Hot & Dry"},{high:25,low:15,icon:"☀️",cond:"Hot & Sunny"},{high:20,low:12,icon:"🌤️",cond:"Warm & Clear"},{high:14,low:7,icon:"🌦️",cond:"Fall Showers"},{high:9,low:4,icon:"🌧️",cond:"Cool & Rainy"},{high:6,low:1,icon:"🌧️",cond:"Cold & Rainy"}],
  "Saskatchewan":   [{high:-11,low:-22,icon:"❄️",cond:"Severe Winter"},{high:-8,low:-20,icon:"❄️",cond:"Deep Winter"},{high:0,low:-11,icon:"🌨️",cond:"Late Winter"},{high:11,low:1,icon:"🌦️",cond:"Spring Thaw"},{high:19,low:6,icon:"⛅",cond:"Warm & Windy"},{high:24,low:11,icon:"🌤️",cond:"Warm & Sunny"},{high:27,low:13,icon:"☀️",cond:"Hot Prairie"},{high:26,low:12,icon:"☀️",cond:"Hot & Dry"},{high:19,low:5,icon:"⛅",cond:"Early Fall"},{high:9,low:-1,icon:"🌦️",cond:"Frosty Nights"},{high:-2,low:-12,icon:"🌨️",cond:"Early Winter"},{high:-9,low:-20,icon:"❄️",cond:"Deep Winter"}],
  "Manitoba":       [{high:-13,low:-23,icon:"❄️",cond:"Severe Cold"},{high:-10,low:-21,icon:"❄️",cond:"Bitter Cold"},{high:-2,low:-12,icon:"🌨️",cond:"Late Winter"},{high:10,low:0,icon:"🌦️",cond:"Spring Thaw"},{high:19,low:7,icon:"⛅",cond:"Warm & Windy"},{high:24,low:12,icon:"🌤️",cond:"Warm Summer"},{high:27,low:15,icon:"☀️",cond:"Hot & Humid"},{high:26,low:13,icon:"☀️",cond:"Hot & Sunny"},{high:19,low:6,icon:"⛅",cond:"Cooling Down"},{high:10,low:0,icon:"🌦️",cond:"Fall Chill"},{high:-1,low:-10,icon:"🌨️",cond:"Early Winter"},{high:-11,low:-21,icon:"❄️",cond:"Severe Cold"}],
  "Quebec":         [{high:-8,low:-17,icon:"❄️",cond:"Winter Snow"},{high:-6,low:-16,icon:"❄️",cond:"Cold & Snowy"},{high:1,low:-7,icon:"🌨️",cond:"Late Winter"},{high:11,low:2,icon:"🌦️",cond:"Spring Showers"},{high:19,low:9,icon:"⛅",cond:"Mild & Rainy"},{high:24,low:14,icon:"🌤️",cond:"Warm & Pleasant"},{high:27,low:17,icon:"☀️",cond:"Hot & Humid"},{high:25,low:16,icon:"☀️",cond:"Hot & Sunny"},{high:20,low:11,icon:"⛅",cond:"Autumn Colour"},{high:12,low:4,icon:"🌦️",cond:"Fall Rain"},{high:4,low:-2,icon:"🌧️",cond:"Cold & Wet"},{high:-5,low:-13,icon:"❄️",cond:"Winter Returns"}],
};

/* Canadian crop calendar by province & month (1-indexed) */
const CROP_CALENDAR = {
  "Ontario": {
    1:{plant:[],prep:["Order seeds & inputs","Equipment maintenance","Financial planning","SR&ED documentation"],harvest:[]},
    2:{plant:["Greenhouse transplants"],prep:["Seed ordering deadline","Soil test review","Nutrient plan"],harvest:[]},
    3:{plant:["Onions (indoors)","Tomatoes (indoors)","Peppers","Leeks"],prep:["Equipment service","Fertilizer plan","Drainage check"],harvest:[]},
    4:{plant:["Oats","Spring wheat","Potatoes (late Apr)","Peas","Spinach","Lettuce"],prep:["Lime application","Field prep","Pre-emergent herbicide"],harvest:[]},
    5:{plant:["Corn","Soybeans","Canola","Beans","Cucumbers","Market garden"],prep:["Herbicide app","Irrigation startup","Pest scouting"],harvest:["Early greenhouse","Asparagus"]},
    6:{plant:["Winter squash","Sunflowers","Late transplants"],prep:["Pest & disease scouting","Weed management","N side-dress"],harvest:["Strawberries","Early peas","Lettuce","Greenhouse"]},
    7:{plant:["Fall turnip","Kale","Cover crop planning"],prep:["Mid-season nitrogen","Disease monitoring","Irrigation mgmt"],harvest:["Winter wheat","Blueberries","Early potatoes","Hay 1st cut"]},
    8:{plant:["Winter rye","Fall cover crops","Radish"],prep:["Harvest logistics","Grain storage prep","Combine settings"],harvest:["Oats","Spring wheat","Vegetables","Sweet corn","Hay 2nd cut"]},
    9:{plant:["Winter wheat","Fall rye","Garlic (late Sept)"],prep:["Grain moisture monitoring","Combine maint.","Fall fertilizer"],harvest:["Corn","Soybeans","Potatoes","Dry beans"]},
    10:{plant:["Garlic"],prep:["Fall tillage","Nutrient application","Drain tile inspection"],harvest:["Root vegetables","Apples","Late soybeans","Pumpkins"]},
    11:{plant:[],prep:["Equipment winterization","Crop insurance review","Input budget","AgriStability docs"],harvest:[]},
    12:{plant:[],prep:["Seed variety selection","Rotation planning","Grant application prep","Year-end financials"],harvest:[]},
  },
  "Alberta": {
    1:{plant:[],prep:["Equipment maintenance","Seed catalogue review","Financial planning","AgriStability prep"],harvest:[]},
    2:{plant:[],prep:["Input purchasing deadlines","Soil test analysis","Seeding rate planning"],harvest:[]},
    3:{plant:["Greenhouse starts"],prep:["Pre-season equipment checks","Seeding plan","Fertilizer order"],harvest:[]},
    4:{plant:["Canola (late Apr)","Spring wheat","Barley","Peas"],prep:["Field scouting","N application plan","Pre-seed burn-off"],harvest:[]},
    5:{plant:["Canola","Oats","Flax","Lentils","Corn (south AB)"],prep:["Seeder calibration","Herbicide plan","Pest monitoring"],harvest:[]},
    6:{plant:["Silage corn","Late forages"],prep:["Spray decisions","Fertilizer side-dress","Disease scouting"],harvest:["Hay 1st cut","Early forages"]},
    7:{plant:["Cover crops","Forage re-seeding"],prep:["Swathing timing","Disease scouting","Harvest readiness"],harvest:["Hay 2nd cut","Early peas","Winter wheat swath"]},
    8:{plant:["Winter wheat (late Aug)"],prep:["Combine calibration","Grain bin prep","Drying budget"],harvest:["Barley","Canola","Peas","Lentils","Hay 3rd cut"]},
    9:{plant:["Winter wheat"],prep:["Combine maintenance","Grain drying","Elevator marketing"],harvest:["Wheat","Oats","Flax","Late canola"]},
    10:{plant:[],prep:["Fall anhydrous ammonia","Fall tillage","Equipment storage"],harvest:[]},
    11:{plant:[],prep:["Machinery winterization","Insurance settlement","AgriStability enrollment"],harvest:[]},
    12:{plant:[],prep:["Seed selection","Rotation planning","Input strategy","Financial review"],harvest:[]},
  },
  "British Columbia": {
    1:{plant:["Greenhouse crops"],prep:["Equipment maintenance","Seed ordering","Orchard winter spray"],harvest:["Greenhouse crops"]},
    2:{plant:["Greenhouse tomatoes","Peppers","Cucumbers"],prep:["Orchard pruning","Irrigation inspection","Soil warming"],harvest:["Greenhouse crops","Forcing crops"]},
    3:{plant:["Potatoes (Lower Mainland)","Early vegetables","Peas","Carrots"],prep:["Soil preparation","Fertilizer plan","Frost monitoring"],harvest:["Greenhouse crops","Early greens"]},
    4:{plant:["Corn","Beans","Squash","Tomato transplants","Herbs"],prep:["Orchard frost protection","Pollinator mgmt","Pest monitoring"],harvest:["Asparagus","Early strawberries","Greenhouse"]},
    5:{plant:["Full vegetable program","Cover crops"],prep:["Irrigation startup","Disease prevention","Fruit tree thinning"],harvest:["Strawberries","Peas","Lettuce","Greenhouse"]},
    6:{plant:["Fall crop planning","Second plantings"],prep:["Berry irrigation","Pest scouting","Fruit thinning"],harvest:["Cherries","Strawberries","Early blueberries","Peas"]},
    7:{plant:["Fall vegetables","Broccoli","Cabbage"],prep:["Heat stress irrigation","Bird control","Spray timings"],harvest:["Blueberries","Raspberries","Tomatoes","Garlic","Potatoes"]},
    8:{plant:["Fall cover crops","Winter wheat (Interior)"],prep:["Apple harvest prep","Cider planning","Harvest logistics"],harvest:["Peaches","Apples (early)","Corn","Beans","Peppers"]},
    9:{plant:["Garlic","Winter cover crops","Fava beans"],prep:["Storage preparation","Apple packing","Irrigation close-down"],harvest:["Late apples","Pears","Winter squash","Potatoes","Pumpkins"]},
    10:{plant:["Winter cover crops","Garlic","Fava beans"],prep:["Fall fertilization","Orchard leaf analysis","Cleanup"],harvest:["Late root vegetables","Cranberries","Late apples"]},
    11:{plant:["Greenhouse winter crops"],prep:["Pruning planning","Equipment winterization","Dormant sprays"],harvest:["Greenhouse crops","Storage crops"]},
    12:{plant:["Greenhouse crops"],prep:["Year-end planning","Seed ordering","Grant applications"],harvest:["Greenhouse crops"]},
  },
  "Saskatchewan": {
    1:{plant:[],prep:["Equipment overhaul","Seed variety selection","Financial planning","AgriStability prep"],harvest:[]},
    2:{plant:[],prep:["Input purchasing","Soil sampling results","Canola variety selection"],harvest:[]},
    3:{plant:[],prep:["Pre-season equipment service","Seeding plan","Herbicide strategy"],harvest:[]},
    4:{plant:["Durum wheat","Spring wheat","Barley","Flax","Early peas"],prep:["Anhydrous ammonia app","Pre-seed burn-off","Soil temp monitoring"],harvest:[]},
    5:{plant:["Canola","Lentils","Chickpeas","Oats","Soybeans (SE SK)"],prep:["Seeder calibration","Weed scouting","Fertilizer placement"],harvest:[]},
    6:{plant:["Cover crops (late June)"],prep:["Spray decisions","Aphid scouting","Disease monitoring"],harvest:["Hay 1st cut"]},
    7:{plant:[],prep:["Swathing timing","Sclerotinia assessment","Crop staging"],harvest:["Hay 2nd cut","Early winter wheat swath"]},
    8:{plant:["Winter wheat (late Aug)"],prep:["Combine settings","Grain bin mgmt","Elevator contacts"],harvest:["Canola","Peas","Lentils","Barley"]},
    9:{plant:["Winter wheat"],prep:["Full harvest push","Grain drying","Marketing strategy"],harvest:["Wheat","Oats","Flax","Chickpeas","Soybeans"]},
    10:{plant:[],prep:["Fall ammonia application","Stubble management","Equipment storage"],harvest:["Late-season crops"]},
    11:{plant:[],prep:["Equipment winterization","Insurance settlement","AgriStability enrollment"],harvest:[]},
    12:{plant:[],prep:["Seed selection","Rotation planning","Financial year-end","Grant research"],harvest:[]},
  },
  "Manitoba": {
    1:{plant:[],prep:["Equipment maintenance","Seed ordering","Financial planning"],harvest:[]},
    2:{plant:[],prep:["Input purchasing","Soil test review","Seeding plan development"],harvest:[]},
    3:{plant:["Greenhouse transplants"],prep:["Pre-season equipment service","Spring field work planning","Drain tile review"],harvest:[]},
    4:{plant:["Spring wheat","Barley","Oats","Peas (late April)"],prep:["Fertilizer application","Pre-seed herbicide","Soil warm-up monitoring"],harvest:[]},
    5:{plant:["Canola","Soybeans","Corn","Sunflowers","Flax"],prep:["Seeder calibration","Herbicide plan","Pest monitoring"],harvest:[]},
    6:{plant:["Late plantings","Cover crops"],prep:["Spray scheduling","Disease monitoring","N side-dress"],harvest:["Hay 1st cut"]},
    7:{plant:["Fall cover crops"],prep:["Crop staging","Swathing readiness","Sclerotinia assessment"],harvest:["Winter wheat","Hay 2nd cut"]},
    8:{plant:["Winter wheat (late)"],prep:["Combine prep","Grain bin checks","Drying budget"],harvest:["Barley","Canola","Peas","Oats"]},
    9:{plant:["Winter wheat"],prep:["Harvest completion","Grain marketing","Soil sampling"],harvest:["Wheat","Soybeans","Corn","Sunflowers","Flax"]},
    10:{plant:[],prep:["Fall tillage","Ammonia application","Drain tile inspection"],harvest:["Late corn","Sunflowers"]},
    11:{plant:[],prep:["Equipment winterization","Insurance review","AgriStability docs"],harvest:[]},
    12:{plant:[],prep:["Year-end planning","Seed selection","Financial review"],harvest:[]},
  },
  "Quebec": {
    1:{plant:["Greenhouse crops"],prep:["Equipment maintenance","Seed ordering","Maple season preparation"],harvest:["Greenhouse crops"]},
    2:{plant:["Greenhouse transplants"],prep:["Maple syrup equipment prep","Sap line inspection","Input purchasing"],harvest:["Greenhouse crops"]},
    3:{plant:["Greenhouse tomatoes","Peppers"],prep:["Maple sap collection begins","Soil testing","Equipment service"],harvest:["Maple syrup season","Greenhouse crops"]},
    4:{plant:["Potatoes","Spring vegetables","Peas","Oats"],prep:["Field preparation","Fertilizer application","Crop insurance deadlines"],harvest:["Late maple syrup","Early greens"]},
    5:{plant:["Corn","Soybeans","Canola","Market garden","Herbs"],prep:["Herbicide program","Irrigation check","Strawberry runner mgmt"],harvest:["Early asparagus","Greenhouse crops"]},
    6:{plant:["Winter squash","Cucumbers","Beans","Late transplants"],prep:["Pest & disease scouting","Irrigation management"],harvest:["Strawberries","Early peas","Lettuce","Hay 1st cut"]},
    7:{plant:["Fall crops","Cover crop planning"],prep:["Spray decisions","Potato disease management"],harvest:["Blueberries","Raspberries","Winter wheat","Hay 2nd cut"]},
    8:{plant:["Winter rye","Fall radish cover crop"],prep:["Harvest logistics","Grain storage prep","Apple harvest prep"],harvest:["Oats","Spring wheat","Vegetables","Sweet corn","Apples (early)"]},
    9:{plant:["Winter wheat","Garlic"],prep:["Corn & soy harvest push","Fall fertilizer plan","Storage preparation"],harvest:["Corn","Soybeans","Apples","Potatoes"]},
    10:{plant:["Garlic"],prep:["Fall tillage","Nutrient application","Drain tile inspection"],harvest:["Root vegetables","Late apples","Pumpkins","Cranberries"]},
    11:{plant:[],prep:["Equipment winterization","Crop insurance review","AgriStability enrollment"],harvest:[]},
    12:{plant:[],prep:["Year-end financial review","Seed selection","Rotation planning"],harvest:[]},
  },
};
const CROP_CALENDAR_DEFAULT = {
  1:{plant:[],prep:["Equipment maintenance","Seed ordering","Financial planning"],harvest:[]},2:{plant:[],prep:["Input purchasing","Soil test analysis"],harvest:[]},3:{plant:["Greenhouse starts","Early transplants"],prep:["Pre-season checks","Fertilizer plan"],harvest:[]},4:{plant:["Hardy early crops","Spring wheat","Barley"],prep:["Field preparation","Soil testing","Lime application"],harvest:[]},5:{plant:["Main season crops","Corn","Canola","Soybeans"],prep:["Herbicide application","Irrigation startup"],harvest:["Early greenhouse"]},6:{plant:["Summer crops","Cover crop planning"],prep:["Pest scouting","Disease monitoring"],harvest:["Early vegetables","Hay 1st cut"]},7:{plant:["Fall cover crops"],prep:["Mid-season inputs","Spray decisions"],harvest:["Early grains","Summer vegetables","Hay 2nd cut"]},8:{plant:["Fall crops","Winter cover crops"],prep:["Harvest preparation","Storage prep","Combine settings"],harvest:["Summer grains","Vegetables"]},9:{plant:["Winter wheat","Garlic"],prep:["Harvest operations","Grain storage","Marketing"],harvest:["Main crops"]},10:{plant:["Garlic"],prep:["Fall tillage","Nutrient application"],harvest:["Late crops","Root vegetables"]},11:{plant:[],prep:["Equipment winterization","Insurance review","AgriStability enrollment"],harvest:[]},12:{plant:[],prep:["Year-end planning","Seed selection","Financial review","Grant research"],harvest:[]},
};

/* ══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */
function getCropCalendar(province, month) { const c=CROP_CALENDAR[province]||CROP_CALENDAR_DEFAULT; return c[month]||{plant:[],prep:[],harvest:[]}; }

function getCurrentMonthWeather(province) {
  const m=new Date().getMonth();
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const s=PROVINCE_SEASONS[province]||PROVINCE_SEASONS['Ontario'];
  return {...s[m],m:months[m]};
}

function getCurrentSeasonCrops(province) {
  const month=new Date().getMonth()+1;
  const cal=getCropCalendar(province,month);
  let season=month>=3&&month<=5?'Spring Planting':month>=6&&month<=8?'Summer Growing':month>=9&&month<=11?'Fall Harvest':'Winter Planning';
  const crops=cal.plant.length?cal.plant:cal.harvest.length?cal.harvest:cal.prep;
  return {season,crops};
}

function fmtCAD(n) { if(isNaN(n))return'$—'; return n.toLocaleString('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}); }
function fmtNum(n,d=1) { if(isNaN(n)||!isFinite(n))return'—'; return Number(n).toFixed(d); }
function getDaysUntil(ds) { if(!ds)return null; return Math.ceil((new Date(ds)-new Date())/(864e5)); }
function getWMO(code) { return WMO[code]||WMO[Math.floor(code/10)*10]||{label:'Check conditions',icon:'🌡️',farm:'Monitor local weather'}; }

function getNotifications() {
  const ns=[];
  const m=new Date().getMonth()+1;
  PROGRAMS.forEach(p=>{ if(!p.deadlineDate)return; const d=getDaysUntil(p.deadlineDate); if(d!==null&&d>=0&&d<=60)ns.push({type:d<=14?'urgent':'warn',title:`${p.name} — ${d}d left`,desc:`Deadline: ${p.deadline}`,href:'funding.html'}); });
  if(m>=3&&m<=5)ns.push({type:'info',title:'Spring Planting Season Active',desc:'Check weather & crop recommendations',href:'weather.html'});
  if(m>=8&&m<=10)ns.push({type:'info',title:'Harvest Season Approaching',desc:'Review your operations planner',href:'planner.html'});
  return ns;
}

/* ══════════════════════════════════════════════════════
   SIDEBAR (Home + Dashboard + all tools)
══════════════════════════════════════════════════════ */
function renderSidebar(activePage) {
  const profile=Profile.load();
  const farmName=profile?profile.farmType:'Your Farm';
  const location=profile?profile.province:'';
  const sizeShort=profile&&profile.size?profile.size.split('(')[0].trim():'';

  const rl=(items)=>items.map(i=>`
    <a href="${i.href}" class="nav-link ${activePage===i.id?'active':''}">
      <span class="nav-icon">${i.icon}</span>${i.label}
      ${i.badge?`<span class="nav-badge ${i.badge==='NEW'?'nb-new':''}">${i.badge}</span>`:''}
    </a>`).join('');

  return `<aside class="sidebar">
    <div class="sb-brand">
      <div class="sb-brand-tag">Canadian Farm Copilot</div>
      <h1>Farm<br>Copilot</h1>
    </div>
    ${profile?`<div class="sb-farm"><div class="sb-farm-name">${farmName}</div><div class="sb-farm-meta">${location}${sizeShort?' · '+sizeShort:''}</div></div>`:''}
    <nav class="sb-nav">
      <div class="sb-section">Navigate</div>
      ${rl([{id:'home',href:'index.html',icon:'🏠',label:'Home',badge:null},{id:'dashboard',href:'dashboard.html',icon:'⊞',label:'Dashboard',badge:null}])}
      <div class="sb-section" style="margin-top:6px;">Tools</div>
      ${rl([
        {id:'copilot',   href:'copilot.html',   icon:'✦',label:'AI Copilot',         badge:null},
        {id:'funding',   href:'funding.html',   icon:'◈',label:'Funding Navigator',  badge:'8'},
        {id:'calculator',href:'calculator.html',icon:'◎',label:'ROI Calculator',     badge:null},
        {id:'planner',   href:'planner.html',   icon:'▦',label:'Operations Planner', badge:null},
        {id:'weather',   href:'weather.html',   icon:'🌤',label:'Weather & Crops',    badge:'NEW'},
        {id:'support',   href:'support.html',   icon:'💬',label:'Live Support',       badge:null},
      ])}
    </nav>
    <div class="sb-footer">
      <div class="sb-version">v2.0 · 2026</div>
      <button class="sb-reset-btn" onclick="Profile.clear();window.location.href='index.html'">↺ Reset Profile</button>
    </div>
  </aside>`;
}

/* ══════════════════════════════════════════════════════
   DEMO MODE
══════════════════════════════════════════════════════ */
window.activateDemoMode=function(){
  const r=Profile.load(); if(r)localStorage.setItem('preDemo',JSON.stringify(r));
  Profile.save({province:'Ontario',farmType:'Produce / Vegetables',painPoints:['Labour Shortage','Funding Discovery','Rising Input Costs'],size:'Small (< 100 acres / < 50 head)'});
  localStorage.setItem('demoMode','1'); window.location.reload();
};
window.exitDemoMode=function(){
  const r=localStorage.getItem('preDemo'); if(r){try{Profile.save(JSON.parse(r));}catch(e){} localStorage.removeItem('preDemo');}
  localStorage.removeItem('demoMode'); window.location.reload();
};

/* ══════════════════════════════════════════════════════
   MOBILE NAV + GLOBAL UI INJECTION
══════════════════════════════════════════════════════ */
window.toggleSidebar=()=>document.body.classList.toggle('sb-open');
window.closeSidebar =()=>document.body.classList.remove('sb-open');
window.toggleNotifPanel=()=>{ const p=document.getElementById('npg'); if(p)p.classList.toggle('open'); };

document.addEventListener('DOMContentLoaded',function(){
  const sidebar=document.querySelector('.sidebar');
  if(!sidebar)return;

  /* Mobile top bar */
  if(!document.getElementById('mobile-topbar')){
    const profile=Profile.load();
    const notes=getNotifications();
    const tb=document.createElement('div');
    tb.id='mobile-topbar';
    tb.innerHTML=`
      <div class="mob-logo"><div class="mob-logo-dot"></div>Farm Copilot${profile?`<span class="mob-farm-tag">· ${profile.farmType}</span>`:''}</div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button class="mob-icon-btn" onclick="toggleNotifPanel()" title="Notifications">🔔${notes.length?'<span class="mob-notif-dot"></span>':''}</button>
        <a href="index.html" class="mob-icon-btn" title="Home" style="display:flex;align-items:center;justify-content:center;text-decoration:none;">🏠</a>
        <button class="hamburger-btn" onclick="toggleSidebar()">
          <div class="ham-icon"><div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div></div>
        </button>
      </div>`;
    document.body.insertBefore(tb,document.body.firstChild);
  }

  /* Overlay */
  if(!document.getElementById('sb-overlay')){
    const ov=document.createElement('div'); ov.id='sb-overlay';
    ov.addEventListener('click',closeSidebar); document.body.appendChild(ov);
  }

  /* Global notification panel */
  if(!document.getElementById('npg')){
    const notes=getNotifications();
    const p=document.createElement('div'); p.id='npg'; p.className='npg';
    p.innerHTML=`<div class="npg-hd"><span>Notifications</span><button onclick="toggleNotifPanel()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--muted);">×</button></div>
      <div class="npg-bd">${notes.length?notes.map(n=>`<a href="${n.href}" class="npg-item npg-${n.type}"><div class="npg-t">${n.title}</div><div class="npg-d">${n.desc}</div></a>`).join(''):'<div style="padding:20px;text-align:center;color:var(--muted);font-size:13px;">All caught up ✓</div>'}</div>`;
    document.body.appendChild(p);
  }

  /* Floating support FAB */
  if(!document.getElementById('float-fab')){
    const f=document.createElement('a'); f.id='float-fab'; f.href='support.html';
    f.className='float-fab'; f.title='AI Support'; f.innerHTML='💬';
    document.body.appendChild(f);
  }

  /* Demo banner */
  const db=document.getElementById('demo-banner');
  if(db&&localStorage.getItem('demoMode'))db.style.display='flex';

  /* Close sidebar on nav tap */
  sidebar.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',()=>{ if(window.innerWidth<=768)closeSidebar(); }));

  /* Swipe left to close */
  let tx=0;
  document.addEventListener('touchstart',e=>{ tx=e.touches[0].clientX; },{passive:true});
  document.addEventListener('touchend',e=>{ if(e.changedTouches[0].clientX-tx<-60&&document.body.classList.contains('sb-open'))closeSidebar(); },{passive:true});
});
