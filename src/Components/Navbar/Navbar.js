import React from "react";
import NavStd from "./NavStd";
import NavNolog from "./Navnolog";
import NavParent from "./NavParent";
import NavTrainer from "./NavTrainer";
import NavAdmin from "./NavAdmin";

function Navbar({auth}) {
  if(auth==0){
    return <NavNolog/>
  }
  else if (auth==1){
    return <NavStd/>
  }
  else if (auth==2){
    return <NavParent/>
  }
  else if (auth==3){
    return <NavTrainer/>
  }
  else if (auth==4){
    return <NavAdmin/>
  }
}

export default Navbar;
