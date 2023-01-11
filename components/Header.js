import React from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
// import "../styles/header..css"

const Header = () => (
  <Menu style={{ marginTop: "10px", height: "55px", border: "0px", borderRadius: "0",boxShadow:"none" }} >
    <Link href="/">
      <a className="item " style={{ backgroundColor: "#2ec4b6", fontSize: "1.4rem", fontWeight: "600", color: "white", fontFamily: "Space Grotesk" ,borderRadius:"12px"}}>🪙 Block Fund</a>
    </Link>
    <Menu.Menu position="right">
      <Link href="/campaigns/new">
        <a className="item" style={{ backgroundColor: "#ffbf69", fontSize: "1rem", color: "#333333", fontFamily: "Space Grotesk", borderRadius:"12px" }}> ➕ Create Campaign</a>
      </Link>
    </Menu.Menu>
  </Menu>
);

export default Header;
