import { Paper, styled, StyledComponentProps, Theme } from "@mui/material";

export interface MainProps extends StyledComponentProps {
  theme?: Theme;
  open: boolean;
  drawerWidth: number;
  variant?: string;
  elevation?: number;
}

export const Main: React.FunctionComponent<MainProps> = styled(Paper, {
  shouldForwardProp: (prop: string) =>
    prop !== "open" && prop !== "drawerWidth",
})(({ theme, open, drawerWidth }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(5),
  flexGrow: 1,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
