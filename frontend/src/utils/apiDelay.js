/*
  Artificial delay utility used only for local development
  to surface loading states and validate async UX.
  Not intended for production use.
*/

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
