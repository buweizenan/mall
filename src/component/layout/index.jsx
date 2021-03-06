import React from 'react';
import './theme.css';

import NavTop from 'component/nav-top/index.jsx'
import NavSide from 'component/nav-side/index.jsx'

class Layout extends React.Component{
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div id="wrapper">
        <NavTop />
        <NavSide />
        {this.props.children}
      </div>
    )
  }
}

export default Layout;