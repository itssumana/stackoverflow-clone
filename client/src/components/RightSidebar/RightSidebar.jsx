import React from 'react'
import Widget from './Widget'
import WidgetTags from './WidgetTags'

const RightSidebar = () => {
  return (
    <div>
      <aside className='right-sidebar'>
        <Widget />
        <WidgetTags />
      </aside>
    </div>
  )
}

export default RightSidebar
