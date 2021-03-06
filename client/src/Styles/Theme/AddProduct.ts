import { createStyles } from "@mantine/core";

export const AddProductStyles = createStyles((theme) => ({
  container: {
    paddingTop: theme.spacing.xl * 6,
  },

  Logout: {
    marginBottom: theme.spacing.xl * 2,
    display: "flex",
    justifyContent: "end",
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
    fontWeight: 900,
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },

  input: {
    "&::placeholder": {
      transition: "color 150ms ease",
    },
  },
}));
