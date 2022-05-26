import { createStyles } from "@mantine/core";

export const LandingStyles = createStyles((theme) => ({
  LandingContainer: {
    [theme.fn.smallerThan("md")]: {
      background:
        theme.colorScheme === "dark"
          ? "linear-gradient(180deg, rgb(15,18,28) 67%, rgba(0, 0, 0, 1) 33%)"
          : "linear-gradient(180deg, #dee2e6 67%, rgba(0, 0, 0, 1) 33%)",
    },
    [theme.fn.largerThan("md")]: {
      background:
        theme.colorScheme === "dark"
          ? "linear-gradient(100deg, rgb(15,18,28) 48%, rgba(0, 0, 0, 1) 48%)"
          : "linear-gradient(100deg, #dee2e6 48%, rgba(0, 0, 0, 1) 48%)",
    },
  },

  Navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.fn.smallerThan("md")]: {
      background: "black",
    },
  },

  Dropdown: {
    position: "absolute",
    top: "76px",
    left: "0",
    right: "0",
    zIndex: 1,
    color: theme.colorScheme === "dark" ? "white" : "black",
    backgroundColor: theme.colorScheme === "dark" ? "black" : "#dee2e6",
    width: "100vw",
    textAlign: "center",
    fontWeight: "bold",

    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },

  Links: {
    color: "white",

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  Burger: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },

  LandingContent: {
    paddingBlockStart: "5rem",

    [theme.fn.largerThan("md")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column-reverse",
      alignItems: "center",
      position: "relative",
    },
  },

  LandingTitle: {
    backgroundColor: "transparent",
    fontWeight: "bold",
    color: theme.colorScheme === "dark" ? "white" : "black",
    paddingTop: "7rem",
    borderRadius: "0",

    [theme.fn.smallerThan("md")]: {
      position: "absolute",
      bottom: "0",
      zIndex: 1,
      width: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      paddingBlock: "0.97rem",
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      textAlign: "center",
    },

    [theme.fn.smallerThan("xs")]: {
      paddingBlock: "1.4rem",
    },
  },

  Name: {
    fontSize: "2.5rem",

    [theme.fn.smallerThan("xs")]: {
      fontSize: "1.95rem",
    },
  },
}));
