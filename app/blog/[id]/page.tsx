import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/posts`)
  const posts = await res.json()
  return posts.find((p: any) => p.id.toString() === id)
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) {
    return <p className="text-center text-white mt-40">Post no encontrado.</p>
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5] flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto glass-card p-6 md:p-10 text-white rounded-2xl">
          <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-6">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="opacity-80 mb-6">{new Date(post.date).toLocaleDateString("es-CO")}</p>
          <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
