/**
*	controlPanel.js
*/
(function() {
	"use strict";
	document.addEventListener("DOMContentLoaded", function() {
		var html = document.querySelector("html"),
			title = document.querySelector("title"),
			controlPanelForm = document.getElementById("controlPanelForm"),
			buttonIcon = document.getElementById("buttonIcon"),
			buttonIconWhite = document.getElementById("buttonIconWhite"),
			selectIconLabel = document.getElementById("selectIconLabel"),
			selectIcon = document.getElementById("selectIcon"),
			renameEditorLabel = document.getElementById("renameEditorLabel"),
			currentEditorName = document.getElementById("currentEditorName"),
			aboutAddons = document.getElementById("aboutAddons"),
			editorName = document.getElementById("editorName"),
			editorLabel = document.getElementById("editorLabel"),
			storeLabel = document.getElementById("storeLabel"),
			setAccessKeyLabel = document.getElementById("setAccessKeyLabel"),
			accessKey = document.getElementById("accessKey"),
			setKey = document.getElementById("setKey");
		function removeChildNodes(node) {
			var i, l;
			if(node.hasChildNodes()) {
				for(i = node.childNodes.length - 1, l = 0; i >= 0; i--) {
					node.removeChild(node.childNodes[i]);
				}
			}
		}
		function toggleFieldset() {
			if(editorLabel && storeLabel) {
				if(editorName && editorName.value && currentEditorName && currentEditorName.hasChildNodes()) {
					removeChildNodes(currentEditorName);
					currentEditorName.appendChild(document.createTextNode(editorName.value));
					editorLabel.removeAttribute("disabled");
					storeLabel.removeAttribute("disabled");
				}
				else {
					editorLabel.setAttribute("disabled", "disabled");
					storeLabel.setAttribute("disabled", "disabled");
				}
			}
		}
		function getCheckedRadioButtonValue(name) {
			for(var value, nodes = document.querySelectorAll("input[type=radio]"), node, i = 0, l = nodes.length; i < l; i++) {
				node = nodes[i];
				if(node.name && node.name === name && node.checked) {
					node.value && (value = node.value);
					break;
				}
			}
			return value;
		}
		function addonPortEmit(event) {
			var settings = {
					"editorName": editorLabel && editorLabel.value ? editorLabel.value : editorName && editorName.value ? editorName.value : "",
					"accessKey": accessKey && accessKey.value ? accessKey.value : "",
				},
				icon = buttonIcon && getCheckedRadioButtonValue(buttonIcon.name);
			icon && (settings["toolbarButtonIcon"] = icon);
			event && (
				event.type && addon.port.emit(event.type, settings),
				event.preventDefault()
			);
		}
		function isRadioChecked(event) {
			event && event.target && event.target.checked && addonPortEmit(event);
		}
		window.addEventListener("load", function(event) {
			event && event.type && addon.port.emit(event.type);
		}, false);
		controlPanelForm && controlPanelForm.addEventListener("submit", addonPortEmit, false);
		buttonIcon && buttonIcon.addEventListener("change", isRadioChecked, false);
		buttonIconWhite && buttonIconWhite.addEventListener("change", isRadioChecked, false);
		aboutAddons && aboutAddons.addEventListener("click", function(event) {
			event && (
				event.type && event.target && event.target.href && addon.port.emit(event.type, event.target.href),
				event.preventDefault()
			);
		}, false);
		addon.port.on("editorValue", function(res) {
			if(res) {
				editorName && (
					editorName.value = res["editorName"],
					editorName.value !== "" && currentEditorName.hasChildNodes() && (
						removeChildNodes(currentEditorName),
						currentEditorName.appendChild(document.createTextNode(res["editorName"])),
						editorLabel.value = res["editorName"]
					)
				);
				accessKey && (accessKey.value = res["accessKey"] ? res["accessKey"] : "");
				toggleFieldset();
			}
		});
		addon.port.on("htmlValue", function(res) {
			if(res) {
				html && (html.lang = res["Lang"]);
				title && (
					title.hasChildNodes() && removeChildNodes(title),
					title.appendChild(document.createTextNode(res["ControlPanelTitle"]))
				);
				selectIconLabel && (
					selectIconLabel.hasChildNodes() && removeChildNodes(selectIconLabel),
					selectIconLabel.appendChild(document.createTextNode(res["SelectIconLabel"]))
				);
				selectIcon && (selectIcon.value = res["Submit"]);
				renameEditorLabel && (
					renameEditorLabel.hasChildNodes() && removeChildNodes(renameEditorLabel),
					renameEditorLabel.appendChild(document.createTextNode(res["RenameEditorLabel"]))
				);
				currentEditorName && (
					currentEditorName.hasChildNodes() && removeChildNodes(currentEditorName),
					currentEditorName.appendChild(document.createTextNode(res["CurrentEditorName"]))
				);
				aboutAddons && (
					aboutAddons.hasChildNodes() && removeChildNodes(aboutAddons),
					aboutAddons.appendChild(document.createTextNode(res["AboutAddons"]))
				);
				editorLabel && (editorLabel.placeholder = res["EditorLabel"]);
				storeLabel && (storeLabel.value = res["Submit"]);
				setAccessKeyLabel && (
					setAccessKeyLabel.hasChildNodes() && removeChildNodes(setAccessKeyLabel),
					setAccessKeyLabel.appendChild(document.createTextNode(res["AccessKeyLabel"]))
				);
				accessKey && (accessKey.placeholder = res["AccessKeyPlaceholder"]);
				setKey && (setKey.value = res["Submit"]);
			}
		});
		toggleFieldset();
	}, false);
})();
