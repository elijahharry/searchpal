import { expect, test } from "@playwright/experimental-ct-react";
import { FilterSearch, SearchOption } from "./search.spec";
import { makeId, makeOptions } from "../utils/faker";
import { find, findAll, listen, Page, TagHandle } from "../utils";

const options = (
  name: string,
  fn: (ctx: {
    page: Page;
    portal: TagHandle<"div">;
    options: SearchOption[];
    isOpen: () => Promise<boolean>;
  }) => Promise<void>
) => {
  test(name, async ({ page, mount }) => {
    const options = makeOptions(50),
      id = makeId();
    await mount(
      <FilterSearch
        id={id}
        options={options}
        defaultOptions={options.slice(0, 10)}
        initialOpen
      />
    );

    const findPortal = () => find(page, "div", { id });

    const portal = await findPortal();
    expect(portal).not.toBeNull();
    if (!portal) return;

    const isOpen = async () => !!(await findPortal());

    await fn({ page, portal, options, isOpen });
  });
};

options("renders options", async ({ portal, options: inputOptions }) => {
  const listbox = await find(portal, "div", { role: "listbox" });
  expect(listbox).not.toBeNull();
  if (!listbox) return;
  const options = await findAll(listbox, "div", { role: "option" });
  expect(options.length).toBeTruthy();
  const inputIds = new Set<string>(inputOptions.map(({ id }) => id)),
    labels = new Set<string>(inputOptions.map(({ label }) => label));

  for (const option of options) {
    const { id, label, selected } = await option.evaluate((node) => ({
      id: node.getAttribute("id"),
      label: node.textContent,
      selected: node.getAttribute("aria-selected"),
    }));
    expect(id).toBeTruthy();
    expect(label).toBeTruthy();
    expect(selected).toBe("false");
    expect(inputIds.has(id!)).toBeTruthy();
    expect(labels.has(label!)).toBeTruthy();
  }
});

type ResolvedOption = SearchOption & {
  node: TagHandle<"div">;
  isSelected: () => Promise<boolean>;
};

const resolveOptions = async (
  name: string,
  fn: (ctx: {
    page: Page;
    portal: TagHandle<"div">;
    options: ResolvedOption[];
    notifiedSelection: (id: string) => void;
    notifiedSubmission: (id: string) => void;
    isOpen: () => Promise<boolean>;
    listbox: TagHandle<"div">;
  }) => Promise<void>
) => {
  options(name, async ({ page, portal, options: inputOptions, isOpen }) => {
    const listbox = await find(portal, "div", { role: "listbox" });
    if (!listbox) return;
    const nodes = await findAll(listbox, "div", { role: "option" });
    const options = await Promise.all(
      nodes.map(async (node): Promise<ResolvedOption> => {
        const id = await node.getAttribute("id");
        expect(id).toBeTruthy();
        const match = inputOptions.find((option) => option.id === id)!;
        expect(match).toBeTruthy();

        const label = await node.textContent();
        expect(label).toBe(match.label);

        return {
          ...match,
          node,
          isSelected: async () =>
            (await node.getAttribute("aria-selected")) === "true",
        };
      })
    );

    const logs = listen(page, "log");

    const notifiedSelection = (id: string) => logs.expect(`Selected: ${id}`);

    const notifiedSubmission = (id: string) => logs.expect(`Submitted: ${id}`);

    await fn({
      page,
      portal,
      options,
      notifiedSelection,
      notifiedSubmission,
      isOpen,
      listbox,
    });
  });
};

resolveOptions(
  "selects options on hover",
  async ({ options, notifiedSelection, listbox }) => {
    await listbox.hover();

    let prev: ResolvedOption | undefined;
    for (const current of options) {
      const { node, isSelected, ...option } = current;
      expect(await isSelected()).toBe(false);
      await node.hover();
      expect(await isSelected()).toBe(true);
      if (prev) expect(await prev.isSelected()).toBe(false);
      notifiedSelection(option.id);
      prev = current;
    }
  }
);

resolveOptions(
  "navigates options with arrow keys",
  async ({ page, options, notifiedSelection }) => {
    const [first, last] = [options[0], options[options.length - 1]];

    await page.keyboard.press("End");
    expect(await last.isSelected()).toBe(true);
    notifiedSelection(last.id);

    await page.keyboard.press("Home");
    expect(await first.isSelected()).toBe(true);
    notifiedSelection(first.id);

    await page.keyboard.press("ArrowDown");
    expect(await first.isSelected()).toBe(false);
    expect(await options[1].isSelected()).toBe(true);
    notifiedSelection(options[1].id);

    await page.keyboard.press("ArrowDown");
    expect(await first.isSelected()).toBe(false);
    expect(await options[2].isSelected()).toBe(true);
    notifiedSelection(options[2].id);

    await page.keyboard.press("ArrowUp");
    expect(await options[1].isSelected()).toBe(true);
    expect(await options[2].isSelected()).toBe(false);
    notifiedSelection(options[1].id);

    await page.keyboard.press("ArrowUp");
    expect(await first.isSelected()).toBe(true);
    expect(await options[1].isSelected()).toBe(false);
    notifiedSelection(first.id);

    await page.keyboard.press("ArrowUp");
    expect(await last.isSelected()).toBe(true);
    expect(await first.isSelected()).toBe(false);
    notifiedSelection(last.id);
  }
);

resolveOptions(
  "submits options on click",
  async ({ options, notifiedSubmission, page, isOpen }) => {
    const zero = options[0];
    await zero.node.click();

    notifiedSubmission(zero.id);
    expect(await isOpen()).toBe(false);
  }
);

resolveOptions(
  "submits options on enter",
  async ({ options, notifiedSubmission, page, isOpen }) => {
    const zero = options[0];
    await page.keyboard.press("ArrowDown");
    expect(await zero.isSelected()).toBe(true);

    await page.keyboard.press("Enter");

    notifiedSubmission(zero.id);
    expect(await isOpen()).toBe(false);
  }
);
