"use server"

export interface Post {
  id: string
  title: string
  summary: string
  image: string
  date: string
  url: string
}

/**
 * Traduce texto de inglés a español usando LibreTranslate (gratis y sin clave)
 */
async function translateText(text: string): Promise<string> {
  try {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "es",
        format: "text",
      }),
      cache: "force-cache",
    })

    const data = await res.json()
    return data.translatedText || text
  } catch (error) {
    console.error("Error traduciendo texto:", error)
    return text
  }
}

/**
 * Obtiene posts del subreddit r/marketing y los traduce al español
 */
export async function getMarketingPosts(limit: number = 10, after?: string, fetchAll: boolean = false): Promise<{ posts: Post[], after: string | null }> {
  try {
    const url = fetchAll
      ? `https://www.reddit.com/r/marketing/hot.json?limit=100`
      : after
      ? `https://www.reddit.com/r/marketing/hot.json?limit=${limit}&after=${after}`
      : `https://www.reddit.com/r/marketing/hot.json?limit=${limit}`

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // cachea 1 hora
    })

    if (!res.ok) throw new Error("Error al obtener datos de Reddit")
    const data = await res.json()

    // Procesa y traduce cada post
    const posts: Post[] = await Promise.all(
      data.data.children.map(async (post: any) => {
        const p = post.data

        // Imagen: preview > thumbnail > placeholder
        const image =
          p?.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&") ||
          (p?.thumbnail?.startsWith("http") ? p.thumbnail : "/default-post.webp")

        // Traducción del título
        const translatedTitle = await translateText(p.title)

        return {
          id: p.id,
          title: translatedTitle,
          summary: p.selftext?.slice(0, 150) || "Lee más detalles en Reddit.",
          image,
          date: new Date(p.created_utc * 1000).toLocaleDateString("es-CO", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          url: `https://reddit.com${p.permalink}`,
        }
      })
    )

    return { posts, after: data.data.after }
  } catch (error) {
    console.error("Error cargando posts de Reddit:", error)
    return { posts: [], after: null }
  }
}
