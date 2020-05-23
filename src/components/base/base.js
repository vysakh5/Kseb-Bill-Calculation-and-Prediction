import React, { Children } from 'react'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './base.css'
import {
    BrowserRouter,
    Switch,
    Link,
    Route
} from 'react-router-dom'

import Billfinder from '../billfinder/billfinder'
import About from '../about/about'

const Base = ({
    className = "",
    children
})=> {
    return (
        <div>
            <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        
                        <Link  className="navbar-brand"    to="/"> 
                        <div className="tophead">
                    <h2 className="title">
                        Find-the-bill
                        
                    </h2>
                    
                </div>
                        </Link>
                        <button className="navbar-toggler tglbtn" type="button"
                        data-toggle="collapse" data-target="#nav-bar">
                            <span className="sr-only"> Switch Menu </span>
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="nav-bar">
                            <ul className="navbar-nav ml-auto mr-5">
                            <li className="nav-item ">
                                    <Link  className="nav-a"  to="/"> Home </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link  className="nav-a"  to="/findbill"> Dont Have Previous Bill? </Link>
                                </li>
                                <li className="nav-item">
                                    <a  className="nav-a"   href="http://kseb.in/"> Kseb  </a>
                                </li>
                                <li className="nav-item">
                                    <Link  className="nav-a"   to="/about"> About us</Link>
                                </li>
                                
                            </ul>
                    
                    
                    </div>
                </nav>

                <div className='children row'>
                        <div className='col-12 '>
                <Switch>
                    <Route exact path='/'>
                        {children}
                    </Route>

                    <Route  path='/findbill'>
                        <Billfinder/>
                    </Route>

                    <Route  path='/about'>
                        <About/>
                    </Route>


                </Switch>

                </div>
                </div>

            
            
            </BrowserRouter>


            




</div>

    )
}


export default Base