import React from 'react';
import { Pagination } from 'antd';
const Pagin = () => (
  <>
   <div className='pagination'>
   <Pagination align="center" defaultCurrent={1} total={50} />
   </div>
    
   
  </>
);
export default Pagin;