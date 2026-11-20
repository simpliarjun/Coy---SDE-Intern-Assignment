import "server-only";
import { Profile } from "./types";
import { Client } from "@libsql/client";
import { CURRENT_USER_ID } from "./constants";

function createAvatar(initials: string, bg1: string, bg2: string, textCol: string = "#FFFFFF"): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <defs>
      <linearGradient id="grad-${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="100%" stop-color="${bg2}" />
      </linearGradient>
    </defs>
    <rect width="160" height="160" fill="url(#grad-${initials})" rx="0" />
    <circle cx="80" cy="80" r="50" fill="white" fill-opacity="0.18" />
    <text x="80" y="80" dominant-baseline="central" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="46" font-weight="800" fill="${textCol}" text-anchor="middle">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SEEDED_PROFILES: Profile[] = [
  {
    id: "profile_01",
    name: "Aanya Sharma",
    age: 21,
    college: "SRCC, Delhi University",
    major: "Economics (Hons)",
    bio: "Chai over coffee, monsoon over winters. Probably reading Munshi Premchand in the library lawns.",
    avatar: createAvatar("AS", "#F43F7A", "#E11D48"),
    prompts: [
      { q: "A boundary of mine", a: "Never text me before 10 AM unless there's free breakfast involved." },
      { q: "Unpopular opinion", a: "Tom uncle's Maggi in North Campus is overrated." }
    ],
    interests: ["Indian Indie", "Economics", "Chai", "Bookstores"]
  },
  {
    id: "profile_02",
    name: "Kabir Mehta",
    age: 22,
    college: "BITS Pilani",
    major: "Computer Science",
    bio: "CS at BITS Pilani. Writing distributed systems code, playing bass in a campus band, and debating Vim vs VS Code.",
    avatar: createAvatar("KM", "#6366F1", "#4F46E5"),
    prompts: [
      { q: "Best campus memory", a: "Oasis fest night jam sessions until 5 AM." },
      { q: "The secret to my heart", a: "Filter coffee and honest conversations without pretension." }
    ],
    interests: ["Bass Guitar", "Distributed Systems", "Rock Music", "Late Night Drives"]
  },
  {
    id: "profile_03",
    name: "Diya Patel",
    age: 20,
    college: "St. Xavier's College, Mumbai",
    major: "Mass Media (BMM)",
    bio: "Shooting 35mm film in South Bombay. Looking for someone to explore Kala Ghoda cafes with.",
    avatar: createAvatar("DP", "#EC4899", "#BE185D"),
    prompts: [
      { q: "My simple pleasures", a: "The smell of sea air at Marine Drive at 1 AM." },
      { q: "Two truths and a lie", a: "Directed a short film, met Shah Rukh Khan, hate mangoes." }
    ],
    interests: ["Film Photography", "Cinema", "Art Exhibitions", "Marine Drive"]
  },
  {
    id: "profile_04",
    name: "Arjun Nair",
    age: 21,
    college: "Ashoka University",
    major: "Philosophy & Politics",
    bio: "Philosophy and politics at Ashoka. Black coffee, existentialist essays, and late-night debates about ethics.",
    avatar: createAvatar("AN", "#0D9488", "#0F766E"),
    prompts: [
      { q: "I'll know you're the one if", a: "You don't get defensive when we disagree on politics." },
      { q: "First round is on me if", a: "You can explain Gödel's incompleteness theorem simply." }
    ],
    interests: ["Philosophy", "Debating", "Podcasts", "Vinyl Records"]
  },
  {
    id: "profile_05",
    name: "Rhea Sen",
    age: 21,
    college: "Miranda House, DU",
    major: "English Literature",
    bio: "Over-analyzing poetry and hoarding vintage postcards. Quiet until you bring up feminist theory.",
    avatar: createAvatar("RS", "#8B5CF6", "#7C3AED"),
    prompts: [
      { q: "A life goal of mine", a: "Publish a poetry anthology and open a quiet mountain café." },
      { q: "My most controversial take", a: "Social media ruined genuine intimacy in romance." }
    ],
    interests: ["Creative Writing", "Literature", "Postcards", "Flea Markets"]
  },
  {
    id: "profile_06",
    name: "Rohan Kapoor",
    age: 22,
    college: "IIT Bombay",
    major: "Mechanical Engineering",
    bio: "Racing cars for the FSAE team. If I'm not in the garage, I'm probably making cold brew.",
    avatar: createAvatar("RK", "#F59E0B", "#D97706"),
    prompts: [
      { q: "Together we could", a: "Build something cool in a hackathon or get lost in Powai." },
      { q: "I geek out on", a: "F1 race telemetry and mechanical watches." }
    ],
    interests: ["Formula 1", "Engineering", "Coffee Brewing", "Cycling"]
  },
  {
    id: "profile_07",
    name: "Tara Deshmukh",
    age: 20,
    college: "Lady Shri Ram College (LSR)",
    major: "Psychology (Hons)",
    bio: "Kathak dancer, psychology student at LSR, and constantly hunting for good chai in Lajpat Nagar.",
    avatar: createAvatar("TD", "#10B981", "#059669"),
    prompts: [
      { q: "Don't hate me if I", a: "Psychoanalyze your handwriting within 5 minutes of meeting." },
      { q: "Green flags I look for", a: "Emotional intelligence and being kind to waitstaff." }
    ],
    interests: ["Kathak", "Psychology", "Ceramics", "Museums"]
  },
  {
    id: "profile_08",
    name: "Siddharth Verma",
    age: 23,
    college: "IIM Ahmedabad",
    major: "MBA (First Year)",
    bio: "Ex-consultant, currently surviving case prep on glucose biscuits and iced americano.",
    avatar: createAvatar("SV", "#3B82F6", "#1D4ED8"),
    prompts: [
      { q: "My biggest red flag", a: "I use frameworks to make personal life decisions." },
      { q: "Ideal Sunday", a: "Waking up without an alarm, brunch, and zero emails." }
    ],
    interests: ["Strategy", "Squash", "Travel", "Board Games"]
  },
  {
    id: "profile_09",
    name: "Meera Krishnan",
    age: 21,
    college: "Stella Maris College, Chennai",
    major: "Fine Arts",
    bio: "Painting huge canvases in oil. Carnatic music in my headphones always.",
    avatar: createAvatar("MK", "#F43F7A", "#BE123C"),
    prompts: [
      { q: "You should leave a comment if", a: "You want your portrait painted in bright vermillion." },
      { q: "Favorite corner in college", a: "The sculpture garden behind the studio block." }
    ],
    interests: ["Oil Painting", "Carnatic Music", "Sculpture", "Beaches"]
  },
  {
    id: "profile_10",
    name: "Vikram Malhotra",
    age: 22,
    college: "IIT Delhi",
    major: "Electrical Engineering",
    bio: "Building robotics and flying FPV drones across campus. Usually at the labs or biking around Hauz Khas.",
    avatar: createAvatar("VM", "#6366F1", "#4338CA"),
    prompts: [
      { q: "A weird fact about me", a: "I can solve a Rubik's cube blindfolded in under 40 seconds." },
      { q: "Never have I ever", a: "Attended an 8 AM lecture fully awake." }
    ],
    interests: ["Drones", "Robotics", "Trekking", "Synthwave"]
  },
  {
    id: "profile_11",
    name: "Ananya Joshi",
    age: 20,
    college: "Fergusson College, Pune",
    major: "Sociology",
    bio: "Heritage walks in Old Pune, street photography, and cutting chai at FC road.",
    avatar: createAvatar("AJ", "#EC4899", "#9D174D"),
    prompts: [
      { q: "My favorite spot", a: "Vetal Tekdi at sunrise with a thermos of tea." },
      { q: "Best advice I ever got", a: "Don't trade authenticity for approval." }
    ],
    interests: ["Heritage Walks", "Documentaries", "Pune Streets", "Baking"]
  },
  {
    id: "profile_12",
    name: "Advait Singhania",
    age: 21,
    college: "Symbiosis Law School, Pune",
    major: "BA LLB (Constitutional Law)",
    bio: "Third year law at SLS Pune. Spending evenings walking campus rescue dogs and finding the best misal pav in Viman Nagar.",
    avatar: createAvatar("AS", "#14B8A6", "#0F766E"),
    prompts: [
      { q: "I argue for fun about", a: "Whether pineapple on pizza violates natural justice." },
      { q: "How to win me over", a: "Tell me a dog story or bring me dark chocolate." }
    ],
    interests: ["Moot Court", "Constitutional Law", "Dog Rescue", "Tennis"]
  },
  {
    id: "profile_13",
    name: "Isha Sundaram",
    age: 21,
    college: "National Institute of Design (NID)",
    major: "Product Design",
    bio: "Obsessed with chairs, typography, and how everyday objects make people feel.",
    avatar: createAvatar("IS", "#F97316", "#C2410C"),
    prompts: [
      { q: "Design pet peeve", a: "Doors where you push when it clearly has a pull handle." },
      { q: "Sunday craft", a: "Hand-binding sketchbooks with Japanese linen thread." }
    ],
    interests: ["Typography", "Industrial Design", "Ceramics", "Minimalism"]
  },
  {
    id: "profile_14",
    name: "Zain Khan",
    age: 22,
    college: "Jamia Millia Islamia, Delhi",
    major: "Journalism & Mass Comm",
    bio: "Reporting on urban culture, photojournalism, and searching for the best biryani in Old Delhi.",
    avatar: createAvatar("ZK", "#8B5CF6", "#6D28D9"),
    prompts: [
      { q: "Quickest way to my heart", a: "Matia Mahal food walks at midnight." },
      { q: "A cause I care about", a: "Independent regional journalism." }
    ],
    interests: ["Photojournalism", "Old Delhi", "Food Walks", "Urdu Poetry"]
  },
  {
    id: "profile_15",
    name: "Kavya Reddy",
    age: 20,
    college: "Christ University, Bengaluru",
    major: "BBA Finance",
    bio: "Tennis on Saturday mornings, Koramangala filter coffee, and exploring indie gigs around Indiranagar.",
    avatar: createAvatar("KR", "#F43F7A", "#9F1239"),
    prompts: [
      { q: "I'm convinced that", a: "Bangalore weather fixes 80% of personal problems." },
      { q: "A weekend well spent", a: "Filter coffee, Cubbon Park reading, and good sourdough." }
    ],
    interests: ["Tennis", "Bangalore Cafes", "Finance", "Indie Pop"]
  },
  {
    id: "profile_16",
    name: "Devansh Mittal",
    age: 22,
    college: "IIT Roorkee",
    major: "Civil Engineering",
    bio: "Civil engineering at Roorkee. Leading the campus stargazing club and heading up to Rishikesh whenever class gets cancelled.",
    avatar: createAvatar("DM", "#10B981", "#047857"),
    prompts: [
      { q: "Most spontaneous thing I've done", a: "Took a night bus to Rishikesh on an exam eve." },
      { q: "Ask me about", a: "Constellations, astrophotography, and campfire chords." }
    ],
    interests: ["Trekking", "Acoustic Guitar", "Astronomy", "Mountains"]
  },
  {
    id: "profile_17",
    name: "Sanya Chopra",
    age: 21,
    college: "Hansraj College, DU",
    major: "History (Hons)",
    bio: "Exploring Delhi Sultanate ruins. History isn't just dates; it's drama and gossip.",
    avatar: createAvatar("SC", "#F59E0B", "#B45309"),
    prompts: [
      { q: "My favorite spot in Delhi", a: "Hauz Khas ruins just before closing." },
      { q: "Historical crush", a: "Razia Sultan, no contest." }
    ],
    interests: ["Medieval History", "Heritage", "Street Food", "Museums"]
  },
  {
    id: "profile_18",
    name: "Nikhil Roy",
    age: 22,
    college: "Jadavpur University, Kolkata",
    major: "Comparative Literature",
    bio: "Comparative literature at Jadavpur. Spending pocket money on old records along College Street and drinking black coffee at Indian Coffee House.",
    avatar: createAvatar("NR", "#6366F1", "#3730A3"),
    prompts: [
      { q: "Cinema take", a: "Satyajit Ray's soundtracks are as genius as his framing." },
      { q: "Best feeling in the world", a: "Finding a rare first-edition book for 100 rupees." }
    ],
    interests: ["World Cinema", "Kolkata Coffee House", "Vinyl", "Poetry"]
  },
  {
    id: "profile_19",
    name: "Prisha Bansal",
    age: 20,
    college: "NMIMS, Mumbai",
    major: "B.Des (UI/UX)",
    bio: "Design student at NMIMS. Into editorial typography, iced matcha, and exploring art pop-ups around Bandra.",
    avatar: createAvatar("PB", "#EC4899", "#831843"),
    prompts: [
      { q: "My toxic trait", a: "I judge restaurants primarily by their menu typography." },
      { q: "First date idea", a: "Gallery hopping followed by roadside sev puri." }
    ],
    interests: ["UI/UX Design", "Matcha", "Art Galleries", "K-Pop"]
  },
  {
    id: "profile_20",
    name: "Tanmay Sen",
    age: 21,
    college: "IIT Madras",
    major: "Aerospace Engineering",
    bio: "Rocket propulsion researcher. If it flies or breaks the sound barrier, I'm into it.",
    avatar: createAvatar("TS", "#0D9488", "#115E59"),
    prompts: [
      { q: "A fact that blows my mind", a: "Voyager 1 is over 24 billion kilometers from Earth." },
      { q: "Guilty pleasure", a: "Rewatching Interstellar every semester." }
    ],
    interests: ["Aerospace", "Sci-Fi", "Swimming", "Chess"]
  },
  {
    id: "profile_21",
    name: "Alisha Thomas",
    age: 21,
    college: "St. Teresa's College, Kochi",
    major: "Economics",
    bio: "Economics at St. Teresa's. Morning kayaking in the backwaters, sketching old buildings in Fort Kochi, and brewing pour-overs.",
    avatar: createAvatar("AT", "#8B5CF6", "#5B21B6"),
    prompts: [
      { q: "Home to me is", a: "Fort Kochi during the Biennale." },
      { q: "Bucket list item", a: "Live in an off-grid cabin in Wayanad for six months." }
    ],
    interests: ["Kayaking", "Coffee Roasting", "Biennale", "Watercolor"]
  },
  {
    id: "profile_22",
    name: "Karan Oberoi",
    age: 22,
    college: "St. Stephen's College, Delhi",
    major: "History",
    bio: "History at St. Stephen's. Rehearsing plays in the evening, running the Ridge trail, and studying in quiet library corners.",
    avatar: createAvatar("KO", "#F43F7A", "#881337"),
    prompts: [
      { q: "Something I value deeply", a: "People who listen without preparing their reply." },
      { q: "Unmatched skill", a: "Making the crispiest butter toast at 2 AM." }
    ],
    interests: ["Debate", "Theater", "Distance Running", "Old Libraries"]
  },
  {
    id: "profile_23",
    name: "Pooja Hegde",
    age: 20,
    college: "Mount Carmel College, Bengaluru",
    major: "Fashion Communication",
    bio: "Fashion communication at Mount Carmel. Thrifting across Commercial Street and going to indie gigs in Indiranagar.",
    avatar: createAvatar("PH", "#F59E0B", "#92400E"),
    prompts: [
      { q: "My aesthetic in 3 words", a: "90s Bollywood meets Scandinavian minimalism." },
      { q: "I'll make you a playlist if", a: "You promise to listen to it without shuffling." }
    ],
    interests: ["Thrifting", "Fashion", "Indie Gigs", "Styling"]
  },
  {
    id: "profile_24",
    name: "Harsh Vardhan",
    age: 23,
    college: "IIT Kharagpur",
    major: "Computer Science (Dual)",
    bio: "CS at KGP. Writing code, playing badminton at the gymkhana, and looking for good late night rolls.",
    avatar: createAvatar("HV", "#3B82F6", "#1E40AF"),
    prompts: [
      { q: "A hill I'll die on", a: "Clean code is an art form, not just an engineering task." },
      { q: "Weekend ritual", a: "2 hours on the badminton court, then chicken roll." }
    ],
    interests: ["Open Source", "Badminton", "Linux", "Gaming"]
  },
  {
    id: "profile_25",
    name: "Sneha Nair",
    age: 21,
    college: "Loyola College, Chennai",
    major: "Visual Communication",
    bio: "Documenting street art and everyday stories. Big believer in kindness and black tea.",
    avatar: createAvatar("SN", "#10B981", "#065F46"),
    prompts: [
      { q: "My superpower", a: "Remembering people's specific coffee orders forever." },
      { q: "Together we could", a: "Binge Studio Ghibli films with hot buttered popcorn." }
    ],
    interests: ["Studio Ghibli", "Graphic Design", "Street Stories", "Black Tea"]
  },
  {
    id: "profile_26",
    name: "Aditya Bhatt",
    age: 22,
    college: "Delhi Technological University (DTU)",
    major: "Software Engineering",
    bio: "Software at DTU. Producing electronic music in my dorm and building audio plugins on the weekend.",
    avatar: createAvatar("AB", "#EC4899", "#701A75"),
    prompts: [
      { q: "Current project", a: "Synthesizer vst that turns ambient city sounds into synth pads." },
      { q: "Guaranteed way to make me laugh", a: "Extremely dry, deadpan sarcasm." }
    ],
    interests: ["Music Production", "Hackathons", "Synthesizers", "Mixology"]
  },
  {
    id: "profile_27",
    name: "Gayatri Menon",
    age: 20,
    college: "Miranda House, DU",
    major: "Philosophy (Hons)",
    bio: "Philosophy at Miranda House. Learning Hindustani classical vocals and hunting for quiet tea spots in North Campus.",
    avatar: createAvatar("GM", "#14B8A6", "#134E4A"),
    prompts: [
      { q: "Something that fascinates me", a: "How music scales evoke universal emotional responses." },
      { q: "A non-negotiable", a: "Empathy toward people with different backgrounds." }
    ],
    interests: ["Classical Vocals", "Philosophy", "Tea Houses", "Podcasts"]
  },
  {
    id: "profile_28",
    name: "Rishi Chawla",
    age: 21,
    college: "Shaheed Sukhdev College of Business Studies (SSCBS)",
    major: "BFIA (Finance)",
    bio: "Finance at SSCBS. Training for the Delhi half marathon and reading market histories before morning lectures.",
    avatar: createAvatar("RC", "#F97316", "#9A3412"),
    prompts: [
      { q: "Fun fact", a: "I can model DCFs faster than most people can cook instant noodles." },
      { q: "My ideal partner", a: "Ambitious, intellectually curious, and loves long morning walks." }
    ],
    interests: ["Finance", "Marathon", "Podcasts", "Startups"]
  },
  {
    id: "profile_29",
    name: "Natasha Pillai",
    age: 21,
    college: "St. Joseph's College, Bengaluru",
    major: "Environmental Science",
    bio: "Environmental science at St. Joseph's. Keeping 14 house plants alive and cycling around Cubbon Park early on Sundays.",
    avatar: createAvatar("NP", "#6366F1", "#312E81"),
    prompts: [
      { q: "Green flag in a crush", a: "Someone who carries their own tote bag and composts." },
      { q: "Favorite sound", a: "Rain on bamboo leaves at 5 in the morning." }
    ],
    interests: ["Ecology", "Plant Care", "Cycling", "Bird Watching"]
  },
  {
    id: "profile_30",
    name: "Varun Kulkarni",
    age: 22,
    college: "COEP Pune",
    major: "Electronics & Telecommunication",
    bio: "Electronics at COEP. Fixing old audio amps, working with microcontrollers, and listening to classic rock.",
    avatar: createAvatar("VK", "#F43F7A", "#4C0519"),
    prompts: [
      { q: "I get irrationally excited about", a: "Soldering irons, Arduino boards, and retro amplifiers." },
      { q: "Life philosophy", a: "If it's broken, open it up and see how it works first." }
    ],
    interests: ["Hardware", "Classic Rock", "Camping", "Motorbikes"]
  },
  {
    id: "profile_31",
    name: "Meghna Roy",
    age: 20,
    college: "Presidency University, Kolkata",
    major: "Political Science",
    bio: "Political science at Presidency. Debating, doing street theater rehearsals, and eating puchkas at Vivekananda Park.",
    avatar: createAvatar("MR", "#10B981", "#022C22"),
    prompts: [
      { q: "Unfiltered truth", a: "Street food beats Michelin dining 10 times out of 10." },
      { q: "My comfort activity", a: "Walking around Victoria Memorial with a notebook." }
    ],
    interests: ["Theater", "Debating", "Street Food", "Writing"]
  },
  {
    id: "profile_32",
    name: "Dhruv Saxena",
    age: 22,
    college: "IIIT Hyderabad",
    major: "Computer Science",
    bio: "CS at IIIT Hyderabad. Late-night acoustic jams, algorithm problems, and finding the best midnight dosa in Gachibowli.",
    avatar: createAvatar("DS", "#8B5CF6", "#4C1D95"),
    prompts: [
      { q: "The way to my heart", a: "Show me a song that makes your chest ache." },
      { q: "Favorite midnight snack", a: "Masala dosa from DLF street vendors in Gachibowli." }
    ],
    interests: ["Acoustic Music", "Algorithms", "Songwriting", "Late Nights"]
  }
];

export const PRE_SEEDED_LIKERS = [
  "profile_01",
  "profile_02",
  "profile_07",
  "profile_13",
  "profile_19",
  "profile_25",
];

export async function seedDatabase(db: Client): Promise<void> {
  const existing = await db.execute("SELECT COUNT(*) as count FROM profiles");
  const count = Number(existing.rows[0].count);

  if (count === 0) {
    for (const p of SEEDED_PROFILES) {
      await db.execute({
        sql: `INSERT INTO profiles (id, name, age, college, major, bio, avatar, prompts, interests)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          p.id,
          p.name,
          p.age,
          p.college,
          p.major,
          p.bio,
          p.avatar,
          JSON.stringify(p.prompts),
          JSON.stringify(p.interests),
        ],
      });
    }

    for (const likerId of PRE_SEEDED_LIKERS) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO swipes (swiper_id, target_id, direction) VALUES (?, ?, ?)`,
        args: [likerId, CURRENT_USER_ID, "like"],
      });
    }
  }
}
