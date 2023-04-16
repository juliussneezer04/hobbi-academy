import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Generate a pixelated gender-neutral avatar for the
 * given id. Deterministic; given the same id, will generate
 * the same data uri.
 * @param name seed for the avatar generator
 * @returns a data uri suitable to be the `src` field of an img tag
 */
export const generateAvatarSvg = (name: string) => {
  const avatar = createAvatar(bottts, {
    seed: name,
    size: 128,
  });
  return avatar.toDataUriSync();
};

