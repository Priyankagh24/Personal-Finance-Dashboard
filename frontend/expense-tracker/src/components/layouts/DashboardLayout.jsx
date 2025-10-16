import React from 'react'

import Navbar from "./Navbar";
import SideMenu from "./SideMenu";


const DashboardLayout = ({children, activeMenu}) => {
   
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
{/* {user && (  */}
<div className="flex">


<SideMenu activeMenu={activeMenu} />

<div className="grow mx-5">{children}</div>
</div>
</div>

  )
}


export default DashboardLayout
