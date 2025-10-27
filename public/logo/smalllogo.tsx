import React from "react";

export default function SmallLogo() {
  return (
    <div className="flex flex-col items-center">

      {/* Contenedor principal reducido */}
      <div className="flex items-center gap-2 bg-[#ef476f] text-white px-2 py-1 rounded-xl relative shadow-md">
        {/* Flecha inferior más pequeña */}
        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#ef476f]" />

        {/* Comentarios */}
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
          </svg>
          <span className="font-semibold text-sm">25</span>
        </div>

        {/* Usuarios */}
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path d="M12 12c2.67 0 8 1.34 8 4v4H4v-4c0-2.66 5.33-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          </svg>
          <span className="font-semibold text-sm">77</span>
        </div>

        {/* Likes */}
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
            2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
            3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 
            8.5c0 3.78-3.4 6.86-8.55 
            11.54L12 21.35z" />
          </svg>
          <span className="font-semibold text-sm">87</span>
        </div>
      </div>

      <span
        className="text-white font-semibold text-sm mt-1"
        style={{
          textShadow: "0 0 4px rgba(255, 0, 0, 0.8)",
        }}
      >
        Aumento de Seguidores
      </span>
    </div>
  );
}
