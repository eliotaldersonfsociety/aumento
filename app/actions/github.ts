'use server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!
const GITHUB_USER = process.env.GITHUB_USER!
const GITHUB_REPO = process.env.GITHUB_REPO!

// Actualiza o crea un archivo JSON en el repo de GitHub
export async function updateJsonOnGitHub(filePath: string, jsonData: any, message = 'update json') {
  const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${filePath}`

  const content = JSON.stringify(jsonData, null, 2)
  const contentBase64 = Buffer.from(content).toString('base64')

  // Obtener SHA actual (para editar)
  const existing = await fetch(url, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  })
  const existingData = existing.ok ? await existing.json() : null
  const sha = existingData?.sha

  // Hacer commit
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: contentBase64,
      sha,
      branch: 'main',
    }),
  })

  if (!res.ok) {
    throw new Error(`GitHub error: ${await res.text()}`)
  }

  return await res.json()
}
