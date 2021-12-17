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
import { useState } from "react";
import { MainAppBar } from "./../components/Main/AppBar/AppBar";
import { Main } from "./../components/Main/Main";
import { MainToolbar } from "./../components/Main/Toolbar/Toolbar";

const DRAWER_WIDTH = 240;

export const MainLayout: React.FunctionComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

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
        console.log("Countries!");
      },
    },
    {
      icon: <Language />,
      label: "Languages",
      onClick: () => {
        console.log("Languages!");
      },
    },
  ];

  return (
    <Box>
      {/* Source : MUI Drawers -> Persistent Drawer */}
      <MainAppBar position="sticky" drawerWidth={DRAWER_WIDTH} open={openDrawer}>
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

      <Main variant="elevation" elevation={0} drawerWidth={DRAWER_WIDTH} open={openDrawer}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main>
    </Box>
  );
};

export default MainLayout;
