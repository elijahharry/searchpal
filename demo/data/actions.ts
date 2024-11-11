"use server";

import { StaticImageData } from "next/image";
import { getStaticImageData } from "./image";
import {
  searchPrimateGroups,
  searchPrimates,
  Primate,
  PrimateGroup,
  PrimateGroupData,
  PrimateGroupLevel,
} from "./search";

if (process.env.NODE_ENV === "development") {
  import("./primates").then(async ({ primates }) => {
    const exists = (url: string, error: string, ...args: any[]) => {
      fetch(url).then(async (res) => {
        if (res.status !== 200) {
          console.error(error, ...args);
        }
      });
    };

    primates.forEach((p) => {
      exists(p.image, "Image not found for %s: %s", p.name, p.image);
      exists(p.wiki, "Wiki not found for %s: %s", p.name, p.wiki);
    });
  });
}

const withImageData = (primates: Primate[]) =>
  Promise.all(
    primates.map(async (p): Promise<Primate<StaticImageData>> => {
      return {
        ...p,
        image: await getStaticImageData(p.image),
      };
    })
  );

const getPrimates = async (query: string, max: number = 8) => {
  const primates = searchPrimates(query);

  return withImageData(primates.slice(0, Math.max(1, max)));
};

const maxGroups = <I>(groups: PrimateGroup<I>[], max: number) => {
  max = Math.max(groups.length, max);
  const [result, options, total] = groups.reduce<
    [PrimateGroup<I>[], Primate<I>[][], number]
  >(
    ([result, total, sum], group) => {
      result.push({ ...group, primates: [] });
      total.push(group.primates);
      return [result, total, sum + group.primates.length];
    },
    [[], [], 0]
  );

  max = Math.min(total, max);
  let added = 0;
  const take = (group: Primate<I>[], index: number, count: number) => {
    let took = false;
    while (count && group.length) {
      const next = group.shift();
      if (!next) break;
      result[index].primates.push(next);
      count--;
      added++;
      took = true;
    }
    return took;
  };
  options.forEach((group, i) => {
    take(group, i, Math.floor((group.length / total) * max));
  });
  while (added < max) {
    let tookSome = false;
    for (let i = 0; i < options.length; i++) {
      const took = take(options[i], i, 1);
      if (added >= max) break;
      if (took) tookSome = true;
    }
    if (!tookSome) break;
  }
  return result.filter((group) => group.primates.length);
};

const getPrimateGroups = async (query: string, max: number = 8) => {
  const groups = maxGroups(searchPrimateGroups(query), max);

  return await Promise.all(
    groups.map(async (group) => ({
      ...group,
      primates: await withImageData(group.primates),
    }))
  );
};

export {
  getPrimates,
  getPrimateGroups,
  type PrimateGroup,
  type PrimateGroupLevel,
  type Primate,
  type PrimateGroupData,
};
