'use server'

import { updateJsonOnGitHub } from './github'

const GITHUB_USER = process.env.GITHUB_USER!
const GITHUB_REPO = process.env.GITHUB_REPO!

// 📁 Ruta base donde guardas los JSON en tu repo (por ejemplo "public/data/")
const basePath = 'public/data'

export async function getAllSocialNetworks() {
  const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${basePath}`
  const res = await fetch(url, { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } })

  if (!res.ok) return ['Instagram']
  const files = await res.json()
  return files
    .filter((f: any) => f.name.endsWith('.json'))
    .map((f: any) => f.name.charAt(0).toUpperCase() + f.name.slice(1, -5))
}

export async function getServices(socialNetwork: string = 'Instagram') {
  try {
    const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main/${basePath}/${socialNetwork.toLowerCase()}.json`
    const res = await fetch(url)
    if (!res.ok) return {}
    const json = await res.json()
    return json[socialNetwork]?.categories || {}
  } catch (e) {
    console.error('Error fetching services:', e)
    return {}
  }
}

export async function addService(socialNetwork: string, category: string, type: string, serviceData: any) {
  try {
    const filePath = `${basePath}/${socialNetwork.toLowerCase()}.json`
    const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main/${filePath}`
    const res = await fetch(url)
    const json = res.ok ? await res.json() : { [socialNetwork]: { categories: {} } }

    if (!json[socialNetwork].categories[category]) {
      json[socialNetwork].categories[category] = { types: {} }
    }

    json[socialNetwork].categories[category].types[type] = serviceData

    await updateJsonOnGitHub(filePath, json, `Add ${type} service to ${socialNetwork}`)
    return { success: true }
  } catch (e) {
    console.error('Error adding service:', e)
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' }
  }
}

export async function updateService(socialNetwork: string, category: string, type: string, serviceData: any) {
  try {
    const filePath = `${basePath}/${socialNetwork.toLowerCase()}.json`
    const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main/${filePath}`
    const res = await fetch(url)
    if (!res.ok) return { success: false, error: 'File not found' }

    const json = await res.json()
    if (!json[socialNetwork]?.categories[category]?.types[type]) {
      return { success: false, error: 'Service not found' }
    }

    json[socialNetwork].categories[category].types[type] = serviceData
    await updateJsonOnGitHub(filePath, json, `Update ${type} service in ${socialNetwork}`)
    return { success: true }
  } catch (e) {
    console.error('Error updating service:', e)
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' }
  }
}

export async function deleteService(socialNetwork: string, category: string, type: string) {
  try {
    const filePath = `${basePath}/${socialNetwork.toLowerCase()}.json`
    const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main/${filePath}`
    const res = await fetch(url)
    if (!res.ok) return { success: false, error: 'File not found' }

    const json = await res.json()
    delete json[socialNetwork]?.categories[category]?.types[type]
    await updateJsonOnGitHub(filePath, json, `Delete ${type} from ${socialNetwork}`)
    return { success: true }
  } catch (e) {
    console.error('Error deleting service:', e)
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' }
  }
}
