import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);

  const subscribeHandler = () => {
    if (email.includes("@")) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 8000);
    } else {
      setInvalid(true);
      setTimeout(() => {
        setInvalid(false);
      }, 7000);
    }
  };
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            <ul className="footer-content__1">
              <li>
                <span>CAR</span> Rental
              </li>
              <li>We offers a big range of vehicles for all your driving needs. We have the perfect car to meet your needs.</li>
              <li>
                <a href="tel:123456789">
                  <i className="fa-solid fa-phone"></i> &nbsp; (123) -456-789
                </a>
              </li>

              <li>
                <a
                  href="mailto: 
                carrental@gmail.com"
                >
                  <i className="fa-solid fa-envelope"></i>
                  &nbsp; carrental@gmail.com
                </a>
              </li>

              <li>
                <a style={{ fontSize: "14px" }} target="_blank" rel="noreferrer" href="https://xpeedstudio.com/">
                  Design by XpeedStudio
                </a>
              </li>
            </ul>

            <ul className="footer-content__2">
              <li>Company</li>
              <li>
                <a href="#home">New York</a>
              </li>
              <li>
                <a href="#home">Careers</a>
              </li>
              <li>
                <a href="#home">Mobile</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
              <li>
                <a href="#home">How we work</a>
              </li>
            </ul>

            <ul className="footer-content__2">
              <li>Working Hours</li>
              <li>Mon - Fri: 9:00AM - 9:00PM</li>
              <li>Sat: 9:00AM - 19:00PM</li>
              <li>Sun: Closed</li>
            </ul>

            <ul className="footer-content__2">
              <li>Subscription</li>
              <li>
                <p>Subscribe your Email address for latest news & updates.</p>
              </li>
              {invalid && <p className="text-xl font-extrabold">Invalid Email please try with the correct one!</p>}
              {success && <p className="text-xl font-extrabold">Subscription Added Thank You!</p>}
              <li>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email Address"></input>
              </li>
              <li>
                <button onClick={subscribeHandler} className="submit-email">
                  Submit
                </button>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
