import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

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
  const [collapseOpen, setCollapseOpen] = useState({});

  const toggleCollapse = (itemLabel) => setCollapseOpen({ ...collapseOpen, [itemLabel]: !collapseOpen[itemLabel] });

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
            item.items ?
            <div key={item.label}>
              <ListItem button onClick={() => toggleCollapse(item.label)}>
                <ListItemText className='list-item' primary={item.label} />
                {collapseOpen[item.label] ? <FaCaretUp /> : <FaCaretDown />}
              </ListItem>
              <Collapse in={collapseOpen[item.label]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.items.map((it, id) => (
                    <ListItem button key={it.label} onClick={() => onItemClick(it)}>
                      <ListItemText className='list-item sub-list-item' primary={it.label} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div> :
            <ListItem className={item.type === 'button' ? 'button' : ''} button key={item.label} onClick={() => onItemClick(item)}>
              <ListItemText className='list-item' primary={item.label} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
