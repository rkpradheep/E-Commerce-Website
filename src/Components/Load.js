import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import ReactLoading from "react-loading";

export default function Load(prop) {
return (
	<div style={{backgroundColor:"#f8f8f8ad",left:"0",top:"0",zIndex:"1",position:"fixed",height:"100%",width:"100%"}}>
	<div style={{margin:"0",top:"40%",transform:"translateY(-40%)",left:"50%",transform:"translateX(-50%)",position:"absolute"}}>
	<ReactLoading
		type="spokes"
		color="lightblack"
		height={40}
		width={40}
	/>
	</div>
	</div>
);
}
