/**
 * Converts an image URL (SVG, PNG, JPEG) to a base64 PNG data URI using Canvas.
 * @param url - Path or URL to the image
 * @param size - Output size in pixels (default 200)
 * @returns Promise<string> - base64 PNG data URI
 */
export async function imageToBase64Png(
  url: string,
  size = 200,
): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);

  const contentType = res.headers.get("content-type") || "";
  let blob: Blob;

  if (contentType.includes("svg") || url.endsWith(".svg")) {
    const svgText = await res.text();
    blob = new Blob([svgText], { type: "image/svg+xml" });
  } else {
    blob = await res.blob();
  }

  const objectUrl = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Failed to load image: ${url}`));
    };
    img.src = objectUrl;
  });
}

/**
 * Loads the clinic logo from Supabase, falling back to the default logo.
 * @param supabaseLogoUrl - Supabase public URL (null if no logo uploaded)
 * @param defaultLogoPath - Path to default logo in public/ (default "/logo.svg")
 * @param size - Output size in pixels (default 200)
 * @returns Promise<string> - base64 PNG data URI
 */
export async function getClinicLogo(
  supabaseLogoUrl: string | null | undefined,
  defaultLogoPath = "/logo.svg",
  size = 200,
): Promise<string> {
  if (supabaseLogoUrl) {
    try {
      return await imageToBase64Png(supabaseLogoUrl, size);
    } catch {
      // Supabase logo failed, fall through to default
    }
  }
  return imageToBase64Png(defaultLogoPath, size);
}
