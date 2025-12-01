import { useState } from "react";

export default function CertificateCard({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="w-[330px] bg-white/5 border border-[#0ffff3]/30 rounded-xl 
      shadow-[0_0_20px_#0ffff360] overflow-hidden hover:shadow-[0_0_45px_#0FFFF3] 
      hover:scale-[1.05] transition-all duration-400 cursor-pointer relative"
      data-aos="fade-up"
    >
      {/* Certificate Image */}
      <img
        src={data.img}
        className="w-full h-[220px] object-cover rounded-t-xl"
      />

      <div className="p-4">
        <h3 className="text-[#0FFFF3] font-bold text-lg">{data.title}</h3>

        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="mt-3 px-4 py-2 text-sm font-semibold rounded-lg border 
          border-[#0FFFF3] text-[#0FFFF3] hover:bg-[#0ffff32c] transition-all"
        >
          {open ? "Hide Details" : "View Details"}
        </button>

        {/* Description Expand Section */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            open ? "max-h-[300px] opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-300 text-[14px] leading-6">{data.desc}</p>
        </div>
      </div>
    </div>
  );
}
