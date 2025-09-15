import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const FertilizerForm = () => {
  const [form, setForm] = useState({
    crop: "",
    soil: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    moisture: "",
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/fertilizer/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) setRecommendation(data.recommendation);
      else setRecommendation("Error: " + data.error);
    } catch (error) {
      console.error(error);
      setRecommendation("Error: Could not reach the server.");
    }

    setLoading(false);
    setForm({
      crop: "",
      soil: "",
      ph: "",
      rainfall: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      temperature: "",
      humidity: "",
      moisture: "",
    });
  };

  return (
    <motion.div
      variants={slideIn("up", "tween", 0.2, 1)}
      className="bg-black-100 p-8 rounded-2xl mb-10"
    >
      <p className={styles.sectionSubText}>Fertilizer Guide</p>
      <h3 className={styles.sectionHeadText}>Get Recommendations</h3>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8">
        {/* Crop & Soil Section */}
        <div>
          <h4 className="text-white font-semibold mb-4">🌱 Soil Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="crop"
              value={form.crop}
              onChange={handleChange}
              placeholder="Enter crop name"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            <input
              type="text"
              name="soil"
              value={form.soil}
              onChange={handleChange}
              placeholder="Enter soil type"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            <input
              type="number"
              name="nitrogen"
              value={form.nitrogen}
              onChange={handleChange}
              placeholder="Nitrogen (N) value"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            <input
              type="number"
              name="phosphorus"
              value={form.phosphorus}
              onChange={handleChange}
              placeholder="Phosphorus (P) value"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            <input
              type="number"
              name="potassium"
              value={form.potassium}
              onChange={handleChange}
              placeholder="Potassium (K) value"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </div>
        </div>

        {/* Weather Section */}
        <div>
          <h4 className="text-white font-semibold mb-4">☀️ Weather Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="number"
              name="temperature"
              value={form.temperature}
              onChange={handleChange}
              placeholder="Temperature (°C)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            <input
              type="number"
              name="humidity"
              value={form.humidity}
              onChange={handleChange}
              placeholder="Humidity (%)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            <input
              type="number"
              name="moisture"
              value={form.moisture}
              onChange={handleChange}
              placeholder="Moisture (%)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
        >
          {loading ? "Fetching..." : "Get Recommendation"}
        </button>

        {recommendation && (
          <p className="text-white mt-4">{recommendation}</p>
        )}
      </form>
    </motion.div>
  );
};

export default SectionWrapper(FertilizerForm, "fertilizer");
