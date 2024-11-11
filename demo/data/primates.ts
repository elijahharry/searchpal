import { cdn } from "./cdn";

const Classifications = {
  ape: ["great", "lesser"],
  monkey: ["new world", "old world"],
} as const;
type Classifications = typeof Classifications;

export type Family = keyof Classifications;

export type Classification = {
  [F in Family]: {
    family: F;
    genera: Classifications[F][number];
  };
}[Family];

const Status = ["ce", "e", "v", "lc"] as const;

export type Status = (typeof Status)[number];

// export const s

type BasePrimate = Classification & {
  name: string;
  wiki: string;
  description: string;
  habitat: string;
  diet: string;
  foods: string[];
  status: Status;
};

export type Primate<Image = string> = BasePrimate & {
  id: string;
  image: Image;
};

const jpg = (src: string) => cdn("primates", src + ".jpg");

export const primates: Primate[] = [
  {
    family: "ape",
    genera: "great",
    id: "orangutan",
    image: jpg("orangutan"),
    name: "Orangutan",
    wiki: "https://en.wikipedia.org/wiki/Orangutan",
    description:
      "Highly intelligent, solitary apes known for their long arms and red fur, with behaviors that show advanced problem-solving and tool use.",
    habitat: "Tropical rainforests of Borneo and Sumatra",
    diet: "omnivorous",
    foods: ["fruits", "leaves", "bark", "insects"],
    status: "ce",
  },
  {
    family: "ape",
    genera: "lesser",
    id: "hoolock_gibbon",
    image: jpg("hoolock_gibbon"),
    name: "Hoolock Gibbon",
    wiki: "https://en.wikipedia.org/wiki/Hoolock_gibbon",
    description:
      "Known for their impressive vocalizations, the hoolock gibbon uses complex calls to locate family members and defend territory.",
    habitat: "Tropical forests of Northeast India, Bangladesh, and Myanmar",
    diet: "omnivorous",
    foods: ["fruits", "leaves", "flowers", "insects"],
    status: "e",
  },
  {
    family: "ape",
    genera: "lesser",
    id: "siamang_gibbon",
    image: jpg("siamang_gibbon"),
    name: "Siamang Gibbon",
    wiki: "https://en.wikipedia.org/wiki/Siamang",
    description:
      "The largest of the gibbons, siamangs are distinguished by a throat sac used to amplify their calls, creating loud, resonant sounds.",
    habitat: "Tropical rainforests of Sumatra and the Malay Peninsula",
    diet: "omnivorous",
    foods: ["fruits", "leaves", "flowers", "insects"],
    status: "e",
  },
  {
    family: "ape",
    genera: "lesser",
    id: "lar_gibbon",
    image: jpg("lar_gibbon"),
    name: "Lar Gibbon",
    wiki: "https://en.wikipedia.org/wiki/Lar_gibbon",
    description:
      "Known for their agility and brachiation, lar gibbons are skilled climbers that live in small family groups.",
    habitat: "Tropical forests of Southeast Asia",
    diet: "omnivorous",
    foods: ["fruits", "leaves", "flowers", "insects"],
    status: "e",
  },
  {
    family: "ape",
    genera: "great",
    id: "gorilla",
    image: jpg("gorilla"),
    name: "Gorilla",
    wiki: "https://en.wikipedia.org/wiki/Gorilla",
    description:
      "Herbivorous, ground-dwelling apes that are the largest of all primates. They're pretty chill, so don't be intimidated by their size.",
    habitat: "Tropical forests of equatorial Africa",
    diet: "herbivorous",
    foods: ["leaves", "stems", "bamboo shoots", "fruit"],
    status: "e",
  },
  {
    family: "ape",
    genera: "great",
    id: "chimpanzee",
    image: jpg("chimpanzee"),
    name: "Chimpanzee",
    wiki: "https://en.wikipedia.org/wiki/Chimpanzee",
    description:
      "Highly social, intelligent apes known for their tool use and complex social structures. They are our closest living relatives.",
    habitat: "Tropical forests and savannas of central and western Africa",
    diet: "omnivorous",
    foods: ["fruits", "leaves", "insects", "small mammals"],
    status: "e",
  },
  {
    family: "ape",
    genera: "great",
    id: "bonobo",
    image: jpg("bonobo"),
    name: "Bonobo",
    wiki: "https://en.wikipedia.org/wiki/Bonobo",
    description:
      "Known for their peaceful, matriarchal societies, bonobos are highly intelligent and closely related to chimpanzees and humans.",
    habitat: "Rainforests of the Congo Basin in Central Africa",
    diet: "omnivorous",
    foods: ["fruits", "leaves", "seeds", "small invertebrates"],
    status: "e",
  },

  {
    family: "monkey",
    genera: "new world",
    id: "capuchin",
    image: jpg("capuchin"),
    name: "Capuchin Monkey",
    wiki: "https://en.wikipedia.org/wiki/Capuchin_monkey",
    description:
      "Known for their intelligence and use of tools, capuchins are small, agile monkeys that often live in social groups.",
    habitat: "Tropical rainforests of Central and South America",
    diet: "omnivorous",
    foods: ["fruits", "nuts", "seeds", "insects", "small vertebrates"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "new world",
    id: "howler",
    image: jpg("howler"),
    name: "Howler Monkey",
    wiki: "https://en.wikipedia.org/wiki/Howler_monkey",
    description:
      "Named for their loud calls, howler monkeys are social primates with long, prehensile tails used for grasping branches.",
    habitat: "Tropical forests of Central and South America",
    diet: "herbivorous",
    foods: ["leaves", "fruits", "flowers"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "old world",
    id: "baboon",
    image: jpg("baboon"),
    name: "Baboon",
    wiki: "https://en.wikipedia.org/wiki/Baboon",
    description:
      "Highly social primates with complex social hierarchies, bipedal walking capabilities, and strong adaptability to diverse environments.",
    habitat: "Savannas, forests, and semi-arid regions of Africa and Arabia",
    diet: "omnivorous",
    foods: ["fruits", "insects", "small mammals", "roots"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "old world",
    id: "macaque",
    image: jpg("macaque"),
    name: "Macaque",
    wiki: "https://en.wikipedia.org/wiki/Macaque",
    description:
      "One of the most widespread primate species, macaques are adaptable and social, found across various environments from cities to forests.",
    habitat:
      "Forests, grasslands, and urban areas across Asia and North Africa",
    diet: "omnivorous",
    foods: ["fruits", "seeds", "leaves", "small animals"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "old world",
    id: "colobus",
    image: jpg("colobus"),
    name: "Colobus Monkey",
    wiki: "https://en.wikipedia.org/wiki/Colobus_monkey",
    description:
      "Known for their unique, leaf-based diet and specialized digestive systems, colobus monkeys are arboreal and live in social groups.",
    habitat: "Forests of Central and East Africa",
    diet: "herbivorous",
    foods: ["leaves", "flowers", "fruits"],
    status: "lc",
  },

  {
    family: "monkey",
    genera: "new world",
    id: "spider_monkey",
    image: jpg("spider_monkey"),
    name: "Spider Monkey",
    wiki: "https://en.wikipedia.org/wiki/Spider_monkey",
    description:
      "Agile monkeys with long limbs and prehensile tails, spider monkeys are known for their brachiation and preference for high canopies.",
    habitat: "Tropical forests of Central and South America",
    diet: "omnivorous",
    foods: ["fruits", "flowers", "seeds", "leaves"],
    status: "e",
  },
  {
    family: "monkey",
    genera: "new world",
    id: "squirrel_monkey",
    image: jpg("squirrel_monkey"),
    name: "Squirrel Monkey",
    wiki: "https://en.wikipedia.org/wiki/Squirrel_monkey",
    description:
      "Small, highly active monkeys that live in large social groups and are known for their curious and playful nature.",
    habitat: "Tropical forests of Central and South America",
    diet: "omnivorous",
    foods: ["fruits", "insects", "flowers", "small vertebrates"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "old world",
    id: "mandrill",
    image: jpg("mandrill"),
    name: "Mandrill",
    wiki: "https://en.wikipedia.org/wiki/Mandrill",
    description:
      "Recognizable by their colorful faces and strong social structures, mandrills are among the largest of the monkey species.",
    habitat: "Tropical rainforests of Central Africa",
    diet: "omnivorous",
    foods: ["fruits", "insects", "roots", "small mammals"],
    status: "v",
  },
  {
    family: "monkey",
    genera: "old world",
    id: "langur",
    image: jpg("langur"),
    name: "Gray Langur",
    wiki: "https://en.wikipedia.org/wiki/Gray_langur",
    description:
      "Also known as the Hanuman langur, these monkeys are revered in some cultures and known for their long tails and gray fur.",
    habitat: "Forests, grasslands, and urban areas in South Asia",
    diet: "herbivorous",
    foods: ["leaves", "fruits", "flowers", "seeds"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "old world",
    id: "proboscis",
    image: jpg("proboscis"),
    name: "Proboscis Monkey",
    wiki: "https://en.wikipedia.org/wiki/Proboscis_monkey",
    description:
      "Known for their large noses and pot-bellied appearance, proboscis monkeys are strong swimmers and live near rivers and mangroves.",
    habitat: "Mangrove forests and riverine forests of Borneo",
    diet: "herbivorous",
    foods: ["leaves", "fruits", "seeds"],
    status: "e",
  },
  {
    family: "monkey",
    genera: "old world",
    id: "rhesus_macaque",
    image: jpg("rhesus_macaque"),
    name: "Rhesus Macaque",
    wiki: "https://en.wikipedia.org/wiki/Rhesus_macaque",
    description:
      "Highly adaptable and widespread, rhesus macaques are known for their intelligence and are often used in medical research.",
    habitat: "Various habitats across South, Central, and Southeast Asia",
    diet: "omnivorous",
    foods: ["fruits", "seeds", "roots", "insects", "small animals"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "old world",
    id: "snub_nosed_monkey",
    image: jpg("snub_nosed_monkey"),
    name: "Snub-Nosed Monkey",
    wiki: "https://en.wikipedia.org/wiki/Snub-nosed_monkey",
    description:
      "Known for their distinctive upturned noses, these monkeys live in high-altitude forests and endure cold climates.",
    habitat: "Mountain forests in Central and Southwest China",
    diet: "herbivorous",
    foods: ["leaves", "fruits", "flowers", "lichens"],
    status: "e",
  },
  {
    family: "monkey",
    genera: "new world",
    id: "emperor_tamarin",
    image: jpg("emperor_tamarin"),
    name: "Emperor Tamarin",
    wiki: "https://en.wikipedia.org/wiki/Emperor_tamarin",
    description:
      "Named for their long, white mustache resembling that of Emperor Wilhelm II, these small monkeys are social and agile.",
    habitat: "Tropical rainforests of the Amazon Basin",
    diet: "omnivorous",
    foods: ["fruits", "nectar", "insects", "small vertebrates"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "new world",
    id: "marmoset",
    image: jpg("marmoset"),
    name: "Common Marmoset",
    wiki: "https://en.wikipedia.org/wiki/Common_marmoset",
    description:
      "Small monkeys known for their claw-like nails and ability to jump between trees, marmosets often live in family groups.",
    habitat: "Tropical and subtropical forests of Brazil",
    diet: "omnivorous",
    foods: ["fruits", "gum", "insects", "small vertebrates"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "new world",
    id: "bald_uakari",
    image: jpg("bald_uakari"),
    name: "Bald Uakari",
    wiki: "https://en.wikipedia.org/wiki/Bald_uakari",
    description:
      "Recognizable by their red faces and short tails, these monkeys are adapted to seasonal flooding and primarily eat seeds and fruit.",
    habitat: "Flooded forests of the Amazon Basin",
    diet: "herbivorous",
    foods: ["seeds", "fruits", "flowers"],
    status: "v",
  },
  {
    family: "monkey",
    genera: "new world",
    id: "golden_lion_tamarin",
    image: jpg("golden_lion_tamarin"),
    name: "Golden Lion Tamarin",
    wiki: "https://en.wikipedia.org/wiki/Golden_lion_tamarin",
    description:
      "Known for their bright golden-orange fur, these small tamarins are highly social and are often active during the day.",
    habitat: "Coastal forests of Brazil",
    diet: "omnivorous",
    foods: ["fruits", "flowers", "nectar", "insects"],
    status: "e",
  },
  {
    family: "monkey",
    genera: "old world",
    id: "vervet_monkey",
    image: jpg("vervet_monkey"),
    name: "Vervet Monkey",
    wiki: "https://en.wikipedia.org/wiki/Vervet_monkey",
    description:
      "Vervet monkeys are adaptable primates known for their complex vocal communication and are commonly found near water sources.",
    habitat: "Savannas, forests, and riverine areas of Sub-Saharan Africa",
    diet: "omnivorous",
    foods: ["fruits", "leaves", "flowers", "insects"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "new world",
    id: "night_monkey",
    image: jpg("night_monkey"),
    name: "Night Monkey",
    wiki: "https://en.wikipedia.org/wiki/Night_monkey",
    description:
      "Also known as owl monkeys, they are the only nocturnal monkeys and have large eyes adapted for night vision.",
    habitat: "Tropical forests of Central and South America",
    diet: "omnivorous",
    foods: ["fruits", "leaves", "nectar", "insects"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "old world",
    id: "patas_monkey",
    image: jpg("patas_monkey"),
    name: "Patas Monkey",
    wiki: "https://en.wikipedia.org/wiki/Patas_monkey",
    description:
      "Known for their long limbs and remarkable speed, patas monkeys are among the fastest primates and live in open grasslands.",
    habitat: "Savannas and semi-arid regions of West and East Africa",
    diet: "omnivorous",
    foods: ["seeds", "fruits", "insects", "gum"],
    status: "lc",
  },
  {
    family: "monkey",
    genera: "old world",
    id: "gelada",
    image: jpg("gelada"),
    name: "Gelada",
    wiki: "https://en.wikipedia.org/wiki/Gelada",
    description:
      "Native to the Ethiopian Highlands, geladas are known as 'bleeding-heart' monkeys due to their unique red chest patches.",
    habitat: "Mountainous grasslands of Ethiopia",
    diet: "herbivorous",
    foods: ["grasses", "roots", "flowers"],
    status: "lc",
  },
];
