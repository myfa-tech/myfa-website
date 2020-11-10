import { useState } from 'react';

const useDrawerState = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };

  return { state, setState, toggleDrawer };
};

export default useDrawerState;
