import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0FFFF3]/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html", name: "HTML", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { icon: "css", name: "CSS", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { icon: "js", name: "JavaScript", link: "https://www.javascript.com/" },
  { icon: "ts", name: "TypeScript", link: "https://www.typescriptlang.org/" },
  { icon: "nodejs", name: "NodeJS", link: "https://nodejs.org/" },
  { icon: "express", name: "ExpressJS", link: "https://expressjs.com/" },
  { icon: "mongodb", name: "MongoDB", link: "https://www.mongodb.com/" },   // ← तारा click example mate
  { icon: "postgres", name: "PostgreSQL", link: "https://www.postgresql.org/" },
  { icon: "mysql", name: "MySQL", link: "https://www.mysql.com/" },
];
const certificatesList = [
  {
    img: "/certificates/image.png",
    title: "React JS",
    desc: "Developed and maintained user-friendly web applications using React.js, enhancing user experience and performance Collaborated with a team of developers to design and implement new features, ensuring high-quality code and adherence to best practices. IP Participated in code reviews and contributed to team discussions, improving overall project efficiency. Completed the internship with a focus on building responsive and dynamic web applications."
  },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

const fetchData = useCallback(async () => {
  try {
    const projectSnapshot = await getDocs(collection(db, "projects"));
    const certificateSnapshot = await getDocs(collection(db, "certificates"));

    const projectData = projectSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    const certificateData = certificateSnapshot.docs.map((doc) => doc.data());

    setProjects(projectData);
    setCertificates(certificateData);

    console.log("🔥 Projects Loaded:", projectData); // MUST show in console
  } catch (error) {
    console.log("❌ Error fetching data:", error);
  }
}, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#0FFFF3]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #0FFFF3 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(0, 255, 243, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
  value={value}
  onChange={handleChange}
  textColor="secondary"
  indicatorColor="secondary"
  variant="fullWidth"
  sx={{
    minHeight: "70px",
    "& .MuiTab-root": {
      fontSize: { xs: "0.9rem", md: "1rem" },
      fontWeight: "600",
      color: "#94a3b8",
      textTransform: "none",
      transition: "all 0.4s",
      padding: "20px 0",
      zIndex: 1,
      margin: "8px",
      borderRadius: "12px",
      "&.Mui-selected": { color: "#fff" }
    },
    "& .MuiTabs-indicator": { height: 0 }
  }}
>
  <Tab icon={<Code className="mb-2 w-5 h-5" />} label="Projects" {...a11yProps(0)} />
<Tab icon={<Boxes className="mb-2 w-5 h-5" />} label="Certificate" {...a11yProps(1)} /> 
  <Tab icon={<Boxes className="mb-2 w-5 h-5" />} label="Tech Stack" {...a11yProps(2)} />     {/* ← FIXED */}
</Tabs>

        </AppBar>

<SwipeableViews
  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
  index={value}
  onChangeIndex={setValue}
>

  {/* =================== PROJECTS =================== */}
  <TabPanel value={value} index={0} dir={theme.direction}>
    <div className="container mx-auto flex justify-center items-center overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <div
            key={project.id || index}
            data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
            data-aos-duration={index % 3 === 1 ? "1200" : "1000"}
          >
            <CardProject
              Img={project.Img}
              Title={project.Title}
              Description={project.Description}
              Link={project.Link}
              id={project.id}
            />
          </div>
        ))}
      </div>
    </div>
  </TabPanel>

{/* ===================== CERTIFICATE SECTION ===================== */}
<TabPanel value={value} index={1} dir={theme.direction}>
  <div className="container mx-auto py-10">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

 {[
  {
    img: "/certificates/image.png",
    title: "React JS Certification",
    company: "Webito Infotech",
    logo: "/certificates/webito.png",
    desc: `Developed and maintained user-friendly web applications using React.js, enhancing user experience and performance Collaborated with a team of developers to design and implement new features, ensuring high-quality code and adherence to best practices. IP Participated in code reviews and contributed to team discussions, improving overall project efficiency.`
  },
  {
    img: "/certificates/Odan.jpeg",
    title: "Node JS Certification",
    company: "Odan Infotech",
    logo: "/certificates/odan.png",   // <-- Add your odan logo here
    desc: `Developed and implemented backend services using Node.js, improving API performance and reliability. Worked with JavaScript and TypeScript to build scalable server-side logic while ensuring clean, maintainable code. Utilized MongoDB, PostgreSQL and MySQL for database design, data handling and query optimization.`
  }
].map((cert,index)=>(

  <div key={index}
    className="bg-[#061018] border border-[#0FFFF3]/30 rounded-xl overflow-hidden 
               shadow-md/40 transition duration-300 pb-6">

    {/* 1️⃣ Certificate Image */}
    <img src={cert.img} className="w-full h-64 object-cover border-b border-[#0FFFF3]/20"/>

    {/* 2️⃣ Dynamic — Show different company logo per card */}
    <div className="flex items-center gap-3 mt-5 ml-6">

      {/* Logo Highlight + Glow */}
    <img 
  src={cert.logo}
  className="w-14 h-14 object-contain transition-all duration-300 
            hover:scale-125 hover:brightness-150
            drop-shadow-[0_0_10px] hover:drop-shadow-[0_0_20px_#0FFFF3]"
/>

      <h2 className="text-white font-semibold text-lg">{cert.company}</h2>
    </div>

    {/* 3️⃣ Title Below Left */}
    <h3 className="text-[#0FFFF3] text-[20px] font-bold mt-1 ml-10">{cert.title}</h3>

    {/* 4️⃣ Description & Button */}
    <div className="px-5 mt-4">
      <p className={`text-gray-300 text-sm duration-300 
        ${selectedCert===index?"":"line-clamp-2"}`}>
        {cert.desc}
      </p>
       <div className="flex justify-end mt-4">
       <button 
      onClick={()=>setSelectedCert(selectedCert===index?null:index)}
      className="px-4 py-1.5 text-sm border border-[#0FFFF3] text-[#0FFFF3] rounded-lg 
                 hover:bg-[#0FFFF3]/20 transition duration-300"
    >
      {selectedCert===index?"Hide":"Details"}
    </button>
        </div>

    </div>

  </div>
))}





    </div>
  </div>
</TabPanel>



 {/* =================== TECH STACK =================== */}
<TabPanel value={value} index={2} dir={theme.direction}>
  <div className="w-full overflow-hidden py-10 relative">

    {/* 🔥 Auto Infinite Smooth Slide Animation */}
   <div className="flex gap-8 whitespace-nowrap animate-tech-scroll">
  {techStacks.concat(techStacks).map((item, i) => (
    
    <a href={item.link} target="_blank" rel="noopener noreferrer" key={i}>
      <div 
        className="min-w-[150px] flex flex-col items-center rounded-xl px-6 py-6 
        bg-white/5 border border-[#0FFFF3]/20 backdrop-blur-md 
        hover:border-[#0FFFF3] shadow-[0_0_10px_rgba(0,255,243,0.25)]
        hover:shadow-[0_0_25px_#0FFFF3] hover:scale-110
        transition-all duration-400 cursor-pointer"
      >

        <img 
          src={`https://skillicons.dev/icons?i=${item.icon}`} 
          className="w-14 h-14 mb-2 drop-shadow-[0_0_8px_#0FFFF3]"
        />

        <p className="text-[#0FFFF3] font-semibold text-sm">{item.name}</p>
      </div>
    </a>

  ))}
</div>

  </div>


  {/* --- Animation CSS --- */}
  <style>
    {`
      .animate-tech-scroll{
        animation: scrollx 18s linear infinite;
      }
      @keyframes scrollx{
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}
  </style>
</TabPanel>



</SwipeableViews>

      </Box>
    </div>
  );
}