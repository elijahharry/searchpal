// // In production, this module will resolve to the packaged distribution of "searchpal" (under 'searchpal-dist')
// // In development, this module will resolve to the linked 'searchpal-lib' package
declare module "searchpal" {
  // Use types from the "searchpal-lib" package,
  // which is local to this monorepo
  export * from "searchpal-lib";
}
