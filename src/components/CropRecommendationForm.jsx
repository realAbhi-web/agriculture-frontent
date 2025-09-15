import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const CropRecommendationForm = () => {
  const [form, setForm] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/crop-recommendation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data?.success) {
        // expecting API returns { success: true, crop: "Rice" } or message
        setResult(data.crop || data.message || "Recommendation generated.");
      } else {
        setResult("Error: " + (data?.error || "Unexpected response"));
      }
    } catch (err) {
      console.error(err);
      setResult("Error: Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () =>
    setForm({
      N: "",
      P: "",
      K: "",
      temperature: "",
      humidity: "",
      ph: "",
      rainfall: "",
    });

  return (
    <motion.div
      variants={slideIn("up", "tween", 0.2, 1)}
      className="bg-black-100 p-8 rounded-2xl mb-10"
    >
      <p className={styles.sectionSubText}>Crop Recommendation</p>
      <h3 className={styles.sectionHeadText}>Predict Best Crop</h3>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8">
        {/* Nutrients */}
        <div>
          <h4 className="text-white font-semibold mb-4">🧪 Soil Nutrients</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="number"
              name="N"
              value={form.N}
              onChange={handleChange}
              placeholder="Nitrogen (N)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
            <input
              type="number"
              name="P"
              value={form.P}
              onChange={handleChange}
              placeholder="Phosphorus (P)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
            <input
              type="number"
              name="K"
              value={form.K}
              onChange={handleChange}
              placeholder="Potassium (K)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </div>
        </div>

        {/* Environment */}
        <div>
          <h4 className="text-white font-semibold mb-4">🌦️ Environment</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <input
              type="number"
              name="temperature"
              value={form.temperature}
              onChange={handleChange}
              placeholder="Temperature (°C)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
            <input
              type="number"
              name="humidity"
              value={form.humidity}
              onChange={handleChange}
              placeholder="Humidity (%)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
            <input
              type="number"
              step="0.1"
              name="ph"
              value={form.ph}
              onChange={handleChange}
              placeholder="pH"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
            <input
              type="number"
              name="rainfall"
              value={form.rainfall}
              onChange={handleChange}
              placeholder="Rainfall (mm)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Predicting..." : "Get Crop"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-[#2a2a2a] py-3 px-6 rounded-xl text-white font-medium"
          >
            Reset
          </button>
        </div>

        {result && (
          <div className="text-white mt-2">
            <span className="opacity-80">Recommended Crop: </span>
            <span className="font-semibold">{result}</span>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default SectionWrapper(CropRecommendationForm, "crop-recommendation");
