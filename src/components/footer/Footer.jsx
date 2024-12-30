import { useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { db } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
const sections = [
  {
    title: "About Us",
    items: [
      { name: "Our History", a: "/about" },
      { name: "Leadership", a: "/about" },
      { name: "Beliefs", a: "/about" }
    ],
  },
  {
    title: "Locations",
    items: [
      { name: "Calgary", a: "/locations/calgary" },
      { name: "Toronto", a: "/locations/toronto" },
      { name: "Vancouver", a: "/locations/vancouver" }
    ],
  },
  {
    title: "Connect With Us",
    items: [
      { name: "Instagram", a: "https://www.instagram.com/kingswordcalgary?igsh=emV6anVob3d1OGly&utm_source=qr" },
      { name: "Youtube", a: "https://www.youtube.com/@kingswordcalgary8172" },
      { name: "Facebook", a: "https://www.facebook.com/share/ukpMwG5DDHkyCW4G/?mibextid=LQQJ4d" }
    ],
  },
];

const items = [
  { name: "Facebook", icon: FaFacebook, a: "https://www.facebook.com/share/ukpMwG5DDHkyCW4G/?mibextid=LQQJ4d" },
  { name: "Instagram", icon: FaInstagram, a: "https://www.instagram.com/kingswordcalgary?igsh=emV6anVob3d1OGly&utm_source=qr" },
  // { name: "Twitter", icon: FaTwitter, a: "https://twitter.com/" },
  { name: "Youtube", icon: FaYoutube, a: "https://www.youtube.com/@kingswordcalgary8172" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      setLoading(true); // Start loading
      try {
        await addDoc(collection(db, "newsletter"), {
          email: email,
          timestamp: new Date(),
        });
        setMessage("Thank you for subscribing!");
        setEmail("");  // Clear the input field
      } catch (error) {
        console.error("Error adding document: ", error);
        setMessage("Failed to subscribe. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  return (
    <footer className="w-full mt-24 bg-black text-gray-300 py-8 px-2">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
        {sections.map((section, index) => (
          <div key={index}>
            <h6 className="font-bold uppercase pt-2">{section.title}</h6>
            <ul>
              {section.items.map((item, i) => (
                item.a.startsWith("http") ? // Check if it's an external a
                  <li key={i} className="py-1 text-gray-500 hover:text-white cursor-pointer">
                    <a href={item.a} target="_blank" rel="noopener noreferrer">{item.name}</a>
                  </li>
                :
                  <li key={i} className="py-1 text-gray-500 hover:text-white cursor-pointer">
                    <a href={item.a}>
                      <a>{item.name}</a>
                    </a>
                  </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 pt-8 md:pt-2">
          <p className="font-bold uppercase">Subscribe to our newsletter</p>
          <p className="py-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
            <input
              className="w-full p-2 mr-4 rounded-md mb-4"
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // Disable input during loading
            />
            <button
              type="submit"
              className={`p-2 mb-4 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={loading} // Disable button during loading
            >
              {loading ? "Submitting..." : "Subscribe"}
            </button>
          </form>
          {message && <p className="text-gray-500 mt-2">{message}</p>}
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
        <p className="py-4">KingsWord Canada. All rights reserved</p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          {items.map((item, index) => (
            <a target="_blank" aria-label="social media as" href={item.a} key={index} className="hover:text-white">
              <item.icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;