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
    maxWidth: 500,
  },
}));

const CommentPopover = ({ anchorEl, open, handlePopoverClose, comment }) => {
  const classes = useStyles();

  return (
    <Popover
      id='mouse-over-comment-popover'
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
      <h1>Commentaire</h1>

      <p>{comment}</p>
    </Popover>
  );
};

export default CommentPopover;
