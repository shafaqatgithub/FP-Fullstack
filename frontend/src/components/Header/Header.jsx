import * as React from "react";
import { Nav, Navbar, Container, Image, NavDropdown } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { LinkContainer } from "react-router-bootstrap";
import { Badge, Button } from "@mui/material";
import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { PersonAdd, Logout, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";



const Header = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <header className="app__header">
    //   <Navbar expand="lg" className="bg-body-tertiary">
    //     <Container>
    //       <Navbar.Brand>
    //         <Link to="/">
    //           <img
    //             src="https://flashplus.in/wp-content/uploads/2023/03/templeAsset-1@4x.png"
    //             alt="brand logo"
    //           />
    //         </Link>
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="me-auto">
    //           <Nav.Link href="#home">Home</Nav.Link>
    //           <Nav.Link href="#link">Link</Nav.Link>
    //           <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //             <NavDropdown.Item href="#action/3.2">
    //               Another action
    //             </NavDropdown.Item>
    //             <NavDropdown.Item href="#action/3.3">
    //               Something
    //             </NavDropdown.Item>
    //             <NavDropdown.Divider />
    //             <NavDropdown.Item href="#action/3.4">
    //               Separated link
    //             </NavDropdown.Item>
    //           </NavDropdown>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    // </header>
    <header>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "#F5F5F5", color: "black" }}
      >
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>
              <Image
                src={
                  "https://flashplus.in/wp-content/uploads/2023/03/templeAsset-1@4x.png"
                }
                alt="Flashplus logo"
                style={{ height: "40px" }}
                className="me-3"
              />
              {/* <strong>Flashplus</strong> */}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center gap-3">
              <LinkContainer to={"/"}>
                <Nav.Link active>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/about"}>
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/contact"}>
                <Nav.Link>Contact us</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  Cart
                  {/* <Badge
                    badgeContent={cartItems.reduce(
                      (a, c) => a + Number(c.qty),
                      0
                    )}
                    max={9}
                    color="yellow"
                  > */}
                  <ShoppingCartOutlinedIcon />
                  {/* </Badge> */}
                </Nav.Link>
              </LinkContainer>
              {/* {userInfo ? (
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <AccountCircleOutlinedIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : ( */}
              <LinkContainer to={"/login"}>
                <Button
                  variant="contained"
                  color="brandRed"
                  disableElevation
                  sx={{ color: "white" }}
                >
                  Login
                </Button>
              </LinkContainer>
              {/* )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
