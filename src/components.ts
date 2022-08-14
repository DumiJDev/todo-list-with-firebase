import styled from "@emotion/styled";
import { ListItemButton } from "@mui/material";

export const ListItem = styled.li`
  background-color: #fff;
  transition: all linear 500ms;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  width: 95%;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: 90% 10%;

  :hover {
    width: 90%;
    translate: 2% 0;
    margin-bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    transition: all linear 500ms;
  }
`.withComponent(ListItemButton);
