import { useState } from "react";
import "./About.css";
import Skills from "./Skills";

function About() {
  const [flip, setFlip] = useState(false);

  return (
    <div className="about" id="about">
      <div className="title">
        <h2>About Me</h2>
      </div>

      <div className="content">
        <div className="photo-card" onClick={() => setFlip(!flip)}>
          <div className={flip ? "photo-inner flip" : "photo-inner"}>
        

            <div className="photo-front">
              <img src="img3.png" alt="" />
            </div>
            <div className="photo-back">
              <img src="img4.png" alt="" />
            </div>
          </div>
        </div>

        <div className="text-about">
          <p>
            Hi, I'm Pranav Durge, a final year Electronics and Computer engg. student. 
            I enjoy building modern, responsive, and
            interactive web interfaces that provide a great user experience. I
            focus on clean design, smooth animations, and writing efficient code
            using modern web technologies. I'm always learning new tools and
            improving my skills to create better digital products. My goal is to
            combine creativity with technology to build websites that are both
            beautiful and functional.
          </p>
        </div>
      </div>

      <Skills />
    </div>
  );
}

export default About;
