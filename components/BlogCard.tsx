"use client"

import Image from "next/image"
import Link from "next/link"

interface BlogCardProps {
  id: string
  title: string
  summary: string
  image: string
  date: string
  url: string
}

export default function BlogCard({ title, summary, image, date, url }: BlogCardProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-md transition hover:scale-105 hover:shadow-xl"
    >

      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-white/80 mb-3 line-clamp-3">{summary}</p>
        <span className="text-xs text-white/60">{date}</span>
      </div>
    </Link>
  )
}
