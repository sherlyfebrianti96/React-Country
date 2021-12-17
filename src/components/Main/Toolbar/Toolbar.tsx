import { Menu } from "@mui/icons-material";
import { IconButton, Toolbar, Typography } from "@mui/material";

export interface MainToolbarProps {
  show?: boolean;
  onOpen?: () => void;
}

export const MainToolbar: React.FunctionComponent<MainToolbarProps> = ({
  onOpen,
  ...props
}) => {
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onOpen}
        edge="start"
        sx={{ mr: 2, ...(props.show && { display: "none" }) }}
      >
        <Menu />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Small Application Brand
      </Typography>
    </Toolbar>
  );
};

export default Toolbar;
