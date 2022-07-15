import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ReactNode, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export const NestedListItemButton = ({
  icon,
  primary,
  secondary,
  children,
}: {
  icon?: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
  children: ReactNode;
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setOpened(!opened)}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={primary} secondary={secondary} />
        {opened ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={opened} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};
