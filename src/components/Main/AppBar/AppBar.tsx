import { styled, StyledComponentProps, Theme } from "@mui/material";
import { AppBar as MuiAppBar } from "@mui/material";


export interface MainAppBarProps extends StyledComponentProps {
	theme?: Theme;
	position?: string;
	open?: boolean;
	drawerWidth: number;
}

export const MainAppBar: React.FunctionComponent<MainAppBarProps> = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) =>
    prop !== "open" && prop !== "drawerWidth",
})(({ theme, open, drawerWidth }) => ({
  marginBottom: theme.spacing(2),
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