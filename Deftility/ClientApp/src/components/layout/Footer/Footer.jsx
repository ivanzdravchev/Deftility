import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-useful-links">
          <div className="footer-section">
            <div>
              <p>For Clients</p>
              <ul>
                <li>
                  <Link to="#">How to Hire</Link>
                </li>
                <li>
                  <Link to="#">Talents Catalogue</Link>
                </li>
                <li>
                  <Link to="#">Hire in the EU</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-section">
            <div>
              <p>For Talent</p>
              <ul>
                <li>
                  <Link to="#">How to Find Work</Link>
                </li>
                <li>
                  <Link to="#">Find Freelance jobs in the EU</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-section">
            <div>
              <p>Resources</p>
              <ul>
                <li>
                  <Link to="#">Help & Support</Link>
                </li>
                <li>
                  <Link to="#">Reviews</Link>
                </li>
                <li>
                  <Link to="#">Resources</Link>
                </li>
                <li>
                  <Link to="#">Blog</Link>
                </li>
                <li>
                  <Link to="#">Community</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-section">
            <div>
              <p>Company</p>
              <ul>
                <li>
                  <Link to="#">About Us</Link>
                </li>
                <li>
                  <Link to="#">Contact Us</Link>
                </li>
                <li>
                  <Link to="#">Careers</Link>
                </li>
                <li>
                  <Link to="#">Safety & Security</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-social-media">
          <span>Follow us on social media</span>
            <Link to="#">
              <svg viewBox="0 0 14 14" aria-hidden="true" role="img"><path d="M10.92 2.24H8.75c-.28 0-.63.07-.63.56v2.24h2.8v2.24h-2.8V14H5.88V7.28h-2.8V5.04h2.8V3.08C5.88 1.05 6.86 0 8.75 0h2.17v2.24z"></path></svg>
            </Link>
            <Link to="#">
              <svg viewBox="0 0 14 14" aria-hidden="true" role="img"><path d="M3.08 13.93H.07V4.27h3.01v9.66zM1.54 3.08C.63 3.08 0 2.45 0 1.61S.63.14 1.61.14c.98 0 1.54.63 1.54 1.47s-.56 1.47-1.61 1.47zM14 13.93h-3.01V8.61c0-1.26-.42-2.1-1.54-2.1-.84 0-1.33.56-1.54 1.12-.07.21-.07.49-.07.77v5.53H4.83V7.35c0-1.19-.07-2.17-.07-3.08h2.59l.14 1.33h.07c.42-.63 1.33-1.54 2.94-1.54 1.96 0 3.43 1.33 3.43 4.13v5.74H14z"></path></svg>
            </Link>
            <Link to="#">
              <svg viewBox="0 0 14 14" aria-hidden="true" role="img"><path d="M12.6 4.13v.35c0 3.78-2.87 8.19-8.19 8.19-1.61 0-3.15-.49-4.41-1.26.21 0 .49.07.7.07 1.33 0 2.59-.49 3.57-1.26-1.26 0-2.31-.84-2.66-1.96.21 0 .35.07.56.07.28 0 .56 0 .77-.07C1.61 7.98.7 6.86.7 5.46v-.07c0 .21.77.35 1.26.35C1.19 5.25.63 4.34.63 3.36c0-.56.14-1.05.42-1.47C2.45 3.64 4.55 4.76 7 4.9c-.14-.28-.21-.49-.21-.7 0-1.61 1.26-2.87 2.87-2.87.84 0 1.54.35 2.1.91.63-.14 1.26-.35 1.82-.7-.21.7-.7 1.26-1.26 1.61.56-.07 1.12-.21 1.68-.42-.42.49-.84.98-1.4 1.4z"></path></svg>
            </Link>
            <Link to="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" aria-hidden="true" role="img"><path d="M13.707 3.608a1.76 1.76 0 00-1.237-1.246C11.379 2.068 7 2.068 7 2.068s-4.378 0-5.47.294A1.764 1.764 0 00.292 3.608C0 4.707 0 7 0 7s0 2.293.292 3.392a1.76 1.76 0 001.238 1.245c1.092.295 5.47.295 5.47.295s4.378 0 5.469-.295a1.755 1.755 0 001.237-1.245C14 9.293 14 7 14 7s0-2.293-.293-3.392zM5.568 9.082V4.918L9.228 7l-3.66 2.082z"></path></svg>
            </Link>
        </div>
        <div className="footer-copyright">
          <p>Copyright © {new Date().getFullYear()} Draftility Technology</p>
        </div>
      </div>
    </div>
  );
}
