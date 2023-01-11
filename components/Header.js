import React from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
// import "../styles/header..css"

const Header = () => (
  <Menu style={{ marginTop: "10px", height: "55px", border:"none", boxShadow:"0px 1px #cbf3f0", borderRadius:"0"}} >
    <Link href="/">
      <a className="item " style={{ backgroundColor: "#2ec4b6", fontSize:"1.4rem", fontWeight:"600", color:"white"  }}>🪙 Block Fund</a>
    </Link>
    <Menu.Menu position="right">
      <Link href="/campaigns/new">
        <a className="item"> <span style={{ }}>➕</span> Create Campaign</a>
      </Link>
    </Menu.Menu>
  </Menu>
);

export default Header;
