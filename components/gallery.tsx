"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Repeat2, Heart, MessageCircle } from "lucide-react";

interface Tweet {
  name: string;
  username: string;
  text: string;
  comments: number;
  retweets: number;
  likes: number;
}

const tweets: Tweet[] = [
  {
    name: "María M",
    username: "@mariam08",
    text: "Nunca suelo recomendar páginas, pero aumentosdeseguidores.com me sorprendió 😳. Los seguidores llegaron rápido y reales 🔥",
    comments: 13,
    retweets: 42,
    likes: 77,
  },
  {
    name: "Carlos G",
    username: "@soycarlitos",
    text: "Compré seguidores para mi Instagram en aumentosdeseguidores.com y en menos de una hora ya veía resultados 😍",
    comments: 8,
    retweets: 25,
    likes: 156,
  },
  {
    name: "Laura P",
    username: "@laurita_p",
    text: "Probé mil sitios y todos fallan… menos aumentosdeseguidores.com. Cumplen lo que prometen 💯",
    comments: 21,
    retweets: 67,
    likes: 234,
  },
  {
    name: "Diego R",
    username: "@diegorx",
    text: "Si estás pensando en subir tu perfil de TikTok, aumentosdeseguidores.com es la clave 🎯",
    comments: 15,
    retweets: 38,
    likes: 189,
  },
  {
    name: "Nicolás V",
    username: "@nicolover",
    text: "No soy influencer, pero con aumentosdeseguidores.com mi cuenta parece de uno 😎",
    comments: 9,
    retweets: 19,
    likes: 98,
  },
  {
    name: "Sofía T",
    username: "@sofiatweets",
    text: "Les pedí comentarios personalizados en mi última publicación y quedaron 🔝 ¡Gracias aumentosdeseguidores.com!",
    comments: 17,
    retweets: 45,
    likes: 203,
  },
  {
    name: "Andrés L",
    username: "@andreslx",
    text: "Me daba miedo que fuera fake, pero funcionó. aumentosdeseguidores.com sí cumple 💪",
    comments: 11,
    retweets: 28,
    likes: 145,
  },
  {
    name: "Camila D",
    username: "@camilad",
    text: "Los seguidores de Facebook llegaron súper rápido. 10/10 servicio en aumentosdeseguidores.com 👍",
    comments: 14,
    retweets: 33,
    likes: 167,
  },
  {
    name: "Valentina S",
    username: "@valesocial",
    text: "Si quieres crecer en X (Twitter), aumentosdeseguidores.com es la forma más segura y rápida ⚡",
    comments: 19,
    retweets: 52,
    likes: 278,
  },
  {
    name: "José M",
    username: "@josemix",
    text: "Les compré reproducciones para mis videos y ahora el algoritmo me ama 😂❤️",
    comments: 12,
    retweets: 41,
    likes: 198,
  },
];

function randomDate2025() {
  const start = new Date("2025-01-01").getTime();
  const end = new Date("2025-12-31").getTime();
  const date = new Date(start + Math.random() * (end - start));
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${hours}:${minutes} · ${day}/${month}/${year}`;
}

export function Gallery() {
  const [current, setCurrent] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    // Inicializar valores solo en cliente
    setAvatarUrl(
      `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? "women" : "men"
      }/${Math.floor(Math.random() * 70)}.jpg`
    );
    setDate(randomDate2025());

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % tweets.length);
      setAvatarUrl(
        `https://randomuser.me/api/portraits/${
          Math.random() > 0.5 ? "women" : "men"
        }/${Math.floor(Math.random() * 70)}.jpg`
      );
      setDate(randomDate2025());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const tweet = tweets[current];

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-2xl bg-white text-black rounded-2xl shadow-xl border border-gray-200 overflow-hidden mx-4 sm:mx-auto transition-all duration-500">
        <div className="flex items-center p-4 gap-3">
          <Image
            src={avatarUrl || "/default-avatar.png"}
            alt="avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{tweet.name}</p>
            <p className="text-gray-500 text-sm">{tweet.username}</p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="bg-black text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              Follow
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="14"
                height="14"
                fill="currentColor"
              >
                <path d="M6.92 6L21.14 26.73 6.23 44h3.18l13.14-15.22L32.99 44H43L28.12 22.31 42.2 6h-3.17L26.72 20.26 16.93 6H6.92z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-4 pb-3">
          <p className="text-gray-800">{tweet.text}</p>
          <div className="mt-4 flex text-gray-400 text-sm justify-between px-2 border-t border-gray-200 pt-2">
            <span>{date}</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <MessageCircle size={14} className="text-gray-400" />
                {tweet.comments}
              </span>
              <span className="flex items-center gap-1">
                <Repeat2 size={14} className="text-gray-400" />
                {tweet.retweets}
              </span>
              <span className="flex items-center gap-1">
                <Heart size={14} className="text-gray-400" />
                {tweet.likes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
