import { useEffect } from 'react';

const setPageHeader = ( title: string ) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default setPageHeader;