/**
 * Product Categories Data Definition
 */
export const categories = [
  {
    id: 'laptops',
    name: 'Laptops',
    slug: 'laptops',
    icon: 'Laptop',
    tagline: 'Ultrabooks, student notebooks & coding powerhouses',
    description: 'Find the best laptops vetted by performance benchmarks, battery longevity, keyboard ergonomics, and value-for-money across budget brackets.',
    featuredCount: 18,
    seoTitle: 'Best Laptops in India (2025) - College, Coding & Everyday Work',
    seoDescription: 'Explore our research-backed recommendations for the top laptops under ₹50,000, student ultrabooks, and programming machines.',
    buyingTips: [
      'Prioritize at least 16GB RAM if you plan to keep the laptop for 3+ years.',
      'Check for 100% sRGB color accuracy if you do photo/video work.',
      'USB-C Power Delivery charging makes traveling with single chargers much easier.',
    ],
    faqs: [
      {
        question: 'What is the minimum RAM recommended for college and coding?',
        answer: 'We recommend at least 16GB of DDR4/DDR5 RAM. While 8GB suffices for basic web browsing and document editing, modern development environments, multiple browser tabs, and multitasking quickly consume memory.'
      },
      {
        question: 'How do you choose between Intel Core and AMD Ryzen laptops?',
        answer: 'Both offer stellar computing performance. In recent generations, AMD Ryzen processors often provide slightly superior battery efficiency and multi-core output per watt, while Intel processors frequently edge ahead in single-core responsiveness and Thunderbolt 4 support.'
      },
      {
        question: 'Is an OLED display worth the extra cost on a budget laptop?',
        answer: 'OLED panels offer unbeatable contrast, deep blacks, and vibrant colors. However, they may draw slightly more power on bright white backgrounds. For media consumption and creator work, OLED is well worth the premium.'
      }
    ]
  },
  {
    id: 'smartphones',
    name: 'Smartphones',
    slug: 'smartphones',
    icon: 'Smartphone',
    tagline: 'Best camera phones, battery champs & budget kings',
    description: 'Cut through marketing hype. We evaluate real-world battery endurance, display clarity, software update commitments, and camera consistency.',
    featuredCount: 24,
    seoTitle: 'Best Smartphones to Buy in India (2025) - Value & Flagships',
    seoDescription: 'Find the highest rated budget and mid-range smartphones based on reliable hardware specs, clean software, and camera performance.',
    buyingTips: [
      'Ensure at least 3 years of promised Android OS updates for long-term security.',
      'Look for AMOLED displays with at least 120Hz refresh rate for fluid interaction.',
      'Fast charging (at least 33W-67W) saves significant daily downtime.',
    ],
    faqs: [
      {
        question: 'Is 5G really necessary when buying a phone today?',
        answer: 'Yes. With major telecom operators deploying 5G widely across tier-1 and tier-2 Indian cities, buying a 5G-capable handset ensures your device remains future-proof for high-speed network connectivity.'
      },
      {
        question: 'Does more megapixels automatically mean better photos?',
        answer: 'Not necessarily. Sensor size, pixel binning, aperture, and computational photography software processing play a substantially larger role in low-light and dynamic range clarity than raw megapixel counts.'
      }
    ]
  },
  {
    id: 'earbuds',
    name: 'Wireless Earbuds',
    slug: 'earbuds',
    icon: 'Headphones',
    tagline: 'TWS earbuds with stellar ANC and microphone clarity',
    description: 'Find true wireless earbuds that balance acoustic fidelity, active noise cancellation, secure ergonomic fit, and reliable microphone clarity for calls.',
    featuredCount: 16,
    seoTitle: 'Best True Wireless Earbuds (TWS) Under ₹2000, ₹5000 & Beyond',
    seoDescription: 'Tested audio quality, microphone performance, and real-world battery benchmarks for top wireless earbuds.',
    buyingTips: [
      'Look for IPX4 or higher water resistance if you plan on working out with your earbuds.',
      'Check for dual-device multipoint connectivity to easily switch between your phone and laptop.',
      'Verify whether low-latency gaming mode is supported if you watch video or game.',
    ],
    faqs: [
      {
        question: 'How effective is Active Noise Cancellation (ANC) under ₹3,000?',
        answer: 'Budget ANC reliably dampens steady low-frequency background hums like AC units and train rumbles, but sudden high-pitched sounds or chatter still leak in. For total silence, mid-range ANC models perform noticeably better.'
      }
    ]
  },
  {
    id: 'headphones',
    name: 'Over-Ear Headphones',
    slug: 'headphones',
    icon: 'Speaker',
    tagline: 'Comfortable over-ear cans for deep work and travel',
    description: 'Long battery endurance, plush memory-foam ear cushions, and balanced frequency curves for audiophiles, remote workers, and travelers.',
    featuredCount: 12,
    seoTitle: 'Best Over-Ear Headphones for Comfort & Sound Quality',
    seoDescription: 'Find the top noise-cancelling and studio-monitoring headphones for all-day comfort and acoustic fidelity.',
    buyingTips: [
      'Weight matters: under 260 grams ensures minimal neck fatigue during 6+ hour sessions.',
      'Check if a 3.5mm wired backup cable is included for zero latency and airplane jacks.',
    ],
    faqs: [
      {
        question: 'Are over-ear headphones better for ear health than in-ear buds?',
        answer: 'Over-ear headphones sit outside the ear canal, distributing sound pressure more evenly and allowing you to listen at lower volumes due to superior passive isolation, which can reduce long-term acoustic fatigue.'
      }
    ]
  },
  {
    id: 'monitors',
    name: 'Monitors',
    slug: 'monitors',
    icon: 'Monitor',
    tagline: 'IPS, 4K & high-refresh panels for coding & productivity',
    description: 'Crisp text rendering, wide viewing angles, USB-C single cable docking, and flicker-free eye care technology for marathon screen sessions.',
    featuredCount: 14,
    seoTitle: 'Best Monitors for Programming, Design & Office Productivity',
    seoDescription: 'Top monitors reviewed for text sharpness, eye comfort, USB-C connectivity, and height-adjustable stands.',
    buyingTips: [
      'For 27-inch displays, opt for 1440p (QHD) or 4K. 1080p on a 27-inch screen causes visible pixelation.',
      'A height-adjustable stand or VESA 100x100 mounting support is vital for ergonomic posture.',
    ],
    faqs: [
      {
        question: 'What resolution is best for programming and reading text?',
        answer: '27-inch 1440p (QHD) is the sweet spot for productivity and crisp code rendering. If budget permits, a 4K 27 or 32-inch monitor with 150% OS scaling provides retina-grade font smoothness.'
      }
    ]
  },
  {
    id: 'keyboards',
    name: 'Keyboards',
    slug: 'keyboards',
    icon: 'Keyboard',
    tagline: 'Mechanical, membrane & low-profile typing instruments',
    description: 'Elevate your typing comfort and speed. We evaluate mechanical switch tactility, Bluetooth multi-device pairing, and build durability.',
    featuredCount: 15,
    seoTitle: 'Best Mechanical & Productivity Keyboards for Typing & Coding',
    seoDescription: 'Discover the top mechanical switches, compact 75% layouts, and ergonomic keyboards for coders and writers.',
    buyingTips: [
      'Red (linear) switches are quiet and smooth; Brown (tactile) switches offer a subtle bump favored by typists; Blue (clicky) switches are loud.',
      'Hot-swappable PCB sockets allow you to change broken or preferred switches without soldering.',
    ],
    faqs: [
      {
        question: 'What is the advantage of a 75% or TKL keyboard over full size?',
        answer: 'Compact layouts eliminate the numpad, bringing your mouse closer to your body for an ergonomic shoulder posture while preserving dedicated arrow keys.'
      }
    ]
  },
  {
    id: 'mice',
    name: 'Mice',
    slug: 'mice',
    icon: 'Mouse',
    tagline: 'Ergonomic vertical mice & precision gaming sensors',
    description: 'Prevent wrist strain and boost cursor precision with our curated picks for productivity mice, ergonomic rollers, and ultralight gaming pointers.',
    featuredCount: 10,
    seoTitle: 'Best Ergonomic & Gaming Mice for Work and Play',
    seoDescription: 'Explore ergonomic vertical designs, silent switches, and reliable wireless sensors for everyday productivity.',
    buyingTips: [
      'Choose ergonomic sculpted designs if you spend 8+ hours working on a computer daily.',
      'Tri-mode connectivity (2.4GHz + Bluetooth + USB-C) ensures compatibility across tablets and PCs.',
    ],
    faqs: [
      {
        question: 'Do ergonomic vertical mice really prevent wrist pain?',
        answer: 'Yes, vertical mice keep your forearm in a neutral "handshake" position, significantly alleviating pressure on the carpal tunnel and median nerve.'
      }
    ]
  },
  {
    id: 'smartwatches',
    name: 'Smartwatches',
    slug: 'smartwatches',
    icon: 'Watch',
    tagline: 'Accurate health metrics, AMOLED screens & long battery',
    description: 'Keep track of sleep stages, SpO2, heart rate variability, and fitness goals with smart wearables that don’t require daily recharges.',
    featuredCount: 12,
    seoTitle: 'Best Smartwatches & Fitness Trackers with Reliable Health Sensors',
    seoDescription: 'Comparison of battery life, GPS accuracy, sleep tracking, and build quality across leading wearable brands.',
    buyingTips: [
      'Confirm whether built-in standalone GPS is present if you jog without bringing your phone.',
      'Verify water resistance ratings: 5 ATM or 50 meters is needed for swimming.',
    ],
    faqs: [
      {
        question: 'Can budget smartwatches accurately measure blood oxygen (SpO2)?',
        answer: 'They offer good ballpark trends while at rest, but should never be treated as certified medical diagnostic instruments.'
      }
    ]
  },
  {
    id: 'power-banks',
    name: 'Power Banks',
    slug: 'power-banks',
    icon: 'BatteryCharging',
    tagline: 'Fast charging, airline-safe portable power backups',
    description: 'Never get stranded with low battery. Compact 10,000mAh pockets and 65W laptop-charging 20,000mAh power banks evaluated for safety and efficiency.',
    featuredCount: 11,
    seoTitle: 'Best Fast Charging Power Banks for Phones & Laptops',
    seoDescription: 'High-output Power Delivery power banks tested for airport compliance, safe thermals, and rapid recharging.',
    buyingTips: [
      'The airline carry-on limit is 100 Watt-hours (Wh), which is equivalent to roughly 27,000mAh at 3.7V.',
      'Ensure the power bank supports Power Delivery (PD) 3.0 with at least 20W output for modern phones.',
    ],
    faqs: [
      {
        question: 'Can a power bank charge my laptop?',
        answer: 'Yes, provided the power bank supports USB-C Power Delivery with at least 45W or 65W output, and your laptop accepts USB-C PD charging.'
      }
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming Gear',
    slug: 'gaming',
    icon: 'Gamepad2',
    tagline: 'High-refresh monitors, mechanical keys & spatial headsets',
    description: 'High performance gaming peripherals offering low input latency, high durability mechanical switches, and accurate positional soundscapes.',
    featuredCount: 15,
    seoTitle: 'Best Budget & Competitive Gaming Gear for PC and Consoles',
    seoDescription: 'Curated list of budget gaming gear tested for responsiveness, low latency, and build endurance.',
    buyingTips: [
      'Prioritize low weight (under 65g) for competitive FPS mice for rapid target acquisition.',
      'Ensure headphones have a flexible, noise-suppressing boom microphone for clear squad comms.',
    ],
    faqs: [
      {
        question: 'Does a 144Hz monitor make a difference compared to 60Hz?',
        answer: 'The difference is immediately noticeable. Visual motion is more than twice as smooth, tracking fast targets is easier, and overall cursor responsiveness feels instant.'
      }
    ]
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    icon: 'Coffee',
    tagline: 'Smart desk lamps, ergonomic chairs & smart air fryers',
    description: 'Clever tech appliances and home productivity essentials engineered to simplify your everyday daily routine and workspaces.',
    featuredCount: 9,
    seoTitle: 'Best Smart Home & Desk Essentials for Modern Living',
    seoDescription: 'Discover smart appliances, screenbar desk lights, and coffee gear for comfortable productive living.',
    buyingTips: [
      'Desk screenbars light your workspace without creating glare or reflection on your computer monitor.',
    ],
    faqs: [
      {
        question: 'Why choose an LED monitor light bar over a traditional desk lamp?',
        answer: 'Monitor light bars mount directly on top of your screen, saving zero desk footprint and directing light downwards onto your keyboard without hitting the glass screen.'
      }
    ]
  },
  {
    id: 'college-essentials',
    name: 'College Essentials',
    slug: 'college-essentials',
    icon: 'GraduationCap',
    tagline: 'Durable backpacks, noise-dampening buds & study tech',
    description: 'Budget-conscious, durable gear handpicked to help college students study effectively, survive long commutes, and manage dorm life.',
    featuredCount: 16,
    seoTitle: 'Best Tech Essentials for College & University Students (2025)',
    seoDescription: 'From lightweight laptops to rugged backpacks and study headphones, here is the student tech checklist.',
    buyingTips: [
      'Look for water-resistant laptop compartments in everyday campus backpacks.',
      'A compact 65W GaN multi-port charger replaces carrying multiple heavy power bricks.',
    ],
    faqs: [
      {
        question: 'What is the single most important tech investment for a student?',
        answer: 'A reliable laptop with a great keyboard, solid 8-hour battery life, and at least 16GB of RAM ensures smooth research, paper writing, and project execution throughout your degree.'
      }
    ]
  }
];
