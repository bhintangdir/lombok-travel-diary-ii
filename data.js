/**
 * Lombok Travel Diary - Shared Data
 * Centralized data for Tour Packages, Individual Destinations, and Custom Trip Builder
 */

const WA_NUMBER = "6281234567890"; // WhatsApp number (Country code without +, no spaces)
const wa = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
const DEF_MSG = "Hi Lombok Travel Diary! I would like to plan a trip to Lombok. Dates: ___ Guests: ___";

// Category metadata
const TOUR_CATEGORIES = {
  all: "All Tours",
  trek: "Sembalun Trekking",
  nature: "Nature & Islands",
  circuit: "Mandalika Circuit & Motorsport",
  custom: "Custom Trip"
};

const DEST_CATEGORIES = {
  all: "All Destinations",
  gem: "Hidden Gems ✨",
  trek: "Hills & Sembalun",
  beach: "Beaches & Islands",
  waterfall: "Waterfalls",
  culture: "Culture & Circuit"
};

// ==========================================
// 1. TOUR PACKAGES (Paket Wisata)
// ==========================================
const TOURS = [
  // --- TREKKING (Hiking Sembalun Hills Packages) ---
  {
    id: "pergasingan-camping",
    c: "trek",
    n: "Camping Pergasingan Hill",
    sub: "2 Day & 1 Night (Pergasingan Camp Area)",
    d: "Camp above the clouds at 1,670 mdpl overlooking Mount Rinjani and the iconic colorful checkerboard agricultural valley of Sembalun. Witness magical sunsets and sunrise panoramas.",
    t: "2 Days & 1 Night",
    lv: "Moderate",
    st: "Private / Small Group",
    h: [
      "Camp under a blanket of stars at 1,670 mdpl",
      "Spectacular sunrise view overlooking Mount Rinjani",
      "Panoramic view of Sembalun's colourful patchwork valley",
      "Full porter service & complete camp equipment provided"
    ],
    i: [
      "Transport Pick Up & Drop to Hotel",
      "Meals & Mineral Water",
      "Camping Equipments (Tent, Sleeping Bag, Mattress, Light)",
      "Local Porter",
      "Professional Guide",
      "Entrance Fee"
    ],
    it: [
      "Day 1 (08:30): Pick up from your hotel in Lombok, scenic drive to Sembalun village basecamp.",
      "Day 1 (11:30): Meet your professional guide and local porters. Briefing and commence hiking up Bukit Pergasingan (approx. 2.5 - 3 hours).",
      "Day 1 (15:00): Arrive at Pergasingan Camp Area. Porters set up tents while you enjoy hot coffee/tea and sunset overlooking Mt. Rinjani.",
      "Day 1 (19:00): Warm dinner prepared by porters under the starry night sky.",
      "Day 2 (05:30): Wake up to the golden sunrise above the sea of clouds and the patchwork valley.",
      "Day 2 (07:30): Breakfast and hot drinks, capture scenic photos.",
      "Day 2 (09:00): Gentle descent back to Sembalun basecamp.",
      "Day 2 (12:30): Transfer back and drop off at your hotel or harbour."
    ],
    k: "Temperatures drop to 12°C-15°C at night. Bring a warm jacket, trekking shoes with good grip, flashlight, and personal medication.",
    p: "IDR 850K",
    pop: 1,
    img: "photo-1506905925346-21bda4d32df4",
    destinations: ["pergasingan"]
  },

  {
    id: "savana-dandaun-camping",
    c: "trek",
    n: "Camping Savana Dandaun Hill",
    sub: "2D & 1N (Savana Dandaun Camp Area) - Hidden Gem",
    d: "Experience an untouched high-altitude green savanna at the foot of Mount Rinjani. A peaceful hidden meadow where friendly cows graze freely under tranquil starry skies.",
    t: "2 Days & 1 Night",
    lv: "Moderate",
    st: "Private / Small Group",
    h: [
      "Hidden gem camping area with wide green rolling savanna",
      "Serene natural plateau away from crowded tourist trails",
      "Stunning golden sunrise hitting Mount Rinjani's ridge",
      "Cozy campfire, stargazing, and full camp logistics"
    ],
    i: [
      "Transport Pick Up & Drop to Hotel",
      "Meals & Mineral Water",
      "Camping Equipments (Tent, Sleeping Bag, Mattress, Light)",
      "Local Porter",
      "Professional Guide",
      "Entrance Fee"
    ],
    it: [
      "Day 1 (08:00): Hotel pick up and transfer to Sembalun valley.",
      "Day 1 (11:00): Registration and start hiking through cool pine forest and hillside trails toward Savana Dandaun.",
      "Day 1 (14:30): Reach the picturesque Savana Dandaun plateau. Enjoy the open green expanse and tranquil mountain breeze.",
      "Day 1 (17:30): Golden hour sunset view; porters prepare hot dinner around the camp.",
      "Day 2 (05:30): Mesmerizing sunrise over Rinjani's peaks with mist floating across the savanna.",
      "Day 2 (07:30): Hot breakfast, tea/coffee, explore the grazing plains and photo spots.",
      "Day 2 (09:30): Pack up and descend back to Sembalun.",
      "Day 2 (13:00): Private transfer drop off to your hotel."
    ],
    k: "Savana Dandaun is an authentic hidden gem. Very tranquil with fewer hikers. Bring warm clothing, sun protection, and a camera.",
    p: "IDR 850K",
    pop: 1,
    img: "photo-1500530855697-b586d89ba3ee",
    destinations: ["savana-dandaun"]
  },

  {
    id: "hiking-anak-dara",
    c: "trek",
    n: "Hiking Bukit Anak Dara",
    sub: "Sembalun's 2nd Highest Hill (1,923 mdpl) - Sunrise Hike",
    d: "Conquer Sembalun's second highest hill at 1,923 mdpl. Challenge yourself on the thrilling ridge climb and be rewarded with a breathtaking 360-degree ocean of clouds and Sumbawa strait views.",
    t: "Full Day / Sunrise (approx. 7 hrs)",
    lv: "Moderate to Challenging",
    st: "Private Tour",
    h: [
      "Sembalun's 2nd highest summit (1,923 mdpl) with 360° views",
      "Walk the iconic razorback ridge trail (Tanjakan Cinta)",
      "Sea of clouds stretching towards the Sumbawa Strait",
      "Photo documentation assisted by phone by your guide"
    ],
    i: [
      "Akomodasi / Transport Pick Up & Drop",
      "Professional Guide",
      "Take Photo by: Phone (Photo Documentation)",
      "Mineral Water",
      "Entrance Fee"
    ],
    it: [
      "01:30 - 02:30: Early morning pick up from your hotel in Mataram/Senggigi/Kuta.",
      "04:30: Arrive at Sembalun basecamp, meet your guide, safety briefing and start the ascent.",
      "06:00: Reach the summit ridge just in time for an unforgettable sunrise above the clouds.",
      "06:30 - 08:00: Rest, enjoy hot drinks and snacks, photo session captured by your guide.",
      "08:30: Begin descent back to Sembalun village.",
      "11:00: Arrive at basecamp, refresh, and drive back to hotel."
    ],
    k: "The trail has steady incline. Sturdy hiking shoes, trekking pole, windbreaker jacket, and good physical stamina are recommended.",
    p: "IDR 450K",
    img: "photo-1537996194471-e657df975ab4",
    destinations: ["anak-dara"]
  },

  {
    id: "hiking-bukit-kondo",
    c: "trek",
    n: "Hiking Bukit Kondo",
    sub: "Gentle Hill Trek with Rinjani Caldera Views - Sunrise Hike",
    d: "A peaceful, less-crowded hill hike in Sembalun offering expansive sunrise views facing Mount Rinjani and rolling hills. An ideal hill climb for couples and nature enthusiasts.",
    t: "Half Day (approx. 5-6 hrs)",
    lv: "Easy to Moderate",
    st: "Private Tour",
    h: [
      "Peaceful uncrowded trail through Sembalun's scenic hills",
      "Close-up vantage point of Mount Rinjani's caldera ridge",
      "Golden sunrise over the cool Sembalun highland valley",
      "Phone photo documentation taken by experienced local guide"
    ],
    i: [
      "Akomodasi / Transport Pick Up & Drop",
      "Professional Guide",
      "Take Photo by: Phone (Photo Documentation)",
      "Mineral Water",
      "Entrance Fee"
    ],
    it: [
      "02:00: Pick up from hotel and transfer to Sembalun.",
      "04:45: Start trekking up Bukit Kondo with flashlight/headlamp.",
      "05:50: Arrive at Bukit Kondo summit for first dawn light and sunrise.",
      "06:30: Relax with warm coffee/tea while taking panoramic photos with your guide.",
      "07:30: Leisurely descent through green trails and farmland.",
      "09:30: Local breakfast stop in Sembalun village before heading back to hotel."
    ],
    k: "Great alternative to steeper climbs. Very pleasant walk with rewarding views. Wear layers as morning can be chilly.",
    p: "IDR 400K",
    img: "photo-1472214103451-9374bd1c798e",
    destinations: ["bukit-kondo"]
  },

  // --- ALAM & BAHARI ---
  {
    id: "snorkeling-3-gili",
    c: "nature",
    n: "Snorkeling 3 (Tiga) Gili",
    sub: "Gili Trawangan, Gili Meno & Gili Air with Underwater GoPro",
    d: "Cruise across crystal-clear turquoise waters to all three famous Gili Islands. Snorkel with wild sea turtles at Gili Meno, explore underwater statues, feed thousands of reef fish at Gili Air, and relax on Gili Trawangan.",
    t: "Full Day (8-9 hrs)",
    lv: "Easy",
    st: "Private Tour",
    h: [
      "Island hopping to Gili Trawangan, Gili Meno & Gili Air",
      "Swim alongside wild sea turtles in their natural habitat",
      "Visit the iconic underwater statues at Gili Meno reef",
      "Complete with Speed Boat, Driver, Guide & GoPro footage"
    ],
    i: [
      "Speed Boat / Private Island Boat",
      "Underwater GoPro Documentation",
      "Snorkeling Guide",
      "Private Car & Driver (AC, BBM)",
      "Snorkel Gear & Life Vest",
      "Mineral Water"
    ],
    it: [
      "08:00: Hotel pick up by private air-conditioned car and driver.",
      "09:00: Arrive at harbour, board private boat / speed boat.",
      "09:30: Snorkel Stop 1: Gili Meno Turtle Point - swim with green turtles.",
      "10:45: Snorkel Stop 2: Gili Meno Underwater Statues & Coral Garden.",
      "12:00: Snorkel Stop 3: Gili Air Fish Garden (hundreds of colorful fish).",
      "13:00: Land at Gili Trawangan for beach lunch, cycling, or relaxing.",
      "15:30: Scenic cruise back to Lombok harbour.",
      "17:00: Hotel drop off with all your GoPro photos & videos transferred."
    ],
    k: "Bring swimwear, change of clothes, towel, sunblock, and memory on your phone for immediate GoPro file transfer.",
    p: "IDR 650K",
    pop: 1,
    img: "photo-1544551763-46a013bb70d5",
    destinations: ["gili-trawangan-meno-air"]
  },

  {
    id: "snorkeling-secret-gili",
    c: "nature",
    n: "Snorkeling Secret Gili (Tiga Gili)",
    sub: "Gili Nanggu, Gili Sudak & Gili Kedis - Southwest Hidden Paradise",
    d: "Escape the tourist crowds to the untouched Southwest Gili islands. Gili Nanggu's marine reserve features calm shallow waters teeming with tame fish, Gili Sudak offers fresh grilled seafood on the sand, and Gili Kedis is a postcard-perfect tiny sandbank islet.",
    t: "Full Day (8-9 hrs)",
    lv: "Easy",
    st: "Private Tour",
    h: [
      "Crystal-clear shallow aquarium at Gili Nanggu marine sanctuary",
      "Fresh grilled seafood lunch on the beach at Gili Sudak",
      "Tiny uninhabited heart-shaped sand islet of Gili Kedis",
      "Underwater GoPro footage, Speed Boat, Guide & Driver included"
    ],
    i: [
      "Speed Boat / Private Island Boat",
      "Underwater GoPro Documentation",
      "Snorkeling Guide",
      "Private Car & Driver (AC, BBM)",
      "Snorkel Gear & Life Vest",
      "Mineral Water"
    ],
    it: [
      "08:00: Pick up from your hotel in Lombok and drive south-west to Sekotong harbour.",
      "09:30: Board private boat to Gili Nanggu. Snorkel in calm, crystal-clear sanctuary with tame clownfish and coral gardens.",
      "12:00: Cruise to Gili Sudak. Walk the peaceful shore and enjoy lunch at a local beachfront seafood warung.",
      "13:45: Head to tiny Gili Kedis. Stroll around this miniature island, swim, and capture aerial/GoPro photos.",
      "15:30: Boat returns to Sekotong pier.",
      "17:30: Drop off at your hotel."
    ],
    k: "Water shoes are recommended. Southwest Gilis have much calmer water and fewer boats, making it perfect for families and beginner snorkelers.",
    p: "IDR 700K",
    pop: 1,
    img: "photo-1507525428034-b723cf961d3e",
    destinations: ["secret-gili"]
  },

  {
    id: "waterfall-lombok-tengah",
    c: "nature",
    n: "Waterfall Lombok Tengah",
    sub: "Waterfall Benang Kelambu & Waterfall Benang Stokel (Include Driver)",
    d: "Discover Central Lombok's living botanical curtain waterfalls. Water flows delicately through lush fern walls at Benang Kelambu, while neighboring Benang Stokel plunges 30 meters into a refreshing natural forest pool.",
    t: "Full Day (7-8 hrs)",
    lv: "Easy to Moderate",
    st: "Private Tour",
    h: [
      "Unique curtain cascade of Benang Kelambu emerging through mossy ferns",
      "Twin 30-meter vertical waterfall plunge at Benang Stokel",
      "Natural freshwater swimming pools inside Mount Rinjani UNESCO Geopark",
      "Includes private car, driver, and local waterfall guide"
    ],
    i: [
      "Private Car & Driver (AC & BBM)",
      "Waterfall Benang Kelambu Entrance",
      "Waterfall Benang Stokel Entrance",
      "Local Waterfall Guide",
      "Mineral Water"
    ],
    it: [
      "08:30: Hotel pick up by private driver in comfortable AC vehicle.",
      "10:00: Arrive at Aik Berik Geopark entrance, Central Lombok.",
      "10:15: Meet local guide and take a scenic walk to Benang Stokel twin waterfalls. Swim in the natural pool.",
      "11:30: Short walk along lush paved path to Benang Kelambu. Marvel at water cascading through hanging jungle vines.",
      "13:00: Refreshing dip in the natural stepped pools.",
      "14:00: Lunch at local hillside restaurant with coffee plantation views.",
      "16:30: Relaxing drive back and hotel drop off."
    ],
    k: "Bring water shoes or sandals with strap, swimwear, and towel. Shuttle ojek option available on site for those who prefer not to walk.",
    p: "IDR 500K",
    img: "photo-1432405972618-c60b0225b8f9",
    destinations: ["benang-kelambu-stokel"]
  },

  {
    id: "waterfall-klu",
    c: "nature",
    n: "Waterfall KLU (Lombok Utara)",
    sub: "Tiu Kelep & Sendang Gile - North Lombok Rainforest Falls (Include Driver)",
    d: "Journey to North Lombok's majestic twin falls nestled in the rainforest of Mount Rinjani National Park. Walk along river streams to the mighty 42-meter roar of Tiu Kelep and two-tiered Sendang Gile.",
    t: "Full Day (8-9 hrs)",
    lv: "Moderate",
    st: "Private Tour",
    h: [
      "Trek through lush tropical rainforest along river stones",
      "Stand before the majestic 42m curtain of Tiu Kelep",
      "Swim in the invigorating mountain springs beneath Mount Rinjani",
      "Includes private car, driver, and licensed local guide"
    ],
    i: [
      "Private Car & Driver (AC & BBM)",
      "Tiu Kelep Waterfall Entrance",
      "Sendang Gile Waterfall Entrance",
      "Local Waterfall Guide",
      "Mineral Water"
    ],
    it: [
      "08:00: Private pick up from hotel, scenic coastline & mountain drive through Malimbu & Senaru.",
      "10:30: Arrive at Senaru base, meet local licensed guide.",
      "10:45: Descend rainforest stairs to Sendang Gile waterfall for photos and fresh mist.",
      "11:30: Trek 30 minutes along the forest stream and aqueduct bridge to Tiu Kelep.",
      "12:15: Experience the thunderous mist and take a refreshing swim in Tiu Kelep pool.",
      "14:00: Return to Senaru village, lunch overlooking Mount Rinjani valley.",
      "15:30: Scenic drive back with sunset stop at Malimbu hill.",
      "17:30: Hotel drop off."
    ],
    k: "You will cross shallow knee-deep river streams to reach Tiu Kelep. Wear water shoes or sport sandals and bring waterproof dry bag for phones.",
    p: "IDR 550K",
    pop: 1,
    img: "photo-1518548419970-58e3b4079ab2",
    destinations: ["tiu-kelep-sendang-gile"]
  },

  {
    id: "sasak-tour",
    c: "nature",
    n: "Sasak Tour (Culture & Coast)",
    sub: "Sukarara, Sade Village, Kuta Beach & Tanjung Aan (Include Driver)",
    d: "Immerse yourself in authentic Lombok culture and dramatic coastal vistas. Learn traditional hand-weaving at Sukarara, wander through the ancestral Sasak village of Sade, and unwind at Kuta Beach and Tanjung Aan's pepper-sand shores.",
    t: "Full Day (8 hrs)",
    lv: "Easy",
    st: "Private Tour",
    h: [
      "Try hand-weaving & wear traditional Sasak royal costumes at Sukarara",
      "Walk among 15th-century traditional bamboo and thatch huts at Sade Village",
      "Feel the unique pepper-like round grains of sand at Tanjung Aan Beach",
      "All-inclusive private car, driver, local village guides & entrance tickets"
    ],
    i: [
      "Private Car & Driver (AC & BBM)",
      "Sade Village Entrance & Guide",
      "Sukarara Weaving Village Experience",
      "Kuta Beach & Tanjung Aan Parking Fees",
      "Mineral Water"
    ],
    it: [
      "08:30: Pick up from hotel by private driver.",
      "09:30: Visit Sukarara weaving village; try weaving authentic Songket and dress in traditional Sasak attire.",
      "11:00: Tour Sade Village; learn ancient building customs and daily village traditions with an elder local guide.",
      "12:30: Lunch at Kuta Mandalika dining strip with Indonesian or Western cuisine.",
      "14:00: Stroll along Kuta Beach and head to picturesque Tanjung Aan bay.",
      "16:00: Relax on the beach, swim in gentle turquoise waves.",
      "17:30: Return journey to your hotel."
    ],
    k: "A culturally respectful dress code (shoulders and knees covered) is appreciated in Sade Village; sarongs are provided on site.",
    p: "IDR 500K",
    img: "photo-1519046904884-53103b34b206",
    destinations: ["sade-sukarara", "tanjung-aan-merese"]
  },

  {
    id: "tour-beach",
    c: "nature",
    n: "Tour Beach (South Lombok)",
    sub: "Selong Belanak, Mawun, Kuta, Tanjung Aan & Bukit Merese Sunset (Include Driver)",
    d: "The ultimate beach-lover's journey across Lombok's magnificent south coast. Experience white-sand surf bays, turquoise coves, and finish with a world-class 360-degree sunset atop Bukit Merese cliffs.",
    t: "Full Day (9-10 hrs)",
    lv: "Easy",
    st: "Private Tour",
    h: [
      "Five iconic southern beaches in one effortless, seamless day trip",
      "Gentle beginner surfing and soft white powder sand at Selong Belanak",
      "Secluded horseshoe cove and emerald waters at Mawun Beach",
      "Legendary golden hour sunset from the cliffs of Bukit Merese",
      "Private air-conditioned car, dedicated driver, and all beach entry fees"
    ],
    i: [
      "Private Car & Driver (AC & BBM)",
      "Selong Belanak Beach Entry & Parking",
      "Mawun Beach Entry & Parking",
      "Kuta Beach & Tanjung Aan Entry",
      "Bukit Merese Sunset Point Entry",
      "Mineral Water"
    ],
    it: [
      "08:30: Pick up from hotel and head south.",
      "09:45: First stop at Selong Belanak Beach: famous for water buffalo strolling the shore and beginner surf waves.",
      "11:30: Mawun Beach: swim in the calm turquoise lagoon framed by green hills.",
      "13:00: Lunch break at trendy cafes in Kuta Mandalika.",
      "14:30: Tanjung Aan Beach: relax on unique pepper-grain sand and swim in clear waters.",
      "16:30: Easy walk up Bukit Merese: sit on the grassy cliff tops overlooking open ocean for Lombok's most iconic sunset.",
      "18:30: Drive back and hotel drop off."
    ],
    k: "Bring sunscreen, sunglasses, hat, swimwear, and comfortable flip-flops or sneakers for walking up Bukit Merese.",
    p: "IDR 550K",
    pop: 1,
    img: "photo-1519046904884-53103b34b206",
    destinations: ["selong-belanak-mawun", "tanjung-aan-merese"]
  },

  // --- MANDALIKA & MOTORSPORT ---
  {
    id: "mandalika-circuit-tour",
    c: "circuit",
    n: "Mandalika Circuit Tour & Trackday",
    sub: "Circuit Walking Tour, Paddock Access, Trackday & Bukit Seger (Include Driver)",
    d: "Step into the heart of world motorsport at Pertamina Mandalika International Circuit. Walk the Pit Lane and Paddock, snap photos at iconic Turn 10, participate in scheduled trackday experiences (laps on motorcycle/car/EV or track rental sessions), and gaze across the whole circuit from Bukit Seger viewpoint.",
    t: "Half Day or Full Day",
    lv: "Easy / Enthusiast",
    st: "Private & Exclusive",
    h: [
      "Official guided tour inside Pertamina Mandalika International Circuit",
      "Pit Building, Paddock area walk, and podium photo opportunities",
      "Trackday experience: lap the MotoGP circuit (schedule & booking support)",
      "Photo stop at the iconic Pertamina red-and-white motif curve & Turn 10",
      "Panoramic track overview from Bukit Seger and Seger Beach"
    ],
    i: [
      "Private Car & Driver (AC & BBM)",
      "Mandalika Circuit Tour Admission & Guided Walk",
      "Trackday Registration Coordination & Track Access Support",
      "Photo Documentation by Phone / Camera",
      "Bukit Seger Circuit Viewpoint Entry",
      "Mineral Water"
    ],
    it: [
      "09:00: Pick up from hotel and transfer to Mandalika International Circuit.",
      "10:00: Check in at Circuit Welcome Centre, briefing and security pass issuance.",
      "10:30: Guided tour through Pit Lane, Royal Box, Race Control, and Paddock area.",
      "11:30: Track inspection / walking or EV lap on the actual MotoGP asphalt, photo session at iconic curve markings.",
      "13:00: Trackday Session (for participants with prior trackday booking: riding/driving laps according to official schedule).",
      "15:00: Lunch break at Mandalika beachfront restaurants.",
      "16:30: Hike Bukit Seger for a breathtaking elevated panorama of the entire circuit set against the turquoise ocean.",
      "18:00: Hotel drop off."
    ],
    k: "Circuit tours operate on non-race days. Trackday riding/driving sessions require valid driving licence and adherence to safety gear rules. We handle all circuit bookings for you.",
    p: "IDR 600K",
    pop: 1,
    img: "photo-1568605117036-5fe5e7bab0b7",
    destinations: ["mandalika-circuit"]
  },

  // --- CUSTOM TRIP ---
  {
    id: "custom-trip",
    c: "custom",
    n: "Custom Trip (Rancang Trip Impian Anda)",
    sub: "100% Tailor-Made Lombok Adventure & Hidden Gems",
    d: "Your holiday, your way. Combine Sembalun hill trekking, Secret Gili snorkeling, pristine waterfalls, Mandalika circuit trackday, and untamed hidden gems like Pantai Semeti and Tanjung Bloam into a seamless private itinerary.",
    t: "Flexible (1 Day to 7+ Days)",
    lv: "Customizable",
    st: "100% Private Custom",
    h: [
      "Pick and combine any destination and hidden gem across Lombok",
      "Private car, dedicated local driver, and flexible daily pacing",
      "Ideal for honeymooners, families, photography trips & adventure groups",
      "Personalized WhatsApp consultation and fast price quotation"
    ],
    i: [
      "Private Transport & Dedicated Driver (AC Car / HiAce / Innova)",
      "Customized Destinations & Pacing of your choice",
      "Optional Speedboats, Camping Gears, Guides & GoPro",
      "Hotel & Airport Pick-Up / Drop-Off throughout Lombok",
      "24/7 WhatsApp Concierge Support"
    ],
    it: [
      "Step 1: Choose your preferred duration, group size, and must-see destinations.",
      "Step 2: Message us on WhatsApp with your travel wishlist.",
      "Step 3: Receive a tailor-made day-by-day itinerary with transparent pricing within hours.",
      "Step 4: Refine the route until it matches your exact dream trip and confirm."
    ],
    k: "We can include secret waterfalls, remote surfing spots, romantic sunset dinners, or multi-day Rinjani expeditions. Tell us what you love!",
    p: "Custom Quote",
    pop: 1,
    img: "photo-1469854523086-cc02fe5d8800",
    destinations: ["savana-dandaun", "secret-gili", "pantai-semeti-telawas", "tanjung-bloam", "mangku-sakti", "mandalika-circuit"]
  }
];

// ==========================================
// 2. INDIVIDUAL DESTINATIONS (Tempat Wisata Satuan)
// ==========================================
const DESTINATIONS = [
  // --- BUKIT & TREKKING (SEMBALUN) ---
  {
    id: "pergasingan",
    name: "Bukit Pergasingan",
    location: "Sembalun, Lombok Timur",
    cat: "trek",
    gem: false,
    d: "Perched at 1,670 mdpl opposite Mount Rinjani, Bukit Pergasingan is world-famous for its sweeping view of the colorful patchwork agricultural fields of Sembalun. The sunrise view over the sea of clouds is an absolute bucket-list experience.",
    h: ["1,670 mdpl altitude", "Sunrise above the clouds", "Patchwork farm valley view", "Popular camping ridge"],
    best: "April to November (Dawn / Overnight Camp)",
    pkg_id: "pergasingan-camping",
    pkg_name: "Camping Pergasingan Hill (2D1N)",
    img: "photo-1506905925346-21bda4d32df4"
  },
  {
    id: "savana-dandaun",
    name: "Savana Dandaun",
    location: "Sembalun, Lombok Timur",
    cat: "trek",
    gem: true,
    d: "A hidden gem highland savanna tucked between Mount Rinjani and Sembalun hills. This untouched green meadow feels like another world, where friendly herds of cows graze peacefully and the starlight at night is completely unpolluted.",
    h: ["Hidden highland green savanna", "Free-roaming cows and horses", "Pristine stargazing & camping", "Direct close-up view of Rinjani"],
    best: "April to October (Dry Season)",
    pkg_id: "savana-dandaun-camping",
    pkg_name: "Camping Savana Dandaun Hill (2D1N)",
    img: "photo-1500530855697-b586d89ba3ee"
  },
  {
    id: "anak-dara",
    name: "Bukit Anak Dara",
    location: "Sembalun, Lombok Timur",
    cat: "trek",
    gem: true,
    d: "Standing tall at 1,923 mdpl, Anak Dara is the second highest peak in Sembalun. The trail features an exciting ridge climb with a continuous 360-degree panoramic view stretching from Mount Rinjani's caldera to the Sumbawa Strait.",
    h: ["1,923 mdpl summit", "Epic ridge trail walk", "360° unobstructed horizon", "Ocean of morning clouds"],
    best: "Year-round (Best for sunrise hike)",
    pkg_id: "hiking-anak-dara",
    pkg_name: "Hiking Bukit Anak Dara",
    img: "photo-1537996194471-e657df975ab4"
  },
  {
    id: "bukit-kondo",
    name: "Bukit Kondo",
    location: "Sembalun, Lombok Timur",
    cat: "trek",
    gem: true,
    d: "A tranquil and gentle hill in Sembalun that remains quiet and serene. Perfect for travelers seeking peaceful sunrise photography without crowds, surrounded by rolling hills and cool highland air.",
    h: ["Gentle hiking trail", "Quiet uncrowded sunrise spot", "Panoramic Sembalun hills view", "Family friendly"],
    best: "May to October (Morning)",
    pkg_id: "hiking-bukit-kondo",
    pkg_name: "Hiking Bukit Kondo",
    img: "photo-1472214103451-9374bd1c798e"
  },

  // --- PANTAI & GILI (ISLANDS & BEACHES) ---
  {
    id: "gili-trawangan-meno-air",
    name: "Gili Trawangan, Meno & Air",
    location: "Lombok Utara",
    cat: "beach",
    gem: false,
    d: "Lombok's most celebrated trio of tropical islands. Gili Trawangan is renowned for sunset beach bars and nightlife, Gili Meno offers tranquil coral reefs and wild sea turtles, and Gili Air charms visitors with calm turquoise waters and village vibes.",
    h: ["Wild sea turtle sanctuary", "Iconic underwater statues", "Car-free island lifestyle", "World-class coral reefs"],
    best: "All year round (Best May - October)",
    pkg_id: "snorkeling-3-gili",
    pkg_name: "Snorkeling 3 (Tiga) Gili",
    img: "photo-1544551763-46a013bb70d5"
  },
  {
    id: "secret-gili",
    name: "Secret Gili (Nanggu, Sudak & Kedis)",
    location: "Sekotong, Lombok Barat",
    cat: "beach",
    gem: true,
    d: "The secret islands of southwest Lombok. Gili Nanggu boasts a crystal-clear marine sanctuary where hundreds of tame fish eat bread right from your hand. Gili Sudak is famous for beachfront seafood, and Gili Kedis is a tiny heart-shaped sand islet.",
    h: ["Tame fish feeding in shallow water", "Fresh grilled seafood on the sand", "Tiny uninhabited Gili Kedis", "Calm and peaceful waters"],
    best: "April to November (Calm sea)",
    pkg_id: "snorkeling-secret-gili",
    pkg_name: "Snorkeling Secret Gili (Tiga Gili)",
    img: "photo-1507525428034-b723cf961d3e"
  },
  {
    id: "tanjung-aan-merese",
    name: "Pantai Tanjung Aan & Bukit Merese",
    location: "Lombok Selatan",
    cat: "beach",
    gem: false,
    d: "Tanjung Aan features unique round pepper-like sand grains and safe, sparkling turquoise waters. Rising right beside it is Bukit Merese, an easy-to-climb coastal cliff offering the most famous 360-degree golden hour sunset view in Lombok.",
    h: ["Unique 'pepper' sand grains", "Calm turquoise swimming lagoon", "Clifftop sunset at Bukit Merese", "Panoramic ocean headlands"],
    best: "All year round (Sunset: 17:00 - 18:30)",
    pkg_id: "tour-beach",
    pkg_name: "Tour Beach (South Lombok)",
    img: "photo-1519046904884-53103b34b206"
  },
  {
    id: "selong-belanak-mawun",
    name: "Pantai Selong Belanak & Pantai Mawun",
    location: "Lombok Selatan",
    cat: "beach",
    gem: false,
    d: "Selong Belanak is a crescent-shaped bay with powdery white sand and gentle rolling waves, known worldwide as the best beach in Lombok to learn to surf. Nearby Mawun is an idyllic horseshoe bay framed by lush green headlands.",
    h: ["Powder-fine white sand", "Gentle beginner surf waves", "Idyllic horseshoe bay of Mawun", "Fresh coconut beach warungs"],
    best: "May to October (Sunny days)",
    pkg_id: "tour-beach",
    pkg_name: "Tour Beach (South Lombok)",
    img: "photo-1505228395891-9a51e7e86bf6"
  },
  {
    id: "pantai-semeti-telawas",
    name: "Pantai Semeti & Pantai Telawas",
    location: "Lombok Tengah",
    cat: "beach",
    gem: true,
    d: "Dubbed the 'Krypton Beach' of Lombok, Pantai Semeti and Telawas feature dramatic volcanic rock columns, sea blowholes, and jagged sea stacks. An untamed geological marvel off the beaten tourist path.",
    h: ["Basalt hexagonal rock pillars", "Natural ocean blowholes", "Dramatic emerald crashing waves", "Completely uncrowded hidden gem"],
    best: "Morning or mid-day (Low tide)",
    pkg_id: "custom-trip",
    pkg_name: "Custom Trip (Request this Gem)",
    img: "photo-1506744038136-46273834b3fb"
  },
  {
    id: "tanjung-bloam",
    name: "Tanjung Bloam & Pantai Bilasayak",
    location: "Gunung Tunak Nature Reserve, Lombok",
    cat: "beach",
    gem: true,
    d: "A secluded nature sanctuary in southeastern Lombok characterized by striking golden-yellow sedimentary rock cliffs jutting into turquoise ocean waters, wild sea turtle nesting beaches, and serene solitude.",
    h: ["Golden stratified sea cliffs", "Marine nature sanctuary", "Untouched remote beaches", "Spectacular photography spot"],
    best: "April to October",
    pkg_id: "custom-trip",
    pkg_name: "Custom Trip (Request this Gem)",
    img: "photo-1510414842594-a61c69b5ae57"
  },

  // --- AIR TERJUN (WATERFALLS) ---
  {
    id: "benang-kelambu-stokel",
    name: "Air Terjun Benang Kelambu & Benang Stokel",
    location: "Batukliang Utara, Lombok Tengah",
    cat: "waterfall",
    gem: false,
    d: "Benang Kelambu is a natural wonder where crystal mountain water filters through thick jungle ferns like a soft living curtain into tiered pools. Just a short walk away, Benang Stokel features twin 30m vertical falls plunging into a freshwater plunge pool.",
    h: ["Living curtain of fern water", "Natural spring bathing pools", "Twin vertical falls at Benang Stokel", "UNESCO Geopark rainforest setting"],
    best: "All year round",
    pkg_id: "waterfall-lombok-tengah",
    pkg_name: "Waterfall Lombok Tengah",
    img: "photo-1432405972618-c60b0225b8f9"
  },
  {
    id: "tiu-kelep-sendang-gile",
    name: "Air Terjun Tiu Kelep & Sendang Gile",
    location: "Senaru, Lombok Utara (KLU)",
    cat: "waterfall",
    gem: false,
    d: "Lombok's most legendary waterfalls at the base of Mount Rinjani. Sendang Gile offers a grand two-tiered cascade near the entrance, while a 30-minute jungle and river trek brings you to the thunderous mist and magical pool of 42-meter Tiu Kelep.",
    h: ["Majestic 42m Tiu Kelep cascade", "Exciting shallow river trek", "Cooling mountain spring waters", "Lush rainforest canopy"],
    best: "All year round (Morning is clearest)",
    pkg_id: "waterfall-klu",
    pkg_name: "Waterfall KLU (Lombok Utara)",
    img: "photo-1518548419970-58e3b4079ab2"
  },
  {
    id: "mangku-sakti",
    name: "Air Terjun Mangku Sakti & Mangku Kodeq",
    location: "Sajang, Sembalun",
    cat: "waterfall",
    gem: true,
    d: "A surreal hidden canyon waterfall carrying milky-turquoise sulfur water originating directly from Lake Segara Anak inside Mount Rinjani. The water carves through striking white volcanic marble crevices, creating a mystical atmosphere.",
    h: ["Milky-turquoise sulfur river", "Marble canyon rock crevasses", "Natural sulfur thermal benefits", "True hidden gem of Sembalun"],
    best: "May to October (Dry season ensures clear blue color)",
    pkg_id: "custom-trip",
    pkg_name: "Custom Trip (Request this Gem)",
    img: "photo-1470071459604-3b5ec3a7fe05"
  },

  // --- BUDAYA & SIRKUIT (CULTURE & MOTORSPORT) ---
  {
    id: "mandalika-circuit",
    name: "Pertamina Mandalika International Circuit",
    location: "Kuta Mandalika, Lombok Tengah",
    cat: "culture",
    gem: false,
    d: "The pride of Indonesian motorsport: a world-class 4.3 km MotoGP and WorldSBK circuit set directly against the tropical hills and coastline of Mandalika. Experience pit walks, paddock access, trackday sessions, and the iconic Pertamina curve.",
    h: ["Official MotoGP & WorldSBK circuit", "Pit Lane & Paddock walk", "Trackday riding & driving sessions", "Overlook viewpoint from Bukit Seger"],
    best: "All year round (Non-race event dates)",
    pkg_id: "mandalika-circuit-tour",
    pkg_name: "Mandalika Circuit Tour & Trackday",
    img: "photo-1568605117036-5fe5e7bab0b7"
  },
  {
    id: "sade-sukarara",
    name: "Desa Adat Sade & Desa Sukarara",
    location: "Lombok Tengah",
    cat: "culture",
    gem: false,
    d: "Discover the living soul of the indigenous Sasak people. Sade preserves centuries-old traditions, woven bamboo huts, and elephant-grass roofs. Nearby Sukarara is Lombok's songket weaving center, where women craft world-renowned woven textiles by hand.",
    h: ["Living traditional Sasak tribal village", "Ancient architecture & clay-floored homes", "Handcrafted Songket weaving demonstration", "Try on traditional Sasak royal attire"],
    best: "All year round",
    pkg_id: "sasak-tour",
    pkg_name: "Sasak Tour (Culture & Coast)",
    img: "photo-1469854523086-cc02fe5d8800"
  },
  {
    id: "desa-beleq",
    name: "Desa Adat Beleq Sembalun",
    location: "Sembalun, Lombok Timur",
    cat: "culture",
    gem: true,
    d: "The ancient ancestral village of Sembalun, situated right in the shadow of Mount Rinjani. Preserves the first seven traditional bamboo and clay houses from which the people of Sembalun originated.",
    h: ["First historic settlement of Sembalun", "Preserved 7 heritage Sasak huts", "Rich mountain folklore & history", "Peaceful mountain scenery"],
    best: "Year-round",
    pkg_id: "custom-trip",
    pkg_name: "Custom Trip (Request this Gem)",
    img: "photo-1476514525535-07fb3b4ae5f1"
  }
];

