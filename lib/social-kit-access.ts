const STORAGE_PREFIX = "giocatori-social-kit-unlock:";

export function socialKitStorageKey(slug: string) {
  return `${STORAGE_PREFIX}${slug}`;
}

export function isSocialKitUnlocked(slug: string): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(socialKitStorageKey(slug)) === "1";
}

export function unlockSocialKit(slug: string) {
  sessionStorage.setItem(socialKitStorageKey(slug), "1");
}

export function isValidSocialKitCode(input: string, expected: string): boolean {
  return input.trim() === expected.trim();
}
