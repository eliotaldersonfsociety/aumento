'use server';

import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'public/data');

export async function getServices(socialNetwork: string = 'Instagram'): Promise<Record<string, any>> {
  try {
    const servicesFilePath = path.join(dataDir, `${socialNetwork.toLowerCase()}.json`);
    if (!fs.existsSync(servicesFilePath)) {
      return {};
    }
    const data = fs.readFileSync(servicesFilePath, 'utf8');
    const json = JSON.parse(data) as Record<string, any>;
    return json[socialNetwork] ? json[socialNetwork].categories : {};
  } catch (error) {
    console.error('Error reading services:', error);
    return {};
  }
}

export async function getAllSocialNetworks() {
  try {
    if (!fs.existsSync(dataDir)) {
      return ['Instagram'];
    }
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
    return files.map(file => file.charAt(0).toUpperCase() + file.slice(1, -5));
  } catch (error) {
    console.error('Error reading social networks:', error);
    return ['Instagram'];
  }
}

export async function addService(socialNetwork: string, category: string, type: string, serviceData: any) {
  try {
    const servicesFilePath = path.join(dataDir, `${socialNetwork.toLowerCase()}.json`);
    let json: any = {};

    if (fs.existsSync(servicesFilePath)) {
      const data = fs.readFileSync(servicesFilePath, 'utf8');
      json = JSON.parse(data);
    } else {
      json = { [socialNetwork]: { categories: {} } };
    }

    if (!json[socialNetwork].categories[category]) {
      json[socialNetwork].categories[category] = { types: {} };
    }
    if (!json[socialNetwork].categories[category].types) {
      json[socialNetwork].categories[category].types = {};
    }

    json[socialNetwork].categories[category].types[type] = serviceData;

    fs.writeFileSync(servicesFilePath, JSON.stringify(json, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error adding service:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateService(socialNetwork: string, category: string, type: string, serviceData: any) {
  try {
    const servicesFilePath = path.join(dataDir, `${socialNetwork.toLowerCase()}.json`);
    if (!fs.existsSync(servicesFilePath)) {
      return { success: false, error: 'Social network not found' };
    }

    const data = fs.readFileSync(servicesFilePath, 'utf8');
    const json: any = JSON.parse(data);

    if (json[socialNetwork].categories[category] && json[socialNetwork].categories[category].types) {
      json[socialNetwork].categories[category].types[type] = serviceData;
      fs.writeFileSync(servicesFilePath, JSON.stringify(json, null, 2));
    }
    return { success: true };
  } catch (error) {
    console.error('Error updating service:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteService(socialNetwork: string, category: string, type: string) {
  try {
    const servicesFilePath = path.join(dataDir, `${socialNetwork.toLowerCase()}.json`);
    if (!fs.existsSync(servicesFilePath)) {
      return { success: false, error: 'Social network not found' };
    }

    const data = fs.readFileSync(servicesFilePath, 'utf8');
    const json: any = JSON.parse(data);

    if (json[socialNetwork].categories[category] && json[socialNetwork].categories[category].types) {
      delete json[socialNetwork].categories[category].types[type];
      fs.writeFileSync(servicesFilePath, JSON.stringify(json, null, 2));
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}