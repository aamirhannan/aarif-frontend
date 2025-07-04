import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useContext } from 'react';
import AuthContext from '@/context/authContext';
import { Skeleton } from '@mui/material';
import Show from '../Show';
import CustomButton from '../Button';
import { useRouter } from 'next/navigation';
function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { handleLogout, userData } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        router.prefetch("/");
        router.prefetch("/login");
        router.prefetch("/signup");
        setIsLoading(false);
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: 2, padding: 1, }}>
                <Show when={userData && Object.keys(userData).length > 0}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>{isLoading ? <Skeleton variant="circular" width={32} height={32} /> : userData?.name?.charAt(0)}</Avatar>
                        </IconButton>
                    </Tooltip>
                </Show>
                <Show when={!userData || Object?.keys(userData)?.length === 0}>
                    <CustomButton
                        btnText="Login"
                        btnClick={() => router.push("/login")}
                        disabled={false}
                        loading={false}
                        type="submit"
                        variant="secondary"
                    />
                    <CustomButton
                        btnText="Signup"
                        btnClick={() => router.push("/signup")}
                        disabled={false}
                        loading={false}
                        type="submit"
                        variant="primary"
                    />
                </Show>
            </Box >
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}


export default AccountMenu;