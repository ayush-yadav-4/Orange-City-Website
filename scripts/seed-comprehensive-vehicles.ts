import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type VehicleEntry = {
  category: "scooty" | "bike" | "car" | "truck" | "tractor" | "erickshaw";
  make: string;
  model: string;
};

export const COMPREHENSIVE_INDIAN_VEHICLES: VehicleEntry[] = [
  // ==========================================
  // 1. SCOOTY (GEARLESS SCOOTERS)
  // ==========================================
  // Honda
  { category: "scooty", make: "Honda", model: "Activa 6G" },
  { category: "scooty", make: "Honda", model: "Activa 125" },
  { category: "scooty", make: "Honda", model: "Activa 5G" },
  { category: "scooty", make: "Honda", model: "Activa 4G" },
  { category: "scooty", make: "Honda", model: "Activa 3G" },
  { category: "scooty", make: "Honda", model: "Dio" },
  { category: "scooty", make: "Honda", model: "Dio 125" },
  { category: "scooty", make: "Honda", model: "Grazia" },
  { category: "scooty", make: "Honda", model: "Aviator" },
  { category: "scooty", make: "Honda", model: "Cliq" },

  // TVS
  { category: "scooty", make: "TVS", model: "Jupiter 110" },
  { category: "scooty", make: "TVS", model: "Jupiter 125" },
  { category: "scooty", make: "TVS", model: "Jupiter Classic" },
  { category: "scooty", make: "TVS", model: "Ntorq 125" },
  { category: "scooty", make: "TVS", model: "Scooty Pep+" },
  { category: "scooty", make: "TVS", model: "Scooty Zest 110" },
  { category: "scooty", make: "TVS", model: "Wego" },
  { category: "scooty", make: "TVS", model: "iQube Electric" },
  { category: "scooty", make: "TVS", model: "X Electric" },

  // Suzuki
  { category: "scooty", make: "Suzuki", model: "Access 125" },
  { category: "scooty", make: "Suzuki", model: "Burgman Street 125" },
  { category: "scooty", make: "Suzuki", model: "Burgman Street EX" },
  { category: "scooty", make: "Suzuki", model: "Avenis 125" },
  { category: "scooty", make: "Suzuki", model: "Swish 125" },
  { category: "scooty", make: "Suzuki", model: "Let's" },

  // Hero
  { category: "scooty", make: "Hero", model: "Pleasure" },
  { category: "scooty", make: "Hero", model: "Pleasure Plus" },
  { category: "scooty", make: "Hero", model: "Destini 125" },
  { category: "scooty", make: "Hero", model: "Destini Prime" },
  { category: "scooty", make: "Hero", model: "Maestro Edge 110" },
  { category: "scooty", make: "Hero", model: "Maestro Edge 125" },
  { category: "scooty", make: "Hero", model: "Xoom 110" },
  { category: "scooty", make: "Hero", model: "Vida V1 Pro" },

  // Yamaha
  { category: "scooty", make: "Yamaha", model: "Fascino 125 Fi Hybrid" },
  { category: "scooty", make: "Yamaha", model: "RayZR 125 Fi Hybrid" },
  { category: "scooty", make: "Yamaha", model: "RayZR Street Rally" },
  { category: "scooty", make: "Yamaha", model: "Aerox 155" },
  { category: "scooty", make: "Yamaha", model: "Ray 113" },
  { category: "scooty", make: "Yamaha", model: "Alpha" },

  // Ather
  { category: "scooty", make: "Ather", model: "450X" },
  { category: "scooty", make: "Ather", model: "450S" },
  { category: "scooty", make: "Ather", model: "450 Apex" },
  { category: "scooty", make: "Ather", model: "Rizta" },

  // Ola
  { category: "scooty", make: "Ola", model: "S1 Pro" },
  { category: "scooty", make: "Ola", model: "S1 Air" },
  { category: "scooty", make: "Ola", model: "S1 X" },
  { category: "scooty", make: "Ola", model: "S1 X+" },

  // Bajaj
  { category: "scooty", make: "Bajaj", model: "Chetak Premium" },
  { category: "scooty", make: "Bajaj", model: "Chetak Urbane" },
  { category: "scooty", make: "Bajaj", model: "Chetak 2901" },

  // Vespa & Aprilia (Piaggio)
  { category: "scooty", make: "Vespa", model: "VXL 125" },
  { category: "scooty", make: "Vespa", model: "SXL 125" },
  { category: "scooty", make: "Vespa", model: "ZX 125" },
  { category: "scooty", make: "Vespa", model: "VXL 150" },
  { category: "scooty", make: "Vespa", model: "SXL 150" },
  { category: "scooty", make: "Aprilia", model: "SR 125" },
  { category: "scooty", make: "Aprilia", model: "SR 160" },
  { category: "scooty", make: "Aprilia", model: "SXR 125" },
  { category: "scooty", make: "Aprilia", model: "SXR 160" },

  // ==========================================
  // 2. BIKE (MOTORCYCLES)
  // ==========================================
  // Hero
  { category: "bike", make: "Hero", model: "Splendor Plus" },
  { category: "bike", make: "Hero", model: "Splendor Plus XTEC" },
  { category: "bike", make: "Hero", model: "Super Splendor 125" },
  { category: "bike", make: "Hero", model: "Super Splendor XTEC" },
  { category: "bike", make: "Hero", model: "HF Deluxe" },
  { category: "bike", make: "Hero", model: "HF 100" },
  { category: "bike", make: "Hero", model: "Passion Pro" },
  { category: "bike", make: "Hero", model: "Passion Plus" },
  { category: "bike", make: "Hero", model: "Passion XTEC" },
  { category: "bike", make: "Hero", model: "Glamour 125" },
  { category: "bike", make: "Hero", model: "Glamour XTEC" },
  { category: "bike", make: "Hero", model: "Xtreme 125R" },
  { category: "bike", make: "Hero", model: "Xtreme 160R 4V" },
  { category: "bike", make: "Hero", model: "Xtreme 200S 4V" },
  { category: "bike", make: "Hero", model: "Xpulse 200 4V" },
  { category: "bike", make: "Hero", model: "Xpulse 200T 4V" },
  { category: "bike", make: "Hero", model: "Karizma XMR" },
  { category: "bike", make: "Hero", model: "Mavrick 440" },
  { category: "bike", make: "Hero", model: "Achiever" },
  { category: "bike", make: "Hero", model: "Hunk" },

  // Honda
  { category: "bike", make: "Honda", model: "Shine 100" },
  { category: "bike", make: "Honda", model: "Shine 125" },
  { category: "bike", make: "Honda", model: "SP 125" },
  { category: "bike", make: "Honda", model: "SP 160" },
  { category: "bike", make: "Honda", model: "Unicorn 160" },
  { category: "bike", make: "Honda", model: "CB200X" },
  { category: "bike", make: "Honda", model: "Hornet 2.0" },
  { category: "bike", make: "Honda", model: "H'ness CB350" },
  { category: "bike", make: "Honda", model: "CB350RS" },
  { category: "bike", make: "Honda", model: "CB350" },
  { category: "bike", make: "Honda", model: "CB300F" },
  { category: "bike", make: "Honda", model: "CB300R" },
  { category: "bike", make: "Honda", model: "Livo" },
  { category: "bike", make: "Honda", model: "CD 110 Dream" },
  { category: "bike", make: "Honda", model: "Dream Yuga" },
  { category: "bike", make: "Honda", model: "CBR 150R" },
  { category: "bike", make: "Honda", model: "CBR 250R" },

  // Bajaj
  { category: "bike", make: "Bajaj", model: "Pulsar 125" },
  { category: "bike", make: "Bajaj", model: "Pulsar 150" },
  { category: "bike", make: "Bajaj", model: "Pulsar 180" },
  { category: "bike", make: "Bajaj", model: "Pulsar 220F" },
  { category: "bike", make: "Bajaj", model: "Pulsar NS125" },
  { category: "bike", make: "Bajaj", model: "Pulsar NS160" },
  { category: "bike", make: "Bajaj", model: "Pulsar NS200" },
  { category: "bike", make: "Bajaj", model: "Pulsar NS400Z" },
  { category: "bike", make: "Bajaj", model: "Pulsar N150" },
  { category: "bike", make: "Bajaj", model: "Pulsar N160" },
  { category: "bike", make: "Bajaj", model: "Pulsar N250" },
  { category: "bike", make: "Bajaj", model: "Pulsar F250" },
  { category: "bike", make: "Bajaj", model: "Pulsar RS200" },
  { category: "bike", make: "Bajaj", model: "Platina 100" },
  { category: "bike", make: "Bajaj", model: "Platina 110 ABS" },
  { category: "bike", make: "Bajaj", model: "CT 100" },
  { category: "bike", make: "Bajaj", model: "CT 110X" },
  { category: "bike", make: "Bajaj", model: "CT 125X" },
  { category: "bike", make: "Bajaj", model: "Avenger Street 160" },
  { category: "bike", make: "Bajaj", model: "Avenger Cruise 220" },
  { category: "bike", make: "Bajaj", model: "Dominar 250" },
  { category: "bike", make: "Bajaj", model: "Dominar 400" },
  { category: "bike", make: "Bajaj", model: "Discover 100" },
  { category: "bike", make: "Bajaj", model: "Discover 125" },
  { category: "bike", make: "Bajaj", model: "Discover 150" },
  { category: "bike", make: "Bajaj", model: "Freedom 125 CNG" },

  // TVS
  { category: "bike", make: "TVS", model: "Apache RTR 160 2V" },
  { category: "bike", make: "TVS", model: "Apache RTR 160 4V" },
  { category: "bike", make: "TVS", model: "Apache RTR 180" },
  { category: "bike", make: "TVS", model: "Apache RTR 200 4V" },
  { category: "bike", make: "TVS", model: "Apache RTR 310" },
  { category: "bike", make: "TVS", model: "Apache RR 310" },
  { category: "bike", make: "TVS", model: "Raider 125" },
  { category: "bike", make: "TVS", model: "Ronin 225" },
  { category: "bike", make: "TVS", model: "Radeon 110" },
  { category: "bike", make: "TVS", model: "Sport" },
  { category: "bike", make: "TVS", model: "Star City Plus" },
  { category: "bike", make: "TVS", model: "Victor" },
  { category: "bike", make: "TVS", model: "XL100 Heavy Duty" },
  { category: "bike", make: "TVS", model: "XL100 Comfort" },

  // Royal Enfield
  { category: "bike", make: "Royal Enfield", model: "Classic 350" },
  { category: "bike", make: "Royal Enfield", model: "Bullet 350" },
  { category: "bike", make: "Royal Enfield", model: "Hunter 350" },
  { category: "bike", make: "Royal Enfield", model: "Meteor 350" },
  { category: "bike", make: "Royal Enfield", model: "Himalayan 411" },
  { category: "bike", make: "Royal Enfield", model: "Himalayan 450" },
  { category: "bike", make: "Royal Enfield", model: "Scram 411" },
  { category: "bike", make: "Royal Enfield", model: "Guerrilla 450" },
  { category: "bike", make: "Royal Enfield", model: "Interceptor 650" },
  { category: "bike", make: "Royal Enfield", model: "Continental GT 650" },
  { category: "bike", make: "Royal Enfield", model: "Super Meteor 650" },
  { category: "bike", make: "Royal Enfield", model: "Shotgun 650" },
  { category: "bike", make: "Royal Enfield", model: "Thunderbird 350" },
  { category: "bike", make: "Royal Enfield", model: "Thunderbird 500" },
  { category: "bike", make: "Royal Enfield", model: "Electra 350" },

  // Yamaha
  { category: "bike", make: "Yamaha", model: "FZ FI V3" },
  { category: "bike", make: "Yamaha", model: "FZ-S FI V3" },
  { category: "bike", make: "Yamaha", model: "FZ-S FI V4" },
  { category: "bike", make: "Yamaha", model: "FZ-X" },
  { category: "bike", make: "Yamaha", model: "FZ 25" },
  { category: "bike", make: "Yamaha", model: "MT-15 V2" },
  { category: "bike", make: "Yamaha", model: "R15 V4" },
  { category: "bike", make: "Yamaha", model: "R15M" },
  { category: "bike", make: "Yamaha", model: "R15S" },
  { category: "bike", make: "Yamaha", model: "Saluto 125" },
  { category: "bike", make: "Yamaha", model: "SZ-RR" },

  // KTM
  { category: "bike", make: "KTM", model: "125 Duke" },
  { category: "bike", make: "KTM", model: "200 Duke" },
  { category: "bike", make: "KTM", model: "250 Duke" },
  { category: "bike", make: "KTM", model: "390 Duke" },
  { category: "bike", make: "KTM", model: "RC 125" },
  { category: "bike", make: "KTM", model: "RC 200" },
  { category: "bike", make: "KTM", model: "RC 390" },
  { category: "bike", make: "KTM", model: "250 Adventure" },
  { category: "bike", make: "KTM", model: "390 Adventure" },

  // Suzuki
  { category: "bike", make: "Suzuki", model: "Gixxer 155" },
  { category: "bike", make: "Suzuki", model: "Gixxer SF 155" },
  { category: "bike", make: "Suzuki", model: "Gixxer 250" },
  { category: "bike", make: "Suzuki", model: "Gixxer SF 250" },
  { category: "bike", make: "Suzuki", model: "V-Strom SX 250" },
  { category: "bike", make: "Suzuki", model: "Hayate" },

  // Jawa & Yezdi
  { category: "bike", make: "Jawa", model: "Jawa 350" },
  { category: "bike", make: "Jawa", model: "Jawa 42" },
  { category: "bike", make: "Jawa", model: "Jawa 42 Bobber" },
  { category: "bike", make: "Jawa", model: "Jawa Perak" },
  { category: "bike", make: "Yezdi", model: "Roadster" },
  { category: "bike", make: "Yezdi", model: "Scrambler" },
  { category: "bike", make: "Yezdi", model: "Adventure" },

  // Kawasaki
  { category: "bike", make: "Kawasaki", model: "Ninja 300" },
  { category: "bike", make: "Kawasaki", model: "Ninja 400" },
  { category: "bike", make: "Kawasaki", model: "Ninja 500" },
  { category: "bike", make: "Kawasaki", model: "Ninja 650" },
  { category: "bike", make: "Kawasaki", model: "Z650" },
  { category: "bike", make: "Kawasaki", model: "Z900" },
  { category: "bike", make: "Kawasaki", model: "Versys 650" },

  // ==========================================
  // 3. CAR / SUV (PASSENGER VEHICLES)
  // ==========================================
  // Maruti Suzuki
  { category: "car", make: "Maruti Suzuki", model: "Swift" },
  { category: "car", make: "Maruti Suzuki", model: "Dzire" },
  { category: "car", make: "Maruti Suzuki", model: "Baleno" },
  { category: "car", make: "Maruti Suzuki", model: "Fronx" },
  { category: "car", make: "Maruti Suzuki", model: "Brezza" },
  { category: "car", make: "Maruti Suzuki", model: "Grand Vitara" },
  { category: "car", make: "Maruti Suzuki", model: "Ertiga" },
  { category: "car", make: "Maruti Suzuki", model: "XL6" },
  { category: "car", make: "Maruti Suzuki", model: "Wagon R" },
  { category: "car", make: "Maruti Suzuki", model: "Alto K10" },
  { category: "car", make: "Maruti Suzuki", model: "Alto 800" },
  { category: "car", make: "Maruti Suzuki", model: "Celerio" },
  { category: "car", make: "Maruti Suzuki", model: "Ignis" },
  { category: "car", make: "Maruti Suzuki", model: "S-Presso" },
  { category: "car", make: "Maruti Suzuki", model: "Jimny" },
  { category: "car", make: "Maruti Suzuki", model: "Invicto" },
  { category: "car", make: "Maruti Suzuki", model: "Ciaz" },
  { category: "car", make: "Maruti Suzuki", model: "Eeco" },
  { category: "car", make: "Maruti Suzuki", model: "Ritz" },
  { category: "car", make: "Maruti Suzuki", model: "SX4" },
  { category: "car", make: "Maruti Suzuki", model: "Zen Estilo" },
  { category: "car", make: "Maruti Suzuki", model: "Omni" },

  // Hyundai
  { category: "car", make: "Hyundai", model: "Creta" },
  { category: "car", make: "Hyundai", model: "Creta N Line" },
  { category: "car", make: "Hyundai", model: "Venue" },
  { category: "car", make: "Hyundai", model: "Venue N Line" },
  { category: "car", make: "Hyundai", model: "Exter" },
  { category: "car", make: "Hyundai", model: "i20" },
  { category: "car", make: "Hyundai", model: "i20 N Line" },
  { category: "car", make: "Hyundai", model: "Grand i10 Nios" },
  { category: "car", make: "Hyundai", model: "Aura" },
  { category: "car", make: "Hyundai", model: "Verna" },
  { category: "car", make: "Hyundai", model: "Alcazar" },
  { category: "car", make: "Hyundai", model: "Tucson" },
  { category: "car", make: "Hyundai", model: "Santro" },
  { category: "car", make: "Hyundai", model: "Santro Xing" },
  { category: "car", make: "Hyundai", model: "Eon" },
  { category: "car", make: "Hyundai", model: "Elantra" },
  { category: "car", make: "Hyundai", model: "Ioniq 5" },

  // Tata Motors
  { category: "car", make: "Tata Motors", model: "Nexon" },
  { category: "car", make: "Tata Motors", model: "Nexon EV" },
  { category: "car", make: "Tata Motors", model: "Punch" },
  { category: "car", make: "Tata Motors", model: "Punch EV" },
  { category: "car", make: "Tata Motors", model: "Harrier" },
  { category: "car", make: "Tata Motors", model: "Safari" },
  { category: "car", make: "Tata Motors", model: "Curvv" },
  { category: "car", make: "Tata Motors", model: "Curvv EV" },
  { category: "car", make: "Tata Motors", model: "Tiago" },
  { category: "car", make: "Tata Motors", model: "Tiago EV" },
  { category: "car", make: "Tata Motors", model: "Tigor" },
  { category: "car", make: "Tata Motors", model: "Tigor EV" },
  { category: "car", make: "Tata Motors", model: "Altroz" },
  { category: "car", make: "Tata Motors", model: "Indica" },
  { category: "car", make: "Tata Motors", model: "Indigo" },
  { category: "car", make: "Tata Motors", model: "Zest" },
  { category: "car", make: "Tata Motors", model: "Bolt" },
  { category: "car", make: "Tata Motors", model: "Hexa" },
  { category: "car", make: "Tata Motors", model: "Sumo Gold" },
  { category: "car", make: "Tata Motors", model: "Safari Storme" },

  // Mahindra
  { category: "car", make: "Mahindra", model: "Scorpio-N" },
  { category: "car", make: "Mahindra", model: "Scorpio Classic" },
  { category: "car", make: "Mahindra", model: "XUV700" },
  { category: "car", make: "Mahindra", model: "Thar" },
  { category: "car", make: "Mahindra", model: "Thar Roxx" },
  { category: "car", make: "Mahindra", model: "Bolero" },
  { category: "car", make: "Mahindra", model: "Bolero Neo" },
  { category: "car", make: "Mahindra", model: "Bolero Neo Plus" },
  { category: "car", make: "Mahindra", model: "XUV300" },
  { category: "car", make: "Mahindra", model: "XUV 3XO" },
  { category: "car", make: "Mahindra", model: "XUV400 EV" },
  { category: "car", make: "Mahindra", model: "Marazzo" },
  { category: "car", make: "Mahindra", model: "Xylo" },
  { category: "car", make: "Mahindra", model: "KUV100" },
  { category: "car", make: "Mahindra", model: "TUV300" },
  { category: "car", make: "Mahindra", model: "Alturas G4" },

  // Toyota
  { category: "car", make: "Toyota", model: "Innova Crysta" },
  { category: "car", make: "Toyota", model: "Innova Hycross" },
  { category: "car", make: "Toyota", model: "Fortuner" },
  { category: "car", make: "Toyota", model: "Fortuner Legender" },
  { category: "car", make: "Toyota", model: "Glanza" },
  { category: "car", make: "Toyota", model: "Urban Cruiser Taisor" },
  { category: "car", make: "Toyota", model: "Urban Cruiser Hyryder" },
  { category: "car", make: "Toyota", model: "Rumion" },
  { category: "car", make: "Toyota", model: "Hilux" },
  { category: "car", make: "Toyota", model: "Camry" },
  { category: "car", make: "Toyota", model: "Vellfire" },
  { category: "car", make: "Toyota", model: "Corolla Altis" },
  { category: "car", make: "Toyota", model: "Etios" },
  { category: "car", make: "Toyota", model: "Etios Liva" },
  { category: "car", make: "Toyota", model: "Yaris" },
  { category: "car", make: "Toyota", model: "Innova (Old)" },

  // Kia
  { category: "car", make: "Kia", model: "Seltos" },
  { category: "car", make: "Kia", model: "Sonet" },
  { category: "car", make: "Kia", model: "Carens" },
  { category: "car", make: "Kia", model: "Carnival" },
  { category: "car", make: "Kia", model: "EV6" },

  // Honda Cars
  { category: "car", make: "Honda", model: "City 5th Gen" },
  { category: "car", make: "Honda", model: "City 4th Gen" },
  { category: "car", make: "Honda", model: "City e:HEV Hybrid" },
  { category: "car", make: "Honda", model: "Amaze" },
  { category: "car", make: "Honda", model: "Elevate" },
  { category: "car", make: "Honda", model: "WR-V" },
  { category: "car", make: "Honda", model: "Jazz" },
  { category: "car", make: "Honda", model: "BR-V" },
  { category: "car", make: "Honda", model: "Brio" },
  { category: "car", make: "Honda", model: "Civic" },
  { category: "car", make: "Honda", model: "CR-V" },
  { category: "car", make: "Honda", model: "Accord" },

  // Volkswagen
  { category: "car", make: "Volkswagen", model: "Taigun" },
  { category: "car", make: "Volkswagen", model: "Virtus" },
  { category: "car", make: "Volkswagen", model: "Polo" },
  { category: "car", make: "Volkswagen", model: "Vento" },
  { category: "car", make: "Volkswagen", model: "Ameo" },
  { category: "car", make: "Volkswagen", model: "Tiguan" },
  { category: "car", make: "Volkswagen", model: "Jetta" },
  { category: "car", make: "Volkswagen", model: "Passat" },

  // Skoda
  { category: "car", make: "Skoda", model: "Kushaq" },
  { category: "car", make: "Skoda", model: "Slavia" },
  { category: "car", make: "Skoda", model: "Kylaq" },
  { category: "car", make: "Skoda", model: "Rapid" },
  { category: "car", make: "Skoda", model: "Octavia" },
  { category: "car", make: "Skoda", model: "Superb" },
  { category: "car", make: "Skoda", model: "Kodiaq" },
  { category: "car", make: "Skoda", model: "Laura" },
  { category: "car", make: "Skoda", model: "Fabia" },

  // Renault
  { category: "car", make: "Renault", model: "Kwid" },
  { category: "car", make: "Renault", model: "Triber" },
  { category: "car", make: "Renault", model: "Kiger" },
  { category: "car", make: "Renault", model: "Duster" },
  { category: "car", make: "Renault", model: "Lodgy" },
  { category: "car", make: "Renault", model: "Pulse" },
  { category: "car", make: "Renault", model: "Scala" },

  // Nissan
  { category: "car", make: "Nissan", model: "Magnite" },
  { category: "car", make: "Nissan", model: "Kicks" },
  { category: "car", make: "Nissan", model: "Micra" },
  { category: "car", make: "Nissan", model: "Sunny" },
  { category: "car", make: "Nissan", model: "Terrano" },
  { category: "car", make: "Nissan", model: "X-Trail" },

  // MG Motor
  { category: "car", make: "MG Motor", model: "Hector" },
  { category: "car", make: "MG Motor", model: "Hector Plus" },
  { category: "car", make: "MG Motor", model: "Astor" },
  { category: "car", make: "MG Motor", model: "ZS EV" },
  { category: "car", make: "MG Motor", model: "Comet EV" },
  { category: "car", make: "MG Motor", model: "Gloster" },
  { category: "car", make: "MG Motor", model: "Windsor EV" },

  // Ford
  { category: "car", make: "Ford", model: "EcoSport" },
  { category: "car", make: "Ford", model: "Endeavour" },
  { category: "car", make: "Ford", model: "Figo" },
  { category: "car", make: "Ford", model: "Aspire" },
  { category: "car", make: "Ford", model: "Freestyle" },
  { category: "car", make: "Ford", model: "Fiesta" },
  { category: "car", make: "Ford", model: "Ikon" },

  // Jeep
  { category: "car", make: "Jeep", model: "Compass" },
  { category: "car", make: "Jeep", model: "Meridian" },
  { category: "car", make: "Jeep", model: "Wrangler" },
  { category: "car", make: "Jeep", model: "Grand Cherokee" },

  // ==========================================
  // 4. COMMERCIAL VEHICLES & TRUCKS
  // ==========================================
  // Tata Motors Commercial
  { category: "truck", make: "Tata Motors", model: "Ace Gold" },
  { category: "truck", make: "Tata Motors", model: "Ace Gold Petrol" },
  { category: "truck", make: "Tata Motors", model: "Ace Gold Diesel" },
  { category: "truck", make: "Tata Motors", model: "Ace Gold CNG" },
  { category: "truck", make: "Tata Motors", model: "Ace EV" },
  { category: "truck", make: "Tata Motors", model: "Intra V10" },
  { category: "truck", make: "Tata Motors", model: "Intra V20" },
  { category: "truck", make: "Tata Motors", model: "Intra V30" },
  { category: "truck", make: "Tata Motors", model: "Intra V50" },
  { category: "truck", make: "Tata Motors", model: "Yodha Pickup 2.0" },
  { category: "truck", make: "Tata Motors", model: "407 Gold SFC" },
  { category: "truck", make: "Tata Motors", model: "709g LPT" },
  { category: "truck", make: "Tata Motors", model: "1109g LPT" },
  { category: "truck", make: "Tata Motors", model: "1512 LPT" },
  { category: "truck", make: "Tata Motors", model: "Signa 1923.K" },
  { category: "truck", make: "Tata Motors", model: "Signa 2823.K" },
  { category: "truck", make: "Tata Motors", model: "Signa 3523.TK" },
  { category: "truck", make: "Tata Motors", model: "Signa 4825.TK" },
  { category: "truck", make: "Tata Motors", model: "Prima 2830.K" },
  { category: "truck", make: "Tata Motors", model: "Prima 3530.K" },
  { category: "truck", make: "Tata Motors", model: "Prima 5530.S" },
  { category: "truck", make: "Tata Motors", model: "Ultra T.7" },
  { category: "truck", make: "Tata Motors", model: "Ultra T.9" },
  { category: "truck", make: "Tata Motors", model: "Winger" },
  { category: "truck", make: "Tata Motors", model: "Magic Express" },
  { category: "truck", make: "Tata Motors", model: "Starbus" },

  // Ashok Leyland
  { category: "truck", make: "Ashok Leyland", model: "Dost+" },
  { category: "truck", make: "Ashok Leyland", model: "Dost Strong" },
  { category: "truck", make: "Ashok Leyland", model: "Bada Dost i1" },
  { category: "truck", make: "Ashok Leyland", model: "Bada Dost i2" },
  { category: "truck", make: "Ashok Leyland", model: "Bada Dost i3+" },
  { category: "truck", make: "Ashok Leyland", model: "Bada Dost i4" },
  { category: "truck", make: "Ashok Leyland", model: "Partner 4 Tyre" },
  { category: "truck", make: "Ashok Leyland", model: "Partner 6 Tyre" },
  { category: "truck", make: "Ashok Leyland", model: "Ecomet 1015 HE" },
  { category: "truck", make: "Ashok Leyland", model: "Ecomet 1215 HE" },
  { category: "truck", make: "Ashok Leyland", model: "Ecomet 1615 HE" },
  { category: "truck", make: "Ashok Leyland", model: "Boss 1115 HB" },
  { category: "truck", make: "Ashok Leyland", model: "Boss 1415 HB" },
  { category: "truck", make: "Ashok Leyland", model: "Boss 1915 HB" },
  { category: "truck", make: "Ashok Leyland", model: "AVTR 2620" },
  { category: "truck", make: "Ashok Leyland", model: "AVTR 3120" },
  { category: "truck", make: "Ashok Leyland", model: "AVTR 4220" },
  { category: "truck", make: "Ashok Leyland", model: "AVTR 4825" },
  { category: "truck", make: "Ashok Leyland", model: "AVTR 5525" },
  { category: "truck", make: "Ashok Leyland", model: "MiTR School Bus" },

  // Eicher
  { category: "truck", make: "Eicher", model: "Pro 2049" },
  { category: "truck", make: "Eicher", model: "Pro 2059" },
  { category: "truck", make: "Eicher", model: "Pro 2095XP" },
  { category: "truck", make: "Eicher", model: "Pro 2110" },
  { category: "truck", make: "Eicher", model: "Pro 2114XP" },
  { category: "truck", make: "Eicher", model: "Pro 3015" },
  { category: "truck", make: "Eicher", model: "Pro 3019" },
  { category: "truck", make: "Eicher", model: "Pro 6019" },
  { category: "truck", make: "Eicher", model: "Pro 6028" },
  { category: "truck", make: "Eicher", model: "Pro 6048" },
  { category: "truck", make: "Eicher", model: "Pro 8035XM" },
  { category: "truck", make: "Eicher", model: "Skyline Pro Bus" },
  { category: "truck", make: "Eicher", model: "Starline Bus" },

  // Mahindra Commercial
  { category: "truck", make: "Mahindra", model: "Bolero Pik-Up ExtraLong" },
  { category: "truck", make: "Mahindra", model: "Bolero Maxi Truck Plus" },
  { category: "truck", make: "Mahindra", model: "Bolero Camper" },
  { category: "truck", make: "Mahindra", model: "Supro Profit Truck Mini" },
  { category: "truck", make: "Mahindra", model: "Supro Profit Truck Maxi" },
  { category: "truck", make: "Mahindra", model: "Jeeto Plus" },
  { category: "truck", make: "Mahindra", model: "Furio 7" },
  { category: "truck", make: "Mahindra", model: "Furio 11" },
  { category: "truck", make: "Mahindra", model: "Furio 14" },
  { category: "truck", make: "Mahindra", model: "Furio 17" },
  { category: "truck", make: "Mahindra", model: "Blazo X 28" },
  { category: "truck", make: "Mahindra", model: "Blazo X 35" },
  { category: "truck", make: "Mahindra", model: "Blazo X 42" },
  { category: "truck", make: "Mahindra", model: "Blazo X 49" },
  { category: "truck", make: "Mahindra", model: "Blazo X 55" },

  // BharatBenz
  { category: "truck", make: "BharatBenz", model: "1015R" },
  { category: "truck", make: "BharatBenz", model: "1217C" },
  { category: "truck", make: "BharatBenz", model: "1617R" },
  { category: "truck", make: "BharatBenz", model: "1917R" },
  { category: "truck", make: "BharatBenz", model: "2623R" },
  { category: "truck", make: "BharatBenz", model: "2823R" },
  { category: "truck", make: "BharatBenz", model: "2828C" },
  { category: "truck", make: "BharatBenz", model: "3528C" },
  { category: "truck", make: "BharatBenz", model: "4228R" },
  { category: "truck", make: "BharatBenz", model: "5528TT" },

  // Force Motors
  { category: "truck", make: "Force Motors", model: "Traveller 3050" },
  { category: "truck", make: "Force Motors", model: "Traveller 3350" },
  { category: "truck", make: "Force Motors", model: "Traveller 4020" },
  { category: "truck", make: "Force Motors", model: "Trax Cruiser" },
  { category: "truck", make: "Force Motors", model: "Trax Toofan" },
  { category: "truck", make: "Force Motors", model: "Kargo King" },
  { category: "truck", make: "Force Motors", model: "Urbania" },
  { category: "truck", make: "Force Motors", model: "Citiline" },

  // Isuzu
  { category: "truck", make: "Isuzu", model: "D-Max Regular Cab" },
  { category: "truck", make: "Isuzu", model: "D-Max S-Cab" },
  { category: "truck", make: "Isuzu", model: "D-Max V-Cross" },
  { category: "truck", make: "Isuzu", model: "Hi-Lander" },

  // SML Isuzu
  { category: "truck", make: "SML Isuzu", model: "Sartaj GS" },
  { category: "truck", make: "SML Isuzu", model: "Samrat GS" },
  { category: "truck", make: "SML Isuzu", model: "Prestige GS" },
  { category: "truck", make: "SML Isuzu", model: "Supreme GS" },
  { category: "truck", make: "SML Isuzu", model: "Executive School Bus" },

  // ==========================================
  // 5. TRACTOR & AGRICULTURE
  // ==========================================
  // Mahindra Tractor
  { category: "tractor", make: "Mahindra Tractor", model: "275 DI TU" },
  { category: "tractor", make: "Mahindra Tractor", model: "475 DI" },
  { category: "tractor", make: "Mahindra Tractor", model: "575 DI" },
  { category: "tractor", make: "Mahindra Tractor", model: "585 DI Sarpanch" },
  { category: "tractor", make: "Mahindra Tractor", model: "Novo 655 DI" },
  { category: "tractor", make: "Mahindra Tractor", model: "Novo 755 DI" },
  { category: "tractor", make: "Mahindra Tractor", model: "Yuvo Tech+ 415 DI" },
  { category: "tractor", make: "Mahindra Tractor", model: "Yuvo Tech+ 575 DI" },
  { category: "tractor", make: "Mahindra Tractor", model: "OJA 2127" },
  { category: "tractor", make: "Mahindra Tractor", model: "Jivo 225 DI" },

  // Swaraj
  { category: "tractor", make: "Swaraj", model: "724 FE" },
  { category: "tractor", make: "Swaraj", model: "735 FE" },
  { category: "tractor", make: "Swaraj", model: "744 FE" },
  { category: "tractor", make: "Swaraj", model: "744 XT" },
  { category: "tractor", make: "Swaraj", model: "855 FE" },
  { category: "tractor", make: "Swaraj", model: "963 FE" },
  { category: "tractor", make: "Swaraj", model: "Target 630" },

  // Sonalika
  { category: "tractor", make: "Sonalika", model: "DI 35" },
  { category: "tractor", make: "Sonalika", model: "DI 745 III" },
  { category: "tractor", make: "Sonalika", model: "DI 750 III" },
  { category: "tractor", make: "Sonalika", model: "Sikander DI 50" },
  { category: "tractor", make: "Sonalika", model: "Tiger 55" },
  { category: "tractor", make: "Sonalika", model: "WT 60" },

  // Massey Ferguson (TAFE)
  { category: "tractor", make: "Massey Ferguson", model: "MF 1035 DI" },
  { category: "tractor", make: "Massey Ferguson", model: "MF 241 DI Maha Shakti" },
  { category: "tractor", make: "Massey Ferguson", model: "MF 245 DI" },
  { category: "tractor", make: "Massey Ferguson", model: "MF 7250 DI PowerUp" },
  { category: "tractor", make: "Massey Ferguson", model: "MF 9500 Super Shuttle" },

  // John Deere
  { category: "tractor", make: "John Deere", model: "5045 D" },
  { category: "tractor", make: "John Deere", model: "5050 D" },
  { category: "tractor", make: "John Deere", model: "5105" },
  { category: "tractor", make: "John Deere", model: "5210 GearPro" },
  { category: "tractor", make: "John Deere", model: "5310 Trem IV" },
  { category: "tractor", make: "John Deere", model: "5405" },

  // New Holland
  { category: "tractor", make: "New Holland", model: "3230 NX" },
  { category: "tractor", make: "New Holland", model: "3600-2 TX" },
  { category: "tractor", make: "New Holland", model: "3630 TX Plus" },
  { category: "tractor", make: "New Holland", model: "4710 2WD" },
  { category: "tractor", make: "New Holland", model: "5500 4WD" },

  // Farmtrac & Powertrac (Escorts)
  { category: "tractor", make: "Farmtrac", model: "Farmtrac 45 Classic" },
  { category: "tractor", make: "Farmtrac", model: "Farmtrac 60 Powermaxx" },
  { category: "tractor", make: "Farmtrac", model: "Farmtrac 6055 Powermaxx" },
  { category: "tractor", make: "Powertrac", model: "Euro 50" },
  { category: "tractor", make: "Powertrac", model: "Euro 42 Plus" },
  { category: "tractor", make: "Powertrac", model: "439 Plus PowerPlus" },

  // Eicher Tractor
  { category: "tractor", make: "Eicher Tractor", model: "242" },
  { category: "tractor", make: "Eicher Tractor", model: "333" },
  { category: "tractor", make: "Eicher Tractor", model: "380" },
  { category: "tractor", make: "Eicher Tractor", model: "485" },
  { category: "tractor", make: "Eicher Tractor", model: "551" },
  { category: "tractor", make: "Eicher Tractor", model: "557" },

  // Kubota
  { category: "tractor", make: "Kubota", model: "MU4501 2WD" },
  { category: "tractor", make: "Kubota", model: "MU5501 4WD" },
  { category: "tractor", make: "Kubota", model: "L4508" },
  { category: "tractor", make: "Kubota", model: "B2441 Mini" },

  // ==========================================
  // 6. E-RICKSHAW & 3-WHEELER
  // ==========================================
  // Bajaj Auto 3-Wheeler
  { category: "erickshaw", make: "Bajaj Auto", model: "RE Compact 4S" },
  { category: "erickshaw", make: "Bajaj Auto", model: "RE Optima" },
  { category: "erickshaw", make: "Bajaj Auto", model: "Maxima Z" },
  { category: "erickshaw", make: "Bajaj Auto", model: "Maxima C" },
  { category: "erickshaw", make: "Bajaj Auto", model: "Maxima X Wide" },
  { category: "erickshaw", make: "Bajaj Auto", model: "RE E-TEC 9.0" },

  // Piaggio 3-Wheeler
  { category: "erickshaw", make: "Piaggio", model: "Ape Auto DX" },
  { category: "erickshaw", make: "Piaggio", model: "Ape City Plus" },
  { category: "erickshaw", make: "Piaggio", model: "Ape Xtra LDX" },
  { category: "erickshaw", make: "Piaggio", model: "Ape E-City FX" },
  { category: "erickshaw", make: "Piaggio", model: "Ape E-Xtra FX" },

  // Mahindra Electric
  { category: "erickshaw", make: "Mahindra Electric", model: "Treo" },
  { category: "erickshaw", make: "Mahindra Electric", model: "Treo Yaari" },
  { category: "erickshaw", make: "Mahindra Electric", model: "Treo Zor" },
  { category: "erickshaw", make: "Mahindra Electric", model: "Zor Grand" },
  { category: "erickshaw", make: "Mahindra Electric", model: "e-Alfa Mini" },
  { category: "erickshaw", make: "Mahindra Electric", model: "e-Alfa Cargo" },

  // Atul Auto
  { category: "erickshaw", make: "Atul Auto", model: "Gem Paxx" },
  { category: "erickshaw", make: "Atul Auto", model: "Gem Cargo" },
  { category: "erickshaw", make: "Atul Auto", model: "Rik Petrol/CNG" },
  { category: "erickshaw", make: "Atul Auto", model: "Mobili E-Rickshaw" },

  // Yatri E-Rickshaw
  { category: "erickshaw", make: "Yatri", model: "Super E-Rickshaw" },
  { category: "erickshaw", make: "Yatri", model: "Deluxe E-Rickshaw" },
  { category: "erickshaw", make: "Yatri", model: "E-Loader Cargo" },

  // Mayuri
  { category: "erickshaw", make: "Mayuri", model: "Grand E-Rickshaw" },
  { category: "erickshaw", make: "Mayuri", model: "Deluxe Plus" },
  { category: "erickshaw", make: "Mayuri", model: "Pro E-Cart Loader" },

  // Saarthi
  { category: "erickshaw", make: "Saarthi", model: "Shavak E-Auto" },
  { category: "erickshaw", make: "Saarthi", model: "DLX E-Rickshaw" },
  { category: "erickshaw", make: "Saarthi", model: "Plus Loader" },

  // Kinetic Green
  { category: "erickshaw", make: "Kinetic Green", model: "Safar Smart" },
  { category: "erickshaw", make: "Kinetic Green", model: "Safar Jumbo" },
  { category: "erickshaw", make: "Kinetic Green", model: "Super DX" },
];

async function seedAll() {
  console.log("Seeding comprehensive Indian vehicles catalog...");
  
  // Clean up old wrongly categorized entries if any
  await prisma.vehicleCatalog.deleteMany({
    where: {
      category: "bike",
      make: "Honda",
      model: "Activa",
    },
  });
  await prisma.vehicleCatalog.deleteMany({
    where: {
      category: "bike",
      make: "TVS",
      model: "Jupiter",
    },
  });

  let added = 0;
  let skipped = 0;

  for (const entry of COMPREHENSIVE_INDIAN_VEHICLES) {
    const existing = await prisma.vehicleCatalog.findFirst({
      where: {
        category: entry.category,
        make: { equals: entry.make, mode: "insensitive" },
        model: { equals: entry.model, mode: "insensitive" },
      },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.vehicleCatalog.create({
      data: {
        category: entry.category,
        make: entry.make,
        model: entry.model,
        active: true,
      },
    });
    added++;
  }

  const total = await prisma.vehicleCatalog.count();
  console.log(`Finished! Added: ${added}, Already existed (skipped): ${skipped}. Total in DB now: ${total}`);
  await prisma.$disconnect();
}

seedAll().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
