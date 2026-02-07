import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const trainers = [
    { name: "Atul Singh", role: "Strength Coach", img: "/assets/gymTrainerProfile.jpg" },
    { name: "Atul Singh", role: "Strength Coach", img: "/assets/gymTrainerProfile.jpg" },
    { name: "Atul Singh", role: "Strength Coach", img: "/assets/gymTrainerProfile.jpg" },
    { name: "Atul Singh", role: "Strength Coach", img: "/assets/gymTrainerProfile.jpg" },
  // Add more trainers if needed
];

const TrainerSection = () => {
  const [showTrainers, setShowTrainers] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const trainerSection = document.getElementById("trainers");
      if (trainerSection) {
        const rect = trainerSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setShowTrainers(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="trainers" className="py-10 bg-gray-900 text-white">
      <h2 className="text-center text-3xl font-bold mb-6">Meet Our Trainers</h2>

      <div
        className={`px-6 ${
          trainers.length === 1
            ? "flex justify-center" // Center if only one trainer
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        }`}
      >
        {trainers.map((trainer, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 text-center w-80"
            initial={{ opacity: 0, y: 50 }}
            animate={showTrainers ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img src={trainer.img} alt={trainer.name} className="w-full h-60 object-cover rounded-lg scale-100" />
            <h3 className="mt-4 text-xl font-semibold">{trainer.name}</h3>
            <p className="text-gray-400">{trainer.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrainerSection;
