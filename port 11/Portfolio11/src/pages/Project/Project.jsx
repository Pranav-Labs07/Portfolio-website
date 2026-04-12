import "./Project.css";

import img1 from "../../assets/images/kuber logo.png";
import img2 from "../../assets/images/port.png";
import img3 from "../../assets/images/ridewithus.png";

const projects = [
  {
    title: "Kuber",
    img: img1,
    desc: "Inspired by Uber",
    skills: ["React", "Tailwind CSS", "Node.js", "Express.js", "Mongo DB"]
  },

  {
    title: "Portfolio Website",
    img: img2,
    desc: "Personal portfolio to showcase my design and coding projects.",
    skills: ["HTML", "CSS", "Bootstrap"]
  },

  {
    title: "RidewithUs",
    img: img3,
    desc: "Ride Sharing platform for 2-wheelers and 4-wheelers",
    skills: ["React", "Tailwind CSS", "Node.js", "Express.js", "Mongo DB"]
  },

 
];

export default function Project() {

  return (

    <section className="project reveal" id="project">

      <div className="title">
        <h2>Project</h2>
      </div>

      <div className="projects-container">

        {projects.map((project, index) => (

          <div className="project-card" key={index}>

            <img src={project.img} alt={project.title} />

            <h3>{project.title}</h3>

            <p>{project.desc}</p>

            <div className="skills">
              {project.skills.map((skill, i) => (
                <a href="#" key={i}>{skill}</a>
              ))}
            </div>

            <div className="btns">

              <a href="#" className="btn">
                <i className="fab fa-github"></i> GitHub
              </a>

              <a href="#" className="btn">
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}