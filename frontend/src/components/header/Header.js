import * as React from "react";
import { Nav, Navbar, Container, Image, NavDropdown } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
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
import { Link } from "react-router-dom";

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Navbar
                expand="lg"
                style={{ backgroundColor: "#F5F5F5", color: "black" }}
            >
                <Container>
                    <Link to={"/home"}>
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
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center gap-3">
                            <Nav.Link active>
                                <Link to={"/home"}>Home</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={"/about"}>About</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={"/contact"}>Contact us</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={"/cart"}>
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
                                </Link>
                            </Nav.Link>
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
                            <Link to={"/login"}>
                                <Button
                                    variant="contained"
                                    color="brandRed"
                                    disableElevation
                                    sx={{ color: "white" }}
                                >
                                    Login
                                </Button>
                            </Link>
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
        </>
    );
};

export default Header;
