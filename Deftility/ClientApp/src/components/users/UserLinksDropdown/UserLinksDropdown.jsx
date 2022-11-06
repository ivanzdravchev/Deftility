import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system'

import './UserLinksDropdown.scss';

const StyledDivider = styled(Divider)({
  fontSize: 12,
  fontFamily: 'Roboto-Medium'
});

const routes = [
  {divider: 'WORK'},
  {url: '/projects', text: 'My Projects'},
  {url: '/offers', text: 'Offers'},
  {divider: 'FINANCES'},
  {url: '/', text: 'Make a deposit'},
  {url: '/', text: 'Withdraw funds'},
  {divider: 'ACCOUNT'},
  {url: '/', text: 'View Profile'},
  {url: '/logout', text: 'Logout'}
];

export default function UserLinksDropdown({ triggerLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 1 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
          <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            minWidth: 200,
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.2,
            p: 2,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {routes.map((item, i) => (
          item.url !== undefined ?
          <MenuItem sx={{p: 0}} key={item.text}>
            <Link to={item.url} className="user-link">{item.text}</Link>
          </MenuItem>
          : <StyledDivider key={item.divider}>{item.divider}</StyledDivider>
        ))}
      </Menu>
    </>
  );
}
