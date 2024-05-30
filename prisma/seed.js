const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const Chest = await prisma.MuscleGroup.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Chest",
    },
  });

  const Shoulder = await prisma.MuscleGroup.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "Shoulder",
    },
  });

  const Triceps = await prisma.MuscleGroup.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: "Triceps",
    },
  });

  const legs = await prisma.MuscleGroup.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: "Legs",
    },
  });

  const Abs = await prisma.MuscleGroup.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      name: "Abs",
    },
  });

  const Back = await prisma.MuscleGroup.upsert({
    where: { id: 6 },
    update: {},
    create: {
      id: 6,
      name: "Back",
    },
  });

  const Biceps = await prisma.MuscleGroup.upsert({
    where: { id: 7 },
    update: {},
    create: {
      id: 7,
      name: "Biceps",
    },
  });

  const Butt = await prisma.MuscleGroup.upsert({
    where: { id: 8 },
    update: {},
    create: {
      id: 8,
      name: "Butt",
    },
  });

  const Core = await prisma.MuscleGroup.upsert({
    where: { id: 9 },
    update: {},
    create: {
      id: 9,
      name: "Core",
    },
  });

  const GainWeightMuscles = await prisma.Goals.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Gain Weight/muscles",
    },
  });

  const LoseWeightFat = await prisma.Goals.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "Lose weight/fat",
    },
  });

  const MoveMore = await prisma.Goals.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: "Move more",
    },
  });

  const LoseFatAndGainMuslce = await prisma.Goals.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: "Lose fat and gain muscle",
    },
  });

  const Machine = await prisma.equipment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Machine",
    },
  });

  const Dumbbell = await prisma.equipment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "Dumbbell",
    },
  });

  const Barbell = await prisma.equipment.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: "Barbell",
    },
  });

  const Kettlebell = await prisma.equipment.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: "Kettlebell",
    },
  });

  const weightPlates = await prisma.equipment.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      name: "Weight Plates",
    },
  });

  const jumpRope = await prisma.equipment.upsert({
    where: { id: 6 },
    update: {},
    create: {
      id: 6,
      name: "Jump Rope",
    },
  });

  const medicineBall = await prisma.equipment.upsert({
    where: { id: 7 },
    update: {},
    create: {
      id: 7,
      name: "Medicine Ball",
    },
  });

  const ResistanceBands = await prisma.equipment.upsert({
    where: { id: 8 },
    update: {},
    create: {
      id: 8,
      name: "Resistance Bands",
    },
  });

  const Bench = await prisma.equipment.upsert({
    where: { id: 9 },
    update: {},
    create: {
      id: 9,
      name: "Bench",
    },
  });

  const BenchPress = await prisma.exercises.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Bench Press",
      howTo:
        "1. Lie on your back on a flat bench. Grip a barbell with hands slightly wider than shoulder width. The bar should be directly over the shoulders. 2. Press your feet firmly into the ground and keep your hips on the bench throughout the entire movement. 3. Keep your core engaged and maintain a neutral spine position throughout the movement. Avoid arching your back. 4. Slowly lift the bar or dumbbells off the rack, if using. Lower the bar to the chest, about nipple level, allowing elbows to bend out to the side, about 45 degrees away from the body. 5. Stop lowering when your elbows are just below the bench. Press feet into the floor as you push the bar back up to return to starting position.",
      musclegroup: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      equipment: { connect: [{ id: 3 }, { id: 4 }, { id: 5 }, { id: 9 }] },
      img: "benchpress.png",
    },
  });

  const squats = await prisma.exercises.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: "Squat",
      howTo:
        "1. Stand with your feet shoulder-width apart and your toes pointed slightly outward. 2. Hold a barbell across the upper back, with your hands slightly wider than shoulder-width apart. 3. Keep your chest up and your head facing forward. 4. Bend your knees and lower your hips back and down as if you were going to sit in a chair. Keep your knees behind your toes. 5. Continue lowering until your thighs are parallel to the floor, or for an advanced move, go below parallel. 6. Press through your heels to return to the starting position.",
      musclegroup: { connect: [{ id: 4 }, { id: 8 }] },
      img: "squats.png",
    },
  });

  const lateralRaises = await prisma.exercises.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "Lateral Raises",
      howTo:
        "1. Grab a couple of dummbells and stand with them by your sides. 2. Raise your arms out to the side until they are parallel to the floor. 3. Lower your arms back to the starting position.",
      musclegroup: { connect: [{ id: 2 }] },
      equipment: { connect: [{ id: 2 }] },
      img: "lateral-raises.png",
    },
  });

  const BicycleCrunch = await prisma.exercises.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: "Bicycle crunch",
      howTo:
        "1. Lie on a mat with hands behind the head and lift schoulders off the ground. 2. Alternating between sides, touch the end of your left elbow to your right knee as you twist your torso and bring the knee to the upper chest. During this movement simultaneously straighten the opposite leg. 3. Keep core tight during the movement and alternate the right arm and left knee. 4. Repeat for reps.",
      musclegroup: { connect: [{ id: 5 }] },
      img: "BicycleCrunch.jpg",
    },
  });

  const CableTwist = await prisma.exercises.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      name: "Cable twist",
      howTo:
        "1. Connect a handle to a cable machine, and set the pulley so the handle is right by your head. 2. With the pulley on the side of your body, grab the handle with both hands and fingers interlaced.     3. Position one foot near the pulley with your furthest foot away from the pulley. Both feet should be facing away from the pulley. 4. Pull the cable diagonally downwards with your arms straight. The pull should be done by rotating your torso and gradually lowering your arms until the handle is around your shoulder. 5. As the pulley makes its way around your body, gradually bend your knees as it approaches the bottom. 6. Return to the original position. 7. Repeat for reps.",
      musclegroup: { connect: [{ id: 5 }] },
      equipment: { connect: [{ id: 1 }] },
      img: "CableTwist.png",
    },
  });

  const Crunch = await prisma.exercises.upsert({
    where: { id: 6 },
    update: {},
    create: {
      id: 6,
      name: "Crunch",
      howTo:
        "1. Lie flat on a mat with knees bent at a 90 degree angle. Place fingers at the side of the head with shoulders lifted slightly above the floor.  2. Contract the abdominal muscles and raise the shoulders off the floor about 4 to 6 inches. 3. Hold the position at the top and slowly lower back to the starting position while breathing out. 4. Repeat for reps.",
      musclegroup: { connect: [{ id: 5 }] },
      img: "Crunch.jpg",
    },
  });

  const FlatKneeRaise = await prisma.exercises.upsert({
    where: { id: 7 },
    update: {},
    create: {
      id: 7,
      name: "Flat knee raise",
      howTo:
        "1. lie on a mat or a bench with legs extended in front, with your hands under your glutes. 2. Keep the core tight and bring your knees to your chest. 3. While keeping your core braced, lower legs back to the surface without allowing your feet to touch the floor to make the exercise easier, allow your heels to make contact with the ground. 4. Repeat for reps.",
      musclegroup: { connect: [{ id: 5 }] },
      equipment: { connect: [{ id: 9 }] },
      img: "FlatKneeRaise.png",
    },
  });

  const BicepCurl = await prisma.exercises.upsert({
    where: { id: 8 },
    update: {},
    create: {
      id: 8,
      name: "Bicep curl",
      howTo:
        "1. Stand while holding the barbell at shoulder with an underhand grip and elbows touching the side of the torso. 2. Holding the upper arm stationary, curl barbell up with palm facing forward. Lift the bar towards the shoulder until the bicep is fully contracted. Hold tis position for a second and squeeze the bicep. 3. Lower the bar to the starting position. 4. Repeat for reps.",
      musclegroup: { connect: [{ id: 2 }, { id: 7 }] },
      equipment: { connect: [{ id: 2 }] },
      img: "BicepCurl.jpg",
    },
  });

  const HammerCurl = await prisma.exercises.upsert({
    where: { id: 9 },
    update: {},
    create: {
      id: 9,
      name: "Hammer curl",
      howTo:
        "1. stand with a dumbbell in each hand and with elbows touching the side of the torso. 2. Using biceps, pull forearms and hands upward until fully contracted. 3. Squeeze biceps and lowly lower back to the starting position. 4. Repeat for reps.",
      musclegroup: { connect: [{ id: 2 }, { id: 7 }] },
      equipment: { connect: [{ id: 2 }] },
      img: "BicepCurl.jpg",
    },
  });

  const Skullcrusher = await prisma.exercises.upsert({
    where: { id: 10 },
    update: {},
    create: {
      id: 10,
      name: "Skullcrusher",
      howTo:
        "1. Sit down on a flat bench with the barbell on your lap. 2. Raise the dumbbells up to shoulder height by kicking your knees up. 3. While holding the dumbbells in place, lie down on the bench with your arms fully extended and the weights directly above your shoulders. 4. Lower the weights bending your elbows until the dumbbells are positioned to the side of your head. Make sure your elbows stay in place and that you slow your descent as the weight approaches your head. 5. Push the bar up to starting position. 6. Repeat for reps.",
      musclegroup: { connect: [{ id: 3 }, { id: 6 }] },
      equipment: { connect: [{ id: 9 }, { id: 3 }] },
      img: "Skullcrusher.jpg",
    },
  });

  const TricepExtension = await prisma.exercises.upsert({
    where: { id: 11 },
    update: {},
    create: {
      id: 11,
      name: "Tricep extension",
      howTo:
        "1. Grip the handle attachment with a supinated grip, securing the elbow to the side of the body. 2. Extend forearm to fully extend arm while flexing the triceps and exhaling. 3. Return to the starting position while inhaling. 4. Repeat for reps.",
      musclegroup: { connect: [{ id: 3 }] },
      equipment: { connect: [{ id: 1 }] },
      img: "TricepExtension.jpg",
    },
  });

  const BentOverRow = await prisma.exercises.upsert({
    where: { id: 12 },
    update: {},
    create: {
      id: 12,
      name: "Bent over row",
      howTo:
        "1. Holding the barbell with a pronated grip, bend the legs and tilt the torso with a straight back. 2. Flexing the core, keep head in neutral position, pull the barbell towards your stomach. 3. Squeeze your back as you breath out at the top position. 4. Inhale and lower the barbell to the starting position. 5. Repeat for reps.",
      musclegroup: { connect: [{ id: 6 }] },
      equipment: { connect: [{ id: 3 }] },
      img: "BentOverRow.png",
    },
  });

  const Deadlift = await prisma.exercises.upsert({
    where: { id: 13 },
    update: {},
    create: {
      id: 13,
      name: "deadlift",
      howTo:
        "1. Approach the bar so it is positioned across the center of the foot. 2. Place feet shoulder width and grip the bar at shoulder width apart. 3. Lower hips and bend knees to bring shins into the bar. Lift the chest and take deep breath to brace the core. Retract shoulder blades to take the slack out of the bar. 4. Pull bar upward extending hips and straightening the torso. 5. Return weight to the floor in a controlled motion by breaking at the hips and bending the legs. 6. Repeat for reps.",
      musclegroup: { connect: [{ id: 6 }, { id: 9 }, { id: 8 }] },
      equipment: { connect: [{ id: 3 }] },
      img: "Deadlift.jpg",
    },
  });

  const SeatedRow = await prisma.exercises.upsert({
    where: { id: 14 },
    update: {},
    create: {
      id: 14,
      name: "Seated row",
      howTo:
        "1. Grip the handle attachment with both hands and sit with chest upright and back straight. 2. With shoulders retracted, pull the handle towards the mid torso. 3. Squeeze the back muscles as the handle approaches the torso and hold before returning to the starting position. 4. Repeat for reps.",
      musclegroup: { connect: [{ id: 6 }, { id: 7 }, { id: 2 }, { id: 1 }] },
      equipment: { connect: [{ id: 1 }] },
      img: "SeatedRow.jpg",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
