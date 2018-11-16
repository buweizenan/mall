import React from 'react';
import './theme.css';

import TopNav from 'component/top-nav/index.jsx'
import SidNav from 'component/sid-nav/index.jsx'

class Layout extends React.Component{
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div id="wrapper">
      test layout
        <TopNav />
        <SidNav />
        {this.props.children}
      </div>
    )
  }
}

export default Layout;