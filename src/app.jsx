/*
* @Author: Rosen
* @Date:   2018-01-13 11:27:21
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-05 14:02:20
*/  

import React            from 'react';
import ReactDOM         from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Layout from 'component/layout/index.jsx'
// 页面
import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'
import Order from 'page/order/index.jsx'
import ProductRouter from 'page/product/router.jsx'
import UserList from 'page/user/index.jsx'
import ErrorPage from 'page/error/index.jsx'

class App extends React.Component{
    render() {
        return (
            <Router>
                <Switch>
                    {/* 当匹配到的是/login页面时用login组件渲染这样就不会出现导航栏其他路径的时候用layout渲染 */}
                    <Route path="/login" component={Login} />
                    <Route paht="/" render={props => (
                        <Layout>
                            <Switch> {/*switch只匹配它第一个匹配到的东西 */}
                                <Route exact path="/" component={Home}/>
                                <Route path="/product" component={ProductRouter}/>
                                <Route path="/product-category" component={Home}/>
                                <Route path="/order" component={Order}/>
                                <Route path="/user/index" component={UserList}/>
                                <Redirect exact from="/user" to="/user/index" />
                                {/* <Redirect from="*" to="/" /> 重定向 from路径的地址都会被重定向到to指定的地址*/}
                                <Route component={ErrorPage}/>
                                {/* 上面这个route不需要设置path因为需要前面几个都匹配不到后才匹配这个错误页面 */}
                            </Switch>
                        </Layout>
                    )} />
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)