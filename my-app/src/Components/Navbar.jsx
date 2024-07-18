import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "../Container/dataSlice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const drawerWidth = 240;
const navItems = ["Home", "Cart"];

function DrawerAppBar(props) {
  const navigate = useNavigate();

  const { loggedIn } = useSelector((state) => state.product_data);
  const dispatch = useDispatch();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavigation = (item) => {
    if (item === "Cart") {
      navigate("/cart");
    } else {
      navigate("/");
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 ,
        display:"flex",
        justifyContent:"center",
            alignItems:"center"
      }}>
      <LocalMallIcon/>  
        E-Cart
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handleNavigation(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        {loggedIn && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}
            onClick={()=>dispatch(setLoggedIn())}
            >
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } ,
            border: "none",
                      outline: "none",
                      "&:focus": {
                        border: "none",
                        outline: "none",
                      },
                      "&:active": {
                        border: "none",
                        outline: "none",
                      },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" },
            display:"flex",
            alignItems:"center"
             }}
          >

          <LocalMallIcon/>  
            E-Cart
                     
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  marginRight: "1rem",
                  border: "none",
                  outline: "none",
                  "&:hover": { outline: "none", backgroundColor: "white" },
                  "&:focus": { outline: "none", backgroundColor: "white" },
                  "&:active": { outline: "none", backgroundColor: "white" },
                }}
                onClick={() => handleNavigation(item)}
              >
              {item=="Cart"&&<ShoppingCartIcon/>}
                {item}
              </Button>
            ))}
            {(loggedIn && (
              <Button
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  border: "none",
                  outline: "none",
                  "&:hover": { outline: "none", backgroundColor: "white" },
                  "&:focus": { outline: "none", backgroundColor: "white" },
                  "&:active": { outline: "none", backgroundColor: "white" },
                }}
                onClick={() => dispatch(setLoggedIn(false))}
              >
                Logout
              </Button>
            )) || (
              <Button
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  border: "none",
                  outline: "none",
                  "&:hover": { outline: "none", backgroundColor: "white" },
                  "&:focus": { outline: "none", backgroundColor: "white" },
                  "&:active": { outline: "none", backgroundColor: "white" },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
