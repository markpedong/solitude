import { createStyles } from "@mantine/core";

export const ProductDetails = createStyles((theme) => ({
  ProductContainer: {
    color: theme.colorScheme === "dark" ? "white" : "black",
  },

  ProductPrice: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",

    [`@media (max-width: 400px)`]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    },
  },

  ExtraProduct: {
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [`@media (max-width: 400px)`]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
}));
