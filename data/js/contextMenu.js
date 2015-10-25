/**
* contextMenu.js
*/
(() => {
  "use strict";
  const EDIT_TEXT = "EditText";
  const VIEW_SELECTION = "ViewSelection";
  const VIEW_SOURCE = "ViewSource";

  /* set context menu item label */
  self.on("context", () => {
    const elm = document.activeElement;
    let label;
    switch(true) {
      case /^input$/i.test(elm.nodeName) &&
           elm.hasAttribute("type") &&
           /^(?:(?:emai|te|ur)l|search|text)$/.test(elm.getAttribute("type")) ||
           /^textarea$/i.test(elm.nodeName) ||
           elm.isContentEditable:
        label = EDIT_TEXT;
        break;
      case !window.getSelection().isCollapsed:
        label = VIEW_SELECTION;
        break;
      default:
        label = VIEW_SOURCE;
    }
    self.postMessage(label);
    return true;
  });

  /* get node value */
  self.on("click", () => {
    const namespaces = {
      "ag": "http://purl.org/rss/1.0/modules/aggregation/",
      "annotate": "http://purl.org/rss/1.0/modules/annotate/",
      "app": "http://www.w3.org/2007/app",
      "atom": "http://www.w3.org/2005/Atom",
      "cc": "http://creativecommons.org/ns#",
      "cnt": "http://www.w3.org/2008/content#",
      "company": "http://purl.org/rss/1.0/modules/company",
      "content": "http://purl.org/rss/1.0/modules/content/",
      "csvw": "http://www.w3.org/ns/csvw#",
      "ctag": "http://commontag.org/ns#",
      "dc": "http://purl.org/dc/terms/",
      "dc11": "http://purl.org/dc/elements/1.1/",
      "dcat": "http://www.w3.org/ns/dcat#",
      "dcterms": "http://purl.org/dc/terms/",
      "earl": "http://www.w3.org/ns/earl#",
      "em": "http://www.mozilla.org/2004/em-rdf#",
      "email": "http://purl.org/rss/1.0/modules/email/",
      "ev": "http://www.w3.org/2001/xml-events",
      "feed": "http://www.w3.org/2005/Atom",
      "fh": "http://purl.org/syndication/history/1.0",
      "foaf": "http://xmlns.com/foaf/0.1/",
      "geo": "http://www.w3.org/2003/01/geo/wgs84_pos#",
      "gr": "http://purl.org/goodrelations/v1#",
      "grddl": "http://www.w3.org/2003/g/data-view#",
      "ht": "http://www.w3.org/2006/http#",
      "html": "http://www.w3.org/1999/xhtml",
      "ical": "http://www.w3.org/2002/12/cal/icaltzd#",
      "image": "http://purl.org/rss/1.0/modules/image/",
      "itms": "http://phobos.apple.com/rss/1.0/modules/itms/,
      "itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
      "l": "http://purl.org/rss/1.0/modules/link/",
      "ma": "http://www.w3.org/ns/ma-ont#",
      "math": "http://www.w3.org/1998/Math/MathML",
      "oa": "http://www.w3.org/ns/oa#",
      "og": "http://ogp.me/ns#",
      "org": "http://www.w3.org/ns/org#",
      "owl": "http://www.w3.org/2002/07/owl#",
      "prov": "http://www.w3.org/ns/prov#",
      "ptr": "http://www.w3.org/2009/pointers#",
      "qb": "http://purl.org/linked-data/cube#",
      "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      "rdfa": "http://www.w3.org/ns/rdfa#",
      "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
      "rev": "http://purl.org/stuff/rev#",
      "rif": "http://www.w3.org/2007/rif#",
      "rr": "http://www.w3.org/ns/r2rml#",
      "rss1": "http://purl.org/rss/1.0/",
      "rss11": "http://purl.org/net/rss1.1#",
      "schema": "http://schema.org/",
      "sd": "http://www.w3.org/ns/sparql-service-description#",
      "search": "http://purl.org/rss/1.0/modules/search/",
      "sioc": "http://rdfs.org/sioc/ns#",
      "skos": "http://www.w3.org/2004/02/skos/core#",
      "skosxl": "http://www.w3.org/2008/05/skos-xl#",
      "slash": "http://purl.org/rss/1.0/modules/slash/",
      "ss": "http://purl.org/rss/1.0/modules/servicestatus/",
      "sub": "http://purl.org/rss/1.0/modules/subscription/",
      "svg": "http://www.w3.org/2000/svg",
      "sy": "http://purl.org/rss/1.0/modules/syndication/",
      "taxo": "http://purl.org/rss/1.0/modules/taxonomy/",
      "thr": "http://purl.org/syndication/thread/1.0",
      "v": "http://rdf.data-vocabulary.org/#",
      "vcard": "http://www.w3.org/2006/vcard/ns#",
      "void": "http://rdfs.org/ns/void#",
      "wdr": "http://www.w3.org/2007/05/powder#",
      "wdrs": "http://www.w3.org/2007/05/powder-s#",
      "wiki": "http://purl.org/rss/1.0/modules/wiki/",
      "xhv": "http://www.w3.org/1999/xhtml/vocab#",
      "xi": "http://www.w3.org/2001/XInclude",
      "xhtml": "http://www.w3.org/1999/xhtml",
      "xlink": "http://www.w3.org/1999/xlink",
      "xml": "http://www.w3.org/XML/1998/namespace",
      "xmlns": "http://www.w3.org/2000/xmlns/",
      "xsd": "http://www.w3.org/2001/XMLSchema#",
      "xsl": "http://www.w3.org/1999/XSL/Transform",
      "xul": "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
    };
    const DATA_ID = "data-with_ex_editor_id";
    const MODE_VIEW_SOURCE = `mode=${ VIEW_SOURCE };`;

    /**
    * get namespace of node from ancestor
    * @param {Object} node - element node
    * @return {Object} - namespace data
    */
    const getNodeNs = node => {
      const namespace = {
        "node": null,
        "name": null,
        "uri": null
      };
      let name;
      while(node && node.parentNode) {
        name = /^(?:(?:math:)?(math)|(?:svg:)?(svg))$/.exec(node.nodeName);
        if(name) {
          namespace.node = node;
          namespace.name = name[1] || name[2];
          namespace.uri = namespaces[namespace.name];
          break;
        }
        node = node.parentNode;
      }
      !name && (
        node = document.documentElement,
        namespace.node = node,
        namespace.name = /HTML/.test(node.toString()) ?
          node.nodeName.toLowerCase() : node.nodeName,
        namespace.uri = node.hasAttribute("xmlns") ?
          node.getAttribute("xmlns") :
          namespaces[namespace.name.toLowerCase()] ?
          namespaces[namespace.name] : null
      );
      return namespace;
    };

    /**
    * create elementNS, set attributeNS
    * @param {Object} node - element node to create
    * @param {boolean} child - append child nodes
    * @return {Object} - namespaced element or text node
    */
    const getElement = (node, child = false) => {
      /**
      * get namespace
      * @param {Object} obj - element node
      * @param {boolean} bool - use getNodeNs
      * @return {?Object} - namespace data
      */
      const getNamespace = (obj, bool) => {
        let namespace = null;
        if(obj && obj.nodeName) {
          const name = /^(?:([\S]+):)?([\S]+)$/.exec(obj.nodeName);
          const prefix = name[1] || null;
          const localName = /HTML/.test(obj.toString()) ?
            name[2].toLowerCase() : name[2];
          const uri = prefix && namespaces[prefix] ? namespaces[prefix] : null;
          namespace = {
            "namespaceURI": uri ? uri : bool ? getNodeNs(obj).uri : null,
            "prefix": prefix ? `${ prefix }:` : "",
            "localName": localName
          };
        }
        return namespace;
      };
      /**
      * create element NS
      * @param {Object} obj - element
      * @return {?Object} - namespaced element
      */
      const createElmNS = obj => {
        const elm = getNamespace(obj, true);
        return elm && document.createElementNS(
          elm.namespaceURI || namespaces.html,
          elm.localName
        );
      };
      /**
      * set attribute NS
      * @param {Object} elm - element
      * @param {Object} obj - node
      */
      const setAttrNS = (elm, obj) => {
        if(elm && obj) {
          const nodeAttr = obj.attributes;
          for(let attr of nodeAttr) {
            const attrNs = getNamespace(attr, false);
            typeof obj[attr.name] !== "function" && attrNs &&
              elm.setAttributeNS(
                attrNs.namespaceURI || "",
                attrNs.prefix + attrNs.localName,
                attr.value
              );
          }
        }
      };
      /**
      * append child nodes
      * @param {Object} obj - child nodes
      * @return {Object} - document fragment
      */
      const appendChildNodes = obj => {
        const fragment = document.createDocumentFragment();
        if(obj && obj.hasChildNodes()) {
          obj = obj.childNodes;
          for(let child of obj) {
            child.nodeType === 1 ?
              fragment.appendChild(getElement(child, true)) :
              child.nodeType === 3 &&
                fragment.appendChild(document.createTextNode(child.nodeValue));
          }
        }
        return fragment;
      };
      let elm;
      node && (
        elm = createElmNS(node),
        elm && (
          node.attributes && setAttrNS(elm, node),
          child && node.hasChildNodes() &&
            elm.appendChild(appendChildNodes(node))
        )
      );
      return elm ? elm : document.createTextNode("");
    };

    /**
    * create DOM tree
    * @param {Object} container - container element of the DOM tree
    * @param {Object} nodes - child nodes
    * @return {Object} - DOM tree or text node
    */
    const getDomTree = (container, nodes = null) => {
      /**
      * create DOM
      * @param {Object} obj - child nodes
      * @return {Object} - document fragment
      */
      const createDom = obj => {
        const fragment = document.createDocumentFragment();
        if(obj && obj.hasChildNodes()) {
          obj = obj.childNodes;
          const l = obj.length;
          for(let node, i = 0; i < l; i = i + 1) {
            node = obj[i];
            node.nodeType === 1 ? (
              i === 0 && fragment.appendChild(document.createTextNode("\n")),
              fragment.appendChild(getElement(node, true)),
              i === l - 1 && fragment.appendChild(document.createTextNode("\n"))
            ) : node.nodeType === 3 &&
              fragment.appendChild(document.createTextNode(node.nodeValue));
          }
        }
        return fragment;
      };
      container = getElement(container);
      container.nodeType === 1 && nodes && nodes.hasChildNodes() &&
        container.appendChild(createDom(nodes));
      return container;
    };

    /**
    * set temporary ID to the target element and set event listener
    * @param {Object} target - target element
    * @return {string} - stringified value with ID
    */
    const onEditText = target => {
      let id;
      target && (
        target.hasAttribute(DATA_ID) ?
          id = target.getAttribute(DATA_ID) : (
            id = `withExEditor${ window.performance.now() }`.replace(/\./, "_"),
            target.setAttribute(DATA_ID, id),
            target.addEventListener("focus", evt => {
              evt && evt.currentTarget === target &&
                self.postMessage(evt.target.getAttribute(DATA_ID));
            }, false)
          )
      );
      return id ?
        `mode=${ EDIT_TEXT };target=${ id };value=` : MODE_VIEW_SOURCE;
    };

    /**
    * get text node from editable content
    * @param {Object} nodes - text containing node
    * @return {string} - text node
    */
    const onContentEditable = nodes => {
      /**
      * get text node
      * @param {Object} obj - node
      * @return {string} - text
      */
      const getTextNode = obj => {
        const array = [];
        if(obj && obj.hasChildNodes()) {
          obj = obj.childNodes;
          for(let node of obj) {
            switch(true) {
              case node.nodeType === 3:
                array[array.length] = node.nodeValue;
                break;
              case node.nodeType === 1 && node.nodeName.toLowerCase() === "br":
                array[array.length] = "\n";
                break;
              case node.nodeType === 1 && node.hasChildNodes():
                array[array.length] = getTextNode(node);
                break;
              default:
            }
          }
        }
        return array.length > 0 ? array.join("") : "";
      };
      /**
      * get text node from content
      * @param {Object} obj - text containing node
      * @return {string} - text
      */
      const getTextNodeFromContent = obj => {
        const array = [];
        if(obj && obj.hasChildNodes()) {
          obj = obj.childNodes;
          for(let node of obj) {
            switch(true) {
              case node.nodeType === 3:
                array[array.length] = node.nodeValue;
                break;
              case node.nodeType === 1 && node.nodeName.toLowerCase() === "br":
                array[array.length] = "\n";
                break;
              case node.nodeType === 1 && node.hasChildNodes():
                let container = getElement(node);
                container && container.nodeType === 1 && (
                  container = getDomTree(container, node),
                  container.hasChildNodes() && (
                    array[array.length] = getTextNode(container)
                  )
                );
                break;
              default:
            }
          }
        }
        return array.length > 0 ? array.join("") : "";
      };
      return nodes && nodes.hasChildNodes() ?
        getTextNodeFromContent(nodes) : "";
    };

    /**
    * create DOM from selection range and get childNodes
    * @param {Object} sel - selection
    * @return {string} - stringified values
    */
    const onViewSelection = sel => {
      let fragment = document.createDocumentFragment();
      if(sel && sel.rangeCount) {
        const l = sel.rangeCount;
        for(let range, elm, i = 0; i < l; i = i + 1) {
          range = sel.getRangeAt(i);
          if(range.commonAncestorContainer.nodeType === 1) {
            elm = getNodeNs(range.commonAncestorContainer);
            if(/^(?:svg|math)$/.test(elm.name)) {
              if(elm.node === document.documentElement) {
                fragment = null;
                break;
              }
              else {
                elm.node.parentNode && (
                  elm = elm.node.parentNode,
                  range.setStart(elm, 0),
                  range.setEnd(elm, elm.childNodes.length)
                );
              }
            }
            fragment.appendChild(
              getDomTree(range.commonAncestorContainer, range.cloneContents())
            );
          }
          else {
            range.commonAncestorContainer.nodeType === 3 && (
              elm = getElement(range.commonAncestorContainer.parentNode),
              elm.appendChild(range.cloneContents()),
              fragment.appendChild(elm)
            );
          }
          i < l - 1 && fragment.appendChild(document.createTextNode("\n\n"));
        }
      }
      return fragment && fragment.hasChildNodes() && window.XMLSerializer ?
        `mode=${ VIEW_SELECTION };value=${ new XMLSerializer().serializeToString(fragment) }` :
        MODE_VIEW_SOURCE;
    };

    /* switch mode by context */
    (() => {
      const selection = window.getSelection();
      let nodeValue, obj;
      if(selection.isCollapsed) {
        obj = document.activeElement;
        switch(true) {
          case /^input$/i.test(obj.nodeName) &&
               obj.hasAttribute("type") &&
               /^(?:(?:emai|te|ur)l|search|text)$/.test(obj.getAttribute("type")) ||
               /^textarea$/i.test(obj.nodeName):
            nodeValue = onEditText(obj) + (obj.value ? obj.value : "");
            break;
          case obj.isContentEditable:
            nodeValue = onEditText(obj) + onContentEditable(obj);
            break;
          default:
            nodeValue = MODE_VIEW_SOURCE;
        }
      }
      else {
        obj = selection.getRangeAt(0).commonAncestorContainer;
        switch(true) {
          case selection.anchorNode === selection.focusNode &&
               selection.anchorNode.parentNode === document.documentElement:
            nodeValue = MODE_VIEW_SOURCE;
            break;
          case selection.rangeCount === 1 && obj.isContentEditable:
            nodeValue = onEditText(obj) + onContentEditable(obj);
            break;
          default:
            nodeValue = onViewSelection(selection);
        }
      }
      self.postMessage(nodeValue);
    })();
  });
})();
