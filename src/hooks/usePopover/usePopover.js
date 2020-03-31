import { useState } from 'react';

const usePopover = (initDetails, initAnchor) => {
  const [popoverDetails, setPopoverDetails] = useState(initDetails);
  const [anchorEl, setAnchorEl] = useState(initAnchor);

  const handlePopoverOpen = (event, details) => {
    setPopoverDetails(details);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return [popoverDetails, setPopoverDetails, anchorEl, setAnchorEl, open, handlePopoverOpen, handlePopoverClose];
};

export default usePopover;
