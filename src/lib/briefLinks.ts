import { supabase } from "./supabaseClients";

type StorageRef = {
  bucket: string;
  path: string;
};

function isAbsoluteUrl(value: string) {
  return /^https?:\/\//.test(value);
}

function toAbsoluteUrl(value: string) {
  if (isAbsoluteUrl(value)) return value;
  if (value.startsWith("/")) {
    return new URL(value, window.location.origin).toString();
  }

  return value;
}

function parseStorageRef(briefRef: string): StorageRef | null {
  const trimmed = briefRef.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("/storage/") || isAbsoluteUrl(trimmed)) {
    const url = isAbsoluteUrl(trimmed)
      ? new URL(trimmed)
      : new URL(trimmed, window.location.origin);
    const match = url.pathname.match(
      /\/storage\/v1\/object\/(?:public|authenticated|sign)\/([^/]+)\/(.+)$/
    );

    if (!match) return null;

    return {
      bucket: decodeURIComponent(match[1]),
      path: decodeURIComponent(match[2]),
    };
  }

  if (trimmed.startsWith("briefs/")) {
    return {
      bucket: "briefs",
      path: trimmed.slice("briefs/".length),
    };
  }

  if (!trimmed.includes("/")) {
    return {
      bucket: "briefs",
      path: trimmed,
    };
  }

  return null;
}

export async function resolveBriefUrl(briefRef: string, expiresIn = 120) {
  const storageRef = parseStorageRef(briefRef);

  if (!storageRef) {
    return toAbsoluteUrl(briefRef);
  }

  const { data, error } = await supabase.storage
    .from(storageRef.bucket)
    .createSignedUrl(storageRef.path, expiresIn);

  if (error || !data?.signedUrl) {
    throw new Error(error?.message || "Could not create a signed brief URL.");
  }

  return data.signedUrl;
}

export async function openBriefDocument(briefRef: string, expiresIn = 120) {
  const popup = window.open("", "_blank", "noopener,noreferrer");

  try {
    const url = await resolveBriefUrl(briefRef, expiresIn);

    if (popup) {
      popup.location.href = url;
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  } catch (error) {
    if (popup) {
      popup.close();
    }

    throw error;
  }
}
