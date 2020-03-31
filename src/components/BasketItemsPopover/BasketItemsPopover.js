import React from 'react';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
    fontFamily: 'Josefin Sans',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const BasketItemsPopover = ({ anchorEl, open, handlePopoverClose, items }) => {
  const classes = useStyles();

  return (
    <Popover
      id='mouse-over-items-popover'
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <h1>Composition</h1>

      <ul>
        {items && items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Popover>
  );
};

export default BasketItemsPopover;
