import React, { useState } from "react";
import "./AddActivities.css";

import Boardgames from "../../assets/activities/boardgames.png";
import Camp from "../../assets/activities/camp.png";
import Cinema from "../../assets/activities/cinema.png";
import Cooking from "../../assets/activities/cooking.png";
import Dinner from "../../assets/activities/dinner.png";
import Diy from "../../assets/activities/diy.png";
import Gaming from "../../assets/activities/gaming.png";
import Gardening from "../../assets/activities/gardening.png";
import Groceries from "../../assets/activities/groceries.png";
import Museum from "../../assets/activities/museum.png";
import Picnic from "../../assets/activities/picnic.png";
import Reading from "../../assets/activities/reading.png";
import Swimming from "../../assets/activities/swimming.png";
import Walk from "../../assets/activities/walk.png";
import Zoo from "../../assets/activities/zoo.png";

const activityImages = [
  { src: Boardgames, alt: "Board games" },
  { src: Camp, alt: "Camp" },
  { src: Cinema, alt: "Cinema" },
  { src: Cooking, alt: "Cooking" },
  { src: Dinner, alt: "Dinner" },
  { src: Diy, alt: "DIY" },
  { src: Gaming, alt: "Gaming" },
  { src: Gardening, alt: "Gardening" },
  { src: Groceries, alt: "Groceries" },
  { src: Museum, alt: "Museum" },
  { src: Picnic, alt: "Picnic" },
  { src: Reading, alt: "Reading" },
  { src: Swimming, alt: "Swimming" },
  { src: Walk, alt: "Walk" },
  { src: Zoo, alt: "Zoo" }
];

const AddCustomActivities = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !selectedImage) return;

    const newActivity = { name, image: selectedImage };
    onAdd(newActivity);
    setName("");
    setSelectedImage(null);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>X</button>
        <h2>Add Custom Activity</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Activity name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="image-picker">
            {activityImages.map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                className={`image-option ${selectedImage === img.src ? "selected" : ""}`}
                onClick={() => setSelectedImage(img.src)}
              />
            ))}
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomActivities;
