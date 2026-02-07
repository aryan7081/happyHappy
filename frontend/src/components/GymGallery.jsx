import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/assets/gallery01.jpeg",
  "/assets/gallery02.jpeg",
  "/assets/gallery03.jpeg",
  "/assets/gallery04.jpeg",
  "/assets/gallery05.jpeg",
  "/assets/gallery05.jpeg",
];

const GymGallery = () => {
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const gallery = document.getElementById("gallery");
      if (gallery) {
        const rect = gallery.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setShowGallery(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="gallery" className="py-10 text-white">
      <h2 className="text-center text-3xl font-bold mb-16">Our Gym Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={showGallery ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img src={src} alt={`Gym ${index + 1}`} className="w-full h-60 object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GymGallery;
