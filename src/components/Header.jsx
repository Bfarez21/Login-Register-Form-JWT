import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    const handleLogout  = () => {
        localStorage.removeItem("token");
        navigate('/welcome');
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div">
                    Proyecto React con JWT
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout } // llamo a handleLogout 
                    >
                        Cerrar sesión
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
