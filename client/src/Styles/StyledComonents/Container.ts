import { Box, Container } from "@mantine/core";
import styled from "styled-components";

export const ProductContainer = styled(Container)`
  padding-top: 4rem;
  max-width: 1200px;
`;

export const FlexContainer = styled(Box)`
  display: flex;
  justify-content: start;
  gap: 0.5rem;
  margin-block-start: 0.5rem;
  align-items: center;
`;
