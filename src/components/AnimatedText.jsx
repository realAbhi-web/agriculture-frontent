// AnimatedText.jsx
const AnimatedText = ({ text }) => {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} className="char">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
};

export default AnimatedText;
