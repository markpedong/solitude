import { createStyles } from "@mantine/core";

export const ProductStyles = createStyles((theme) => ({
  Container: {
    color: theme.colorScheme === "dark" ? "white" : "black",
    fontFamily: "Poppins",
  },
  ProductTitle: {
    marginBlock: "2rem",
  },
}));
