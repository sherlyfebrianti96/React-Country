import { Close, Language, Public } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainAppBar } from "./../components/Main/AppBar/AppBar";
import { Main } from "./../components/Main/Main";
import { MainToolbar } from "./../components/Main/Toolbar/Toolbar";

const DRAWER_WIDTH = 240;

export interface MainLayoutProps {
  children?: ReactElement | Array<ReactElement>
}

export const MainLayout: React.FunctionComponent<MainLayoutProps> = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const navigate = useNavigate();

  const onDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const onDrawerClosed = () => {
    setOpenDrawer(false);
  };

  const features = [
    {
      icon: <Public />,
      label: "Countries",
      onClick: () => {
        navigate(`/countries`)
      },
    },
    {
      icon: <Language />,
      label: "Languages",
      onClick: () => {
        navigate(`/languages`)
      },
    },
  ];

  return (
    <Box>
      {/* Source : MUI Drawers -> Persistent Drawer */}
      <MainAppBar
        position="sticky"
        drawerWidth={DRAWER_WIDTH}
        open={openDrawer}
      >
        <MainToolbar show={openDrawer} onOpen={onDrawerOpen} />
      </MainAppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={onDrawerClosed}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
          padding: 10,
        }}
      >
        <Paper variant="elevation" elevation={0}>
          <Grid container sx={{ padding: 1 }}>
            <Grid container justifyContent="space-around" alignItems="center">
              <Grid item xs={10}>
                <Typography variant="h6">Features</Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={onDrawerClosed}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Divider />
        <List>
          {features.map((feature) => (
            <ListItemButton key={feature.label} onClick={feature.onClick}>
              <ListItemIcon>{feature.icon}</ListItemIcon>
              <ListItemText primary={feature.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Main
        variant="elevation"
        elevation={0}
        drawerWidth={DRAWER_WIDTH}
        open={openDrawer}
      >
        {props.children}
      </Main>
    </Box>
  );
};

export default MainLayout;
