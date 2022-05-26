import {
  ActionIcon,
  Autocomplete,
  Burger,
  Container,
  Group,
  Text,
  Transition,
  useMantineColorScheme,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import React from "react";
import { MdDarkMode, MdLightMode, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { NavLinks } from "../Config/Variable";
import { BlackText, WhiteText } from "../Styles/StyledComonents/Text";
import { LandingStyles } from "../Styles/Theme/Landing";

export const Navbar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { classes } = LandingStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);

  return (
    <Container fluid px="0" className={classes.LandingContainer} id="home">
      <Container size="lg" px="0">
        <Container fluid className={classes.Navbar}>
          <Text size="xl">Solitude</Text>

          <Group className={classes.Links}>
            {NavLinks?.map((link) => (
              <Link className={classes.Link} key={link.name} to={link.link}>
                <WhiteText>{link.name}</WhiteText>
              </Link>
            ))}
            <Autocomplete
              placeholder="Search"
              icon={<MdSearch size={16} />}
              data={[
                "React",
                "Angular",
                "Vue",
                "Next.js",
                "Riot.js",
                "Svelte",
                "Blitz.js",
              ]}
            />
            <ActionIcon
              variant="transparent"
              onClick={() => toggleColorScheme()}
              title="ColorScheme Toggle"
              style={{ color: "white" }}
            >
              {dark ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
            </ActionIcon>
          </Group>

          <Burger
            className={classes.Burger}
            opened={opened}
            onClick={() => toggleOpened()}
            color="white"
          />

          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Container
                fluid
                className={classes.Dropdown}
                style={styles}
                px="0"
              >
                {NavLinks?.map((link, index) => (
                  <Link key={link.name} to={link.link} className={classes.Link}>
                    <BlackText key={index}>{link.name}</BlackText>
                  </Link>
                ))}
                <Autocomplete
                  placeholder="Search"
                  icon={<MdSearch size={16} />}
                  data={[
                    "React",
                    "Angular",
                    "Vue",
                    "Next.js",
                    "Riot.js",
                    "Svelte",
                    "Blitz.js",
                  ]}
                  style={{ paddingInline: "1rem" }}
                />
                <ActionIcon
                  variant="transparent"
                  onClick={() => toggleColorScheme()}
                  title="ColorScheme Toggle"
                  style={{ color: "white" }}
                >
                  {dark ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
                </ActionIcon>
              </Container>
            )}
          </Transition>
        </Container>
      </Container>
    </Container>
  );
};
