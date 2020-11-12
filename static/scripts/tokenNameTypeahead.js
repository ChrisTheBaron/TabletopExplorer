let monsters = [
    "Aarakocra simulacrum",
    "Aarakocra",
    "Abjurer",
    "Aboleth",
    "Abyssal chicken",
    "Acererak",
    "Acolyte",
    "Aeorian hunter",
    "Ahmaergo",
    "Air elemental",
    "Alastrah",
    "Albino dwarf",
    "Aldani (lobsterfolk)",
    "Alexei Holstmann",
    "Allip",
    "Allosaurus",
    "Almiraj",
    "Amble",
    "Ambush drake",
    "Ammalia Cassalanter",
    "Amphisbaena (Theros)",
    "Amphisbaena",
    "Amrik Vanthampur",
    "Anarch",
    "Anchorite of Talos",
    "Angel",
    "Animated Armor",
    "Animated jade serpent",
    "Animated table",
    "Animated tile creature",
    "Animated tree",
    "Ankheg",
    "Ankylosaurus",
    "Anointed",
    "Anvilwroughts",
    "Ape",
    "Apprentice wizard",
    "Archdruid",
    "Archer",
    "Archmage",
    "Archon mounts",
    "Arclight phoenix",
    "Arkhan the Cruel",
    "Arrester",
    "Artifact creature",
    "Artus Cimber",
    "Asharra",
    "Assassin bug",
    "Assassin vine",
    "Assassin",
    "Assemblage of rusty steel",
    "Astral dreadnought",
    "Atropal",
    "Attendant",
    "Aurelia",
    "Aurinax",
    "Aurochs",
    "Auspicia Dran",
    "Avatar of death",
    "Avatars",
    "Awakened shrub",
    "Awakened tree",
    "Awakened zurkhwood",
    "Axe beak",
    "Azbara Jos",
    "Azer",
    "Baba Lysaga",
    "Baboon",
    "Badger",
    "Balhannoth",
    "Banderhobb",
    "Bandit captain",
    "Bandit",
    "Banshee",
    "Barbatos",
    "Bard",
    "Barghest",
    "Barnibus Blastwind",
    "Barovian witch",
    "Basilisk (Theros)",
    "Basilisk",
    "Bat",
    "Batterboar",
    "Batterboar, huge batterboar",
    "Behir",
    "Beholder",
    "Bel",
    "Belaphoss",
    "Benthid",
    "Berbalang",
    "Berserker",
    "Biomancer",
    "Black Earth cultist",
    "Black Pudding",
    "Black Viper",
    "Black bear",
    "Black dragon",
    "Black dragon, adult",
    "Black dragon, ancient",
    "Black dragon, young",
    "Black dragon wyrmling",
    "Blackguard",
    "Blagothkus",
    "Blastseeker",
    "Blight keepers",
    "Blight",
    "Blindheim",
    "Blink dog",
    "Blood hawk",
    "Blood hunter",
    "Blood witch",
    "Blue dragon",
    "Blue dragon, adult",
    "Blue dragon, ancient",
    "Blue dragon, young",
    "Blue dragon wyrmling",
    "Boar",
    "Bodak",
    "Boggle",
    "Bol'bara",
    "Bone knight",
    "Bone whelk",
    "Boneclaw",
    "Borborygmos",
    "Brahma Lutier",
    "Brain in a jar",
    "Brains in iron",
    "Brass dragon",
    "Brass dragon, adult",
    "Brass dragon, ancient",
    "Brass dragon, young",
    "Brass dragon wyrmling",
    "Bridesmaid of Zuggtmoy",
    "Brontosaurus",
    "Bronze dragon",
    "Bronze dragon, adult",
    "Bronze dragon, ancient",
    "Bronze dragon, young",
    "Bronze dragon wyrmling",
    "Brown bear",
    "Bryn Lightfingers",
    "Bugbear",
    "Bulette",
    "Bullywug",
    "Bullywug croaker",
    "Bullywug royal",
    "Cadaver collector",
    "Cambion",
    "Camel",
    "Captain Othelstan",
    "Carlyle",
    "Carrion crawler",
    "Cat",
    "Catoblepas (Theros)",
    "Catoblepas",
    "Cattle",
    "Caustic crawler",
    "Cave bear",
    "Cave bear cub",
    "Cave fisher",
    "Centaur mummy",
    "Centaur",
    "Cerberus",
    "Cerodons",
    "Chamberlain of Zuggtmoy",
    "Champion",
    "Changeling",
    "Chaos quadrapod",
    "Chemister",
    "Chimera",
    "Chimera, Theran chimera",
    "Chitin",
    "Choker",
    "Chromatic dragons",
    "Chupacabra",
    "Chuul",
    "Chwinga",
    "Cinderhild",
    "Claugiyliamatar",
    "Clawfoot",
    "Clay gladiator",
    "Clay golem",
    "Cloaker",
    "Clockwork behir",
    "Clockwork dragon",
    "Clockwork kraken",
    "Clockwork mule",
    "Clockworks",
    "Clockworks, bronze scout",
    "Clockworks, iron cobra",
    "Clockworks, oaken bolter",
    "Clockworks, stone defender",
    "Cloud giant",
    "Coatls",
    "Cockatrice",
    "Cockatrice, undead cockatrice",
    "Colossus of Akros",
    "Commoner",
    "Conclave dryad",
    "Conjurer",
    "Constrictor snake",
    "Copper dragon",
    "Copper dragon, adult",
    "Copper dragon, ancient",
    "Copper dragon, young",
    "Copper dragon wyrmling",
    "Core spawn",
    "Corpse flower",
    "Couatl",
    "Countess Sansuri",
    "Crab folk",
    "Crab",
    "Crag cat",
    "Cranium rats",
    "Crawling claw",
    "Creepy doll",
    "Crocodile",
    "Crocodile, two-headed crocodile",
    "Crokek'toeck",
    "Crushing Wave cultist",
    "Cult fanatic",
    "Cultist of the Dead Three",
    "Cultist",
    "Cults of madness",
    "Cyclops (Theros)",
    "Cyclops",
    "Daelkyr",
    "Daelkyr, Belashyrra",
    "Daelkyr, Dyrrn",
    "Damned wretch",
    "Darkling",
    "Darkmantle",
    "Deadbridge goliath beetle",
    "Death dog",
    "Death knight",
    "Deathlock",
    "Decapus",
    "Decapus, marine decapus",
    "Deep crow",
    "Deep crow, ancient deep crow",
    "Deep scion",
    "Deer",
    "Deinonychus",
    "Demilich",
    "Demogorgon",
    "Demon cults",
    "Demon, Balor",
    "Demon, Dretch",
    "Demon, Glabrezu",
    "Demon, Hezrou",
    "Demon, Marilith",
    "Demon, Nalfeshnee",
    "Demon, Quasit",
    "Demon, Vrock",
    "Demons",
    "Derro",
    "Derro, derro savant",
    "Devil",
    "Devil, Barbed",
    "Devil, Bearded",
    "Devil, Bone",
    "Devil, Chain",
    "Devil, Erinyes",
    "Devil, Horned",
    "Devil, Ice",
    "Devil, Imp",
    "Devil, Lemure",
    "Devil, Pit Fiend",
    "Devkarin lich",
    "Devourer",
    "Dimetrodon",
    "Dinosaurs",
    "Dire corby",
    "Dire wolf",
    "Dirt-Under-Nails",
    "Displacer beast",
    "Diviner",
    "Dolgaunt",
    "Dolgrim",
    "Dolphin",
    "Don-Jon Raskin",
    "Donaar Blit'zen",
    "Doom Raider",
    "Doppelganger",
    "Dracolich",
    "Draegloth",
    "Draft horse",
    "Dragon Turtle",
    "Dragon automaton",
    "Dragon rat",
    "Dragon turtle",
    "Dragon, Black",
    "Dragon, Blue",
    "Dragon, Brass",
    "Dragon, Bronze",
    "Dragon, Copper",
    "Dragon, Gold",
    "Dragon, Green",
    "Dragon, Red",
    "Dragon, Silver",
    "Dragon, White",
    "Dragonbait",
    "Dragonclaw",
    "Dragonfang",
    "Dragons",
    "Dragonsoul",
    "Dragonwing",
    "Drake",
    "Dralmorrer Borngray",
    "Drannin Splithelm",
    "Dread warrior",
    "Drider",
    "Droki",
    "Drow elf",
    "Drowned ascetic",
    "Drowned assassin",
    "Drowned blade",
    "Drowned master",
    "Druid of the Old Ways",
    "Druid",
    "Dryad",
    "Dryads (Ixalan)",
    "Duergar",
    "Duke Thalamra Vanthampur",
    "Durnan",
    "Dusk hag",
    "Dusthawk",
    "Eagle",
    "Earth elemental",
    "Eblis",
    "Eidolon",
    "Eigeron",
    "Eladrin",
    "Elder elemental",
    "Eldrazi",
    "Elemental myrmidon",
    "Elemental, Air",
    "Elemental, Earth",
    "Elemental, Fire",
    "Elemental, Water",
    "Elementals",
    "Elephant",
    "Elf, Drow",
    "Elk",
    "Empyrean",
    "Enchanter",
    "Erstwhile",
    "Eternal Flame cultist",
    "Eternals",
    "Ettercap",
    "Ettin",
    "Evil mage",
    "Evoker",
    "Eye of fear and flame",
    "Ezmerelda d'Avenir",
    "Faerie dragon",
    "Falcon the Hunter",
    "Fastieth",
    "Felidar",
    "Felidar, winged felidar",
    "Fhenimore (kraken priest variant)",
    "Fiendish flesh golem",
    "Fire elemental",
    "Fire giant",
    "Firefist",
    "Firenewts",
    "Firenewts, firenewt warlock of Imix",
    "Firenewts, firenewt warrior",
    "Flabbergast",
    "Flail snail",
    "Flame-kin",
    "Flameskull",
    "Fleecemane lion",
    "Flesh golem",
    "Floon Blagmaar",
    "Flumph",
    "Flying Sword",
    "Flying monkey",
    "Flying snake",
    "Fog giant",
    "Fomorian",
    "Forlarren",
    "Frog",
    "Froghemoth",
    "Frontline medic",
    "Frost giant",
    "Frost worm",
    "Frulam Mondath",
    "Fungi",
    "Fungi, gas spore",
    "Fungi, shrieker",
    "Fungi, violet fungus",
    "Fungus drudge",
    "Galeb duhr",
    "Gargoyle",
    "Gargoyle, giant four-armed gargoyle",
    "Garret Levistusson",
    "Gearkeeper construct",
    "Geists (Innistrad)",
    "Gelatinous Cube",
    "Genie",
    "Genie, Djinni",
    "Genie, Efreeti",
    "Geonid",
    "Ghald",
    "Ghast",
    "Ghost",
    "Ghoul",
    "Giant ape",
    "Giant badger",
    "Giant bat",
    "Giant boar",
    "Giant centipede",
    "Giant constrictor snake",
    "Giant coral snake",
    "Giant crab",
    "Giant crayfish",
    "Giant crocodile",
    "Giant eagle",
    "Giant elk",
    "Giant fire beetle",
    "Giant fly",
    "Giant frog",
    "Giant frog, giant ice frogs",
    "Giant goat",
    "Giant hyena",
    "Giant ice toad",
    "Giant lightning eel",
    "Giant lizard",
    "Giant octopus",
    "Giant owl",
    "Giant poisonous snake",
    "Giant rat",
    "Giant rat, diseased giant rats",
    "Giant raven",
    "Giant scorpion",
    "Giant sea eel",
    "Giant sea horse",
    "Giant shark",
    "Giant skeleton",
    "Giant snapping turtle",
    "Giant spider",
    "Giant spider, ice spider",
    "Giant spider, ice spider queen",
    "Giant strider",
    "Giant subterranean lizard",
    "Giant toad",
    "Giant two-headed rat",
    "Giant vulture",
    "Giant wasp",
    "Giant weasel",
    "Giant white moray eel",
    "Giant wolf spider",
    "Giant",
    "Giant, Cloud",
    "Giant, Fire",
    "Giant, Frost",
    "Giant, Hill",
    "Giant, Stone",
    "Giant, Storm",
    "Gibbering Mouther",
    "Gibbering mouther",
    "Gideon Lightward",
    "Giff",
    "Girallon",
    "Gith",
    "Gladiator",
    "Glitterman",
    "Gloamwing",
    "Gloine Nathair-Nathair",
    "Gloomhunter bat",
    "Gloomstalker",
    "Gnoll",
    "Gnome cook",
    "Gnome toymaker",
    "Gnome",
    "Gnome, Deep",
    "Goat",
    "Goblin",
    "Gold dragon",
    "Gold dragon, adult",
    "Gold dragon, ancient",
    "Gold dragon, young",
    "Gold dragon wyrmling",
    "Golem, Clay",
    "Golem, Flesh",
    "Golem, Iron",
    "Golem, Stone",
    "Golems",
    "Golgari shaman",
    "Gomazoa",
    "Gorgon",
    "Gorthok the Thunder Boar",
    "Grand Master",
    "Grandfather Oak",
    "Grave Robber",
    "Gray Ooze",
    "Gray render",
    "Green dragon",
    "Green dragon, adult",
    "Green dragon, ancient",
    "Green dragon, young",
    "Green dragon wyrmling",
    "Grell",
    "Gremlin (Kaladesh)",
    "Grick",
    "Grick alpha",
    "Griffon Cavalry rider",
    "Griffon",
    "Grillig",
    "Grimlock",
    "Grisha",
    "Gronk",
    "Grumink the Renegade",
    "Grung",
    "Guard drake",
    "Guard",
    "Guardian wolf",
    "Hadrosaurus",
    "Hag, Green",
    "Hag, Night",
    "Hag, Sea",
    "Hags",
    "Halaster Blackcloak",
    "Half-Red Dragon Veteran",
    "Half-dragon",
    "Harpy matriarch",
    "Harpy",
    "Harshnag",
    "Havoc orb",
    "Hawk (falcon)",
    "Heartstabber mosquito",
    "Hedron constructs",
    "Hell Hound",
    "Hell hound",
    "Hellions",
    "Hellwasp",
    "Helmed horror",
    "Herbalist",
    "Hill giant",
    "Hippocamp",
    "Hippogriff",
    "Hippopotamus",
    "Hlam",
    "Hobgoblin",
    "Hollyphant",
    "Homarid",
    "Hommet Shaw",
    "Homunculus",
    "Hook horror",
    "Hoplite",
    "Horizonback tortoise",
    "Horncaller",
    "Horned frogs",
    "Horrors",
    "Horrors, flying horror",
    "Horrors, shadow horror",
    "Horrors, skittering horror",
    "Howler",
    "Howling Hatred cultist",
    "Hrabbaz",
    "Hulking crab",
    "Hunter shark",
    "Husk zombie bursters",
    "Husk zombie",
    "Hydra",
    "Hyena",
    "Ice toad",
    "Illusionist",
    "Illydia Maethellyn",
    "Immured one",
    "Indentured spirit",
    "Inspired",
    "Intellect devourer",
    "Invisible Stalker",
    "Invisible stalker",
    "Iron golem",
    "Isperia",
    "Ixitxachitl",
    "Iymrith the Dragon",
    "Izek Strazni",
    "Izzet weird",
    "Jackal",
    "Jackalwere",
    "Jaculi",
    "Jalester Silvermane",
    "Jamna Gleamsilver",
    "Jarad Vod Savo",
    "Jarhild Stoneforge",
    "Jarl Storvald",
    "Jarlaxle Baenre",
    "Jermlaine",
    "Jim Darkmagic",
    "K'thriss Drow'b",
    "Kaaltar",
    "Kalashtar",
    "Kalka-Kylla",
    "Kamadan",
    "Karrnathi undead soldier",
    "Kasimir Velikov",
    "Kavu predator",
    "Kavu",
    "Kavu, Steel Leaf kavu",
    "Keg robot",
    "Kelpie",
    "Kenku",
    "Khargra",
    "Ki-rin",
    "Killer whale",
    "Killmoulis",
    "King of Feathers",
    "Klauth",
    "Knight",
    "Koalinth sergeant",
    "Koalinth",
    "Kobold",
    "Korred",
    "Kostchtchie",
    "Kraken (Theros)",
    "Kraken (Theros), nadir krakens",
    "Kraken priest",
    "Kraken",
    "Kraken, juvenile kraken",
    "Kraken, malformed kraken",
    "Kraken, young kraken",
    "Krakens (Zendikar)",
    "Krasis",
    "Kraul death priest",
    "Kraul warrior",
    "Kraul",
    "Kraul, winged kraul warrior",
    "Krenko",
    "Krull",
    "Kruthik",
    "Kuo-toa archpriest",
    "Kuo-toa monitor",
    "Kuo-toa whip",
    "Kuo-toa",
    "Kuo-toa, kuo-toa",
    "Kysh (triton)",
    "Lady Illmarrow",
    "Laeral Silverhand",
    "Lamia (Theros)",
    "Lamia",
    "Langdedrosa Cyanwrath",
    "Larethar Gulgrin",
    "Larva",
    "Lava child",
    "Lawmage",
    "Lazav",
    "Leonin iconoclast",
    "Leonin",
    "Leucrotta",
    "Liara Portyr",
    "Lich",
    "Liches (Innistrad)",
    "Lion",
    "Living iron statue",
    "Living spell",
    "Lizard",
    "Lizardfolk commoner",
    "Lizardfolk render",
    "Lizardfolk scaleshield",
    "Lizardfolk shaman",
    "Lizardfolk subchief",
    "Lizardfolk",
    "Lizardfolk, lizard king/queen",
    "Loading rig",
    "Locathah hunter",
    "Locathah",
    "Lord Kallinor",
    "Lord of Blades",
    "Lycanthrope",
    "Lycanthropickle",
    "Lynx Creatlach",
    "Maaka",
    "Macaws",
    "Madam Eva",
    "Maegera the Dawn Titan",
    "Mage",
    "Magewright",
    "Magical tome",
    "Magmin",
    "Mahadi the Rakshasa",
    "Mammoth",
    "Manshoon simulacrum",
    "Manshoon",
    "Manticore",
    "Manticore, heart-piercer manticore",
    "Mantrap",
    "Manufacturing arm",
    "Martial arts adept",
    "Marut",
    "Mary Greymalkin",
    "Master thief",
    "Mastiff",
    "Maw of Sekolah",
    "Meazel",
    "Mechachimera",
    "Medusa (Theros)",
    "Medusa",
    "Meenlock",
    "Meeseeks",
    "Meloon Wardragon",
    "Mephit",
    "Mephit, Dust",
    "Mephit, Ice",
    "Mephit, Magma",
    "Mephit, Steam",
    "Merfolk (Ravnica)",
    "Merfolk scavenger",
    "Merfolk",
    "Merrow shallowpriest",
    "Merrow",
    "Metallic dragon",
    "Mimic",
    "Mimic, large mimic",
    "Mind flayer",
    "Mind mage",
    "Mindwitness",
    "Miniature giant space hamster",
    "Minion",
    "Minotaur living crystal statue",
    "Minotaur",
    "Mirt",
    "Mite",
    "Modron",
    "Moghadam",
    "Molvano",
    "Mongrelfolk",
    "Moorbounder",
    "Mordakhesh",
    "Morkoth",
    "Mormesk the Wraith",
    "Mortlock Vanthampur",
    "Mossback Steward",
    "Mr. Dory",
    "Muiral",
    "Mule",
    "Mummies",
    "Mummies, mummy lord",
    "Mummies, mummy",
    "Mummy (Amonkhet)",
    "Mummy Lord",
    "Mummy lord (Amonkhet)",
    "Mummy",
    "Mwaxanar�",
    "Myconids",
    "Mythic monsters",
    "M�rg�n",
    "Naergoth Bladelord",
    "Naga, Guardian",
    "Naga, Spirit",
    "Nagas",
    "Nagas, bone naga",
    "Nagas, guardian naga",
    "Nagas, spirit naga",
    "Nagpa",
    "Nar'l Xibrindas",
    "Narrak",
    "Nature elemental, huge nature elemental",
    "Nature elemental, small nature elemental",
    "Necro-alchemists",
    "Necromancer",
    "Needlefolk",
    "Neogi hatchling",
    "Neogi master",
    "Neogi",
    "Neogi, neogi",
    "Neothelid",
    "Nereid",
    "Nergaliid (devil toad)",
    "Neronvain",
    "Nezznar the Black Spider",
    "Nicholas's sleigh reindeer",
    "Night hag (Theros)",
    "Nightmare",
    "Nightshade (Skullport)",
    "Nightveil specter",
    "Nightwalker",
    "Nihiloor",
    "Nilbog",
    "Nimblewright",
    "Nine-Fingers Keene",
    "Niv-Mizzet",
    "Nivix cyclops",
    "Noble",
    "Norker war leader",
    "Norker",
    "Noska Ur'gray",
    "Nothic",
    "Nymphs (Theros)",
    "Nyx-fleece ram",
    "Nyxborn lynx",
    "Nyxborn",
    "Oak Truestrike",
    "Oblex",
    "Obzedat ghost",
    "Oceanus (sea elf)",
    "Ochre Jelly",
    "Octopus",
    "Ogre Zombie",
    "Ogre",
    "Omin Dran",
    "Oni",
    "Ooze Master",
    "Ooze",
    "Ooze-folk",
    "Oracle",
    "Orc",
    "Oreioth",
    "Orok",
    "Orond Gralhund",
    "Orzhov spirit",
    "Osvaldo Cassalanter",
    "Ott Steeltoes",
    "Otyugh",
    "Otyugh, neo-otyugh",
    "Overlords",
    "Overlords, Rak Tulkhesh",
    "Overlords, Sul Khatesh",
    "Owl",
    "Owlbear",
    "Owlbear, two-headed owlbear",
    "Pack beast",
    "Panther",
    "Parrots",
    "Pegasus",
    "Pendragon Beestinger",
    "Peryton",
    "Peryton, monstrous peryton",
    "Phantom warrior",
    "Pharblex Spattergoo",
    "Phase spider",
    "Phoenix Anvil",
    "Phylaskia",
    "Pidlwick II",
    "Piercer",
    "Pig",
    "Piranha beetles",
    "Piranhas",
    "Pirate bosun",
    "Pirate captain",
    "Pirate deck wizard",
    "Pirate first mate",
    "Pirate",
    "Pixelated guards",
    "Pixelated",
    "Pixie",
    "Plesiosaurus",
    "Poisonous snake",
    "Polar bear",
    "Pony",
    "Portentia Dran",
    "Precognitive mage",
    "Priest",
    "Princes of Elemental Evil",
    "Pseudodragon",
    "Pseudodragon familiar",
    "Pterafolk",
    "Pteranodon",
    "Pudding King",
    "Purple Worm",
    "Purple worm",
    "Purple wormling",
    "Quaggoth thonot",
    "Quaggoth",
    "Quetzalcoatlus",
    "Quickling",
    "Quipper",
    "Quori",
    "Radiant idol",
    "Ragebeast",
    "Rahadin",
    "Rakdos lampooner",
    "Rakdos performer",
    "Rakdos",
    "Rakshasa",
    "Rakshasa, zakya rakshasa",
    "Ras Nsi",
    "Rat",
    "Ratchet faerie",
    "Rath Modar",
    "Raven",
    "Reckoner",
    "Red dragon",
    "Red dragon, adult",
    "Red dragon, ancient",
    "Red dragon, young",
    "Red dragon wyrmling",
    "Red ogre automaton",
    "Redbrand ruffian",
    "Redcap",
    "Redcap, madcaps",
    "Reef shark",
    "Remallia Haventree",
    "Remorhaz",
    "Remorhazes",
    "Remorhazes, remorhaz",
    "Remorhazes, young remorhaz",
    "Renaer Neverember",
    "Replica modrons",
    "Retriever",
    "Returned drifter",
    "Returned kakomantis",
    "Returned palamnite",
    "Returned sentry",
    "Returned",
    "Revenant",
    "Rezmir",
    "Rhinoceros",
    "Rictavio",
    "Riding horse",
    "Rilsa Rael",
    "Rip Tide priest",
    "River serpents",
    "Roc",
    "Roper",
    "Rosie Beestinger",
    "Rotter",
    "Rubblebelt stalker",
    "Rug of Smothering",
    "Rust Monster",
    "Rust monster",
    "Saber-toothed tiger",
    "Saeth Cromley",
    "Sahuagin baron",
    "Sahuagin blademaster",
    "Sahuagin champion",
    "Sahuagin coral smasher",
    "Sahuagin deep diver",
    "Sahuagin hatchling swarm",
    "Sahuagin high priestess",
    "Sahuagin priestess",
    "Sahuagin warlock of Uk'otoa",
    "Sahuagin wave shaper",
    "Sahuagin",
    "Sailor boss",
    "Sailors",
    "Salamander",
    "Sanbalet",
    "Sandwurm",
    "Satyr",
    "Scaladar",
    "Scarecrow",
    "Scorchbringer guard",
    "Scorpion",
    "Scout",
    "Screaming devilkin",
    "Scribe",
    "Sea elf",
    "Sea fury",
    "Sea horse",
    "Sea lion",
    "Sea lion (monstrosity)",
    "Sea spawn",
    "Serpopard",
    "Serra angels",
    "Severin",
    "Shadar-kai",
    "Shades (Zendikar)",
    "Shadow assassin",
    "Shadow dragon",
    "Shadow mastiff",
    "Shadow mastiff alpha",
    "Shadow",
    "Shadowghast",
    "Shadowy duplicate",
    "Shambling Mound",
    "Shambling mound",
    "Shark hunters",
    "Sharkbody abominations",
    "Sharwyn Hucrele",
    "Sheep",
    "Shell shark",
    "Shield Guardian",
    "Shield guardian",
    "Shifter",
    "Shoal serpent",
    "Shoalar Quaderil",
    "Shrieker",
    "Sildar Hallwinter",
    "Silver dragon",
    "Silver dragon, adult",
    "Silver dragon, ancient",
    "Silver dragon, young",
    "Silver dragon wyrmling",
    "Simic hybrid",
    "Sir Braford",
    "Sir Ursas",
    "Siren",
    "Skaabs",
    "Skaberen",
    "Skein spider",
    "Skeletal alchemist",
    "Skeletal horse",
    "Skeletal juggernaut",
    "Skeletal swarm",
    "Skeleton key",
    "Skeleton",
    "Skeleton, Minotaur",
    "Skeleton, Warhorse",
    "Sken Zabriss",
    "Skittering heartstoppers",
    "Skulk",
    "Skull lord",
    "Skull lord, super skull lord",
    "Skum",
    "Sky leviathan",
    "Sky whale",
    "Skyjek roc",
    "Skyswimmer",
    "Slaadi",
    "Slarkrethel",
    "Slaughterstone eviscerator",
    "Slithering tracker",
    "Smiler the Defiler",
    "Snapdax, Apex of the Hunt",
    "Sohmien",
    "Soldier automaton",
    "Soldier",
    "Sorrowsworn",
    "Spawn of Kyuss",
    "Specter",
    "Specter, poltergeist",
    "Sphinx",
    "Sphinx, Androsphinx",
    "Sphinx, Gynosphinx",
    "Spider automaton",
    "Spider golem",
    "Spider shark",
    "Spider",
    "Spirits (Zendikar)",
    "Splugoth the Returned",
    "Sprite",
    "Spy",
    "Star spawn grue",
    "Star spawn hulk",
    "Star spawn larva mage",
    "Star spawn mangler",
    "Star spawn seer",
    "Star spawn",
    "Steeder",
    "Steel predator",
    "Steggins",
    "Stegosaurus",
    "Stirge",
    "Stone cursed",
    "Stone golem",
    "Stone guardians",
    "Stone juggernaut",
    "Storm giant quintessent",
    "Storm giant",
    "Strahd von Zarovich",
    "Strahd zombie",
    "Su-monster",
    "Subknock the Imp",
    "Succubus/Incubus",
    "Sunbirds",
    "Surrakar",
    "Swarm of bats",
    "Swarm of beetles",
    "Swarm of black gulls",
    "Swarm of centipedes",
    "Swarm of dragon rats",
    "Swarm of insects",
    "Swarm of piranhas",
    "Swarm of poisonous snakes",
    "Swarm of quippers",
    "Swarm of rats",
    "Swarm of ravens",
    "Swarm of rot grubs",
    "Swarm of spiders",
    "Swarm of undead snakes",
    "Swarm of wasps",
    "Swashbuckler",
    "Swavain basilisk",
    "Sword wraith commander",
    "Sword wraith warrior",
    "Sword wraith",
    "Sylgar",
    "Tabaxi hunter",
    "Tabaxi minstrel",
    "Tabaxi",
    "Talis the White",
    "Tarkanan assassin",
    "Tarrasque",
    "Tarul Var",
    "Technomantic construct",
    "Tecuziztecatl",
    "Terracotta warriors",
    "Terror of Undermountain",
    "Thavius Kreeg",
    "Thayan apprentice",
    "Thayan warrior",
    "Thessalar",
    "Thessalheart construct",
    "Thessalhydra",
    "Thessalkraken",
    "Thorn slinger",
    "Thorvin Twinbeard",
    "Thought spy",
    "Thousand Teeth",
    "Thri-kreen",
    "Thrulls",
    "Thrulls, servitor thrull",
    "Thrulls, winged thrull",
    "Thug",
    "Thullen",
    "Thurstwell Vanthampur",
    "Tiamat",
    "Tick Tock",
    "Tiger",
    "Tlincalli",
    "Tomb guardians",
    "Topi",
    "Torogar Steelfist",
    "Tortles",
    "Tortles, tortle druid",
    "Tortles, tortle",
    "Transmuter",
    "Trapper",
    "Traxigor",
    "Treant",
    "Trelon",
    "Tressym",
    "Tri-flower frond",
    "Tribal warrior",
    "Triceratops",
    "Tridents",
    "Trilobites",
    "Triton (Theros)",
    "Trog",
    "Troglodyte champion of Laogzed",
    "Troglodyte",
    "Troll",
    "Trostani",
    "Turlang",
    "Typhon",
    "Tyrannosaurus Rex",
    "Tyrannosaurus rex",
    "Udaak",
    "Ulder Ravengard",
    "Umber hulk",
    "Undead artists",
    "Undead guardian",
    "Undercity medusa",
    "Undying councilor",
    "Undying soldier",
    "Undying",
    "Unicorn (Theros)",
    "Unicorn",
    "Urstul Floxin",
    "Uthgardt shaman",
    "Vajra Safahr",
    "Valenar animal",
    "Vampire Spawn",
    "Vampire",
    "Vampiric jade statue",
    "Vampiric mist",
    "Vargouille",
    "Vegepygmy",
    "Velociraptor",
    "Veteran",
    "Viari",
    "Viashino",
    "Victoro Cassalanter",
    "Violet Fungus",
    "Virgil",
    "Vlaakith the Lich-Queen",
    "Vladimir Horngaard",
    "Volothamp \"Volo\" Geddarm",
    "Vox seeker",
    "Vulture",
    "Walking statue of Waterdeep",
    "Walnut Dankgrass",
    "War priest",
    "Warforged colossus",
    "Warforged soldier",
    "Warforged titan",
    "Warhorse",
    "Warlord",
    "Water elemental",
    "Water weird",
    "Weasel",
    "Werebear",
    "Wereboar",
    "Wererat",
    "Weretiger",
    "Werewolf",
    "Whazzit the Quasit",
    "White Maw",
    "White dragon",
    "White dragon, adult",
    "White dragon, ancient",
    "White dragon, young",
    "White dragon wyrmling",
    "Who Shall Never Fail",
    "Whymsee (kraken priest variant)",
    "Wiggan Nettlebee",
    "Wight",
    "Wildgrowth walker",
    "Will-o'-wisp",
    "Winter wolf",
    "Witches",
    "Withers",
    "Woe strider",
    "Wolf",
    "Wood woad",
    "Worg",
    "Wraith",
    "Wraiths (Zendikar)",
    "Wurm",
    "Wurmcaller",
    "Wyvern",
    "Xanathar",
    "Xandala",
    "Xill",
    "Xorn",
    "Xorn, big xorn",
    "Xvart",
    "Yakfolk priest",
    "Yakfolk warrior",
    "Yakfolk (yikaria)",
    "Yalaga Maladwyn",
    "Yalah Gralhund",
    "Yestabrod",
    "Yeth hound",
    "Yeti",
    "Ygorl, Lord of Entropy",
    "Yinra Emberwind",
    "Yuan-ti",
    "Yugoloth",
    "Yusdrayl",
    "Zaknafein Do'Urden",
    "Zaltember",
    "Zegana",
    "Zephyros",
    "Zombie",
    "Zorbo",
    "Zotz"
];

$('#tokenLabelInput').typeahead({
    hint: true,
    highlight: true,
    minLength: 3
},
    {
        name: 'monsters',
        source: substringMatcher(monsters)
    });