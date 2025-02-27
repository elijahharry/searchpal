import { ElementHandle, Page } from "playwright";
import { forEntries, isArray, isObject, isString } from "hoolock";
import { expect } from "@playwright/experimental-ct-react";

export type Portal = ElementHandle<HTMLDivElement>;

export type Root = Page | ElementHandle;

export type TagName = keyof HTMLElementTagNameMap;

export type TagHandle<N extends TagName> = ElementHandle<
  HTMLElementTagNameMap[N]
>;

export type Attributes = Record<string, string>;

export type SelectorParams = [string, Attributes?] | [string | Attributes];

const stringifyAttributes = (attributes: Attributes) => {
  let str = "";
  forEntries(attributes, ([key, value]) => {
    str += `[${key}=${JSON.stringify(value)}]`;
  });
  return str;
};

const getSelector = (params: SelectorParams) => {
  if (params.length === 1) {
    const [selector] = params;
    if (isString(selector)) return selector;
    return stringifyAttributes(selector);
  }
  const [selector, attributes] = params;
  return selector + (attributes ? stringifyAttributes(attributes) : "");
};

async function find<T extends TagName>(
  root: Root,
  tag: T,
  attributes?: Attributes
): Promise<TagHandle<T> | null>;
async function find<E extends HTMLElement = HTMLElement>(
  root: Root,
  query: string | Attributes
): Promise<ElementHandle<E> | null>;
async function find<E extends HTMLElement = HTMLElement>(
  root: Root,
  ...params: SelectorParams
): Promise<ElementHandle<E> | null>;
async function find(
  root: Root,
  ...params: SelectorParams
): Promise<ElementHandle | null> {
  const selector = getSelector(params);
  return await root.$(selector);
}

async function findAll<T extends TagName>(
  root: Root,
  tag: T,
  attributes?: Attributes
): Promise<TagHandle<T>[]>;
async function findAll<E extends HTMLElement = HTMLElement>(
  root: Root,
  query: string | Attributes
): Promise<ElementHandle<E>[]>;
async function findAll<E extends HTMLElement = HTMLElement>(
  root: Root,
  ...params: SelectorParams
): Promise<ElementHandle<E>[]>;
async function findAll(
  root: Root,
  ...params: SelectorParams
): Promise<ElementHandle[]> {
  const selector = getSelector(params);
  return await root.$$(selector);
}

async function html(page: Page) {
  return await page.evaluate(() => document.body.innerHTML);
}
html.log = async (page: Page) => console.log(await html(page));

const listen = (page: Page, target: "log" | "error" | "info") => {
  const logs: string[] = [];

  page.on("console", async (msg) => {
    const type = msg.type();
    if (type !== target) return;
    logs.push(msg.text());
  });

  const next = () => logs.shift();
  const capture = () => [...logs];
  const contains = (msg: string) => {
    expect(logs, `Could not find log: ${JSON.stringify(msg)}`).toContain(msg);
  };
  return { next, capture, expect: contains };
};

export { find, findAll, html, listen };
export type { ElementHandle, Page };
