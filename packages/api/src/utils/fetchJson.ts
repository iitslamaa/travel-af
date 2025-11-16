export async function fetchJson<T>(
  url: string,
  init: RequestInit = {},
  opts: { timeoutMs?: number; retries?: number } = {}
) {
  const timeoutMs = opts.timeoutMs ?? 8_000;
  const retries = opts.retries ?? 1;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const to = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...init, signal: controller.signal });
      clearTimeout(to);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return (await res.json()) as T;
    } catch (e) {
      clearTimeout(to);
      if (attempt === retries) throw e;
      await new Promise(r => setTimeout(r, 300 + 300 * attempt));
    }
  }
  throw new Error("unreachable");
}