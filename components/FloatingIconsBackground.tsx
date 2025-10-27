// components/FloatingIconsBackground.tsx
"use client";

import { useEffect, useState } from "react";
import {
  User, Heart, MessageCircle, Star, Zap, Crown, Gem, Sparkles,
  TrendingUp, Award, ThumbsUp, Smile, Sun, Moon, Cloud, Rainbow,
  Flower, Music, Camera, Video, Image, Globe, Rocket, Diamond,
  Trophy, Target, Lightbulb, Palette, Gamepad2
} from "lucide-react";

const icons = [
  User, Heart, MessageCircle, Star, Zap, Crown, Gem, Sparkles,
  TrendingUp, Award, ThumbsUp, Smile, Sun, Moon, Cloud, Rainbow,
  Flower, Music, Camera, Video, Image, Globe, Rocket, Diamond,
  Trophy, Target, Lightbulb, Palette, Gamepad2
];

export function FloatingIconsBackground() {
  const [iconData, setIconData] = useState<any[]>([]);

  useEffect(() => {
    const data = Array.from({ length: 25 }).map(() => ({
      Icon: icons[Math.floor(Math.random() * icons.length)],
      size: Math.random() * 20 + 16,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 30,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.15 + 0.1,
      color: [
        "#ffffff"
      ][Math.floor(Math.random() * 16)],
    }));
    setIconData(data);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5]">
      {iconData.map(({ Icon, size, top, left, duration, delay, opacity, color }, i) => (
        <Icon
          key={i}
          className="absolute"
          style={{
            width: size,
            height: size,
            top: `${top}%`,
            left: `${left}%`,
            opacity,
            color,
            animation: `floatUp ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}