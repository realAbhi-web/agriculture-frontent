import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const CropForm = () => {
  const [form, setForm] = useState({
    area: "",
    crop: "",
    season: "",
    crop_year: "",
    avg_rainfall: "",
    pesticides: "",
    annual_rainfall: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [tab, setTab] = useState("manual");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

try {
  const res = await fetch("http://127.0.0.1:8000/api/crop-yield/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      area: form.area,
      item: form.crop, // ✅ map your input field to "item"
      season: form.season,
      crop_year: parseInt(form.crop_year), // ✅ ensure number
      average_rainfall: parseFloat(form.avg_rainfall), // ✅ key name + number
      pesticides: parseFloat(form.pesticides),
      annual_rainfall: parseFloat(form.annual_rainfall),
    }),
  });

  const data = await res.json();

  if (data.success) {
    setResponse(`Predicted yield: ${data.prediction}`);
  } else {
    setResponse("Error: " + data.error);
  }
} catch (error) {
  console.error(error);
  setResponse("Error: Could not reach the server.");
}

setLoading(false);

    setForm({
      area: "",
      crop: "",
      season: "",
      crop_year: "",
      avg_rainfall: "",
      pesticides: "",
      annual_rainfall: "",
    });
  };

  return (
    <motion.div
      variants={slideIn("up", "tween", 0.2, 1)}
      className="bg-black-100 p-8 rounded-2xl mb-10"
    >
      <p className={styles.sectionSubText}>🌾 Crop Data</p>
      <h3 className={styles.sectionHeadText}>Crop yield Predictor</h3>

      {tab === "manual" && (
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8">
        {/* Soil Information Section */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4">
            🌱 Soil Information
          </h4>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <input
              type="text"
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="Enter area (hectares)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
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
              name="season"
              value={form.season}
              onChange={handleChange}
              placeholder="Enter season (e.g., Kharif/Rabi)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            <input
              type="number"
              name="crop_year"
              value={form.crop_year}
              onChange={handleChange}
              placeholder="Enter crop year"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            <input
              type="text"
              name="pesticides"
              value={form.pesticides}
              onChange={handleChange}
              placeholder="Enter pesticides used"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </div>
        </div>

        {/* Weather Information Section */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4">
            🌤️ Weather Information
          </h4>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <input
              type="number"
              name="avg_rainfall"
              value={form.avg_rainfall}
              onChange={handleChange}
              placeholder="Enter average rainfall (mm)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            <input
              type="number"
              name="annual_rainfall"
              value={form.annual_rainfall}
              onChange={handleChange}
              placeholder="Enter annual rainfall (mm)"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {response && <p className="text-white mt-4">{response}</p>}
      </form>
      )}
            {tab === "automatic" && (
        <div className="mt-8">
          <p className="text-gray-300 mb-4">
            Automatic mode uses your location to fetch weather & soil data.
          </p>
          <button
            type="button"
            onClick={() => alert("TODO: hook navigator.geolocation")}
            className="bg-tertiary py-3 px-6 rounded-xl text-white font-bold"
          >
            Use My Location
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default SectionWrapper(CropForm, "cropform");
