import { defineConfig, devices } from "@playwright/experimental-ct-react";

export default defineConfig({
  testDir: "./",
  outputDir: "./.cache/test",
  snapshotDir: "./cache/__snapshots__",
  timeout: 10 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [
      "line",
      {
        outputDir: "./.cache/reporter",
      },
    ],
  ],
  use: {
    trace: "on-first-retry",
    ctPort: 3100,
  },
  build: {
    // external: ["**/*utils"],
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
