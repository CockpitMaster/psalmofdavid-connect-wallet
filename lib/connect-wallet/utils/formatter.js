import { i18n } from "@lingui/core";

export const amountFormatter = (x) =>
  i18n.number(x, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: x < 1 ? 6 : 2,
  });
