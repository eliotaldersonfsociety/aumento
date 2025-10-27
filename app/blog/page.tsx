"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import BlogCard from "@/components/BlogCard"
import { getMarketingPosts, Post } from "@/app/actions/getMarketingPosts"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function BlogContent() {
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams.get("page") || "1", 10)
  const [page, setPage] = useState(initialPage)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const result = await getMarketingPosts(10, undefined, true)
      setPosts(result.posts)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    // Update URL
    const url = new URL(window.location.href)
    url.searchParams.set("page", newPage.toString())
    window.history.pushState({}, "", url)
  }

  return (
    <>
      {loading ? (
        <p className="text-center text-white/80">Cargando...</p>
      ) : posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice((page - 1) * 10, page * 10).map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>

          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => page > 1 && handlePageChange(page - 1)}
                    className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => page < Math.ceil(posts.length / 10) && handlePageChange(page + 1)}
                    className={page >= Math.ceil(posts.length / 10) ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      ) : (
        <p className="text-center text-white/80">
          No se pudieron cargar los artículos. Intenta más tarde.
        </p>
      )}
    </>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5] flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 p-6">
            Blog de Marketing Digital
          </h1>

          <Suspense fallback={<p className="text-center text-white/80">Cargando...</p>}>
            <BlogContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
