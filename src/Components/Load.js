import React from "react";
import ReactLoading from "react-loading";

export default function Load() {
return (
	<div style={{position:"absolute",left:"40%",transform: "translateX(40%)",top:"30%",transform:"translateY(30%)",zIndex:"1"}}>
	<ReactLoading
		type="spokes"
		color="white"
		height={100}
		width={100}
	/>
	</div>
);
}
