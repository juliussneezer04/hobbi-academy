import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";
import { Edge, Node } from "reactflow";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Returns list of edges between all nodes in the graph.
 * @returns Edge[] list of edges
 */
export function generateEdgesFromNodes(nodes: Node[]): Edge[] {
  const edges: Edge[] = [];
  for (let i = 0; i < (nodes.length / 2) + 1; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i !== j) {
        edges.push({
          id: `e${nodes[i].id}-${nodes[j].id}`,
          source: nodes[i].id,
          target: nodes[j].id,
          // animated: true,
          type: "default",
        });
      }
    }
  }

  return edges;
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
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

