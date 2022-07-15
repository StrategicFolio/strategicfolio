import {
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { MetamaskIcon } from "../icons";
import BinanceWalletPng from "../../assets/images/binance-wallet.png";
import { useConnector } from "../../hooks";
import { useEffect } from "react";

const StyledImgIcon = styled("img")(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
}));

export const ConnectPortfolioDialog = ({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) => {
  const { activate, isActive } = useConnector();

  useEffect(() => {
    if (isActive) {
      onClose();
    }
  }, [isActive, onClose]);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>CONNECT PORTFOLIO</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItemButton onClick={() => activate("Metamask")}>
          <ListItemIcon>
            <MetamaskIcon />
          </ListItemIcon>
          <ListItemText primary="Metamask" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <StyledImgIcon src={BinanceWalletPng} alt="" />
          </ListItemIcon>
          <ListItemText primary="Binance Smartchain" />
        </ListItemButton>
      </List>
    </Dialog>
  );
};
