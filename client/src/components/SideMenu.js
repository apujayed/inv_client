import React, { useEffect, useState } from "react";
import logo from "../assets/logo/webscript.png";
import user from "../assets/user.jpg";
import {
  useLocation
} from "react-router-dom";

import MenuItem from "./MenuItem";

/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing
export const menuItems = [
  {
    name: "Dashboard",
    // exact: true,
    to: "/",
    iconClassName: "bi bi-speedometer2",
  },
  {
    name: "Accounts",
    // exact: true,
    to: `/acccounts`,
    iconClassName: "bi bi-speedometer2",
    subMenus: [
      { name: "New Account", to: "/accounts/newaccount" },
      { name: "Videos", to: "/content" },
    ],
  },

  {
    name: "Invoice",
    // exact: true,
    to: `/invoice`,
    iconClassName: "bi bi-speedometer2",
    subMenus: [
      { name: "Pos", to: "/invoice" },
      { name: "Videos", to: "/content" },
    ],
  },

  {
    name: "Inventory",
    // exact: true,
    to: "/inventory",
    iconClassName: "bi bi-speedometer2",
  },
  {
    name: "Content 2",
    // exact: true,
    to: `/content-2`,
    iconClassName: "bi bi-speedometer2",
    subMenus: [
      { name: "Courses", to: "/content-2/courses" },
      { name: "Videos", to: "/content-2/videos" },
    ],
  },
  { name: "Design 2", to: `/design-2`, iconClassName: "bi bi-vector-pen" },
  { name: "Design 3", to: `/design-3`, iconClassName: "bi bi-vector-pen" },
  { name: "Design 4", to: `/design-4`, iconClassName: "bi bi-vector-pen" },
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

const routePath = useLocation().pathname;
  const onTop = () => {
    window.scrollTo(10, 0);
  }
  useEffect(() => {
    onTop()
    console.log(routePath)
  }, [routePath]);



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








  
  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {

    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };
 

  
  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
   
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
<>
<div class="topbar">
            <div class="topbar-left">
              <div className="tlogo">
              <img class="avatar" src={logo} alt="webscript" />
              </div>
            
              <a href="#" class="logo">
             
                <span class="logo-light">
                  <i class="mdi mdi-camera-control"></i> Jassa
                </span>
              </a>
            </div>

            <nav class="navbar-custom">
            <div class="hamburger">
            <i onClick={() => setInactive(!inactive)} class="fas fa-bars"></i>
                </div>
                <div class="top-right">







           <div className="profile">
      <img className="avatar" src="https://pos.softghor.com/dashboard/img/avatar/1.jpg" alt="avater" />

           </div>

      
           <div className="profile">
           <i className=" avatar bi bi-bell"></i>
           </div>
           <div className="notification">
      <i className=" avatar bi bi-gear-fill"></i>
           </div>

                </div> 
                
            </nav>
          </div>




{/* <div  className={inactive ? "section-inactive" : "section-active"}>
      <div class="top_navbar navbar-fixed ">
          <div class="hamburger">
              <a href="#">
                  <i class="fas fa-bars"></i>
              </a>
          </div>
      </div>
       
  </div> */}
    <div  className={`side-menu ${inactive ? "inactive" : ""}`}>
 

    
{/* 
      <div className="search-controller">
        <button className="search-btn">
          <i className="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div> */}

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}

          {/* <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i className="bi bi-speedometer2"></i>
              </div>
              <span>Dashboard</span>
            </a>
          </li>
          <MenuItem
            name={"Content"}
            subMenus={[{ name: "Courses" }, { name: "Videos" }]}
          />
          <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i className="bi bi-vector-pen"></i>
              </div>
              <span>Design</span>
            </a>
          </li> */}
        </ul>
      </div>
   
    </div>
    
    </>
  );
  
};

export default SideMenu;
