import { OceanData } from '@store/OceanStore';
import { dateConverter } from '@service/dateConverter';

export const notionToHtml = (oceanData:OceanData) => {
  // title:string, createDate:string, creator:string, label:Array<string>, imgUrl:Array<string>, content:string
  const title:string= oceanData.title||"";
  const createDate= oceanData.createDate?dateConverter({dateString:oceanData.createDate, tag:"koean"}):"";
  const creator= oceanData.nickname||"";
  const labelForm:string= oceanData.labels?oceanData.labels.map(element=>element.name).join(', '):"";
  const imgUrlForm:string = oceanData.images?oceanData.images.map(element => `<figure class="image"><a href="${element.imageUrl}"><img src="${element.imageUrl}"/></a></figure>`).join(''):"";
  const content:string = oceanData.content||"";
  const notionHtml:string = `<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>${title} </title><style>\n/* cspell:disable-file */\n/* webkit printing magic: print all background colors */\nhtml {\n	-webkit-print-color-adjust: exact;\n}\n* {\n	box-sizing: border-box;\n	-webkit-print-color-adjust: exact;\n}\n\nhtml,\nbody {\n	margin: 0;\n	padding: 0;\n}\n@media only screen {\n	body {\n		margin: 2em auto;\n		max-width: 900px;\n		color: rgb(55, 53, 47);\n	}\n}\n\nbody {\n	line-height: 1.5;\n	white-space: pre-wrap;\n}\n\na,\na.visited {\n	color: inherit;\n	text-decoration: underline;\n}\n\n.pdf-relative-link-path {\n	font-size: 80%;\n	color: #444;\n}\n\nh1,\nh2,\nh3 {\n	letter-spacing: -0.01em;\n	line-height: 1.2;\n	font-weight: 600;\n	margin-bottom: 0;\n}\n\n.page-title {\n	font-size: 2.5rem;\n	font-weight: 700;\n	margin-top: 0;\n	margin-bottom: 0.75em;\n}\n\nh1 {\n	font-size: 1.875rem;\n	margin-top: 1.875rem;\n}\n\nh2 {\n	font-size: 1.5rem;\n	margin-top: 1.5rem;\n}\n\nh3 {\n	font-size: 1.25rem;\n	margin-top: 1.25rem;\n}\n\n.source {\n	border: 1px solid #ddd;\n	border-radius: 3px;\n	padding: 1.5em;\n	word-break: break-all;\n}\n\n.callout {\n	border-radius: 3px;\n	padding: 1rem;\n}\n\nfigure {\n	margin: 1.25em 0;\n	page-break-inside: avoid;\n}\n\nfigcaption {\n	opacity: 0.5;\n	font-size: 85%;\n	margin-top: 0.5em;\n}\n\nmark {\n	background-color: transparent;\n}\n\n.indented {\n	padding-left: 1.5em;\n}\n\nhr {\n	background: transparent;\n	display: block;\n	width: 100%;\n	height: 1px;\n	visibility: visible;\n	border: none;\n	border-bottom: 1px solid rgba(55, 53, 47, 0.09);\n}\n\nimg {\n	max-width: 100%;\n}\n\n@media only print {\n	img {\n		max-height: 100vh;\n		object-fit: contain;\n	}\n}\n\n@page {\n	margin: 1in;\n}\n\n.collection-content {\n	font-size: 0.875rem;\n}\n\n.column-list {\n	display: flex;\n	justify-content: space-between;\n}\n\n.column {\n	padding: 0 1em;\n}\n\n.column:first-child {\n	padding-left: 0;\n}\n\n.column:last-child {\n	padding-right: 0;\n}\n\n.table_of_contents-item {\n	display: block;\n	font-size: 0.875rem;\n	line-height: 1.3;\n	padding: 0.125rem;\n}\n\n.table_of_contents-indent-1 {\n	margin-left: 1.5rem;\n}\n\n.table_of_contents-indent-2 {\n	margin-left: 3rem;\n}\n\n.table_of_contents-indent-3 {\n	margin-left: 4.5rem;\n}\n\n.table_of_contents-link {\n	text-decoration: none;\n	opacity: 0.7;\n	border-bottom: 1px solid rgba(55, 53, 47, 0.18);\n}\n\ntable,\nth,\ntd {\n	border: 1px solid rgba(55, 53, 47, 0.09);\n	border-collapse: collapse;\n}\n\ntable {\n	border-left: none;\n	border-right: none;\n}\n\nth,\ntd {\n	font-weight: normal;\n	padding: 0.25em 0.5em;\n	line-height: 1.5;\n	min-height: 1.5em;\n	text-align: left;\n}\n\nth {\n	color: rgba(55, 53, 47, 0.6);\n}\n\nol,\nul {\n	margin: 0;\n	margin-block-start: 0.6em;\n	margin-block-end: 0.6em;\n}\n\nli > ol:first-child,\nli > ul:first-child {\n	margin-block-start: 0.6em;\n}\n\nul > li {\n	list-style: disc;\n}\n\nul.to-do-list {\n	padding-inline-start: 0;\n}\n\nul.to-do-list > li {\n	list-style: none;\n}\n\n.to-do-children-checked {\n	text-decoration: line-through;\n	opacity: 0.375;\n}\n\nul.toggle > li {\n	list-style: none;\n}\n\nul {\n	padding-inline-start: 1.7em;\n}\n\nul > li {\n	padding-left: 0.1em;\n}\n\nol {\n	padding-inline-start: 1.6em;\n}\n\nol > li {\n	padding-left: 0.2em;\n}\n\n.mono ol {\n	padding-inline-start: 2em;\n}\n\n.mono ol > li {\n	text-indent: -0.4em;\n}\n\n.toggle {\n	padding-inline-start: 0em;\n	list-style-type: none;\n}\n\n/* Indent toggle children */\n.toggle > li > details {\n	padding-left: 1.7em;\n}\n\n.toggle > li > details > summary {\n	margin-left: -1.1em;\n}\n\n.selected-value {\n	display: inline-block;\n	padding: 0 0.5em;\n	background: rgba(206, 205, 202, 0.5);\n	border-radius: 3px;\n	margin-right: 0.5em;\n	margin-top: 0.3em;\n	margin-bottom: 0.3em;\n	white-space: nowrap;\n}\n\n.collection-title {\n	display: inline-block;\n	margin-right: 1em;\n}\n\n.simple-table {\n	margin-top: 1em;\n	font-size: 0.875rem;\n	empty-cells: show;\n}\n.simple-table td {\n	height: 29px;\n	min-width: 120px;\n}\n\n.simple-table th {\n	height: 29px;\n	min-width: 120px;\n}\n\n.simple-table-header-color {\n	background: rgb(247, 246, 243);\n	color: black;\n}\n.simple-table-header {\n	font-weight: 500;\n}\n\ntime {\n	opacity: 0.5;\n}\n\n.icon {\n	display: inline-block;\n	max-width: 1.2em;\n	max-height: 1.2em;\n	text-decoration: none;\n	vertical-align: text-bottom;\n	margin-right: 0.5em;\n}\n\nimg.icon {\n	border-radius: 3px;\n}\n\n.user-icon {\n	width: 1.5em;\n	height: 1.5em;\n	border-radius: 100%;\n	margin-right: 0.5rem;\n}\n\n.user-icon-inner {\n	font-size: 0.8em;\n}\n\n.text-icon {\n	border: 1px solid #000;\n	text-align: center;\n}\n\n.page-cover-image {\n	display: block;\n	object-fit: cover;\n	width: 100%;\n	max-height: 30vh;\n}\n\n.page-header-icon {\n	font-size: 3rem;\n	margin-bottom: 1rem;\n}\n\n.page-header-icon-with-cover {\n	margin-top: -0.72em;\n	margin-left: 0.07em;\n}\n\n.page-header-icon img {\n	border-radius: 3px;\n}\n\n.link-to-page {\n	margin: 1em 0;\n	padding: 0;\n	border: none;\n	font-weight: 500;\n}\n\np > .user {\n	opacity: 0.5;\n}\n\ntd > .user,\ntd > time {\n	white-space: nowrap;\n}\n\ninput[type="checkbox"] {\n	transform: scale(1.5);\n	margin-right: 0.6em;\n	vertical-align: middle;\n}\n\np {\n	margin-top: 0.5em;\n	margin-bottom: 0.5em;\n}\n\n.image {\n	border: none;\n	margin: 1.5em 0;\n	padding: 0;\n	border-radius: 0;\n	text-align: center;\n}\n\n.code,\ncode {\n	background: rgba(135, 131, 120, 0.15);\n	border-radius: 3px;\n	padding: 0.2em 0.4em;\n	border-radius: 3px;\n	font-size: 85%;\n	tab-size: 2;\n}\n\ncode {\n	color: #eb5757;\n}\n\n.code {\n	padding: 1.5em 1em;\n}\n\n.code-wrap {\n	white-space: pre-wrap;\n	word-break: break-all;\n}\n\n.code > code {\n	background: none;\n	padding: 0;\n	font-size: 100%;\n	color: inherit;\n}\n\nblockquote {\n	font-size: 1.25em;\n	margin: 1em 0;\n	padding-left: 1em;\n	border-left: 3px solid rgb(55, 53, 47);\n}\n\n.bookmark {\n	text-decoration: none;\n	max-height: 8em;\n	padding: 0;\n	display: flex;\n	width: 100%;\n	align-items: stretch;\n}\n\n.bookmark-title {\n	font-size: 0.85em;\n	overflow: hidden;\n	text-overflow: ellipsis;\n	height: 1.75em;\n	white-space: nowrap;\n}\n\n.bookmark-text {\n	display: flex;\n	flex-direction: column;\n}\n\n.bookmark-info {\n	flex: 4 1 180px;\n	padding: 12px 14px 14px;\n	display: flex;\n	flex-direction: column;\n	justify-content: space-between;\n}\n\n.bookmark-image {\n	width: 33%;\n	flex: 1 1 180px;\n	display: block;\n	position: relative;\n	object-fit: cover;\n	border-radius: 1px;\n}\n\n.bookmark-description {\n	color: rgba(55, 53, 47, 0.6);\n	font-size: 0.75em;\n	overflow: hidden;\n	max-height: 4.5em;\n	word-break: break-word;\n}\n\n.bookmark-href {\n	font-size: 0.75em;\n	margin-top: 0.25em;\n}\n\n.sans { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"; }\n.code { font-family: "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace; }\n.serif { font-family: Lyon-Text, Georgia, ui-serif, serif; }\n.mono { font-family: iawriter-mono, Nitti, Menlo, Courier, monospace; }\n.pdf .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK JP'; }\n.pdf:lang(zh-CN) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK SC'; }\n.pdf:lang(zh-TW) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK TC'; }\n.pdf:lang(ko-KR) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK KR'; }\n.pdf .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK JP'; }\n.pdf:lang(zh-CN) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK SC'; }\n.pdf:lang(zh-TW) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK TC'; }\n.pdf:lang(ko-KR) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK KR'; }\n.pdf .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK JP'; }\n.pdf:lang(zh-CN) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK SC'; }\n.pdf:lang(zh-TW) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK TC'; }\n.pdf:lang(ko-KR) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK KR'; }\n.pdf .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK JP'; }\n.pdf:lang(zh-CN) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK SC'; }\n.pdf:lang(zh-TW) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK TC'; }\n.pdf:lang(ko-KR) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK KR'; }\n.highlight-default {\n	color: rgba(55, 53, 47, 1);\n}\n.highlight-gray {\n	color: rgba(120, 119, 116, 1);\n	fill: rgba(120, 119, 116, 1);\n}\n.highlight-brown {\n	color: rgba(159, 107, 83, 1);\n	fill: rgba(159, 107, 83, 1);\n}\n.highlight-orange {\n	color: rgba(217, 115, 13, 1);\n	fill: rgba(217, 115, 13, 1);\n}\n.highlight-yellow {\n	color: rgba(203, 145, 47, 1);\n	fill: rgba(203, 145, 47, 1);\n}\n.highlight-teal {\n	color: rgba(68, 131, 97, 1);\n	fill: rgba(68, 131, 97, 1);\n}\n.highlight-blue {\n	color: rgba(51, 126, 169, 1);\n	fill: rgba(51, 126, 169, 1);\n}\n.highlight-purple {\n	color: rgba(144, 101, 176, 1);\n	fill: rgba(144, 101, 176, 1);\n}\n.highlight-pink {\n	color: rgba(193, 76, 138, 1);\n	fill: rgba(193, 76, 138, 1);\n}\n.highlight-red {\n	color: rgba(212, 76, 71, 1);\n	fill: rgba(212, 76, 71, 1);\n}\n.highlight-gray_background {\n	background: rgba(241, 241, 239, 1);\n}\n.highlight-brown_background {\n	background: rgba(244, 238, 238, 1);\n}\n.highlight-orange_background {\n	background: rgba(251, 236, 221, 1);\n}\n.highlight-yellow_background {\n	background: rgba(251, 243, 219, 1);\n}\n.highlight-teal_background {\n	background: rgba(237, 243, 236, 1);\n}\n.highlight-blue_background {\n	background: rgba(231, 243, 248, 1);\n}\n.highlight-purple_background {\n	background: rgba(244, 240, 247, 0.8);\n}\n.highlight-pink_background {\n	background: rgba(249, 238, 243, 0.8);\n}\n.highlight-red_background {\n	background: rgba(253, 235, 236, 1);\n}\n.block-color-default {\n	color: inherit;\n	fill: inherit;\n}\n.block-color-gray {\n	color: rgba(120, 119, 116, 1);\n	fill: rgba(120, 119, 116, 1);\n}\n.block-color-brown {\n	color: rgba(159, 107, 83, 1);\n	fill: rgba(159, 107, 83, 1);\n}\n.block-color-orange {\n	color: rgba(217, 115, 13, 1);\n	fill: rgba(217, 115, 13, 1);\n}\n.block-color-yellow {\n	color: rgba(203, 145, 47, 1);\n	fill: rgba(203, 145, 47, 1);\n}\n.block-color-teal {\n	color: rgba(68, 131, 97, 1);\n	fill: rgba(68, 131, 97, 1);\n}\n.block-color-blue {\n	color: rgba(51, 126, 169, 1);\n	fill: rgba(51, 126, 169, 1);\n}\n.block-color-purple {\n	color: rgba(144, 101, 176, 1);\n	fill: rgba(144, 101, 176, 1);\n}\n.block-color-pink {\n	color: rgba(193, 76, 138, 1);\n	fill: rgba(193, 76, 138, 1);\n}\n.block-color-red {\n	color: rgba(212, 76, 71, 1);\n	fill: rgba(212, 76, 71, 1);\n}\n.block-color-gray_background {\n	background: rgba(241, 241, 239, 1);\n}\n.block-color-brown_background {\n	background: rgba(244, 238, 238, 1);\n}\n.block-color-orange_background {\n	background: rgba(251, 236, 221, 1);\n}\n.block-color-yellow_background {\n	background: rgba(251, 243, 219, 1);\n}\n.block-color-teal_background {\n	background: rgba(237, 243, 236, 1);\n}\n.block-color-blue_background {\n	background: rgba(231, 243, 248, 1);\n}\n.block-color-purple_background {\n	background: rgba(244, 240, 247, 0.8);\n}\n.block-color-pink_background {\n	background: rgba(249, 238, 243, 0.8);\n}\n.block-color-red_background {\n	background: rgba(253, 235, 236, 1);\n}\n.select-value-color-pink { background-color: rgba(245, 224, 233, 1); }\n.select-value-color-purple { background-color: rgba(232, 222, 238, 1); }\n.select-value-color-green { background-color: rgba(219, 237, 219, 1); }\n.select-value-color-gray { background-color: rgba(227, 226, 224, 1); }\n.select-value-color-opaquegray { background-color: rgba(255, 255, 255, 0.0375); }\n.select-value-color-orange { background-color: rgba(250, 222, 201, 1); }\n.select-value-color-brown { background-color: rgba(238, 224, 218, 1); }\n.select-value-color-red { background-color: rgba(255, 226, 221, 1); }\n.select-value-color-yellow { background-color: rgba(253, 236, 200, 1); }\n.select-value-color-blue { background-color: rgba(211, 229, 239, 1); }\n\n.checkbox {\n	display: inline-flex;\n	vertical-align: text-bottom;\n	width: 16;\n	height: 16;\n	background-size: 16px;\n	margin-left: 2px;\n	margin-right: 5px;\n}\n\n.checkbox-on {\n	background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2358A9D7%22%2F%3E%0A%3Cpath%20d%3D%22M6.71429%2012.2852L14%204.9995L12.7143%203.71436L6.71429%209.71378L3.28571%206.2831L2%207.57092L6.71429%2012.2852Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E");\n}\n\n.checkbox-off {\n	background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20fill%3D%22white%22%20stroke%3D%22%2336352F%22%20stroke-width%3D%221.5%22%2F%3E%0A%3C%2Fsvg%3E");\n}\n	\n</style></head><body><article id="7c75fea1-bdd0-4c55-9c8d-b1e678a3ab70" class="page sans"><header><h1 class="page-title">${title} </h1></header><div class="page-body"><h3 id="45eb7232-5831-4e4a-ba9b-5350f71058e9" class=""></h3><table id="8a7d0868-2d6d-4a1e-bf37-fe5cd81885e4" class="simple-table"><tbody><tr id="57a36e33-98c3-4a4e-9720-0edbb318447c"><td id="EPPn" class="">속성</td><td id="M_pB" class="">내용</td></tr><tr id="37086e80-d8cb-4cf8-a81a-1091df03a7b9"><td id="EPPn" class="">CreatedDate</td><td id="M_pB" class="">${createDate}</td></tr><tr id="e1687538-2dfe-4917-accc-a03bb369ea47"><td id="EPPn" class="">Creator</td><td id="M_pB" class="">${creator}</td></tr><tr id="4f99d59b-3e0a-4cc0-81bd-22efcfe63549"><td id="EPPn" class="">라벨</td><td id="M_pB" class="">${labelForm}</td></tr></tbody></table>${imgUrlForm}<p id="0843765a-455e-4d94-9abf-7dafb0a7dd8b" class="">${content}</p></div></article></body></html>`;
  return notionHtml
}
