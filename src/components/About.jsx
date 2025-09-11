import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import AnimatedText from "./AnimatedText";

const ServiceCard = ({ index, title, icon, description }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 1.3, 1.55)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='group bg-tertiary rounded-[20px] py-5 px-6 min-h-[280px] flex justify-center items-center flex-col text-center transition-all duration-300'
      >
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain mb-4'
        />

        {/* Show title by default */}
        <h3 className='text-white text-[20px] font-bold group-hover:hidden'>
          {title}
        </h3>

        {/* Show description on hover */}
<p className='opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 text-white text-[15px] leading-[22px] mt-2'>
  {description}
</p>

      </div>
    </motion.div>
  </Tilt>
);


const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}> <AnimatedText text="About Our Team"/></h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
  We are a dedicated team passionate about using technology to transform 
  agriculture. With expertise in AI, web development, and interactive 3D 
  experiences, we build innovative solutions that support farmers, improve 
  productivity, and promote sustainable farming practices. Our goal is to 
  combine modern technology with real-world agricultural needs to make a 
  meaningful impact on food and farming for the future.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
