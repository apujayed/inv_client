import "./App.css";
import SideMenu, { menuItems } from "./components/SideMenu";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState ,useEffect} from "react";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Store from "./context/Store";
import Inventory from "./pages/Inventory";
import Transaction from "./pages/Transaction";
// const Dashboard = () => <h1>Dashboard</h1>;
const Content = () => <h1>Content</h1>;
const Courses = () => <h1>Content/Courses</h1>;
const Videos = () => <h1>Content/Videos</h1>;
const Design = () => <h1>Design</h1>;
const Content2 = () => <h1>Content2</h1>;
const Courses2 = () => <h1>Content/Courses 2</h1>;
const Videos2 = () => <h1>Content/Videos 2</h1>;
const Design2 = () => <h1>Design 2</h1>;

function App() {
  const [inactive, setInactive] = useState(false);


  const [isMobile, setIsMobile] = useState(false)
  const [value, setValue] = useState(true)
//choose the screen size 
const handleResize = () => {
  if (window.innerWidth < 720) {
      setInactive(true)
      console.log();
  } else {
    setInactive(false)
  }
}

// create an event listener
useEffect(() => {
  window.addEventListener("resize", handleResize)
 
},[])


  return (
    <div className="">
      <Router>
        <SideMenu
          onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        />

        <div className={`container2 ${inactive ? "inactive" : ""}`}>
          {/* improvememt, not recorded in video, its just looping through menuItems
          instead of hard coding all the routes */}
          {/* {menuItems.map((menu, index) => (
            <>
              <Route key={menu.name} exact={menu.exact} path={menu.to} component={Dashboard}/>
              
              {menu.subMenus && menu.subMenus.length > 0
                ? menu.subMenus.map((subMenu, i) => (
                    <Route key={subMenu.name} path={subMenu.to} component={subMenu.name}/>
                      
                   
                  ))
                : null}
            </>
          ))} */}

          <Switch>
            <Route exact path={"/"}>
              <Dashboard />
            </Route>
            <Store>
            <Route path="/inventory" component={Inventory} />
            <Route exact path={"/accounts"}>
              <Content />
            </Route>
           
            <Route path={"/accounts/newaccount"}>
              <Accounts />
            </Route>

            <Route path="/transaction" component={Transaction} />
            </Store>
{/*             
            <Route path={"/content/videos"}>
              <Videos />
            </Route> */}
            {/* <Route path ={"/inventory"}>
              <Dashboard />
            </Route> */}
            {/* <Route exact path={"/content-2"}>
              <Content2 />
            </Route>
            <Route path={"/content-2/courses"}>
              <Courses2 />
            </Route>
            <Route path={"/content-2/videos"}>
              <Videos2 />
            </Route>
            <Route path={"/design-2"}>
              <Design2 />
            </Route> */}
          </Switch>
        </div>
      </Router>
      <div  className={`main-footer ${inactive ? "m-inactive" : ""}`}>
    
    <strong>Copyright © 2020-2022 <a href="https://ittechpointbd.com">It Tech Point BD</a>.</strong> All rights
    reserved.
  </div>
    </div>
    
  );
}

export default App;
