import React, { useState, useEffect, useMemo } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const contactEndpoint = useMemo(() => {
    if (import.meta.env.VITE_CONTACT_API_URL) {
      return import.meta.env.VITE_CONTACT_API_URL;
    }
    if (typeof window !== "undefined") {
      return window.location.origin.includes("localhost")
        ? "http://localhost:5000/api/contact"
        : "/api/contact";
    }
    return "http://localhost:5000/api/contact";
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Swal.fire({
        title: "Missing information",
        text: "Please fill out your name, email, and message before sending.",
        icon: "warning",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    setIsSubmitting(true);

    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while we send your message",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to send your message.");
      }

      // Show success message
      Swal.fire({
        title: "Success!",
        text: data?.message || "Your message has been sent successfully!",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.message ||
          "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#0FFFF3]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #0FFFF3 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

    <div
  className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0"
  id="Contact"
>
  <div className="container px-[1%] grid grid-cols-1 lg:grid-cols-2 gap-12 justify-center">

    {/* LEFT — CONTACT FORM */}
    <div
      data-aos="fade-right"
      data-aos-duration="1200"
      className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 hover:shadow-[#6366f1]/20 transition-all duration-300"
    >
      <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#0FFFF3]">
        Get in Touch
      </h2>
      <p className="text-gray-400 mb-8">
        Have something to discuss? Send me a message and let's talk.
      </p>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <User className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white"
          />
        </div>

        <div className="relative group">
          <Mail className="absolute left-4 top-4 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white"
          />
        </div>

        <div className="relative group">
          <MessageSquare className="absolute left-4 top-4 text-gray-400" />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-4 pl-12 h-40 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#6366f1] to-[#0FFFF3] text-white py-4 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300"
        >
          <Send className="inline mr-2" /> Send Message
        </button>
      </form>
    </div>


{/* RIGHT SECTION – Contact Information */}
<div 
  className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-[0_0_35px_rgba(15,255,243,0.18)]
  border border-white/10 hover:shadow-[0_0_45px_rgba(15,255,243,0.35)] transition-all duration-500 w-full"
>

  <h2 className="text-3xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#0FFFF3] to-[#6366f1]">
    Contact Information
  </h2>


  {/* ADDRESS */}
  <div className="flex items-start gap-4 mb-8">
    <div className="w-11 h-11 rounded-xl flex justify-center items-center
      bg-gradient-to-r from-[#0FFFF3] to-[#6366f1] text-white text-xl shadow-lg">
      <i className="fa-solid fa-location-dot"></i>
    </div>
    <div>
      <p className="text-xs text-gray-400">ADDRESS</p>
      <p className="font-medium text-white leading-tight">
        56, Shyam Vila Row House Sarthana Jakatnaka<br/>
        Surat – 395006
      </p>
    </div>
  </div>


  {/* MAIL */}
  <div className="flex items-start gap-4 mb-8">
    <div className="w-11 h-11 rounded-xl text-white text-xl shadow-lg flex justify-center items-center
      bg-gradient-to-r from-[#0FFFF3] to-[#6366f1]">
      <i className="fa-solid fa-envelope-open-text"></i>
    </div>
    <div>
      <p className="text-xs text-gray-400">MAIL ME</p>

      {/* clickable email */}
      <a href="mailto:gohilkartik007@gmail.com" 
        className="font-medium text-white hover:text-[#0FFFF3] transition">
        gohilkartik007@gmail.com
      </a>
    </div>
  </div>



  {/* CALL */}
  <div className="flex items-start gap-4 mb-10">
    <div className="w-11 h-11 rounded-xl text-white text-xl shadow-lg flex justify-center items-center
      bg-gradient-to-r from-[#0FFFF3] to-[#6366f1]">
      <i className="fa-solid fa-phone"></i>
    </div>
    <div>
      <p className="text-xs text-gray-400">CALL ME</p>

      {/* Clickable phone */}
      <a href="tel:+918849267942" 
        className="font-medium text-white hover:text-[#0FFFF3] transition">
        +91 8849267942
      </a>
    </div>
  </div>

{/* BOTTOM SOCIAL ICONS  */}
<div className="flex gap-5 pt-6 border-t border-white/10">

  {/* LinkedIn */}
  <a 
    href="https://www.linkedin.com/in/gohil-kartik-19177a307"
    target="_blank"
    className="w-12 h-12 rounded-xl bg-[#2b2d41]/60 backdrop-blur-md
      flex justify-center items-center text-[#0FFFF3] hover:scale-110
      hover:bg-[#2b2d41]/80 transition duration-300 text-2xl">
      <i className="fab fa-linkedin-in"></i>
  </a>

  {/* Email */}
  <a 
    href="mailto:gohilkartik007@gmail.com"
    className="w-12 h-12 rounded-xl bg-[#2b2d41]/60 backdrop-blur-md
      flex justify-center items-center text-[#0FFFF3] hover:scale-110
      hover:bg-[#2b2d41]/80 transition duration-300 text-2xl">
      <i className="fa-regular fa-envelope"></i>
  </a>

  {/* GitHub */}
  <a 
    href="https://github.com/Kkartik9660"
    target="_blank"
    className="w-12 h-12 rounded-xl bg-[#2b2d41]/60 backdrop-blur-md
      flex justify-center items-center text-[#0FFFF3] hover:scale-110
      hover:bg-[#2b2d41]/80 transition duration-300 text-2xl">
      <i className="fab fa-github"></i>
  </a>

  {/* Instagram */}
  <a 
    href="https://www.instagram.com/gohilkartik48/"
    target="_blank"
    className="w-12 h-12 rounded-xl bg-[#2b2d41]/60 backdrop-blur-md
      flex justify-center items-center text-[#0FFFF3] hover:scale-110
      hover:bg-[#2b2d41]/80 transition duration-300 text-2xl">
      <i className="fab fa-instagram"></i>
  </a>

</div>


</div>
</div>

  </div>


    </>
  );
};

export default ContactPage;