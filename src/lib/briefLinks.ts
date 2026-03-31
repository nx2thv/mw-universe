import { supabase, supabaseUrl } from "./supabaseClients";

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

function toSupabaseUrl(value: string) {
  if (isAbsoluteUrl(value)) return value;
  return new URL(value, supabaseUrl).toString();
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

  return toSupabaseUrl(data.signedUrl);
}

export async function openBriefDocument(briefRef: string, expiresIn = 120) {
  const loadingUrl = new URL("/brief-loading", window.location.origin);
  loadingUrl.searchParams.set("brief", briefRef);
  loadingUrl.searchParams.set("expiresIn", String(expiresIn));

  const popup = window.open(loadingUrl.toString(), "_blank");

  if (popup) {
    popup.opener = null;
    return;
  }

  window.location.assign(loadingUrl.toString());
}
