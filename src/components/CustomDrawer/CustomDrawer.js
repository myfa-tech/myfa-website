import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './CustomDrawer.scss';

const useStyles = makeStyles({
  list: {
    width: 300,
    paddingTop: 30,
  },
  fullList: {
    width: 'auto',
  },
});

const CustomDrawer = ({ anchor, state, toggleDrawer, list, onItemClick }) => {
  const classes = useStyles();

  return (
    <Drawer id='custom-drawer' anchor={anchor} open={state[anchor]} onClose={() => toggleDrawer(anchor, false)}>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onKeyDown={() => toggleDrawer(anchor, false)}
      >
        <List>
          {list.map((item, index) => (
            <ListItem button key={item.label} onClick={() => onItemClick(item)}>
              <ListItemText className='list-item' primary={item.label} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
