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

const getRelation = (code) => {
  const relations = {
    AM: 'Ami(e)',
    CO: 'Conjoint(e)',
    EN: 'Enfant',
    FR: 'Frère',
    GM: 'Grand-Mère',
    GP: 'Grand-Père',
    ME: 'Mère',
    NE: 'Neveu',
    NI: 'Nièce',
    ON: 'Oncle',
    PE: 'Père',
    SO: 'Soeur',
    TA: 'Tante',
    AU: 'Autre',
  };

  return relations[code] || code;
};

const PeopleInfoPopover = ({ anchorEl, open, handlePopoverClose, info }) => {
  const classes = useStyles();

  return (
    <Popover
      id='mouse-over-realtive-popover'
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
      <h1>Infos</h1>
      <p>{info.firstname} {info.lastname} ({getRelation(info.relation)})</p>
      {info.email ? <p>@ : {info.email}</p> : null}
      <p>Tel : {info.country} {info.phone}</p>
      <p>{info.address}</p>
    </Popover>
  );
};

export default PeopleInfoPopover;
