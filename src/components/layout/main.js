import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import useLocalStorage from '@/hooks/useLocalStorage';

import {
  Toolbar,
  Drawer,
  Box,
  CssBaseline,
  Typography,
} from '@mui/material';

import SideBar from './sidebar';
import Header from './header';
import Footer from './footer';

const drawerWidth = 240;

function Main(props) {
  const [value, setValue, removeValue] = useLocalStorage("_access_token", "");

  const { window, children } = props;
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if (status !== 'loading') {
      if (!session?.accessToken) {
        router.push('/auth/login')
      }
      if(status === 'authenticated') {
        setValue(session.accessToken);
      }
      if(status === 'unauthenticated') {
        removeValue("_access_token");
      }
    }
    console.log("status: ", status)
  }, [session, status])

  return (
    <>
      {status === 'loading' ?
        <>Loading</>
        : status === 'authenticated' ? <>
          <Box sx={{ display: 'flex', height: "100vh" }}>
            <CssBaseline />
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                <SideBar />
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
              >
                <SideBar />
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
              <Toolbar />
              <main>{children}</main>
              <Footer />
            </Box>
          </Box>
        </>
          : null}
    </>

  );
}

Main.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Main;