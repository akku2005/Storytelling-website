import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExpand,
  FaHeart,
  FaShareAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [likes, setLikes] = useState(new Array(images.length).fill(0));
  const [likedImages, setLikedImages] = useState(
    new Array(images.length).fill(false)
  );

  const handleLike = (index) => {
    const newLikes = [...likes];
    const newLikedImages = [...likedImages];

    newLikes[index] += 1;
    newLikedImages[index] = true;

    setLikes(newLikes);
    setLikedImages(newLikedImages);
  };

  const handleShare = (image) => {
    navigator.clipboard.writeText(image).then(() => {
      alert("Image link copied to clipboard!");
    });
  };

  const handleNextImage = () => {
    const nextIndex =
      selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
    setSelectedImage(images[nextIndex]);
    setSelectedImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex =
      selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
    setSelectedImage(images[prevIndex]);
    setSelectedImageIndex(prevIndex);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {images.map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden rounded-2xl shadow-lg group"
          >
            {/* Image */}
            <img
              src={img}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-64 object-cover transition-transform duration-300"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 
              transition-all duration-300 flex items-center justify-center space-x-4 
              opacity-0 group-hover:opacity-100"
            >
              {/* Expand Button */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSelectedImage(img);
                  setSelectedImageIndex(index);
                }}
                className="bg-white/30 p-3 rounded-full backdrop-blur-sm"
              >
                <FaExpand className="text-white text-xl" />
              </motion.button>

              {/* Like Button */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLike(index)}
                className="bg-white/30 p-3 rounded-full backdrop-blur-sm flex items-center"
              >
                <FaHeart
                  className={`text-xl mr-2 ${
                    likedImages[index] ? "text-red-500" : "text-white"
                  }`}
                />
                <span className="text-white">{likes[index]}</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 mt-[1800px]"
            onClick={() => {
              setSelectedImage(null);
              setSelectedImageIndex(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedImageIndex(null);
                }}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <FaTimes className="text-3xl" />
              </button>

              {/* Previous Image Button */}
              {images.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevImage}
                  className="absolute left-0 bg-white/20 hover:bg-white/30 p-4 rounded-full"
                >
                  <FaChevronLeft className="text-white text-2xl" />
                </motion.button>
              )}

              {/* Selected Image */}
              <div className="flex flex-col items-center">
                <img
                  src={selectedImage}
                  alt="Expanded Image"
                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
                />

                {/* Image Details */}
                <div className="mt-4 text-white text-center">
                  <p>
                    Image {selectedImageIndex + 1} of {images.length}
                  </p>
                </div>
              </div>

              {/* Next Image Button */}
              {images.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNextImage}
                  className="absolute right-0 bg-white/20 hover:bg-white/30 p-4 rounded-full"
                >
                  <FaChevronRight className="text-white text-2xl" />
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
