import { expect, test } from "@playwright/experimental-ct-react";
import { TriggerAttributeSpec, TriggerCallbackSpec } from "./trigger.spec";
import { find } from "../utils";

test("applys trigger attributes", async ({ page, mount }) => {
  await mount(<TriggerAttributeSpec id="portal" triggerId="trigger" />);

  const trigger = await page.$("#trigger");
  expect(trigger).not.toBeNull();
  if (!trigger) return;

  expect(
    await trigger.evaluate((el) => ({
      haspopup: el.getAttribute("aria-haspopup"),
      expanded: el.getAttribute("aria-expanded"),
    }))
  ).toEqual({ haspopup: "true", expanded: "false" });

  await trigger.click();

  const portal = await find(page, "div", { id: "portal" });
  expect(portal).not.toBeNull();

  expect(
    await trigger.evaluate((el) => ({
      haspopup: el.getAttribute("aria-haspopup"),
      expanded: el.getAttribute("aria-expanded"),
      controls: el.getAttribute("aria-controls"),
    }))
  ).toEqual({ haspopup: "true", expanded: "true", controls: "portal" });
});

test("passes trigger attributes to callback", async ({ page, mount }) => {
  await mount(<TriggerCallbackSpec id="portal" triggerId="trigger" />);

  const trigger = await page.$("#trigger");

  expect(trigger).not.toBeNull();
  if (!trigger) return;

  expect(
    await trigger.evaluate((el) => ({
      haspopup: el.getAttribute("aria-haspopup"),
      expanded: el.getAttribute("aria-expanded"),
    }))
  ).toEqual({ haspopup: "true", expanded: "false" });

  await trigger.click();

  const portal = await find(page, "div", { id: "portal" });
  expect(portal).not.toBeNull();

  expect(
    await trigger.evaluate((el) => ({
      haspopup: el.getAttribute("aria-haspopup"),
      expanded: el.getAttribute("aria-expanded"),
      controls: el.getAttribute("aria-controls"),
    }))
  ).toEqual({ haspopup: "true", expanded: "true", controls: "portal" });
});
