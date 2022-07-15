import {
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { EthereumIcon, MetamaskIcon } from "../icons";
import { NestedListItemButton } from "../list";
import { getShortenAddress } from "../../utils";
import { ConnectPortfolioDialog } from "../dialogs";
import { useState } from "react";

const DRAWER_WIDTH = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const Layout = () => {
  const [connectPortfolioOpen, setConnectPortfolioOpen] = useState(false);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerHeader>
          <Button
            variant="contained"
            onClick={() => setConnectPortfolioOpen(true)}
          >
            Connect Portfolio
          </Button>
        </DrawerHeader>

        <List sx={{ width: "100%" }}>
          <NestedListItemButton
            icon={<MetamaskIcon />}
            primary="Metamask"
            secondary={getShortenAddress(
              "0xE0E26f616b2c6a5eccEc0320523f9C61d83fcbC0"
            )}
          >
            <List disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <EthereumIcon />
                </ListItemIcon>
                <ListItemText primary="Ethereum" />
              </ListItemButton>
            </List>
          </NestedListItemButton>
        </List>
      </Drawer>

      <ConnectPortfolioDialog
        open={connectPortfolioOpen}
        onClose={() => setConnectPortfolioOpen(false)}
      />
    </>
  );
};

export default Layout;
