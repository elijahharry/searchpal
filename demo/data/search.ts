import Fuse from "fuse.js";

import { primates } from "./primates";
import { Classification, Primate } from "./primates";

import { capitalize, get } from "hoolock";

export type PrimateGroupLevel = keyof Classification;

export type PrimateGroupData = {
  level: PrimateGroupLevel;
  value: string;
};

export type PrimateGroup<I = string> = {
  label: string;
  primates: Primate<I>[];
};

function key(
  name: keyof Primate | (string & {}),
  weight: number = 1,
  getFn: (primate: Primate) => string = (primate) => get(primate, name)
) {
  return { name, weight, getFn };
}

const fuse = new Fuse(primates, {
  keys: [
    key("name", 1),
    key("species", 0.8),
    key("genera", 0.75),
    key("family", 0.5),
    key("location.place", 0.25),
    key("location.country", 0.25),
  ],
  shouldSort: true,
  includeScore: true,
});

const groupPrimates = (options: Primate[]): PrimateGroup[] => {
  const groups: PrimateGroup[] = [];

  const makeGroup = (label: string) => {
    const group: PrimateGroup = { label, primates: [] };
    groups.push(group);
    return group;
  };

  const map: Record<string, PrimateGroup> = {};

  options.forEach((primate) => {
    const key = primate.genera + " " + primate.family;
    const target = (map[key] ??= makeGroup(key));
    target.primates.push(primate);
  });

  return groups.map((group) => {
    const label =
      group.label
        .split(/\s+/)
        .map((w) => capitalize(w))
        .join(" ") + "s";
    return { ...group, label };
  });
};

export const searchPrimates = (query: string): Primate[] => {
  if (!query) return primates;
  const results = fuse.search(query);
  if (results.length) {
    const minScore = results[0].score!;
    const maxScoreOffset = 0.1;

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.score! > minScore + maxScoreOffset) {
        results.length = i;
        break;
      }
    }
  }
  return results.map((result) => result.item);
};

export const searchPrimateGroups = (query: string): PrimateGroup[] => {
  const options = searchPrimates(query);
  return groupPrimates(options);
};

export type { Primate, Primate as PrimateData };
