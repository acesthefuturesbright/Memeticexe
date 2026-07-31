import { db } from "./index.js";
import { creators } from "./schema.js";

const initialCreators = [
  {
    id: "mrsme",
    name: "MrsMe",
    email: "mrsme@memeticexe.com",
    nodeId: "0x8C",
    status: "Lead Designer",
    cardStatus: "PRIMARY",
    bio: "Concept work across Pork pointing, Pond logo, and More Swaps More Drops. Leads layout and composition print processes.",
    twitter: "@mrsmedoteth",
    isOnline: 1,
    royaltyTier: "Level 3 — Certified Meme Classic (culture locked)",
    payoutInfo: "$3.00 / shirt payout",
    role: "creator",
    createdAt: new Date().toISOString()
  },
  {
    id: "redacted",
    name: "Redacted",
    email: "redacted@memeticexe.com",
    nodeId: "0x7F",
    status: "Design Node",
    cardStatus: "ACTIVE",
    bio: "A collaborative community project focused on funny, redacted text designs.",
    twitter: "@memeticexe",
    isOnline: 1,
    royaltyTier: "Level 2 — Fan Favorite (community approved)",
    payoutInfo: "$2.00 / shirt payout",
    role: "creator",
    createdAt: new Date().toISOString()
  },
  {
    id: "kingsam",
    name: "KingSam",
    email: "kingsam@memeticexe.com",
    nodeId: "0xA3",
    status: "Creator",
    cardStatus: "ACTIVE",
    bio: "Graphic artist and community coordinator. Cap and sticker designer.",
    twitter: "@kingsam",
    isOnline: 0,
    royaltyTier: "Level 1 — New Drop (fresh payload)",
    payoutInfo: "$1.00 / shirt payout",
    role: "creator",
    createdAt: new Date().toISOString()
  },
  {
    id: "lilpork",
    name: "LILPORK",
    email: "lilpork@memeticexe.com",
    nodeId: "0xF2",
    status: "Creator",
    cardStatus: "ACTIVE",
    bio: "Digital artist making cool character illustrations and funny meme designs.",
    twitter: "@lilpork",
    isOnline: 1,
    royaltyTier: "Level 1 — New Drop (fresh payload)",
    payoutInfo: "$1.00 / shirt payout",
    role: "creator",
    createdAt: new Date().toISOString()
  },
  {
    id: "dolo",
    name: "Dolo",
    email: "dolo@memeticexe.com",
    nodeId: "0xE7",
    status: "Creator",
    cardStatus: "STANDBY",
    bio: "Meme creator and community helper. Building cool merch concepts.",
    twitter: "@dolodoteth",
    isOnline: 0,
    royaltyTier: "Level 1 — New Drop (fresh payload)",
    payoutInfo: "$1.00 / shirt payout",
    role: "creator",
    createdAt: new Date().toISOString()
  },
  {
    id: "admin",
    name: "System Admin",
    email: "admin@memeticexe.com",
    nodeId: "0x00",
    status: "Kernel Admin",
    cardStatus: "PRIMARY",
    bio: "System Administrator for memetic.exe reviews and configurations.",
    twitter: "@memeticexe",
    isOnline: 1,
    royaltyTier: "N/A",
    payoutInfo: "N/A",
    role: "admin",
    createdAt: new Date().toISOString()
  }
];

async function seed() {
  console.log("Seeding database...");
  try {
    for (const creator of initialCreators) {
      await db.insert(creators).values(creator).onConflictDoNothing();
      console.log(`Seeded: ${creator.name}`);
    }
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
