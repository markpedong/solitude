import { createStyles } from "@mantine/core";

export const ProductStyles = createStyles((theme) => ({
  Container: {
    color: theme.colorScheme === "dark" ? "white" : "black",
    fontFamily: "Poppins",
  },
  ProductTitle: {
    marginBottom: "2rem",
  },
}));
