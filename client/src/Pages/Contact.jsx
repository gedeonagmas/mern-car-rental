import { useState } from "react";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { useSendEmailMutation } from "../features/api/apiSlice";

function Contact() {
  const [emailData] = useSendEmailMutation();
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [fill, setFill] = useState(false);

  const sendEmail = () => {
    if (names.length > 1 && email.includes("@") && message.length > 1) {
      emailData({
        name: names,
        email,
        message,
      });
      setDone(true);
      setTimeout(() => {
        setDone(false);
      }, 5000);
    } else {
      setFill(true);
      setTimeout(() => {
        setFill(false);
      }, 8000);
    }
  };

  return (
    <>
      <section className="contact-page">
        {/* <HeroPages name="Contact" /> */}
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text mt-32">
              <h2>Need additional information?</h2>
              <p>A multifaceted professional skilled in multiple fields of research, development as well as a learning specialist. Over 15 years of experience.</p>
              <a href="/">
                <i className="fa-solid fa-phone"></i>&nbsp; (123) 456-7869
              </a>
              <a href="/">
                <i className="fa-solid fa-envelope"></i>&nbsp; carrental@carmail.com
              </a>
              <a href="/">
                <i className="fa-solid fa-location-dot"></i>&nbsp; addis ababa/ethiopia
              </a>
            </div>
            <div className="contact-div__form mt-40">
              {done && (
                <p className="absolute top-96 right-10 z-30 h-20 px-3 py-3 w-64 text-center text-xl font-extrabold text-emerald-500 border border-emerald-500">
                  Email Sent Thank you for contacting us!!
                </p>
              )}
              {fill && <p className="absolute top-96 right-10 z-30 h-20 px-3 py-3 w-64 text-center text-xl font-extrabold text-red-500 border border-red-500">Please fill out the form correctly!</p>}
              <form>
                <label>
                  Full Name <b>*</b>
                </label>
                <input onChange={(e) => setNames(e.target.value)} type="text" placeholder='E.g: "Joe Shmoe"' />

                <label>
                  Email <b>*</b>
                </label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@example.com" />

                <label>
                  Tell us about it <b>*</b>
                </label>
                <textarea onChange={(e) => setMessage(e.target.value)} placeholder="Write Here.." />

                <button onClick={sendEmail} type="button">
                  <i className="fa-solid fa-envelope-open-text"></i>&nbsp; Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Contact;
