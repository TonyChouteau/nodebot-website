//====================================================
// Import
//====================================================

//======================
// Vendors

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Markdown from 'react-markdown';
import {isMobile} from 'react-device-detect';
import Prism from 'prismjs';

import "prismjs/components/prism-bash";

//======================
// Own

import "./index.css";

//====================================================
// Define
//====================================================

//loadLanguages(['bash']);

const useStyles = makeStyles({
	markdown: props => ({
		textAlign: "left",
		paddingLeft: props.padding,
		paddingRight: props.padding,
		"&h1": {
			textAlign: "center",
		}
	}),
	code: {
		backgroundColor: "#393939", 
	}
});

const MARKDOWNN = [
	"http://vps.tonychouteau.fr/bridge/https://pastebin.com/raw/iDNTaJUG",
	"http://vps.tonychouteau.fr/bridge/https://pastebin.com/raw/4ze2eVXr",
	"http://vps.tonychouteau.fr/bridge/https://pastebin.com/raw/NRPMwyBT",
];


const IMAGES = {
	"./ping.png": "https://www.tonychouteau.fr/nodebot/ping.png",
	"./hello.png": "https://www.tonychouteau.fr/nodebot/hello.png",
	"./script.png": "https://www.tonychouteau.fr/nodebot/script.png",
	"./save.png": "https://www.tonychouteau.fr/nodebot/save.png",
	"./cross.png": "https://www.tonychouteau.fr/nodebot/cross.png",
};

//====================================================
// Function
//====================================================

async function getMarkdown(id) {
	return await fetch(MARKDOWNN[id]);
}

// function LinkUri(uri) {
// 	console.log("Link : "+uri);
// }

/*function ImageUri(uri) {
	if (uri==="./ping.png"){
		return <div></div>
	}
	console.log("Image : "+uri);
}*/

//====================================================
// Renderer
//====================================================

//====================================================
// Component
//====================================================

function Documentation(props) {

	const padding = {
		padding : isMobile?"0":"100px",
	}

	const classes = useStyles(padding);

	const [data, setData] = React.useState("");
	const [refresh, setRefresh] = React.useState(true);

	if (refresh){
		setRefresh(false);
		getMarkdown(props.pageId-3)
		.then((data) => data.text())
		.then((text) => {
			setData(text);
		})
	}

	
	function renderImage(props){
		return (
			<img src={IMAGES[props.src]} alt={props.src}></img>
		);
	}

	function renderCode(props){
		let html = Prism.highlight(props.value, Prism.languages[props.language?props.language:"bash"], props.language?props.language:"bash");
		html = html.split("-X").join("<span class=\"token meth\">-X</span>");
		html = html.split("-i").join("<span class=\"token meth\">-i</span>");
		html = html.split("--data-urlencode").join("<span class=\"token meth\">--data-urlencode</span>");
		html = html.split("-F").join("<span class=\"token meth\">-F</span>");
		html = html.split("python -m json.tool").join("<span class=\"token python\">python -m json.tool</span>");
		
		html = html.split("start").join("<span class=\"token function\">start</span>");
		html = html.split("dos2unix").join("<span class=\"token function\">dos2unix</span>");
		html = html.split("./test.sh").join("<span class=\"token file\">./test.sh</span>");
		html = html.split("./request.txt").join("<span class=\"token file\">./request.txt</span>");
		html = html.split("Unknown").join("<span class=\"token meth\">Unknown</span>");
		html = html.split("command").join("<span class=\"token meth\">command</span>");
		html = html.split("<span class=\"token entity\" title=\"\\r\">\\r</span>").join("<span class=\"token function\">\\r</span>");

		return(
			<React.Fragment>
				<code className={classes.code}>
					<div className={classes.code} dangerouslySetInnerHTML={
						{
							__html:html
						}
					}/>	
				</code>
			</React.Fragment>
		);
	}
	
	return (
		<React.Fragment>
			<Markdown 
				source={data} 
				className={classes.markdown}
				escapeHtml={false}
				//transformLinkUri={LinkUri}
				//transformImageUri={ImageUri}
				renderers={{
					image: renderImage,
					code: renderCode,
				}}
			/>
		</React.Fragment>	
	)
}

//====================================================
// Export
//====================================================

export default Documentation;

//====================================================
// End
//====================================================