import React from "react";
import { Tabs } from 'antd';

  
  const items= [
    {
      key: '1',
      label: 'Search',
      children: '',
    },
    {
      key: '2',
      label: 'Rated',
      children:'',
    },
  ];

const TabList=()=>{
    return(
      <div className="tabs">
        <Tabs defaultActiveKey="2" items={items}/>
      </div>
        
    )
}
export default TabList