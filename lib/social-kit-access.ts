const STORAGE_PREFIX = "giocatori-social-kit-unlock:";
export const SOCIAL_KIT_ACCESS_EVENT = "giocatori-social-kit-access-change";

export function socialKitStorageKey(slug: string) {
  return `${STORAGE_PREFIX}${slug}`;
}

export function isSocialKitUnlocked(slug: string): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(socialKitStorageKey(slug)) === "1";
}

export function subscribeSocialKitAccess(onStoreChange: () => void) {
  const notify = () => onStoreChange();
  window.addEventListener(SOCIAL_KIT_ACCESS_EVENT, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(SOCIAL_KIT_ACCESS_EVENT, notify);
    window.removeEventListener("storage", notify);
  };
}

export function unlockSocialKit(slug: string) {
  sessionStorage.setItem(socialKitStorageKey(slug), "1");
  window.dispatchEvent(new Event(SOCIAL_KIT_ACCESS_EVENT));
}

export function isValidSocialKitCode(input: string, expected: string): boolean {
  return input.trim() === expected.trim();
}
