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
   const [tab, setTab] = useState("manual");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  setLoading(true);

try {
  const response = await fetch("http://127.0.0.1:8000/api/fertilizer-recommendation/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
  temperature: form.temperature,
  humidity: form.humidity,
  moisture: form.moisture,
  soil_type: form.soil,      // ✅ map soil → soil_type
  crop_type: form.crop,      // ✅ map crop → crop_type
  nitrogen: form.nitrogen,
  potassium: form.potassium,
  phosphorous: form.phosphorus, // ✅ spelling consistent with backend
}),

  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const data = await response.json();

  if (data.success) {
    setRecommendation(data.recommendation);
  } else {
    setRecommendation("Error: " + (data.error || "Unknown error"));
  }
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
      <h3 className={styles.sectionHeadText}>Fertilizer Recommendations</h3>

            {/* Tab Switch */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          type="button"
          onClick={() => setTab("manual")}
          className={`px-4 py-2 font-medium ${
            tab === "manual" ? "border-b-2 border-green-500 text-green-500" : "text-gray-400"
          }`}
        >
          Manual
        </button>
        <button
          type="button"
          onClick={() => setTab("automatic")}
          className={`px-4 py-2 font-medium ${
            tab === "automatic" ? "border-b-2 border-green-500 text-green-500" : "text-gray-400"
          }`}
        >
          Automatic
        </button>
      </div>


      {tab === "manual" && (
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
      )}
import { useState } from "react";

{/* Automatic Mode */}
{tab === "automatic" && (
  <div className="mt-8">
    <p className="text-gray-300 mb-4">
      Automatic mode uses your location to fetch weather & soil data.
    </p>

    {/* Crop Selection Dropdown */}
    <div className="mb-4">
      <label className="block text-gray-400 mb-2 font-semibold">
        Select Your Crop
      </label>
      <select
        value={selectedCrop}
        onChange={(e) => setSelectedCrop(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
      >
        <option value="">-- Choose Crop --</option>
        <option value="Maize">Maize</option>
        <option value="Wheat">Wheat</option>
        <option value="Rice">Rice</option>
        <option value="Sugarcane">Sugarcane</option>
        <option value="Cotton">Cotton</option>
        <option value="Barley">Barley</option>
      </select>
    </div>

    {/* Use My Location Button */}
    <button
      type="button"
      onClick={() => {
        if (!selectedCrop) {
          alert("⚠️ Please select a crop first!");
          return;
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              const { latitude, longitude } = pos.coords;

              try {
                const res = await fetch(
                  `http://127.0.0.1:8000/api/auto-fertilizer-recommendation/${latitude}/${longitude}/${selectedCrop}/`
                );
                const data = await res.json();

                if (data.success) {
                  alert(`✅ Recommended Fertilizer: ${data.recommendation}`);
                } else {
                  alert(`⚠️ Error: ${data.error}`);
                }
              } catch (err) {
                console.error("API error:", err);
                alert("❌ Failed to fetch fertilizer recommendation.");
              }
            },
            (err) => {
              console.error("Geolocation error:", err);
              alert("❌ Could not get location: " + err.message);
            }
          );
        } else {
          alert("⚠️ Geolocation not supported by your browser.");
        }
      }}
      className="bg-tertiary py-3 px-6 rounded-xl text-white font-bold"
    >
      Use My Location
    </button>
  </div>
)}

    </motion.div>
  );
};

export default SectionWrapper(FertilizerForm, "fertilizer");
