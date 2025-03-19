import React from 'react'
import { Tabs } from 'antd'

const items = [
  {
    key: '1',
    label: 'Search',
  },
  {
    key: '2',
    label: 'Rated',
  },
]

const TabList = ({ activeTab, onChange }) => {
  return (
    <div className="tabs">
      <Tabs
        destroyInactiveTabPane
        defaultActiveKey="1"
        activeKey={activeTab} // Управляем активной вкладкой
        onChange={onChange} // Обрабатываем изменение вкладки
        items={items}
      />
    </div>
  )
}

export default TabList
