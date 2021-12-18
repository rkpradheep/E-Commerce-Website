import React from "react";
import ReactLoading from "react-loading";

export default function Load() {
return (
	<div style={{position:"absolute",left:"45%",transform: "translateX(50%)",top:"20%",transform:"translateY(20%)",zIndex:"1"}}>
	<ReactLoading
		type="spinningBubbles"
		color="#0000FF"
		height={100}
		width={100}
	/>
	</div>
);
}
