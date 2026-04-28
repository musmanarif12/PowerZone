export const services = [
  {
    slug: 'strength-training',
    title: 'Strength Training',
    desc: 'Build muscle and increase your power with our elite equipment.',
    image: '/assets/img3.jpg',
    fullDesc: "Our Strength Training program is designed for everyone from beginners to competitive athletes. We provide a massive range of free weights, resistance machines, and dedicated lifting platforms to help you reach your maximum potential.",
    benefits: [
      "Improve bone density and joint health",
      "Boost metabolism and fat burning",
      "Increase functional strength for daily life",
      "Expert coaching on proper form and technique"
    ],
    schedule: "Monday - Saturday: 6:00 AM - 11:00 PM"
  },
  {
    slug: 'personal-training',
    title: 'Personal Training',
    desc: 'Get customized programs and 1-on-1 coaching.',
    image: '/assets/img4.jpg',
    fullDesc: "Our personalized coaching ensures you get a program tailored exactly to your goals. Whether you want to slim down, bulk up, or improve athletic performance, your personal trainer will guide you every step of the way.",
    benefits: [
      "Customized workout plans based on your goals",
      "One-on-one attention and form correction",
      "Nutritional guidance and regular check-ins",
      "Faster and more sustainable results"
    ],
    schedule: "Flexible scheduling with your trainer"
  },
  {
    slug: 'cardio-endurance',
    title: 'Cardio & Endurance',
    desc: 'High-intensity cardio equipment and stamina building.',
    image: '/assets/img5.jpg',
    fullDesc: "Push your limits and build incredible stamina with our state-of-the-art cardio section. Featuring top-of-the-line treadmills, ellipticals, and stationary bikes to get your heart pumping.",
    benefits: [
      "Improved cardiovascular health",
      "High calorie burn for fat loss",
      "Increased stamina and energy levels",
      "Access to premium cardio equipment"
    ],
    schedule: "Daily during open gym hours"
  }
];

export const plans = [
  {
    slug: 'silver-plan',
    name: 'Silver Plan',
    price: '5,000',
    icon: '🥈',
    features: ['Gym Access', 'Locker Room', 'Standard Coaching', 'Free WiFi'],
    fullDesc: "The Silver Plan is perfect for those starting their fitness journey. Get unlimited access to our main gym floor and essential facilities at an affordable price.",
    details: [
      "Access to all cardio and strength equipment",
      "Daily locker use included",
      "Access during standard hours",
      "Initial fitness assessment"
    ]
  },
  {
    slug: 'gold-plan',
    name: 'Gold Plan',
    price: '8,000',
    icon: '🥇',
    highlighted: true,
    features: ['All Silver Features', 'Premium Classes', 'Personal Trainer (2/mo)', 'Nutrition Plan'],
    fullDesc: "Our most popular choice. The Gold Plan provides a comprehensive fitness experience with added personal attention and access to our premium class schedules.",
    details: [
      "Everything in Silver Plan",
      "Unlimited access to Group Classes and Cardio sessions",
      "Two 1-on-1 personal training sessions per month",
      "Customized monthly nutrition and diet plan",
      "Priority equipment booking"
    ]
  },
  {
    slug: 'platinum-plan',
    name: 'Platinum Plan',
    price: '15,000',
    icon: '💎',
    features: ['All Gold Features', 'Unlimited PT', 'Sauna & Spa', 'Guest Passes'],
    fullDesc: "The ultimate fitness experience. Our Platinum members enjoy exclusive access to our luxury amenities, unlimited personal training, and dedicated support.",
    details: [
      "Everything in Gold Plan",
      "Unlimited 1-on-1 personal training",
      "Daily access to Sauna, Steam, and Spa",
      "5 guest passes per month",
      "Dedicated personal equipment locker",
      "Monthly health and performance screening"
    ]
  }
];
