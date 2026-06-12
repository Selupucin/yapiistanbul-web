import { getContact, getSettings, listBlogs, listProjects } from "@repo/api";
import { unstable_cache } from "next/cache";

const getCachedProjects = unstable_cache(
  async () => {
    try {
      return await listProjects();
    } catch {
      return [];
    }
  },
  ["web-safe-projects"],
  { revalidate: 60 }
);

const getCachedBlogs = unstable_cache(
  async () => {
    try {
      return await listBlogs();
    } catch {
      return [];
    }
  },
  ["web-safe-blogs"],
  { revalidate: 60 }
);

const getCachedContact = unstable_cache(
  async () => {
    try {
      return await getContact();
    } catch {
      return {
        phone: "+90 212 000 00 00",
        email: "info@yapiistanbul.com.tr",
        address: "Istanbul, Turkiye",
        mapLocation: "https://maps.google.com",
      };
    }
  },
  ["web-safe-contact"],
  { revalidate: 120 }
);

const getCachedSettings = unstable_cache(
  async () => {
    try {
      return await getSettings();
    } catch {
      return { siteLogo: "", siteFavicon: "" };
    }
  },
  ["web-safe-settings"],
  { revalidate: 120 }
);

export async function safeProjects() {
  return getCachedProjects();
}

export async function safeBlogs() {
  return getCachedBlogs();
}

export async function safeContact() {
  return getCachedContact();
}

export async function safeSettings() {
  return getCachedSettings();
}
