import { RootState } from "..";

export const screensSelector = ({ screens }: RootState) => screens;

export const activeScreenSelector = ({ screens }: RootState) =>
  screens.activeScreen;
