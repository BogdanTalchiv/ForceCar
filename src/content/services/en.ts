import type { ServiceContentMap } from "./types";

const en: ServiceContentMap = {
  diagnostics: {
    name: "Car diagnostics",
    short: "We find where the problem comes from: warning lights, noises, vibrations or higher fuel use.",
    h1: "Car diagnostics in Chișinău",
    metaTitle: "Car diagnostics in Chișinău — ForceCar",
    metaDescription:
      "Car diagnostics at ForceCar, Chișinău: we check warning lights, noises and faults and explain clearly what's wrong with your car before any repair.",
    intro: [
      "Diagnostics means finding the real cause of a problem, not just reading a fault code. At ForceCar we combine reading the codes stored in the car's computer with a hands-on inspection, backed by more than 20 years of experience.",
      "After the check we explain in plain terms what we found and what needs repairing, so you can make an informed decision.",
    ],
    symptoms: [
      "The Check Engine light or another warning light has come on",
      "The car feels weaker or jerks while driving",
      "Fuel consumption has gone up for no clear reason",
      "New noises, vibrations or smells have appeared",
      "The car is hard to start or cuts out",
      "A problem comes and goes and you don't know why",
    ],
    checks: [
      "Fault codes stored in the car's computer",
      "Sensors and live engine data",
      "Ignition and fuel systems",
      "General condition: leaks, hoses, belts",
      "Noises and vibrations — on a test drive if needed",
    ],
    steps: [
      { title: "Tell us what you noticed", text: "When the problem happens, for how long and under which conditions. Every detail helps." },
      { title: "We inspect the car", text: "We read the fault codes and physically check the systems involved." },
      { title: "We explain the result", text: "You learn in plain terms what we found and what is needed." },
      { title: "You decide", text: "The repair only starts once you agree to the proposed work." },
    ],
    faq: [
      {
        q: "Does the fault code tell me exactly which part is faulty?",
        a: "Not always. The code shows which system has the problem, but the cause can be something else — a sensor, a connection or a worn part. That's why we also inspect the car physically before recommending a replacement.",
      },
      {
        q: "Can I keep driving with the Check Engine light on?",
        a: "It depends. If the light is flashing, the car loses power, or there's smoke, a burning smell or high temperature, stop safely and don't continue driving. If the light is on steadily and the car drives normally, book an inspection as soon as possible.",
      },
      {
        q: "What information should I prepare before diagnostics?",
        a: "The make, model, year and, if possible, mileage. Note when the problem happens: cold or warm engine, when accelerating, braking or on rough roads. You can also attach photos in the booking form.",
      },
    ],
  },

  engine: {
    name: "Engine repair",
    short: "Oil leaks, smoke, knocking or overheating — we find the cause and repair the engine.",
    h1: "Engine repair in Chișinău",
    metaTitle: "Engine repair in Chișinău — ForceCar",
    metaDescription:
      "Engine repair at ForceCar, Chișinău: we find the cause of oil leaks, smoke or engine noises and explain clearly which repair is needed.",
    intro: [
      "The engine is one of the most expensive parts of a car, so it pays to find out early what's happening with it. At ForceCar we first look for the cause — where the noise, smoke or oil leak comes from — and only then propose a repair.",
      "We explain which parts are affected, what needs repairing or replacing and why, before any work begins.",
    ],
    symptoms: [
      "Blue, white or black smoke from the exhaust",
      "High oil consumption or oil spots under the car",
      "Metallic noises, knocking or tapping from the engine",
      "Temperature rising above normal or coolant level dropping",
      "The engine runs unevenly, vibrates or loses power",
      "The oil pressure warning light comes on",
    ],
    checks: [
      "Oil and coolant leaks and where they come from",
      "Engine noises at idle and under load",
      "Cooling system: radiator, water pump, thermostat, hoses",
      "Ignition, fuel system and stored fault codes",
      "Condition of the timing system and drive belts",
      "Compression, when the symptoms call for it",
    ],
    steps: [
      { title: "We listen to the symptoms", text: "You tell us what you noticed and since when. We also ask about recent repairs." },
      { title: "We find the cause", text: "We check the engine step by step so we don't replace parts at random." },
      { title: "We explain the options", text: "You learn what needs repairing and why, before any work." },
      { title: "We repair and check", text: "After the repair we check the engine runs properly before handing the car back." },
    ],
    faq: [
      {
        q: "Is it worth repairing the engine, or is replacing it better?",
        a: "It depends on what failed, the engine's overall condition and the value of the car. After the inspection we explain the possible options so you can decide.",
      },
      {
        q: "Can I drive if the engine smokes or leaks oil?",
        a: "If the oil light comes on, the temperature rises above normal or the engine knocks, switch it off and don't continue — you could cause much more serious damage. In other cases, book an inspection as soon as possible.",
      },
      {
        q: "How long does an engine repair take?",
        a: "It depends heavily on the type of repair and parts availability. Once we've inspected the car, we'll give you an estimated duration.",
      },
    ],
    safety:
      "If the oil pressure warning light comes on or the temperature reaches the red zone, switch off the engine as soon as it's safe to do so. Continuing to drive can destroy the engine.",
  },

  timing: {
    name: "Timing belt replacement",
    short: "We replace timing belts or chains, rollers and tensioners on time.",
    h1: "Timing belt and chain replacement in Chișinău",
    metaTitle: "Timing belt replacement in Chișinău — belts and chains | ForceCar",
    metaDescription:
      "Timing belt or chain replacement at ForceCar, Chișinău: we check the rollers, tensioner and water pump and tell you clearly what needs replacing.",
    intro: [
      "The timing belt or chain keeps the pistons and valves moving in sync. If a worn belt snaps, on many engines the pistons hit the valves — and the repair costs far more than a timely replacement.",
      "At ForceCar we check the condition of the timing system and tell you what needs replacing — the belt or chain, rollers, tensioner and, where relevant, the water pump.",
    ],
    symptoms: [
      "You don't know when the timing belt was last replaced",
      "You're approaching the manufacturer's interval (in km or years)",
      "You hear a whirring, squealing or rattling from the timing area",
      "The engine is hard to start or runs unevenly",
      "You see traces of oil or coolant around the timing area",
      "You've recently bought a used car",
    ],
    checks: [
      "Belt condition: cracks, wear, tension",
      "Rollers and tensioner — play and noise",
      "The water pump, where it's driven by the timing belt",
      "Oil leaks from the seals",
      "For chains: noise on start-up and chain stretch",
    ],
    steps: [
      { title: "We identify the engine", text: "Make, model, engine and mileage tell us which timing system the car has." },
      { title: "We check its condition", text: "We inspect the belt or chain and the parts around it." },
      { title: "We tell you what to replace", text: "You know exactly which parts need replacing and why." },
      { title: "We fit and check", text: "We fit the new parts and check the timing and how the engine runs." },
    ],
    faq: [
      {
        q: "How many kilometres before the timing belt needs replacing?",
        a: "The interval varies from engine to engine and is set by the manufacturer, in kilometres and in years. If you don't know when it was last replaced, it's safer to have it checked.",
      },
      {
        q: "Are the rollers replaced together with the belt?",
        a: "Usually, yes — the rollers and tensioner wear together with the belt. On many engines replacing the water pump at the same time is also recommended. We'll tell you exactly what applies to your car.",
      },
      {
        q: "Does a timing chain need replacing too?",
        a: "A chain lasts longer than a belt, but it can stretch over time. A short metallic rattle on start-up can be a sign. We'll check it and tell you whether it needs replacing.",
      },
    ],
  },

  brakes: {
    name: "Brake repair",
    short: "Pads, discs, calipers and brake fluid — we inspect and repair the braking system.",
    h1: "Brake repair in Chișinău",
    metaTitle: "Brake repair in Chișinău — pads, discs, calipers | ForceCar",
    metaDescription:
      "Brake inspection and repair at ForceCar, Chișinău: pads, discs, calipers and brake fluid. We explain what needs replacing before any work.",
    intro: [
      "Brakes are the most important safety system on your car. A squeal, a vibrating pedal or a car that pulls to one side when braking are all signs that something needs checking.",
      "At ForceCar we inspect the whole braking system and tell you clearly which parts are worn and what needs replacing now.",
    ],
    symptoms: [
      "Squealing or metal-on-metal grinding when braking",
      "Vibration in the steering wheel or pedal when braking",
      "The pedal feels soft, sinks or needs more pressure",
      "The car pulls to one side under braking",
      "The brake or ABS warning light is on",
      "Stopping distances seem longer",
    ],
    checks: [
      "Pad thickness and disc condition",
      "Calipers and slide pins — making sure nothing is seized",
      "Brake hoses and lines",
      "Brake fluid level and condition",
      "Handbrake",
      "ABS sensors, if the warning light is on",
    ],
    steps: [
      { title: "Tell us what you feel", text: "Noise, vibration, a soft pedal — every detail helps." },
      { title: "We inspect the brakes", text: "We check the pads, discs, calipers and fluid." },
      { title: "We explain what's worn", text: "You learn what needs replacing now and why." },
      { title: "We repair and test", text: "After fitting, we check the brakes work properly." },
    ],
    faq: [
      {
        q: "How do I know my brake pads need replacing?",
        a: "Typical signs are a metallic squeal when braking, the pad wear warning light on the dashboard or weaker braking. Pad thickness is best confirmed during an inspection.",
      },
      {
        q: "Are discs replaced together with the pads?",
        a: "Not every time. Discs are replaced when they're below minimum thickness, warped or unevenly worn. We measure them and tell you if it's needed.",
      },
      {
        q: "Can I drive if the brake pedal feels soft?",
        a: "A soft or sinking pedal can mean air in the system, low fluid or a leak. It's a safety issue: avoid driving and book an inspection as soon as possible.",
      },
    ],
    safety:
      "If the brake pedal sinks to the floor, the car doesn't brake normally or you smell burning from the wheels, don't continue driving. Brakes are a safety issue.",
  },

  suspension: {
    name: "Suspension and steering",
    short: "Knocking over bumps, a steering wheel that pulls or vibrates — we find the worn part and replace it.",
    h1: "Suspension and steering repair in Chișinău",
    metaTitle: "Suspension and steering repair in Chișinău | ForceCar",
    metaDescription:
      "Suspension and steering inspection and repair at ForceCar, Chișinău: knocking over bumps, pulling or vibrating steering, worn shock absorbers and bushes.",
    intro: [
      "Potholes and uneven roads put a lot of stress on the suspension. When something knocks or the car no longer holds the road the way it used to, a suspension or steering part has usually worn out.",
      "We raise the car on a lift, find where the noise is coming from and tell you exactly which part needs repairing or replacing.",
    ],
    symptoms: [
      "Knocking or clunking over bumps",
      "The car pulls to one side or the steering wheel isn't straight",
      "The steering wheel vibrates or has play",
      "The car keeps bouncing after a pothole",
      "Tyres wear unevenly",
      "A creaking noise when turning",
    ],
    checks: [
      "Shock absorbers and springs",
      "Control arms, bushes and ball joints",
      "Drop links and the anti-roll bar",
      "Track rod ends and the steering rack",
      "Wheel bearings",
      "Tyre wear — it shows where the problem may be",
    ],
    steps: [
      { title: "Tell us when it happens", text: "Over bumps, when turning, braking or at speed." },
      { title: "We check it on a lift", text: "We look for play and worn parts in the suspension and steering." },
      { title: "We explain what we found", text: "You learn which part is worn and what needs replacing." },
      { title: "We replace and check", text: "After the repair we make sure the noise is gone." },
    ],
    faq: [
      {
        q: "Why is my suspension knocking?",
        a: "The most common causes are worn drop links, bushes, ball joints or shock absorbers. The noise can come from other parts too, which is why we check the car on a lift before recommending anything.",
      },
      {
        q: "Is a wheel alignment needed after suspension repairs?",
        a: "After replacing some parts — for example track rod ends or control arms — the wheel alignment should be checked. We'll tell you whether that applies to your repair.",
      },
      {
        q: "Is it dangerous to drive with a vibrating steering wheel?",
        a: "Vibrations can have simple causes, such as unbalanced wheels, but also safety-related ones, such as worn steering parts. Book an inspection as soon as possible.",
      },
    ],
  },

  mechanical: {
    name: "General mechanics",
    short: "Mechanical repairs, replacement of worn parts and routine checks for your car.",
    h1: "Car mechanic and maintenance in Chișinău",
    metaTitle: "Car mechanic in Chișinău — general repairs and maintenance | ForceCar",
    metaDescription:
      "General car mechanics and maintenance at ForceCar, Chișinău: mechanical repairs, replacement of worn parts and routine checks, clearly explained.",
    intro: [
      "Many big problems start small: a worn belt, a leak, a bearing that begins to hum. General mechanical work and timely maintenance help you avoid costly repairs.",
      "At ForceCar we inspect the car, replace worn parts and tell you what to keep an eye on next.",
    ],
    symptoms: [
      "Your service is due or overdue",
      "You hear a new noise, whine or rattle",
      "You see fluid leaks under the car",
      "The car behaves differently than before",
      "You're preparing the car for a long trip",
      "You want a general check after a long time without a service",
    ],
    checks: [
      "Fluid levels and condition",
      "Filters, belts and hoses",
      "Oil, coolant or fuel leaks",
      "Brakes, suspension and tyres — visual check",
      "Bearings, engine mounts and exhaust",
      "Battery and lights",
    ],
    steps: [
      { title: "Tell us what you need", text: "A service, a specific noise or a general check." },
      { title: "We inspect the car", text: "We check the main systems and note what we find." },
      { title: "We explain what's needed", text: "Separately: what's urgent and what can be planned." },
      { title: "We do the work", text: "Only the work you have approved." },
    ],
    faq: [
      {
        q: "How often should my car be serviced?",
        a: "Service intervals are set by the manufacturer, in kilometres and time, and depend on the engine and how you use the car. If you don't know when the last service was, a general check is a good start.",
      },
      {
        q: "What does general mechanics include?",
        a: "Everyday mechanical repairs: replacing worn parts and fixing leaks, noises and running problems that aren't related to the bodywork.",
      },
      {
        q: "Will you tell me if a job can wait?",
        a: "Yes. After the inspection we explain what's urgent for the car's safety and operation and what can be planned for later.",
      },
    ],
  },

  bodywork: {
    name: "Body repair",
    short: "We repair bodywork after accidents: straightening, panel work and replacing damaged parts.",
    h1: "Car body and collision repair in Chișinău",
    metaTitle: "Car body repair in Chișinău — collision repair | ForceCar",
    metaDescription:
      "Body repair, panel work and collision repair at ForceCar, Chișinău: straightening, replacement of damaged panels and preparation for painting.",
    intro: [
      "After an accident, even a small impact can hide damage to the car's structure: brackets, mounts or deformed body panels. At ForceCar we assess both the visible damage and what lies behind it.",
      "We repair the bodywork by straightening or replacing damaged panels and prepare the surface for painting, so the car looks and works as it should.",
    ],
    symptoms: [
      "You've had an accident, even a minor one",
      "There are dents, creases or deep scratches on the body",
      "Doors, bonnet or boot no longer close properly",
      "The gaps between panels are no longer even",
      "Rust has appeared on the bodywork",
      "You want to fix damage from a parking knock",
    ],
    checks: [
      "Damaged exterior panels: bumpers, wings, doors, bonnet",
      "Mounts, brackets and parts behind the bumper",
      "Panel alignment and gaps",
      "Body structure around the impact area",
      "Components in the damaged area — radiator, headlights, suspension",
      "What can be straightened and what must be replaced",
    ],
    steps: [
      { title: "We assess the damage", text: "We inspect the impact area and what's behind it." },
      { title: "We explain the repair", text: "What gets straightened, what gets replaced and how the job will go." },
      { title: "We repair the bodywork", text: "Straightening, panel replacement and preparation for paint." },
      { title: "We finish and check", text: "We check panel alignment and the components around the repair." },
    ],
    faq: [
      {
        q: "Can a small impact hide bigger problems?",
        a: "Yes. Behind a bumper or wing there may be broken brackets, sensors or damaged cooling system parts. That's why we also check the area behind the visible damage.",
      },
      {
        q: "Can I send photos of the damage before my visit?",
        a: "Yes. Attach them in the booking form — they help us get a first idea. An exact assessment is only possible once we've seen the car.",
      },
      {
        q: "When is a panel straightened and when is it replaced?",
        a: "It depends on how badly the panel is deformed and where. If straightening can restore the correct shape and strength, the panel is repaired; otherwise it's replaced. We explain the chosen option before starting.",
      },
    ],
  },

  paint: {
    name: "Car painting",
    short: "Body preparation, sanding and painting in a paint booth.",
    h1: "Car painting in Chișinău",
    metaTitle: "Car painting in Chișinău — preparation and paint | ForceCar",
    metaDescription:
      "Car painting at ForceCar, Chișinău: body preparation, sanding, primer and booth painting for repaired or scratched panels.",
    intro: [
      "Good paintwork starts with preparation: the surface has to be cleaned, repaired, sanded and primed properly. If preparation is rushed, defects show up after painting.",
      "At ForceCar we carefully prepare each panel and paint it in a paint booth — a controlled environment — for an even finish.",
    ],
    symptoms: [
      "Deep scratches or chipped paint",
      "Panels repaired after an accident that need painting",
      "Faded, dull or peeling paint",
      "Surface rust",
      "Colour differences between panels",
    ],
    checks: [
      "Paint condition and scratch depth",
      "Unevenness, small dents and surface rust",
      "What needs repairing before painting",
      "The shade of the car's current colour",
      "The area to paint: one panel or several",
    ],
    steps: [
      { title: "We assess the surface", text: "We see what needs repairing and what only needs paint." },
      { title: "We prepare the body", text: "Cleaning, repair, sanding and primer." },
      { title: "We paint in the booth", text: "Painting is done in a paint booth, in a controlled environment." },
      { title: "We finish", text: "We check the appearance and evenness of the finish." },
    ],
    faq: [
      {
        q: "Can just one panel be painted?",
        a: "Yes, in most cases only the repaired or scratched panel is painted. Sometimes, to blend the colour evenly, part of the neighbouring panels is worked on too. We'll tell you in advance what the job involves.",
      },
      {
        q: "Why does preparation before painting matter?",
        a: "Paint doesn't hide defects — it highlights them. The surface has to be cleaned, repaired and sanded properly, otherwise unevenness, bubbles or peeling will appear.",
      },
      {
        q: "How long does painting a panel take?",
        a: "It depends on how much preparation is needed and how many panels are involved. After the assessment we'll give you an estimated duration.",
      },
    ],
  },
};

export default en;
