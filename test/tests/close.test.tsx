import { expect, test } from "@playwright/experimental-ct-react";
import { Search } from "./search.spec";
import { makeId, Page, Portal, ElementHandle, find, html } from "../utils";

const define = (
  name: string,
  runTest: (state: {
    page: Page;
    portal: Portal;
    id: string;
    child: ElementHandle<HTMLButtonElement>;
    is: {
      open(): Promise<void>;
      closed(): Promise<void>;
    };
  }) => Promise<void>,
  siblings?: JSX.Element
) => {
  test(name, async ({ page, mount }) => {
    const id = makeId(),
      triggerId = makeId(),
      childId = makeId();

    await mount(
      <Search id={id} trigger={triggerId} siblings={siblings}>
        <button id={childId}>child</button>
      </Search>
    );

    const trigger = await find(page, { id: triggerId });

    expect(trigger).not.toBeNull();
    if (!trigger) return;
    await trigger.click();

    const portal = await find(page, "div", { id });

    expect(portal).not.toBeNull();
    if (!portal) return;

    const child = await find(portal, "button", { id: childId });
    expect(child).not.toBeNull();
    if (!child) return;

    await runTest({
      page,
      portal,
      id,
      child,
      is: {
        open: async () => expect(await find(page, { id })).not.toBeNull(),
        closed: async () => expect(await find(page, { id })).toBeNull(),
      },
    });
  });
};

define("does not close on inner click", async ({ child, is }) => {
  await child.click();
  await is.open();
});

define("closes on outer click", async ({ page, is }) => {
  await page.mouse.click(0, 0);
  await is.closed();
});

define("closes on escape", async ({ page, is }) => {
  await page.keyboard.press("Escape");
  await is.closed();
});
