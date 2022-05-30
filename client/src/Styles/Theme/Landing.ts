import { createStyles } from "@mantine/core";

export const LandingStyles = createStyles((theme) => ({
  LandingContainer: {
    backgroundColor: "black",
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },

  Navbar: {
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "4rem",
  },

  Dropdown: {
    position: "absolute",
    top: "4rem",
    left: "0",
    right: "0",
    zIndex: 1,
    backgroundColor: "black",
    width: "100vw",
    textAlign: "center",
    fontWeight: "bold",

    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },

  Links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  Link: {
    color: "white",
    textDecoration: "none",
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

  // Landing Image
  LandingImage: {
    position: "relative",

    "::after": {
      content: '""',
      backgroundColor: theme.colorScheme === "dark" ? "black" : "white",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      minHeight: "100%",
      opacity: 0.5,
    },
  },

  LandingImageText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: theme.colorScheme === "dark" ? "white" : "black",
  },

  LandingTitle: {
    fontSize: "3rem",
    letterSpacing: "2rem",
  },
}));
