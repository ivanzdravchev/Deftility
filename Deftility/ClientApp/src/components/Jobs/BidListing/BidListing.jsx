import React from 'react';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { stringToAvatarProps } from '../../../utils/avatarUtil';

import './BidListing.scss';
import { getTimeAgo } from '../../../utils';

export default function BidListing({ bidInfo }) {
  return (
    <div className="bid-listing-wrapper">
      <div className="bid-listing-user-avatar">
        <Tooltip title={bidInfo.creator.username}>
          <IconButton
            component={Link}
            to="/"
            sx={{p: 0}}>
            <Avatar {...stringToAvatarProps(bidInfo.creator.username, 64, 64)} />
          </IconButton>
        </Tooltip>
      </div>
      <div className="bid-listing-user-info">
        <div className="bid-listing-header">
          <div className="bid-listing-username">
            <Link to="/">{bidInfo.creator.username}</Link>
            <span>{getTimeAgo(new Date(bidInfo.createdOn + "+00:00"))}</span>
          </div>
          <div className="bid-listing-buttons">
            <Link to="/" className="bid-listing-message">Message</Link>
            <button className="bid-listing-hire">Hire</button>
          </div>
        </div>
        <div className="bid-listing-proposition">
          <div>Amount: {bidInfo.amount}</div>
          <div>Estimate: {bidInfo.estimate}</div>
        </div>
        <div>{bidInfo.message}</div>
      </div>
    </div>
  )
}
