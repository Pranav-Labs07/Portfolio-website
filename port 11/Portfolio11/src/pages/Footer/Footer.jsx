import "./Footer.css"
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer(){

  return(

    <footer className="footer">

      <div className="footer-container">

        <p>© 2026 Pranav</p>

        <div className="social-icons">

          <a href="https://github.com/PranavD2004"><FaGithub/></a>
          <a href="https://www.linkedin.com/in/pranav-durge-750682259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin/></a>
          <a href="https://www.instagram.com/pranavdurge77?igsh=dHVtaWl3a3ltbmQx"><FaInstagram/></a>

        </div>

      </div>

    </footer>

  )

}

export default Footer;