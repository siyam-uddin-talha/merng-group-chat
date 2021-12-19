import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';


export default function AppHeader() {

    const [mobileBarOpen, setMobileBarOpen] = useState(false)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className='app_header border-bottom' style={{
                background: 'white',
                color: '#606688',
                boxShadow: `none`,
            }} >
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, }}
                        onClick={() => setMobileBarOpen(!mobileBarOpen)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Mr LigtHouse
                    </Typography>

                </Toolbar>
            </AppBar>


        </Box>
    );
}