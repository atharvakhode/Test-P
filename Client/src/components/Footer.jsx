import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faInstagram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import logo from "../PineVox-Horizontal-bw.svg"

const Footer = () => {
  return (
    <div className="w-100">
      <footer className="mt-3" style={{ backgroundColor: '#2c2f54', color: '#ffffff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <a href="https://pinevox.com/" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img src={logo} alt="PineVox" style={{ height: '60px' }} />
              </a>
              <p>Your all weather communication partner</p>
              <div className="mt-2 pb-3 pb-md-0">
                <a href="https://www.facebook.com/people/PineVox/100093473274083/" className="text-white mr-4">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://twitter.com/pinevox" className="text-white mr-4">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.youtube.com/@pinevox" className="text-white mr-4">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="https://www.instagram.com/pinevox?r=nametag" className="text-white mr-4">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://www.linkedin.com/company/pinevox/" className="text-white mr-4">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
            <div className="col-md-6 text-md-right">
              <h5 className="pt-3 d-none d-md-block">Get in Touch</h5>
              <a href="https://maps.app.goo.gl/geFbcYcvkNkE8akP6" className="text-white d-block d-md-inline-block mb-md-2">
                Havelock Hub, 14 Havelock Place, Harrow, London HA1 1LJ
              </a>
              <p className="mb-md-2 mb-md-0">+44 330 179 6233</p>
              <a href="mailto:hello@pinevox.com" style={{ color: '#ffffff' }}>hello@pinevox.com</a>
            </div>
          </div>
          <div className="text-center mt-3 pb-3">
            <p> 2024 PineVox | <a href="https://pinevox.com/privacy-policy/" style={{ color: '#ffffff' }}>Privacy Policy</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
