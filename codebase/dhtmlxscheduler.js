function dtmlXMLLoaderObject(e, t, s, i) {
    return this.xmlDoc = "", this.async = "undefined" != typeof s ? s : !0, this.onloadAction = e || null, this.mainObject = t || null, this.waitCall = null, this.rSeed = i ||!1, this
}
function callerFunction(e, t) {
    return this.handler = function(s) {
        return s || (s = window.event), e(s, t), !0
    }, this.handler
}
function getAbsoluteLeft(e) {
    return getOffset(e).left
}
function getAbsoluteTop(e) {
    return getOffset(e).top
}
function getOffsetSum(e) {
    for (var t = 0, s = 0; e;)
        t += parseInt(e.offsetTop), s += parseInt(e.offsetLeft), e = e.offsetParent;
    return {
        top: t,
        left: s
    }
}
function getOffsetRect(e) {
    var t = e.getBoundingClientRect(), s = document.body, i = document.documentElement, n = window.pageYOffset || i.scrollTop || s.scrollTop, a = window.pageXOffset || i.scrollLeft || s.scrollLeft, r = i.clientTop || s.clientTop || 0, d = i.clientLeft || s.clientLeft || 0, o = t.top + n - r, l = t.left + a - d;
    return {
        top: Math.round(o),
        left: Math.round(l)
    }
}
function getOffset(e) {
    return e.getBoundingClientRect ? getOffsetRect(e) : getOffsetSum(e)
}
function convertStringToBoolean(e) {
    switch ("string" == typeof e && (e = e.toLowerCase()), e) {
    case"1":
    case"true":
    case"yes":
    case"y":
    case 1:
    case!0:
        return !0;
    default:
        return !1
    }
}
function getUrlSymbol(e) {
    return - 1 != e.indexOf("?") ? "&" : "?"
}
function dhtmlDragAndDropObject() {
    return window.dhtmlDragAndDrop ? window.dhtmlDragAndDrop : (this.lastLanding = 0, this.dragNode = 0, this.dragStartNode = 0, this.dragStartObject = 0, this.tempDOMU = null, this.tempDOMM = null, this.waitDrag = 0, window.dhtmlDragAndDrop = this, this)
}
function _dhtmlxError() {
    return this.catches || (this.catches = []), this
}
function dhtmlXHeir(e, t) {
    for (var s in t)
        "function" == typeof t[s] && (e[s] = t[s]);
    return e
}
function dhtmlxEvent(e, t, s) {
    e.addEventListener ? e.addEventListener(t, s, !1) : e.attachEvent && e.attachEvent("on" + t, s)
}
function dataProcessor(e) {
    return this.serverProcessor = e, this.action_param = "!nativeeditor_status", this.object = null, this.updatedRows = [], this.autoUpdate=!0, this.updateMode = "cell", this._tMode = "GET", this.post_delim = "_", this._waitMode = 0, this._in_progress = {}, this._invalid = {}, this.mandatoryFields = [], this.messages = [], this.styles = {
        updated: "font-weight:bold;",
        inserted: "font-weight:bold;",
        deleted: "text-decoration : line-through;",
        invalid: "background-color:FFE0E0;",
        invalid_cell: "border-bottom:2px solid red;",
        error: "color:red;",
        clear: "font-weight:normal;text-decoration:none;"
    }, this.enableUTFencoding(!0), dhtmlxEventable(this), this
}
window.dhtmlXScheduler = window.scheduler = {
    version: "4.1.0"
}, window.dhtmlx || (dhtmlx = function(e) {
    for (var t in e)
        dhtmlx[t] = e[t];
    return dhtmlx
}), dhtmlx.extend_api = function(e, t, s) {
    var i = window[e];
    i && (window[e] = function(e) {
        var s;
        if (e && "object" == typeof e&&!e.tagName) {
            s = i.apply(this, t._init ? t._init(e) : arguments);
            for (var n in dhtmlx)
                t[n] && this[t[n]](dhtmlx[n]);
            for (var n in e)
                t[n] ? this[t[n]](e[n]) : 0 === n.indexOf("on") && this.attachEvent(n, e[n])
        } else 
            s = i.apply(this, arguments);
        return t._patch && t._patch(this), s || this
    }, window[e].prototype = i.prototype, s && dhtmlXHeir(window[e].prototype, s))
}, dhtmlxAjax = {
    get: function(e, t) {
        var s = new dtmlXMLLoaderObject(!0);
        return s.async = arguments.length < 3, s.waitCall = t, s.loadXML(e), s
    },
    post: function(e, t, s) {
        var i = new dtmlXMLLoaderObject(!0);
        return i.async = arguments.length < 4, i.waitCall = s, i.loadXML(e, !0, t), i
    },
    getSync: function(e) {
        return this.get(e, null, !0)
    },
    postSync: function(e, t) {
        return this.post(e, t, null, !0)
    }
}, dtmlXMLLoaderObject.count = 0, dtmlXMLLoaderObject.prototype.waitLoadFunction = function(e) {
    var t=!0;
    return this.check = function() {
        if (e && e.onloadAction && (!e.xmlDoc.readyState || 4 == e.xmlDoc.readyState)) {
            if (!t)
                return;
            t=!1, dtmlXMLLoaderObject.count++, "function" == typeof e.onloadAction && e.onloadAction(e.mainObject, null, null, null, e), e.waitCall && (e.waitCall.call(this, e), e.waitCall = null)
        }
    }, this.check
}, dtmlXMLLoaderObject.prototype.getXMLTopNode = function(e, t) {
    var s;
    if (this.xmlDoc.responseXML) {
        var i = this.xmlDoc.responseXML.getElementsByTagName(e);
        if (0 === i.length&&-1 != e.indexOf(":"))
            var i = this.xmlDoc.responseXML.getElementsByTagName(e.split(":")[1]);
        s = i[0]
    } else 
        s = this.xmlDoc.documentElement;
    if (s)
        return this._retry=!1, s;
    if (!this._retry && _isIE) {
        this._retry=!0;
        var t = this.xmlDoc;
        return this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/, ""), !0), this.getXMLTopNode(e, t)
    }
    return dhtmlxError.throwError("LoadXML", "Incorrect XML", [t || this.xmlDoc, this.mainObject]), document.createElement("DIV")
}, dtmlXMLLoaderObject.prototype.loadXMLString = function(e, t) {
    if (_isIE)
        this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), this.xmlDoc.async = this.async, this.xmlDoc.onreadystatechange = function() {}, this.xmlDoc.loadXML(e);
    else {
        var s = new DOMParser;
        this.xmlDoc = s.parseFromString(e, "text/xml")
    }
    t || (this.onloadAction && this.onloadAction(this.mainObject, null, null, null, this), this.waitCall && (this.waitCall(), this.waitCall = null))
}, dtmlXMLLoaderObject.prototype.loadXML = function(e, t, s, i) {
    this.rSeed && (e += ( - 1 != e.indexOf("?") ? "&" : "?") + "a_dhx_rSeed=" + (new Date).valueOf()), this.filePath = e, this.xmlDoc=!_isIE && window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), this.async && (this.xmlDoc.onreadystatechange = new this.waitLoadFunction(this)), this.xmlDoc.open(t ? "POST" : "GET", e, this.async), i ? (this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 (" + navigator.userAgent + ")"), this.xmlDoc.setRequestHeader("Content-type", "text/xml")) : t && this.xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), this.xmlDoc.setRequestHeader("X-Requested-With", "XMLHttpRequest"), this.xmlDoc.send(null || s), this.async || new this.waitLoadFunction(this)()
}, dtmlXMLLoaderObject.prototype.destructor = function() {
    return this._filterXPath = null, this._getAllNamedChilds = null, this._retry = null, this.async = null, this.rSeed = null, this.filePath = null, this.onloadAction = null, this.mainObject = null, this.xmlDoc = null, this.doXPath = null, this.doXPathOpera = null, this.doXSLTransToObject = null, this.doXSLTransToString = null, this.loadXML = null, this.loadXMLString = null, this.doSerialization = null, this.xmlNodeToJSON = null, this.getXMLTopNode = null, this.setXSLParamValue = null, null
}, dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function(e) {
    for (var t = {}, s = 0; s < e.attributes.length; s++)
        t[e.attributes[s].name] = e.attributes[s].value;
    t._tagvalue = e.firstChild ? e.firstChild.nodeValue : "";
    for (var s = 0; s < e.childNodes.length; s++) {
        var i = e.childNodes[s].tagName;
        i && (t[i] || (t[i] = []), t[i].push(this.xmlNodeToJSON(e.childNodes[s])))
    }
    return t
}, dhtmlDragAndDropObject.prototype.removeDraggableItem = function(e) {
    e.onmousedown = null, e.dragStarter = null, e.dragLanding = null
}, dhtmlDragAndDropObject.prototype.addDraggableItem = function(e, t) {
    e.onmousedown = this.preCreateDragCopy, e.dragStarter = t, this.addDragLanding(e, t)
}, dhtmlDragAndDropObject.prototype.addDragLanding = function(e, t) {
    e.dragLanding = t
}, dhtmlDragAndDropObject.prototype.preCreateDragCopy = function(e) {
    return !e&&!window.event || 2 != (e || event).button ? window.dhtmlDragAndDrop.waitDrag ? (window.dhtmlDragAndDrop.waitDrag = 0, document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU, document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM, !1) : (window.dhtmlDragAndDrop.dragNode && window.dhtmlDragAndDrop.stopDrag(e), window.dhtmlDragAndDrop.waitDrag = 1, window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup, window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove, window.dhtmlDragAndDrop.dragStartNode = this, window.dhtmlDragAndDrop.dragStartObject = this.dragStarter, document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy, document.body.onmousemove = window.dhtmlDragAndDrop.callDrag, window.dhtmlDragAndDrop.downtime = (new Date).valueOf(), e && e.preventDefault ? (e.preventDefault(), !1) : !1) : void 0
}, dhtmlDragAndDropObject.prototype.callDrag = function(e) {
    e || (e = window.event);
    var t = window.dhtmlDragAndDrop;
    if (!((new Date).valueOf() - t.downtime < 100)) {
        if (!t.dragNode) {
            if (!t.waitDrag)
                return t.stopDrag(e, !0);
            if (t.dragNode = t.dragStartObject._createDragNode(t.dragStartNode, e), !t.dragNode)
                return t.stopDrag();
            t.dragNode.onselectstart = function() {
                return !1
            }, t.gldragNode = t.dragNode, document.body.appendChild(t.dragNode), document.body.onmouseup = t.stopDrag, t.waitDrag = 0, t.dragNode.pWindow = window, t.initFrameRoute()
        }
        if (t.dragNode.parentNode != window.document.body && t.gldragNode) {
            var s = t.gldragNode;
            t.gldragNode.old && (s = t.gldragNode.old), s.parentNode.removeChild(s);
            var i = t.dragNode.pWindow;
            if (s.pWindow && s.pWindow.dhtmlDragAndDrop.lastLanding && s.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(s.pWindow.dhtmlDragAndDrop.lastLanding), _isIE) {
                var n = document.createElement("Div");
                n.innerHTML = t.dragNode.outerHTML, t.dragNode = n.childNodes[0]
            } else 
                t.dragNode = t.dragNode.cloneNode(!0);
            t.dragNode.pWindow = window, t.gldragNode.old = t.dragNode, document.body.appendChild(t.dragNode), i.dhtmlDragAndDrop.dragNode = t.dragNode
        }
        t.dragNode.style.left = e.clientX + 15 + (t.fx?-1 * t.fx : 0) + (document.body.scrollLeft || document.documentElement.scrollLeft) + "px", t.dragNode.style.top = e.clientY + 3 + (t.fy?-1 * t.fy : 0) + (document.body.scrollTop || document.documentElement.scrollTop) + "px";
        var a;
        a = e.srcElement ? e.srcElement : e.target, t.checkLanding(a, e)
    }
}, dhtmlDragAndDropObject.prototype.calculateFramePosition = function(e) {
    if (window.name) {
        for (var t = parent.frames[window.name].frameElement.offsetParent, s = 0, i = 0; t;)
            s += t.offsetLeft, i += t.offsetTop, t = t.offsetParent;
        if (parent.dhtmlDragAndDrop) {
            var n = parent.dhtmlDragAndDrop.calculateFramePosition(1);
            s += 1 * n.split("_")[0], i += 1 * n.split("_")[1]
        }
        if (e)
            return s + "_" + i;
        this.fx = s, this.fy = i
    }
    return "0_0"
}, dhtmlDragAndDropObject.prototype.checkLanding = function(e, t) {
    e && e.dragLanding ? (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding), this.lastLanding = e, this.lastLanding = this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, t.clientX, t.clientY, t), this.lastLanding_scr = _isIE ? t.srcElement : t.target) : e && "BODY" != e.tagName ? this.checkLanding(e.parentNode, t) : (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding, t.clientX, t.clientY, t), this.lastLanding = 0, this._onNotFound && this._onNotFound())
}, dhtmlDragAndDropObject.prototype.stopDrag = function(e, t) {
    var s = window.dhtmlDragAndDrop;
    if (!t) {
        s.stopFrameRoute();
        var i = s.lastLanding;
        s.lastLanding = null, i && i.dragLanding._drag(s.dragStartNode, s.dragStartObject, i, _isIE ? event.srcElement : e.target)
    }
    s.lastLanding = null, s.dragNode && s.dragNode.parentNode == document.body && s.dragNode.parentNode.removeChild(s.dragNode), s.dragNode = 0, s.gldragNode = 0, s.fx = 0, s.fy = 0, s.dragStartNode = 0, s.dragStartObject = 0, document.body.onmouseup = s.tempDOMU, document.body.onmousemove = s.tempDOMM, s.tempDOMU = null, s.tempDOMM = null, s.waitDrag = 0
}, dhtmlDragAndDropObject.prototype.stopFrameRoute = function(e) {
    e && window.dhtmlDragAndDrop.stopDrag(1, 1);
    for (var t = 0; t < window.frames.length; t++)
        try {
            window.frames[t] != e && window.frames[t].dhtmlDragAndDrop && window.frames[t].dhtmlDragAndDrop.stopFrameRoute(window)
    } catch (s) {}
    try {
        parent.dhtmlDragAndDrop && parent != window && parent != e && parent.dhtmlDragAndDrop.stopFrameRoute(window)
    } catch (s) {}
}, dhtmlDragAndDropObject.prototype.initFrameRoute = function(e, t) {
    e && (window.dhtmlDragAndDrop.preCreateDragCopy(), window.dhtmlDragAndDrop.dragStartNode = e.dhtmlDragAndDrop.dragStartNode, window.dhtmlDragAndDrop.dragStartObject = e.dhtmlDragAndDrop.dragStartObject, window.dhtmlDragAndDrop.dragNode = e.dhtmlDragAndDrop.dragNode, window.dhtmlDragAndDrop.gldragNode = e.dhtmlDragAndDrop.dragNode, window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag, window.waitDrag = 0, !_isIE && t && (!_isFF || 1.8 > _FFrv) && window.dhtmlDragAndDrop.calculateFramePosition());
    try {
        parent.dhtmlDragAndDrop && parent != window && parent != e && parent.dhtmlDragAndDrop.initFrameRoute(window)
    } catch (s) {}
    for (var i = 0; i < window.frames.length; i++)
        try {
            window.frames[i] != e && window.frames[i].dhtmlDragAndDrop && window.frames[i].dhtmlDragAndDrop.initFrameRoute(window, !e || t ? 1 : 0)
    } catch (s) {}
}, _isFF=!1, _isIE=!1, _isOpera=!1, _isKHTML=!1, _isMacOS=!1, _isChrome=!1, _FFrv=!1, _KHTMLrv=!1, _OperaRv=!1, - 1 != navigator.userAgent.indexOf("Macintosh") && (_isMacOS=!0), navigator.userAgent.toLowerCase().indexOf("chrome")>-1 && (_isChrome=!0), - 1 != navigator.userAgent.indexOf("Safari")||-1 != navigator.userAgent.indexOf("Konqueror") ? (_KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari") + 7, 5)), _KHTMLrv > 525 ? (_isFF=!0, _FFrv = 1.9) : _isKHTML=!0) : - 1 != navigator.userAgent.indexOf("Opera") ? (_isOpera=!0, _OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3))) : - 1 != navigator.appName.indexOf("Microsoft") ? (_isIE=!0, - 1 == navigator.appVersion.indexOf("MSIE 8.0")&&-1 == navigator.appVersion.indexOf("MSIE 9.0")&&-1 == navigator.appVersion.indexOf("MSIE 10.0") || "BackCompat" == document.compatMode || (_isIE = 8)) : "Netscape" == navigator.appName&&-1 != navigator.userAgent.indexOf("Trident") ? _isIE = 8 : (_isFF=!0, _FFrv = parseFloat(navigator.userAgent.split("rv:")[1])), dtmlXMLLoaderObject.prototype.doXPath = function(e, t, s, i) {
    if (_isKHTML ||!_isIE&&!window.XPathResult)
        return this.doXPathOpera(e, t);
    if (_isIE)
        return t || (t = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML), t || dhtmlxError.throwError("LoadXML", "Incorrect XML", [t || this.xmlDoc, this.mainObject]), s && t.setProperty("SelectionNamespaces", "xmlns:xsl='" + s + "'"), "single" == i ? t.selectSingleNode(e) : t.selectNodes(e) || new Array(0);
    var n = t;
    t || (t = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML), t || dhtmlxError.throwError("LoadXML", "Incorrect XML", [t || this.xmlDoc, this.mainObject]), - 1 != t.nodeName.indexOf("document") ? n = t : (n = t, t = t.ownerDocument);
    var a = XPathResult.ANY_TYPE;
    "single" == i && (a = XPathResult.FIRST_ORDERED_NODE_TYPE);
    var r = [], d = t.evaluate(e, n, function() {
        return s
    }, a, null);
    if (a == XPathResult.FIRST_ORDERED_NODE_TYPE)
        return d.singleNodeValue;
    for (var o = d.iterateNext(); o;)
        r[r.length] = o, o = d.iterateNext();
    return r
}, _dhtmlxError.prototype.catchError = function(e, t) {
    this.catches[e] = t
}, _dhtmlxError.prototype.throwError = function(e, t, s) {
    return this.catches[e] ? this.catches[e](e, t, s) : this.catches.ALL ? this.catches.ALL(e, t, s) : (window.alert("Error type: " + arguments[0] + "\nDescription: " + arguments[1]), null)
}, window.dhtmlxError = new _dhtmlxError, dtmlXMLLoaderObject.prototype.doXPathOpera = function(e, t) {
    var s = e.replace(/[\/]+/gi, "/").split("/"), i = null, n = 1;
    if (!s.length)
        return [];
    if ("." == s[0])
        i = [t];
    else {
        if ("" !== s[0])
            return [];
        i = (this.xmlDoc.responseXML || this.xmlDoc).getElementsByTagName(s[n].replace(/\[[^\]]*\]/g, "")), n++
    }
    for (n; n < s.length; n++)
        i = this._getAllNamedChilds(i, s[n]);
    return - 1 != s[n - 1].indexOf("[") && (i = this._filterXPath(i, s[n - 1])), i
}, dtmlXMLLoaderObject.prototype._filterXPath = function(e, t) {
    for (var s = [], t = t.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, ""), i = 0; i < e.length; i++)
        e[i].getAttribute(t) && (s[s.length] = e[i]);
    return s
}, dtmlXMLLoaderObject.prototype._getAllNamedChilds = function(e, t) {
    var s = [];
    _isKHTML && (t = t.toUpperCase());
    for (var i = 0; i < e.length; i++)
        for (var n = 0; n < e[i].childNodes.length; n++)
            _isKHTML ? e[i].childNodes[n].tagName && e[i].childNodes[n].tagName.toUpperCase() == t && (s[s.length] = e[i].childNodes[n]) : e[i].childNodes[n].tagName == t && (s[s.length] = e[i].childNodes[n]);
    return s
}, dtmlXMLLoaderObject.prototype.xslDoc = null, dtmlXMLLoaderObject.prototype.setXSLParamValue = function(e, t, s) {
    s || (s = this.xslDoc), s.responseXML && (s = s.responseXML);
    var i = this.doXPath("/xsl:stylesheet/xsl:variable[@name='" + e + "']", s, "http://www.w3.org/1999/XSL/Transform", "single");
    i && (i.firstChild.nodeValue = t)
}, dtmlXMLLoaderObject.prototype.doXSLTransToObject = function(e, t) {
    e || (e = this.xslDoc), e.responseXML && (e = e.responseXML), t || (t = this.xmlDoc), t.responseXML && (t = t.responseXML);
    var s;
    if (_isIE) {
        s = new ActiveXObject("Msxml2.DOMDocument.3.0");
        try {
            t.transformNodeToObject(e, s)
        } catch (i) {
            s = t.transformNode(e)
        }
    } else 
        this.XSLProcessor || (this.XSLProcessor = new XSLTProcessor, this.XSLProcessor.importStylesheet(e)), s = this.XSLProcessor.transformToDocument(t);
    return s
}, dtmlXMLLoaderObject.prototype.doXSLTransToString = function(e, t) {
    var s = this.doXSLTransToObject(e, t);
    return "string" == typeof s ? s : this.doSerialization(s)
}, dtmlXMLLoaderObject.prototype.doSerialization = function(e) {
    if (e || (e = this.xmlDoc), e.responseXML && (e = e.responseXML), _isIE)
        return e.xml;
    var t = new XMLSerializer;
    return t.serializeToString(e)
}, dhtmlxEventable = function(obj) {
    obj.attachEvent = function(e, t, s) {
        return e = "ev_" + e.toLowerCase(), this[e] || (this[e] = new this.eventCatcher(s || this)), e + ":" + this[e].addEvent(t)
    }, obj.callEvent = function(e, t) {
        return e = "ev_" + e.toLowerCase(), this[e] ? this[e].apply(this, t) : !0
    }, obj.checkEvent = function(e) {
        return !!this["ev_" + e.toLowerCase()]
    }, obj.eventCatcher = function(obj) {
        var dhx_catch = [], z = function() {
            for (var e=!0, t = 0; t < dhx_catch.length; t++)
                if (dhx_catch[t]) {
                    var s = dhx_catch[t].apply(obj, arguments);
                    e = e && s
                }
            return e
        };
        return z.addEvent = function(ev) {
            return "function" != typeof ev && (ev = eval(ev)), ev ? dhx_catch.push(ev) - 1 : !1
        }, z.removeEvent = function(e) {
            dhx_catch[e] = null
        }, z
    }, obj.detachEvent = function(e) {
        if (e) {
            var t = e.split(":");
            this[t[0]].removeEvent(t[1])
        }
    }, obj.detachAllEvents = function() {
        for (var e in this)
            0 === e.indexOf("ev_") && (this.detachEvent(e), this[e] = null)
    }, obj = null
}, window.dhtmlx || (window.dhtmlx = {}), function() {
    function e(e, t) {
        var i = e.callback;
        s(!1), e.box.parentNode.removeChild(e.box), c = e.box = null, i && i(t)
    }
    function t(t) {
        if (c) {
            t = t || event;
            var s = t.which || event.keyCode;
            return dhtmlx.message.keyboard && ((13 == s || 32 == s) && e(c, !0), 27 == s && e(c, !1)), t.preventDefault && t.preventDefault(), !(t.cancelBubble=!0)
        }
    }
    function s(e) {
        s.cover || (s.cover = document.createElement("DIV"), s.cover.onkeydown = t, s.cover.className = "dhx_modal_cover", document.body.appendChild(s.cover));
        document.body.scrollHeight;
        s.cover.style.display = e ? "inline-block" : "none"
    }
    function i(e, t, s) {
        var i = s ? s: e || "", n = "dhtmlx_" + i.toLowerCase().replace(/ /g, "_") + "_button";
        return "<div class='dhtmlx_popup_button " + n + "' result='" + t + "' ><div>" + e + "</div></div>"
    }
    function n(e) {
        u.area || (u.area = document.createElement("DIV"), u.area.className = "dhtmlx_message_area", u.area.style[u.position] = "5px", document.body.appendChild(u.area)), u.hide(e.id);
        var t = document.createElement("DIV");
        return t.innerHTML = "<div>" + e.text + "</div>", t.className = "dhtmlx-info dhtmlx-" + e.type, t.onclick = function() {
            u.hide(e.id), e = null
        }, "bottom" == u.position && u.area.firstChild ? u.area.insertBefore(t, u.area.firstChild) : u.area.appendChild(t), e.expire > 0 && (u.timers[e.id] = window.setTimeout(function() {
            u.hide(e.id)
        }, e.expire)), u.pull[e.id] = t, t = null, e.id
    }
    function a(t, s, n) {
        var a = document.createElement("DIV");
        a.className = " dhtmlx_modal_box dhtmlx-" + t.type, a.setAttribute("dhxbox", 1);
        var r = "";
        if (t.width && (a.style.width = t.width), t.height && (a.style.height = t.height), t.title && (r += '<div class="dhtmlx_popup_title">' + t.title + "</div>"), r += '<div class="dhtmlx_popup_text"><span>' + (t.content ? "" : t.text) + '</span></div><div  class="dhtmlx_popup_controls">', s) {
            var d = t.ok || scheduler.locale.labels.message_ok;
            void 0 === d && (d = "OK"), r += i(d, !0, "ok")
        }
        if (n) {
            var o = t.cancel || scheduler.locale.labels.message_cancel;
            void 0 === o && (o = "Cancel"), r += i(o, !1, "cancel")
        }
        if (t.buttons)
            for (var l = 0; l < t.buttons.length; l++)
                r += i(t.buttons[l], l);
        if (r += "</div>", a.innerHTML = r, t.content) {
            var h = t.content;
            "string" == typeof h && (h = document.getElementById(h)), "none" == h.style.display && (h.style.display = ""), a.childNodes[t.title ? 1: 0].appendChild(h)
        }
        return a.onclick = function(s) {
            s = s || event;
            var i = s.target || s.srcElement;
            if (i.className || (i = i.parentNode), "dhtmlx_popup_button" == i.className.split(" ")[0]) {
                var n = i.getAttribute("result");
                n = "true" == n || ("false" == n?!1 : n), e(t, n)
            }
        }, t.box = a, (s || n) && (c = t), a
    }
    function r(e, i, n) {
        var r = e.tagName ? e: a(e, i, n);
        e.hidden || s(!0), document.body.appendChild(r);
        var d = Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - r.offsetWidth) / 2)), o = Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - r.offsetHeight) / 2));
        return r.style.top = "top" == e.position ? "-3px" : o + "px", r.style.left = d + "px", r.onkeydown = t, r.focus(), e.hidden && dhtmlx.modalbox.hide(r), r
    }
    function d(e) {
        return r(e, !0, !1)
    }
    function o(e) {
        return r(e, !0, !0)
    }
    function l(e) {
        return r(e)
    }
    function h(e, t, s) {
        return "object" != typeof e && ("function" == typeof t && (s = t, t = ""), e = {
            text: e,
            type: t,
            callback: s
        }), e
    }
    function _(e, t, s, i) {
        return "object" != typeof e && (e = {
            text: e,
            type: t,
            expire: s,
            id: i
        }), e.id = e.id || u.uid(), e.expire = e.expire || u.expire, e
    }
    var c = null;
    document.attachEvent ? document.attachEvent("onkeydown", t) : document.addEventListener("keydown", t, !0), dhtmlx.alert = function() {
        var e = h.apply(this, arguments);
        return e.type = e.type || "confirm", d(e)
    }, dhtmlx.confirm = function() {
        var e = h.apply(this, arguments);
        return e.type = e.type || "alert", o(e)
    }, dhtmlx.modalbox = function() {
        var e = h.apply(this, arguments);
        return e.type = e.type || "alert", l(e)
    }, dhtmlx.modalbox.hide = function(e) {
        for (; e && e.getAttribute&&!e.getAttribute("dhxbox");)
            e = e.parentNode;
        e && (e.parentNode.removeChild(e), s(!1))
    };
    var u = dhtmlx.message = function(e) {
        e = _.apply(this, arguments), e.type = e.type || "info";
        var t = e.type.split("-")[0];
        switch (t) {
        case"alert":
            return d(e);
        case"confirm":
            return o(e);
        case"modalbox":
            return l(e);
        default:
            return n(e)
        }
    };
    u.seed = (new Date).valueOf(), u.uid = function() {
        return u.seed++
    }, u.expire = 4e3, u.keyboard=!0, u.position = "top", u.pull = {}, u.timers = {}, u.hideAll = function() {
        for (var e in u.pull)
            u.hide(e)
    }, u.hide = function(e) {
        var t = u.pull[e];
        t && t.parentNode && (window.setTimeout(function() {
            t.parentNode.removeChild(t), t = null
        }, 2e3), t.className += " hidden", u.timers[e] && window.clearTimeout(u.timers[e]), delete u.pull[e])
    }
}(), dataProcessor.prototype = {
    setTransactionMode: function(e, t) {
        this._tMode = e, this._tSend = t
    },
    escape: function(e) {
        return this._utf ? encodeURIComponent(e) : escape(e)
    },
    enableUTFencoding: function(e) {
        this._utf = convertStringToBoolean(e)
    },
    setDataColumns: function(e) {
        this._columns = "string" == typeof e ? e.split(",") : e
    },
    getSyncState: function() {
        return !this.updatedRows.length
    },
    enableDataNames: function(e) {
        this._endnm = convertStringToBoolean(e)
    },
    enablePartialDataSend: function(e) {
        this._changed = convertStringToBoolean(e)
    },
    setUpdateMode: function(e, t) {
        this.autoUpdate = "cell" == e, this.updateMode = e, this.dnd = t
    },
    ignore: function(e, t) {
        this._silent_mode=!0, e.call(t || window), this._silent_mode=!1
    },
    setUpdated: function(e, t, s) {
        if (!this._silent_mode) {
            var i = this.findRow(e);
            s = s || "updated";
            var n = this.obj.getUserData(e, this.action_param);
            n && "updated" == s && (s = n), t ? (this.set_invalid(e, !1), this.updatedRows[i] = e, this.obj.setUserData(e, this.action_param, s), this._in_progress[e] && (this._in_progress[e] = "wait")) : this.is_invalid(e) || (this.updatedRows.splice(i, 1), this.obj.setUserData(e, this.action_param, "")), t || this._clearUpdateFlag(e), this.markRow(e, t, s), t && this.autoUpdate && this.sendData(e)
        }
    },
    _clearUpdateFlag: function() {},
    markRow: function(e, t, s) {
        var i = "", n = this.is_invalid(e);
        if (n && (i = this.styles[n], t=!0), this.callEvent("onRowMark", [e, t, s, n]) && (i = this.styles[t ? s: "clear"] + i, this.obj[this._methods[0]](e, i), n && n.details)) {
            i += this.styles[n + "_cell"];
            for (var a = 0; a < n.details.length; a++)
                n.details[a] && this.obj[this._methods[1]](e, a, i)
        }
    },
    getState: function(e) {
        return this.obj.getUserData(e, this.action_param)
    },
    is_invalid: function(e) {
        return this._invalid[e]
    },
    set_invalid: function(e, t, s) {
        s && (t = {
            value: t,
            details: s,
            toString: function() {
                return this.value.toString()
            }
        }), this._invalid[e] = t
    },
    checkBeforeUpdate: function() {
        return !0
    },
    sendData: function(e) {
        return !this._waitMode || "tree" != this.obj.mytype&&!this.obj._h2 ? (this.obj.editStop && this.obj.editStop(), "undefined" == typeof e || this._tSend ? this.sendAllData() : this._in_progress[e]?!1 : (this.messages = [], !this.checkBeforeUpdate(e) && this.callEvent("onValidationError", [e, this.messages])?!1 : void this._beforeSendData(this._getRowData(e), e))) : void 0
    },
    _beforeSendData: function(e, t) {
        return this.callEvent("onBeforeUpdate", [t, this.getState(t), e]) ? void this._sendData(e, t) : !1
    },
    serialize: function(e, t) {
        if ("string" == typeof e)
            return e;
        if ("undefined" != typeof t)
            return this.serialize_one(e, "");
        var s = [], i = [];
        for (var n in e)
            e.hasOwnProperty(n) && (s.push(this.serialize_one(e[n], n + this.post_delim)), i.push(n));
        return s.push("ids=" + this.escape(i.join(","))), dhtmlx.security_key && s.push("dhx_security=" + dhtmlx.security_key), s.join("&")
    },
    serialize_one: function(e, t) {
        if ("string" == typeof e)
            return e;
        var s = [];
        for (var i in e)
            e.hasOwnProperty(i) && s.push(this.escape((t || "") + i) + "=" + this.escape(e[i]));
        return s.join("&")
    },
    _sendData: function(e, t) {
        if (e) {
            if (!this.callEvent("onBeforeDataSending", t ? [t, this.getState(t), e] : [null, null, e]))
                return !1;
            t && (this._in_progress[t] = (new Date).valueOf());
            var s = new dtmlXMLLoaderObject(this.afterUpdate, this, !0), i = this.serverProcessor + (this._user ? getUrlSymbol(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + this.obj.getUserData(0, "version")].join("&") : "");
            "POST" != this._tMode ? s.loadXML(i + ( - 1 != i.indexOf("?") ? "&" : "?") + this.serialize(e, t)) : s.loadXML(i, !0, this.serialize(e, t)), this._waitMode++
        }
    },
    sendAllData: function() {
        if (this.updatedRows.length) {
            this.messages = [];
            for (var e=!0, t = 0; t < this.updatedRows.length; t++)
                e&=this.checkBeforeUpdate(this.updatedRows[t]);
            if (!e&&!this.callEvent("onValidationError", ["", this.messages]))
                return !1;
            if (this._tSend)
                this._sendData(this._getAllData());
            else 
                for (var t = 0; t < this.updatedRows.length; t++)
                    if (!this._in_progress[this.updatedRows[t]]) {
                        if (this.is_invalid(this.updatedRows[t]))
                            continue;
                            if (this._beforeSendData(this._getRowData(this.updatedRows[t]), this.updatedRows[t]), this._waitMode && ("tree" == this.obj.mytype || this.obj._h2))
                                return
                    }
        }
    },
    _getAllData: function() {
        for (var e = {}, t=!1, s = 0; s < this.updatedRows.length; s++) {
            var i = this.updatedRows[s];
            this._in_progress[i] || this.is_invalid(i) || this.callEvent("onBeforeUpdate", [i, this.getState(i)]) && (e[i] = this._getRowData(i, i + this.post_delim), t=!0, this._in_progress[i] = (new Date).valueOf())
        }
        return t ? e : null
    },
    setVerificator: function(e, t) {
        this.mandatoryFields[e] = t || function(e) {
            return "" !== e
        }
    },
    clearVerificator: function(e) {
        this.mandatoryFields[e]=!1
    },
    findRow: function(e) {
        var t = 0;
        for (t = 0; t < this.updatedRows.length && e != this.updatedRows[t]; t++);
        return t
    },
    defineAction: function(e, t) {
        this._uActions || (this._uActions = []), this._uActions[e] = t
    },
    afterUpdateCallback: function(e, t, s, i) {
        var n = e, a = "error" != s && "invalid" != s;
        if (a || this.set_invalid(e, s), this._uActions && this._uActions[s]&&!this._uActions[s](i))
            return delete this._in_progress[n];
        "wait" != this._in_progress[n] && this.setUpdated(e, !1);
        var r = e;
        switch (s) {
        case"inserted":
        case"insert":
            t != e && (this.obj[this._methods[2]](e, t), e = t);
            break;
        case"delete":
        case"deleted":
            return this.obj.setUserData(e, this.action_param, "true_deleted"), this.obj[this._methods[3]](e), delete this._in_progress[n], this.callEvent("onAfterUpdate", [e, s, t, i])
        }
        "wait" != this._in_progress[n] ? (a && this.obj.setUserData(e, this.action_param, ""), delete this._in_progress[n]) : (delete this._in_progress[n], this.setUpdated(t, !0, this.obj.getUserData(e, this.action_param))), this.callEvent("onAfterUpdate", [r, s, t, i])
    },
    afterUpdate: function(e, t, s, i, n) {
        if (n.getXMLTopNode("data"), n.xmlDoc.responseXML) {
            for (var a = n.doXPath("//data/action"), r = 0; r < a.length; r++) {
                var d = a[r], o = d.getAttribute("type"), l = d.getAttribute("sid"), h = d.getAttribute("tid");
                e.afterUpdateCallback(l, h, o, d)
            }
            e.finalizeUpdate()
        }
    },
    finalizeUpdate: function() {
        this._waitMode && this._waitMode--, ("tree" == this.obj.mytype || this.obj._h2) && this.updatedRows.length && this.sendData(), this.callEvent("onAfterUpdateFinish", []), this.updatedRows.length || this.callEvent("onFullSync", [])
    },
    init: function(e) {
        this.obj = e, this.obj._dp_init && this.obj._dp_init(this)
    },
    setOnAfterUpdate: function(e) {
        this.attachEvent("onAfterUpdate", e)
    },
    enableDebug: function() {},
    setOnBeforeUpdateHandler: function(e) {
        this.attachEvent("onBeforeDataSending", e)
    },
    setAutoUpdate: function(e, t) {
        e = e || 2e3, this._user = t || (new Date).valueOf(), this._need_update=!1, this._loader = null, this._update_busy=!1, this.attachEvent("onAfterUpdate", function(e, t, s, i) {
            this.afterAutoUpdate(e, t, s, i)
        }), this.attachEvent("onFullSync", function() {
            this.fullSync()
        });
        var s = this;
        window.setInterval(function() {
            s.loadUpdate()
        }, e)
    },
    afterAutoUpdate: function(e, t) {
        return "collision" == t ? (this._need_update=!0, !1) : !0
    },
    fullSync: function() {
        return this._need_update===!0 && (this._need_update=!1, this.loadUpdate()), !0
    },
    getUpdates: function(e, t) {
        return this._update_busy?!1 : (this._update_busy=!0, this._loader = this._loader || new dtmlXMLLoaderObject(!0), this._loader.async=!0, this._loader.waitCall = t, void this._loader.loadXML(e))
    },
    _v: function(e) {
        return e.firstChild ? e.firstChild.nodeValue : ""
    },
    _a: function(e) {
        for (var t = [], s = 0; s < e.length; s++)
            t[s] = this._v(e[s]);
        return t
    },
    loadUpdate: function() {
        var e = this, t = this.obj.getUserData(0, "version"), s = this.serverProcessor + getUrlSymbol(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + t].join("&");
        s = s.replace("editing=true&", ""), this.getUpdates(s, function() {
            var t = e._loader.doXPath("//userdata");
            e.obj.setUserData(0, "version", e._v(t[0]));
            var s = e._loader.doXPath("//update");
            if (s.length) {
                e._silent_mode=!0;
                for (var i = 0; i < s.length; i++) {
                    var n = s[i].getAttribute("status"), a = s[i].getAttribute("id"), r = s[i].getAttribute("parent");
                    switch (n) {
                    case"inserted":
                        e.callEvent("insertCallback", [s[i], a, r]);
                        break;
                    case"updated":
                        e.callEvent("updateCallback", [s[i], a, r]);
                        break;
                    case"deleted":
                        e.callEvent("deleteCallback", [s[i], a, r])
                    }
                }
                e._silent_mode=!1
            }
            e._update_busy=!1, e = null
        })
    }
}, window.dhtmlXGridObject && (dhtmlXGridObject.prototype._init_point_connector = dhtmlXGridObject.prototype._init_point, dhtmlXGridObject.prototype._init_point = function() {
    var e = function(e) {
        return e = e.replace(/(\?|\&)connector[^\f]*/g, ""), e + ( - 1 != e.indexOf("?") ? "&" : "?") + "connector=true" + (this.hdr.rows.length > 0 ? "&dhx_no_header=1" : "")
    }, t = function(t) {
        return e.call(this, t) + (this._connector_sorting || "") + (this._connector_filter || "")
    }, s = function(e, s, i) {
        return this._connector_sorting = "&dhx_sort[" + s + "]=" + i, t.call(this, e)
    }, i = function(e, s, i) {
        for (var n = 0; n < s.length; n++)
            s[n] = "dhx_filter[" + s[n] + "]=" + encodeURIComponent(i[n]);
        return this._connector_filter = "&" + s.join("&"), t.call(this, e)
    };
    this.attachEvent("onCollectValues", function(e) {
        return this._con_f_used[e] ? "object" == typeof this._con_f_used[e] ? this._con_f_used[e] : !1 : !0
    }), this.attachEvent("onDynXLS", function() {
        return this.xmlFileUrl = t.call(this, this.xmlFileUrl), !0
    }), this.attachEvent("onBeforeSorting", function(e, t, i) {
        if ("connector" == t) {
            var n = this;
            return this.clearAndLoad(s.call(this, this.xmlFileUrl, e, i), function() {
                n.setSortImgState(!0, e, i)
            }), !1
        }
        return !0
    }), this.attachEvent("onFilterStart", function(e, t) {
        return this._con_f_used.length ? (this.clearAndLoad(i.call(this, this.xmlFileUrl, e, t)), !1) : !0
    }), this.attachEvent("onXLE", function(e, t, s, i) {}), this._init_point_connector && this._init_point_connector()
}, dhtmlXGridObject.prototype._con_f_used = [], dhtmlXGridObject.prototype._in_header_connector_text_filter = function(e, t) {
    return this._con_f_used[t] || (this._con_f_used[t] = 1), this._in_header_text_filter(e, t)
}, dhtmlXGridObject.prototype._in_header_connector_select_filter = function(e, t) {
    return this._con_f_used[t] || (this._con_f_used[t] = 2), this._in_header_select_filter(e, t)
}, dhtmlXGridObject.prototype.load_connector = dhtmlXGridObject.prototype.load, dhtmlXGridObject.prototype.load = function() {
    var e = [].concat(arguments);
    if (!this._colls_loaded && this.cellType) {
        for (var t = [], s = 0; s < this.cellType.length; s++)(0 === this.cellType[s].indexOf("co") || 2 == this._con_f_used[s]) 
            && t.push(s);
        t.length && (e[0] += ( - 1 != e[0].indexOf("?") ? "&" : "?") + "connector=true&dhx_colls=" + t.join(","))
    }
    return this.load_connector.apply(this, e)
}, dhtmlXGridObject.prototype._parseHead_connector = dhtmlXGridObject.prototype._parseHead, dhtmlXGridObject.prototype._parseHead = function() {
    if (this._parseHead_connector.apply(this, arguments), !this._colls_loaded) {
        for (var e = this.xmlLoader.doXPath("./coll_options", arguments[0]), t = 0; t < e.length; t++) {
            var s = e[t].getAttribute("for"), i = [], n = null;
            "combo" == this.cellType[s] && (n = this.getColumnCombo(s)), 0 === this.cellType[s].indexOf("co") && (n = this.getCombo(s));
            for (var a = this.xmlLoader.doXPath("./item", e[t]), r = 0; r < a.length; r++) {
                var d = a[r].getAttribute("value");
                if (n) {
                    var o = a[r].getAttribute("label") || d;
                    n.addOption ? n.addOption([[d, o]]) : n.put(d, o), i[i.length] = o
                } else 
                    i[i.length] = d
            }
            this._con_f_used[1 * s] && (this._con_f_used[1 * s] = i)
        }
        this._colls_loaded=!0
    }
}), window.dataProcessor && (dataProcessor.prototype.init_original = dataProcessor.prototype.init, dataProcessor.prototype.init = function(e) {
    this.init_original(e), e._dataprocessor = this, this.setTransactionMode("POST", !0), this.serverProcessor += ( - 1 != this.serverProcessor.indexOf("?") ? "&" : "?") + "editing=true"
}), dhtmlxError.catchError("LoadXML", function(e, t, s) {
    s[0].status && window.alert(s[0].responseText)
}), dhtmlxEventable(scheduler), scheduler._detachDomEvent = function(e, t, s) {
    e.removeEventListener ? e.removeEventListener(t, s, !1) : e.detachEvent && e.detachEvent("on" + t, s)
}, scheduler._init_once = function() {
    function e() {
        return {
            w: window.innerWidth || document.documentElement.clientWidth,
            h: window.innerHeight || document.documentElement.clientHeight
        }
    }
    function t(e, t) {
        return e.w == t.w && e.h == t.h
    }
    var s = e();
    dhtmlxEvent(window, "resize", function() {
        var i = e();
        t(s, i) || (window.clearTimeout(scheduler._resize_timer), scheduler._resize_timer = window.setTimeout(function() {
            scheduler.callEvent("onSchedulerResize", []) && (scheduler.update_view(), scheduler.callEvent("onAfterSchedulerResize", []))
        }, 100)), s = i
    }), scheduler._init_once = function() {}
}, scheduler.init = function(e, t, s) {
    t = t || scheduler._currentDate(), s = s || "week", this._obj && this.unset_actions(), this._obj = "string" == typeof e ? document.getElementById(e) : e, this._skin_init && scheduler._skin_init(), scheduler.date.init(), this._els = [], this._scroll=!0, this._quirks = _isIE && "BackCompat" == document.compatMode, this._quirks7 = _isIE&&-1 == navigator.appVersion.indexOf("MSIE 8"), this.get_elements(), this.init_templates(), this.set_actions(), this._init_once(), this._init_touch_events(), this.set_sizes(), scheduler.callEvent("onSchedulerReady", []), this.setCurrentView(t, s)
}, scheduler.xy = {
    min_event_height: 40,
    scale_width: 50,
    scroll_width: 18,
    scale_height: 20,
    month_scale_height: 20,
    menu_width: 25,
    margin_top: 0,
    margin_left: 0,
    editor_width: 140,
    month_head_height: 22
}, scheduler.keys = {
    edit_save: 13,
    edit_cancel: 27
}, scheduler.set_sizes = function() {
    var e = this._x = this._obj.clientWidth - this.xy.margin_left, t = this._y = this._obj.clientHeight - this.xy.margin_top, s = this._table_view ? 0: this.xy.scale_width + this.xy.scroll_width, i = this._table_view?-1 : this.xy.scale_width;
    this.set_xy(this._els.dhx_cal_navline[0], e, this.xy.nav_height, 0, 0), this.set_xy(this._els.dhx_cal_header[0], e - s, this.xy.scale_height, i, this.xy.nav_height + (this._quirks?-1 : 1));
    var n = this._els.dhx_cal_navline[0].offsetHeight;
    n > 0 && (this.xy.nav_height = n);
    var a = this.xy.scale_height + this.xy.nav_height + (this._quirks?-2 : 0);
    this.set_xy(this._els.dhx_cal_data[0], e, t - (a + 2), 0, a + 2)
}, scheduler.set_xy = function(e, t, s, i, n) {
    e.style.width = Math.max(0, t) + "px", e.style.height = Math.max(0, s) + "px", arguments.length > 3 && (e.style.left = i + "px", e.style.top = n + "px")
}, scheduler.get_elements = function() {
    for (var e = this._obj.getElementsByTagName("DIV"), t = 0; t < e.length; t++) {
        var s = e[t].className || "", i = e[t].getAttribute("name") || "";
        s && (s = s.split(" ")[0]), this._els[s] || (this._els[s] = []), this._els[s].push(e[t]);
        var n = scheduler.locale.labels[i || s];
        "string" != typeof n && i&&!e[t].innerHTML && (n = i.split("_")[0]), n && (e[t].innerHTML = n)
    }
}, scheduler.unset_actions = function() {
    for (var e in this._els)
        if (this._click[e])
            for (var t = 0; t < this._els[e].length; t++)
                this._els[e][t].onclick = null;
    this._obj.onselectstart = null, this._obj.onmousemove = null, this._obj.onmousedown = null, this._obj.onmouseup = null, this._obj.ondblclick = null, this._obj.oncontextmenu = null
}, scheduler.set_actions = function() {
    for (var e in this._els)
        if (this._click[e])
            for (var t = 0; t < this._els[e].length; t++)
                this._els[e][t].onclick = scheduler._click[e];
    this._obj.onselectstart = function() {
        return !1
    }, this._obj.onmousemove = function(e) {
        scheduler._temp_touch_block || scheduler._on_mouse_move(e || event)
    }, this._obj.onmousedown = function(e) {
        scheduler._ignore_next_click || scheduler._on_mouse_down(e || event)
    }, this._obj.onmouseup = function(e) {
        scheduler._ignore_next_click || scheduler._on_mouse_up(e || event)
    }, this._obj.ondblclick = function(e) {
        scheduler._on_dbl_click(e || event)
    }, this._obj.oncontextmenu = function(e) {
        var t = e || event, s = t.target || t.srcElement, i = scheduler.callEvent("onContextMenu", [scheduler._locate_event(s), t]);
        return i
    }
}, scheduler.select = function(e) {
    this._select_id != e && (this.editStop(!1), this.unselect(), this._select_id = e, this.updateEvent(e))
}, scheduler.unselect = function(e) {
    if (!e || e == this._select_id) {
        var t = this._select_id;
        this._select_id = null, t && this.getEvent(t) && this.updateEvent(t)
    }
}, scheduler.getState = function() {
    return {
        mode: this._mode,
        date: new Date(this._date),
        min_date: new Date(this._min_date),
        max_date: new Date(this._max_date),
        editor_id: this._edit_id,
        lightbox_id: this._lightbox_id,
        new_event: this._new_event,
        select_id: this._select_id,
        expanded: this.expanded,
        drag_id: this._drag_id,
        drag_mode: this._drag_mode
    }
}, scheduler._click = {
    dhx_cal_data: function(e) {
        if (scheduler._ignore_next_click)
            return e.preventDefault && e.preventDefault(), e.cancelBubble=!0, scheduler._ignore_next_click=!1, !1;
        var t = e ? e.target: event.srcElement, s = scheduler._locate_event(t);
        if (e = e || event, s) {
            if (!scheduler.callEvent("onClick", [s, e]) || scheduler.config.readonly)
                return 
        } else 
            scheduler.callEvent("onEmptyClick", [scheduler.getActionData(e).date, e]);
        if (s && scheduler.config.select) {
            scheduler.select(s);
            var i = t.className;
            - 1 != i.indexOf("_icon") && scheduler._click.buttons[i.split(" ")[1].replace("icon_", "")](s)
        } else 
            scheduler._close_not_saved(), scheduler.unselect()
    },
    dhx_cal_prev_button: function() {
        scheduler._click.dhx_cal_next_button(0, - 1)
    },
    dhx_cal_next_button: function(e, t) {
        scheduler.setCurrentView(scheduler.date.add(scheduler.date[scheduler._mode + "_start"](scheduler._date), t || 1, scheduler._mode))
    },
    dhx_cal_today_button: function() {
        scheduler.callEvent("onBeforeTodayDisplayed", []) && scheduler.setCurrentView(scheduler._currentDate())
    },
    dhx_cal_tab: function() {
        var e = this.getAttribute("name"), t = e.substring(0, e.search("_tab"));
        scheduler.setCurrentView(scheduler._date, t)
    },
    buttons: {
        "delete": function(e) {
            var t = scheduler.locale.labels.confirm_deleting;
            scheduler._dhtmlx_confirm(t, scheduler.locale.labels.title_confirm_deleting, function() {
                scheduler.deleteEvent(e)
            })
        },
        edit: function(e) {
            scheduler.edit(e)
        },
        save: function() {
            scheduler.editStop(!0)
        },
        details: function(e) {
            scheduler.showLightbox(e)
        },
        cancel: function() {
            scheduler.editStop(!1)
        }
    }
}, scheduler._dhtmlx_confirm = function(e, t, s) {
    if (!e)
        return s();
    var i = {
        text: e
    };
    t && (i.title = t), s && (i.callback = function(e) {
        e && s()
    }), dhtmlx.confirm(i)
}, scheduler.addEventNow = function(e, t, s) {
    var i = {};
    e && null !== e.constructor.toString().match(/object/i) && (i = e, e = null);
    var n = 6e4 * (this.config.event_duration || this.config.time_step);
    e || (e = i.start_date || Math.round(scheduler._currentDate().valueOf() / n) * n);
    var a = new Date(e);
    if (!t) {
        var r = this.config.first_hour;
        r > a.getHours() && (a.setHours(r), e = a.valueOf()), t = e.valueOf() + n
    }
    var d = new Date(t);
    a.valueOf() == d.valueOf() && d.setTime(d.valueOf() + n), i.start_date = i.start_date || a, i.end_date = i.end_date || d, i.text = i.text || this.locale.labels.new_event, i.id = this._drag_id = this.uid(), this._drag_mode = "new-size", this._loading=!0, this.addEvent(i), this.callEvent("onEventCreated", [this._drag_id, s]), this._loading=!1, this._drag_event = {}, this._on_mouse_up(s)
}, scheduler._on_dbl_click = function(e, t) {
    if (t = t || e.target || e.srcElement, !this.config.readonly) {
        var s = (t.className || "").split(" ")[0];
        switch (s) {
        case"dhx_scale_holder":
        case"dhx_scale_holder_now":
        case"dhx_month_body":
        case"dhx_wa_day_data":
            if (!scheduler.config.dblclick_create)
                break;
            this.addEventNow(this.getActionData(e).date, null, e);
            break;
        case"dhx_cal_event":
        case"dhx_wa_ev_body":
        case"dhx_agenda_line":
        case"dhx_grid_event":
        case"dhx_cal_event_line":
        case"dhx_cal_event_clear":
            var i = this._locate_event(t);
            if (!this.callEvent("onDblClick", [i, e]))
                return;
            this.config.details_on_dblclick || this._table_view ||!this.getEvent(i)._timed ||!this.config.select ? this.showLightbox(i) : this.edit(i);
            break;
        case"dhx_time_block":
        case"dhx_cal_container":
            return;
        default:
            var n = this["dblclick_" + s];
            if (n)
                n.call(this, e);
            else if (t.parentNode && t != this)
                return scheduler._on_dbl_click(e, t.parentNode)
            }
    }
}, scheduler._get_column_index = function(e) {
    var t = 0;
    if (this._cols) {
        for (var s = 0, i = 0; i < this._cols.length&&!s; i++)
            s = this._cols[i];
        if (t = s ? e / s : 0, this._ignores)
            for (var i = 0; t >= i; i++)
                this._ignores[i] && t++
    }
    return t
}, scheduler._week_indexes_from_pos = function(e) {
    if (this._cols) {
        var t = this._get_column_index(e.x);
        return e.x = Math.min(this._cols.length - 1, Math.max(0, Math.ceil(t) - 1)), e.y = Math.max(0, Math.ceil(60 * e.y / (this.config.time_step * this.config.hour_size_px)) - 1) + this.config.first_hour * (60 / this.config.time_step), e
    }
    return e
}, scheduler._mouse_coords = function(e) {
    var t, s = document.body, i = document.documentElement;
    t = _isIE ||!e.pageX&&!e.pageY ? {
        x: e.clientX + (s.scrollLeft || i.scrollLeft || 0) - s.clientLeft,
        y: e.clientY + (s.scrollTop || i.scrollTop || 0) - s.clientTop
    } : {
        x: e.pageX,
        y: e.pageY
    }, t.x -= getAbsoluteLeft(this._obj) + (this._table_view ? 0 : this.xy.scale_width), t.y -= getAbsoluteTop(this._obj) + this.xy.nav_height + (this._dy_shift || 0) + this.xy.scale_height - this._els.dhx_cal_data[0].scrollTop, t.ev = e;
    var n = this["mouse_" + this._mode];
    if (n)
        return n.call(this, t);
    if (this._table_view) {
        var a = this._get_column_index(t.x);
        if (!this._cols ||!this._colsS)
            return t;
        var r = 0;
        for (r = 1; r < this._colsS.heights.length&&!(this._colsS.heights[r] > t.y); r++);
        t.y = Math.ceil(24 * (Math.max(0, a) + 7 * Math.max(0, r - 1)) * 60 / this.config.time_step), (scheduler._drag_mode || "month" == this._mode) && (t.y = 24 * (Math.max(0, Math.ceil(a) - 1) + 7 * Math.max(0, r - 1)) * 60 / this.config.time_step), "move" == this._drag_mode && scheduler._ignores_detected && scheduler.config.preserve_length && (t._ignores=!0, this._drag_event._event_length || (this._drag_event._event_length = this._get_real_event_length(this._drag_event.start_date, this._drag_event.end_date, {
            x_step: 1,
            x_unit: "day"
        }))), t.x = 0
    } else 
        t = this._week_indexes_from_pos(t);
    return t
}, scheduler._close_not_saved = function() {
    if ((new Date).valueOf() - (scheduler._new_event || 0) > 500 && scheduler._edit_id) {
        var e = scheduler.locale.labels.confirm_closing;
        scheduler._dhtmlx_confirm(e, scheduler.locale.labels.title_confirm_closing, function() {
            scheduler.editStop(scheduler.config.positive_closing)
        })
    }
}, scheduler._correct_shift = function(e, t) {
    return e -= 6e4 * (new Date(scheduler._min_date).getTimezoneOffset() - new Date(e).getTimezoneOffset()) * (t?-1 : 1)
}, scheduler._on_mouse_move = function(e) {
    if (this._drag_mode) {
        var t = this._mouse_coords(e);
        if (!this._drag_pos || t.force_redraw || this._drag_pos.x != t.x || this._drag_pos.y != t.y) {
            var s, i;
            if (this._edit_id != this._drag_id && this._close_not_saved(), this._drag_pos = t, "create" == this._drag_mode) {
                if (this._close_not_saved(), this.unselect(this._select_id), this._loading=!0, s = this._get_date_from_pos(t).valueOf(), !this._drag_start) {
                    var n = this.callEvent("onBeforeEventCreated", [e, this._drag_id]);
                    if (!n)
                        return;
                    return void(this._drag_start = s)
                }
                i = s, i == this._drag_start;
                var a = new Date(this._drag_start), r = new Date(i);
                "day" != this._mode && "week" != this._mode || a.getHours() != r.getHours() || a.getMinutes() != r.getMinutes() || (r = new Date(this._drag_start + 1e3)), this._drag_id = this.uid(), this.addEvent(a, r, this.locale.labels.new_event, this._drag_id, t.fields), this.callEvent("onEventCreated", [this._drag_id, e]), this._loading=!1, this._drag_mode = "new-size"
            }
            var d, o = this.getEvent(this._drag_id);
            if ("move" == this._drag_mode)
                s = this._min_date.valueOf() + 6e4 * (t.y * this.config.time_step + 24 * t.x * 60 - (scheduler._move_pos_shift || 0)), !t.custom && this._table_view && (s += 1e3 * this.date.time_part(o.start_date)), s = this._correct_shift(s), t._ignores && this.config.preserve_length && this._table_view ? (this.matrix && (d = this.matrix[this._mode]), d = d || {
                    x_step: 1,
                    x_unit: "day"
                }, i = 1 * s + this._get_fictional_event_length(s, this._drag_event._event_length, d)) : i = o.end_date.valueOf() - (o.start_date.valueOf() - s);
            else {
                if (s = o.start_date.valueOf(), i = o.end_date.valueOf(), this._table_view) {
                    var l = this._min_date.valueOf() + t.y * this.config.time_step * 6e4 + (t.custom ? 0 : 864e5);
                    if ("month" == this._mode)
                        if (l = this._correct_shift(l, !1), this._drag_from_start) {
                            var h = 864e5;
                            l <= scheduler.date.date_part(new Date(i + h - 1)).valueOf() && (s = l - h)
                        } else 
                            i = l;
                    else 
                        t.resize_from_start ? s = l : i = l
                } else 
                    i = this.date.date_part(new Date(o.end_date.valueOf() - 1)).valueOf() + t.y * this.config.time_step * 6e4, this._els.dhx_cal_data[0].style.cursor = "s-resize", ("week" == this._mode || "day" == this._mode) && (i = this._correct_shift(i));
                if ("new-size" == this._drag_mode)
                    if (i <= this._drag_start) {
                        var _ = t.shift || (this._table_view&&!t.custom ? 864e5 : 0);
                        s = i - (t.shift ? 0 : _), i = this._drag_start + (_ || 6e4 * this.config.time_step)
                    } else 
                        s = this._drag_start;
                else 
                    s >= i && (i = s + 6e4 * this.config.time_step)
                }
            var c = new Date(i - 1), u = new Date(s);
            if (scheduler.config.limit_drag_out && ( + u<+scheduler._min_date||+i>+scheduler._max_date)) {
                var f = i - u;
                + u<+scheduler._min_date ? (u = new Date(scheduler._min_date), i = new Date( + u + f)) : (i = new Date(scheduler._max_date), u = new Date( + i - f));
                var c = new Date(i - 1)
            }
            if (!this._table_view && (t.x != this._get_event_sday({
                start_date: new Date(i),
                end_date: new Date(i)
            }) || new Date(i).getHours() >= this.config.last_hour)) {
                var f = i - u, h = this._min_date.valueOf() + 24 * t.x * 60 * 6e4;
                i = scheduler.date.date_part(new Date(h)), i.setHours(this.config.last_hour), c = new Date(i - 1), "move" == this._drag_mode && (u = new Date( + i - f))
            }
            if (this._table_view || c.getDate() == u.getDate() && c.getHours() < this.config.last_hour || scheduler._allow_dnd)
                if (o.start_date = u, o.end_date = new Date(i), this.config.update_render) {
                    var g = scheduler._els.dhx_cal_data[0].scrollTop;
                    this.update_view(), scheduler._els.dhx_cal_data[0].scrollTop = g
                } else 
                    this.updateEvent(this._drag_id);
            this._table_view && this.for_rendered(this._drag_id, function(e) {
                e.className += " dhx_in_move"
            }), this.callEvent("onEventDrag", [this._drag_id, this._drag_mode, e])
        }
    } else if (scheduler.checkEvent("onMouseMove")) {
        var v = this._locate_event(e.target || e.srcElement);
        this.callEvent("onMouseMove", [v, e])
    }
}, scheduler._on_mouse_down = function(e, t) {
    if (2 != e.button&&!this.config.readonly&&!this._drag_mode) {
        t = t || e.target || e.srcElement;
        var s = t.className && t.className.split(" ")[0];
        switch (s) {
        case"dhx_cal_event_line":
        case"dhx_cal_event_clear":
            this._table_view && (this._drag_mode = "move");
            break;
        case"dhx_event_move":
        case"dhx_wa_ev_body":
            this._drag_mode = "move";
            break;
        case"dhx_event_resize":
            this._drag_mode = "resize", scheduler._drag_from_start = (t.className || "").indexOf("dhx_event_resize_end") < 0?!0 : !1;
            break;
        case"dhx_scale_holder":
        case"dhx_scale_holder_now":
        case"dhx_month_body":
        case"dhx_matrix_cell":
        case"dhx_marked_timespan":
            this._drag_mode = "create";
            break;
        case"":
            if (t.parentNode)
                return scheduler._on_mouse_down(e, t.parentNode);
            break;
        default:
            if ((!scheduler.checkEvent("onMouseDown") || scheduler.callEvent("onMouseDown", [s])) && t.parentNode && t != this && "dhx_body" != s)
                return scheduler._on_mouse_down(e, t.parentNode);
            this._drag_mode = null, this._drag_id = null
        }
        if (this._drag_mode) {
            var i = this._locate_event(t);
            this.config["drag_" + this._drag_mode] && this.callEvent("onBeforeDrag", [i, this._drag_mode, e]) ? (this._drag_id = i, this._drag_event = scheduler._lame_clone(this.getEvent(this._drag_id) || {})) : this._drag_mode = this._drag_id = 0
        }
        this._drag_start = null
    }
}, scheduler._get_private_properties = function(e) {
    var t = {};
    for (var s in e)
        0 === s.indexOf("_") && (t[s]=!0);
    return t
}, scheduler._clear_temporary_properties = function(e, t) {
    var s = this._get_private_properties(e), i = this._get_private_properties(t);
    for (var n in i)
        s[n] || delete t[n]
}, scheduler._on_mouse_up = function(e) {
    if (!e || 2 != e.button ||!scheduler.config.touch) {
        if (this._drag_mode && this._drag_id) {
            this._els.dhx_cal_data[0].style.cursor = "default";
            var t = this.getEvent(this._drag_id);
            if (this._drag_event._dhx_changed ||!this._drag_event.start_date || t.start_date.valueOf() != this._drag_event.start_date.valueOf() || t.end_date.valueOf() != this._drag_event.end_date.valueOf()) {
                var s = "new-size" == this._drag_mode;
                if (this.callEvent("onBeforeEventChanged", [t, e, s, this._drag_event])) {
                    var i = this._drag_id, n = this._drag_mode;
                    if (this._drag_id = this._drag_mode = null, s && this.config.edit_on_create) {
                        if (this.unselect(), this._new_event = new Date, this._table_view || this.config.details_on_create ||!this.config.select)
                            return scheduler.callEvent("onDragEnd", [i, n, e]), this.showLightbox(i);
                        this._drag_pos=!0, this._select_id = this._edit_id = i
                    } else 
                        this._new_event || this.callEvent(s ? "onEventAdded" : "onEventChanged", [i, this.getEvent(i)])
                    } else 
                        s ? this.deleteEvent(t.id, !0) : (this._drag_event._dhx_changed=!1, this._clear_temporary_properties(t, this._drag_event), scheduler._lame_copy(t, this._drag_event), this.updateEvent(t.id))
                    }
            this._drag_pos && this.render_view_data(), scheduler.callEvent("onDragEnd", [this._drag_id, this._drag_mode, e])
        }
        this._drag_id = null, this._drag_mode = null, this._drag_pos = null
    }
}, scheduler._trigger_dyn_loading = function() {
    return this._load_mode && this._load() ? (this._render_wait=!0, !0) : !1
}, scheduler.update_view = function() {
    var e = this[this._mode + "_view"];
    return e ? e(!0) : this._reset_scale(), this._trigger_dyn_loading()?!0 : void this.render_view_data()
}, scheduler.isViewExists = function(e) {
    return !!(scheduler[e + "_view"] || scheduler.date[e + "_start"] && scheduler.templates[e + "_date"] && scheduler.templates[e + "_scale_date"])
}, scheduler.updateView = function(e, t) {
    e = e || this._date, t = t || this._mode;
    var s = "dhx_cal_data";
    this._mode ? this._obj.className = this._obj.className.replace("dhx_scheduler_" + this._mode, "dhx_scheduler_" + t) : this._obj.className += " dhx_scheduler_" + t;
    var i = this._mode == t && this.config.preserve_scroll ? this._els[s][0].scrollTop: !1;
    this[this._mode + "_view"] && t && this._mode != t && this[this._mode + "_view"](!1), this._close_not_saved();
    var n = "dhx_multi_day";
    this._els[n] && (this._els[n][0].parentNode.removeChild(this._els[n][0]), this._els[n] = null), this._mode = t, this._date = e, this._table_view = "month" == this._mode, this._dy_shift = 0;
    var a = this._els.dhx_cal_tab;
    if (a)
        for (var r = 0; r < a.length; r++) {
            var d = a[r].className;
            d = d.replace(/ active/g, ""), a[r].getAttribute("name") == this._mode + "_tab" && (d += " active"), a[r].className = d
        }
    this.update_view(), "number" == typeof i && (this._els[s][0].scrollTop = i)
}, scheduler.setCurrentView = function(e, t) {
    this.callEvent("onBeforeViewChange", [this._mode, this._date, t || this._mode, e || this._date]) && (this.updateView(e, t), this.callEvent("onViewChange", [this._mode, this._date]))
}, scheduler._render_x_header = function(e, t, s, i) {
    var n = document.createElement("DIV");
    n.className = "dhx_scale_bar", this.templates[this._mode + "_scalex_class"] && (n.className += " " + this.templates[this._mode + "_scalex_class"](s));
    var a = this._cols[e] - 1;
    "month" == this._mode && 0 === e && this.config.left_border && (n.className += " dhx_scale_bar_border", t += 1), this.set_xy(n, a, this.xy.scale_height - 2, t, 0), n.innerHTML = this.templates[this._mode + "_scale_date"](s, this._mode), i.appendChild(n)
}, scheduler._get_columns_num = function(e, t) {
    var s = 7;
    if (!scheduler._table_view) {
        var i = scheduler.date["get_" + scheduler._mode + "_end"];
        i && (t = i(e)), s = Math.round((t.valueOf() - e.valueOf()) / 864e5)
    }
    return s
}, scheduler._get_timeunit_start = function() {
    return this.date[this._mode + "_start"](new Date(this._date.valueOf()))
}, scheduler._get_view_end = function() {
    var e = this._get_timeunit_start(), t = scheduler.date.add(e, 1, this._mode);
    if (!scheduler._table_view) {
        var s = scheduler.date["get_" + scheduler._mode + "_end"];
        s && (t = s(e))
    }
    return t
}, scheduler._calc_scale_sizes = function(e, t, s) {
    var i = e, n = this._get_columns_num(t, s);
    this._process_ignores(t, n, "day", 1);
    for (var a = n - this._ignores_detected, r = 0; n > r; r++)
        this._ignores[r] ? (this._cols[r] = 0, a++) : this._cols[r] = Math.floor(i / (a - r)), i -= this._cols[r], this._colsS[r] = (this._cols[r - 1] || 0) + (this._colsS[r - 1] || (this._table_view ? 0 : this.xy.scale_width + 2)), this._colsS.col_length = n;
    this._colsS[n] = this._cols[n - 1] + this._colsS[n - 1]
}, scheduler._set_scale_col_size = function(e, t, s) {
    var i = this.config;
    this.set_xy(e, t - 1, i.hour_size_px * (i.last_hour - i.first_hour), s + this.xy.scale_width + 1, 0)
}, scheduler._render_scales = function(e, t) {
    var s = new Date(scheduler._min_date), i = new Date(scheduler._max_date), n = this.date.date_part(scheduler._currentDate()), a = parseInt(e.style.width, 10), r = new Date(this._min_date), d = this._get_columns_num(s, i);
    this._calc_scale_sizes(a, s, i);
    var o = 0;
    e.innerHTML = "";
    for (var l = 0; d > l; l++) {
        if (this._ignores[l] || this._render_x_header(l, o, r, e), !this._table_view) {
            var h = document.createElement("DIV"), _ = "dhx_scale_holder";
            r.valueOf() == n.valueOf() && (_ = "dhx_scale_holder_now"), this._ignores_detected && this._ignores[l] && (_ += " dhx_scale_ignore"), h.className = _ + " " + this.templates.week_date_class(r, n), this._set_scale_col_size(h, this._cols[l], o), t.appendChild(h), this.callEvent("onScaleAdd", [h, r])
        }
        o += this._cols[l], r = this.date.add(r, 1, "day")
    }
}, scheduler._reset_scale = function() {
    if (this.templates[this._mode + "_date"]) {
        var e = this._els.dhx_cal_header[0], t = this._els.dhx_cal_data[0], s = this.config;
        e.innerHTML = "", t.innerHTML = "";
        var i = (s.readonly ||!s.drag_resize ? " dhx_resize_denied" : "") + (s.readonly ||!s.drag_move ? " dhx_move_denied" : "");
        t.className = "dhx_cal_data" + i, this._scales = {}, this._cols = [], this._colsS = {
            height: 0
        }, this._dy_shift = 0, this.set_sizes();
        var n, a, r = this._get_timeunit_start(), d = scheduler._get_view_end();
        if (n = a = this._table_view ? scheduler.date.week_start(r) : r, this._min_date = n, this._els.dhx_cal_date[0].innerHTML = this.templates[this._mode + "_date"](r, d, this._mode), this._max_date = d, scheduler._render_scales(e, t), this._table_view)
            this._reset_month_scale(t, r, a);
        else if (this._reset_hours_scale(t, r, a), s.multi_day) {
            var o = "dhx_multi_day";
            this._els[o] && (this._els[o][0].parentNode.removeChild(this._els[o][0]), this._els[o] = null);
            var l = this._els.dhx_cal_navline[0], h = l.offsetHeight + this._els.dhx_cal_header[0].offsetHeight + 1, _ = document.createElement("DIV");
            _.className = o, _.style.visibility = "hidden", this.set_xy(_, this._colsS[this._colsS.col_length] + this.xy.scroll_width, 0, 0, h), t.parentNode.insertBefore(_, t);
            var c = _.cloneNode(!0);
            c.className = o + "_icon", c.style.visibility = "hidden", this.set_xy(c, this.xy.scale_width, 0, 0, h), _.appendChild(c), this._els[o] = [_, c], this._els[o][0].onclick = this._click.dhx_cal_data
        }
    }
}, scheduler._reset_hours_scale = function(e) {
    var t = document.createElement("DIV");
    t.className = "dhx_scale_holder";
    for (var s = new Date(1980, 1, 1, this.config.first_hour, 0, 0), i = 1 * this.config.first_hour; i < this.config.last_hour; i++) {
        var n = document.createElement("DIV");
        n.className = "dhx_scale_hour", n.style.height = this.config.hour_size_px - (this._quirks ? 0 : 1) + "px";
        var a = this.xy.scale_width;
        this.config.left_border && (a -= 1, n.className += " dhx_scale_hour_border"), n.style.width = a + "px", n.innerHTML = scheduler.templates.hour_scale(s), t.appendChild(n), s = this.date.add(s, 1, "hour")
    }
    e.appendChild(t), this.config.scroll_hour && (e.scrollTop = this.config.hour_size_px * (this.config.scroll_hour - this.config.first_hour))
}, scheduler._currentDate = function() {
    return scheduler.config.now_date ? new Date(scheduler.config.now_date) : new Date
}, scheduler._process_ignores = function(e, t, s, i, n) {
    this._ignores = {}, this._ignores_detected = 0;
    var a = scheduler["ignore_" + this._mode];
    if (a)
        for (var r = new Date(e), d = 0; t > d; d++)
            a(r) && (this._ignores_detected += 1, this._ignores[d]=!0, n && t++), r = scheduler.date.add(r, i, s)
}, scheduler._render_month_scale = function(e, t, s) {
    function i(e) {
        var t = scheduler._colsS.height;
        return void 0 !== scheduler._colsS.heights[e + 1] && (t = scheduler._colsS.heights[e + 1] - (scheduler._colsS.heights[e] || 0)), t
    }
    var n = scheduler.date.add(t, 1, "month"), a = new Date(s), r = scheduler._currentDate();
    this.date.date_part(r), this.date.date_part(s);
    for (var d = Math.ceil(Math.round((n.valueOf() - s.valueOf()) / 864e5) / 7), o = [], l = 0; 7 >= l; l++) {
        var h = (this._cols[l] || 0) - 1;
        0 === l && this.config.left_border && (h -= 1), o[l] = " style='width:" + h + "px;"
    }
    for (var _ = 0, c = "<table cellpadding='0' cellspacing='0'>", u = [], l = 0; d > l; l++) {
        c += "<tr>";
        for (var f = Math.max(i(l) - scheduler.xy.month_head_height, 0), g = 0; 7 > g; g++) {
            c += "<td";
            var v = "";
            t > s ? v = "dhx_before" : s >= n ? v = "dhx_after" : s.valueOf() == r.valueOf() && (v = "dhx_now"), this._ignores_detected && this._ignores[g] && (v += " dhx_scale_ignore"), c += " class='" + v + " " + this.templates.month_date_class(s, r) + "' >";
            var m = "dhx_month_body", p = "dhx_month_head";
            0 === g && this.config.left_border && (m += " dhx_month_body_border", p += " dhx_month_head_border"), this._ignores_detected && this._ignores[g] ? c += "<div></div><div></div>" : (c += "<div class='" + p + "'>" + this.templates.month_day(s) + "</div>", c += "<div class='" + m + "' " + o[g] + ";height:" + f + "px;'></div></td>"), u.push(s);
            var x = s.getDate();
            s = this.date.add(s, 1, "day"), s.getDate() - x > 1 && (s = new Date(s.getFullYear(), s.getMonth(), x + 1, 12, 0))
        }
        c += "</tr>", scheduler._colsS.heights[l] = _, _ += i(l)
    }
    c += "</table>", this._min_date = a, this._max_date = s, e.innerHTML = c, this._scales = {};
    for (var b = e.getElementsByTagName("div"), l = 0; l < u.length; l++) {
        var e = b[2 * l + 1], y = u[l];
        this._scales[ + y] = e
    }
    for (var l = 0; l < u.length; l++) {
        var y = u[l];
        this.callEvent("onScaleAdd", [this._scales[ + y], y])
    }
    return this._max_date
}, scheduler._reset_month_scale = function(e, t, s) {
    var i = scheduler.date.add(t, 1, "month"), n = scheduler._currentDate();
    this.date.date_part(n), this.date.date_part(s);
    var a = Math.ceil(Math.round((i.valueOf() - s.valueOf()) / 864e5) / 7), r = Math.floor(e.clientHeight / a) - this.xy.month_head_height;
    return this._colsS.height = r + this.xy.month_head_height, this._colsS.heights = [], scheduler._render_month_scale(e, t, s)
}, scheduler.getLabel = function(e, t) {
    for (var s = this.config.lightbox.sections, i = 0; i < s.length; i++)
        if (s[i].map_to == e)
            for (var n = s[i].options, a = 0; a < n.length; a++)
                if (n[a].key == t)
                    return n[a].label;
    return ""
}, scheduler.updateCollection = function(e, t) {
    var s = scheduler.serverList(e);
    return s ? (s.splice(0, s.length), s.push.apply(s, t || []), scheduler.callEvent("onOptionsLoad", []), scheduler.resetLightbox(), !0) : !1
}, scheduler._lame_clone = function(e, t) {
    var s, i, n;
    for (t = t || [], s = 0; s < t.length; s += 2)
        if (e === t[s])
            return t[s + 1];
    if (e && "object" == typeof e) {
        for (n = {}, i = [Array, Date, Number, String, Boolean], s = 0; s < i.length; s++)
            e instanceof i[s] && (n = s ? new i[s](e) : new i[s]);
        t.push(e, n);
        for (s in e)
            Object.prototype.hasOwnProperty.apply(e, [s]) && (n[s] = scheduler._lame_clone(e[s], t))
    }
    return n || e
}, scheduler._lame_copy = function(e, t) {
    for (var s in t)
        t.hasOwnProperty(s) && (e[s] = t[s]);
    return e
}, scheduler._get_date_from_pos = function(e) {
    var t = this._min_date.valueOf() + 6e4 * (e.y * this.config.time_step + 24 * (this._table_view ? 0 : e.x) * 60);
    return new Date(this._correct_shift(t))
}, scheduler.getActionData = function(e) {
    var t = this._mouse_coords(e);
    return {
        date: this._get_date_from_pos(t),
        section: t.section
    }
}, scheduler._focus = function(e, t) {
    e && e.focus && (this.config.touch ? window.setTimeout(function() {
        e.focus()
    }, 100) : (t && e.select && e.select(), e.focus()))
}, scheduler._get_real_event_length = function(e, t, s) {
    var i, n = t - e, a = s._start_correction + s._end_correction || 0, r = this["ignore_" + this._mode], d = 0;
    for (s.render ? (d = this._get_date_index(s, e), i = this._get_date_index(s, t)) : i = Math.round(n / 60 / 60 / 1e3 / 24); i > d;) {
        var o = scheduler.date.add(t, - s.x_step, s.x_unit);
        n -= r && r(t) ? t - o : a, t = o, i--
    }
    return n
}, scheduler._get_fictional_event_length = function(e, t, s, i) {
    var n = new Date(e), a = i?-1 : 1;
    if (s._start_correction || s._end_correction) {
        var r;
        r = i ? 60 * n.getHours() + n.getMinutes() - 60 * (s.first_hour || 0) : 60 * (s.last_hour || 0) - (60 * n.getHours() + n.getMinutes());
        var d = 60 * (s.last_hour - s.first_hour), o = Math.ceil((t / 6e4 - r) / d);
        t += o * (1440 - d) * 60 * 1e3
    }
    var l, h = new Date(1 * e + t * a), _ = this["ignore_" + this._mode], c = 0;
    for (s.render ? (c = this._get_date_index(s, n), l = this._get_date_index(s, h)) : l = Math.round(t / 60 / 60 / 1e3 / 24); l * a >= c * a;) {
        var u = scheduler.date.add(n, s.x_step * a, s.x_unit);
        _ && _(n) && (t += (u - n) * a, l += a), n = u, c += a
    }
    return t
}, scheduler._get_section_view = function() {
    return this.matrix && this.matrix[this._mode] ? this.matrix[this._mode] : this._props && this._props[this._mode] ? this._props[this._mode] : null
}, scheduler._get_section_property = function() {
    return this.matrix && this.matrix[this._mode] ? this.matrix[this._mode].y_property : this._props && this._props[this._mode] ? this._props[this._mode].map_to : null
}, scheduler._is_initialized = function() {
    var e = this.getState();
    return this._obj && e.date && e.mode
}, scheduler._is_lightbox_open = function() {
    var e = this.getState();
    return null !== e.lightbox_id && void 0 !== e.lightbox_id
}, scheduler.date = {
    init: function() {
        for (var e = scheduler.locale.date.month_short, t = scheduler.locale.date.month_short_hash = {}, s = 0; s < e.length; s++)
            t[e[s]] = s;
        for (var e = scheduler.locale.date.month_full, t = scheduler.locale.date.month_full_hash = {}, s = 0; s < e.length; s++)
            t[e[s]] = s
    },
    date_part: function(e) {
        return e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0), 0 !== e.getHours() && e.setTime(e.getTime() + 36e5 * (24 - e.getHours())), e
    },
    time_part: function(e) {
        return (e.valueOf() / 1e3 - 60 * e.getTimezoneOffset())%86400
    },
    week_start: function(e) {
        var t = e.getDay();
        return scheduler.config.start_on_monday && (0 === t ? t = 6 : t--), this.date_part(this.add(e, - 1 * t, "day"))
    },
    month_start: function(e) {
        return e.setDate(1), this.date_part(e)
    },
    year_start: function(e) {
        return e.setMonth(0), this.month_start(e)
    },
    day_start: function(e) {
        return this.date_part(e)
    },
    _add_days: function(e, t) {
        var s = new Date(e.valueOf());
        return s.setDate(s.getDate() + t), !e.getHours() && s.getHours() && s.setTime(s.getTime() + 36e5 * (24 - s.getHours())), s
    },
    add: function(e, t, s) {
        var i = new Date(e.valueOf());
        switch (s) {
        case"day":
            i = scheduler.date._add_days(i, t);
            break;
        case"week":
            i = scheduler.date._add_days(i, 7 * t);
            break;
        case"month":
            i.setMonth(i.getMonth() + t);
            break;
        case"year":
            i.setYear(i.getFullYear() + t);
            break;
        case"hour":
            i.setHours(i.getHours() + t);
            break;
        case"minute":
            i.setMinutes(i.getMinutes() + t);
            break;
        default:
            return scheduler.date["add_" + s](e, t, s)
        }
        return i
    },
    to_fixed: function(e) {
        return 10 > e ? "0" + e : e
    },
    copy: function(e) {
        return new Date(e.valueOf())
    },
    date_to_str: function(e, t) {
        return e = e.replace(/%[a-zA-Z]/g, function(e) {
            switch (e) {
            case"%d":
                return '"+scheduler.date.to_fixed(date.getDate())+"';
            case"%m":
                return '"+scheduler.date.to_fixed((date.getMonth()+1))+"';
            case"%j":
                return '"+date.getDate()+"';
            case"%n":
                return '"+(date.getMonth()+1)+"';
            case"%y":
                return '"+scheduler.date.to_fixed(date.getFullYear()%100)+"';
            case"%Y":
                return '"+date.getFullYear()+"';
            case"%D":
                return '"+scheduler.locale.date.day_short[date.getDay()]+"';
            case"%l":
                return '"+scheduler.locale.date.day_full[date.getDay()]+"';
            case"%M":
                return '"+scheduler.locale.date.month_short[date.getMonth()]+"';
            case"%F":
                return '"+scheduler.locale.date.month_full[date.getMonth()]+"';
            case"%h":
                return '"+scheduler.date.to_fixed((date.getHours()+11)%12+1)+"';
            case"%g":
                return '"+((date.getHours()+11)%12+1)+"';
            case"%G":
                return '"+date.getHours()+"';
            case"%H":
                return '"+scheduler.date.to_fixed(date.getHours())+"';
            case"%i":
                return '"+scheduler.date.to_fixed(date.getMinutes())+"';
            case"%a":
                return '"+(date.getHours()>11?"pm":"am")+"';
            case"%A":
                return '"+(date.getHours()>11?"PM":"AM")+"';
            case"%s":
                return '"+scheduler.date.to_fixed(date.getSeconds())+"';
            case"%W":
                return '"+scheduler.date.to_fixed(scheduler.date.getISOWeek(date))+"';
            default:
                return e
            }
        }), t && (e = e.replace(/date\.get/g, "date.getUTC")), new Function("date", 'return "' + e + '";')
    },
    str_to_date: function(e, t) {
        for (var s = "var temp=date.match(/[a-zA-Z]+|[0-9]+/g);", i = e.match(/%[a-zA-Z]/g), n = 0; n < i.length; n++)
            switch (i[n]) {
            case"%j":
            case"%d":
                s += "set[2]=temp[" + n + "]||1;";
                break;
            case"%n":
            case"%m":
                s += "set[1]=(temp[" + n + "]||1)-1;";
                break;
            case"%y":
                s += "set[0]=temp[" + n + "]*1+(temp[" + n + "]>50?1900:2000);";
                break;
            case"%g":
            case"%G":
            case"%h":
            case"%H":
                s += "set[3]=temp[" + n + "]||0;";
                break;
            case"%i":
                s += "set[4]=temp[" + n + "]||0;";
                break;
            case"%Y":
                s += "set[0]=temp[" + n + "]||0;";
                break;
            case"%a":
            case"%A":
                s += "set[3]=set[3]%12+((temp[" + n + "]||'').toLowerCase()=='am'?0:12);";
                break;
            case"%s":
                s += "set[5]=temp[" + n + "]||0;";
                break;
            case"%M":
                s += "set[1]=scheduler.locale.date.month_short_hash[temp[" + n + "]]||0;";
                break;
            case"%F":
                s += "set[1]=scheduler.locale.date.month_full_hash[temp[" + n + "]]||0;"
            }
        var a = "set[0],set[1],set[2],set[3],set[4],set[5]";
        return t && (a = " Date.UTC(" + a + ")"), new Function("date", "var set=[0,0,1,0,0,0]; " + s + " return new Date(" + a + ");")
    },
    getISOWeek: function(e) {
        if (!e)
            return !1;
        var t = e.getDay();
        0 === t && (t = 7);
        var s = new Date(e.valueOf());
        s.setDate(e.getDate() + (4 - t));
        var i = s.getFullYear(), n = Math.round((s.getTime() - new Date(i, 0, 1).getTime()) / 864e5), a = 1 + Math.floor(n / 7);
        return a
    },
    getUTCISOWeek: function(e) {
        return this.getISOWeek(this.convert_to_utc(e))
    },
    convert_to_utc: function(e) {
        return new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds())
    }
}, scheduler.locale = {
    date: {
        month_full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    labels: {
        dhx_cal_today_button: "Today",
        day_tab: "Day",
        week_tab: "Week",
        month_tab: "Month",
        new_event: "New event",
        icon_save: "Save",
        icon_cancel: "Cancel",
        icon_details: "Details",
        icon_edit: "Edit",
        icon_delete: "Delete",
        confirm_closing: "",
        confirm_deleting: "Event will be deleted permanently, are you sure?",
        section_description: "Description",
        section_time: "Time period",
        full_day: "Full day",
        confirm_recurring: "Do you want to edit the whole set of repeated events?",
        section_recurring: "Repeat event",
        button_recurring: "Disabled",
        button_recurring_open: "Enabled",
        button_edit_series: "Edit series",
        button_edit_occurrence: "Edit occurrence",
        agenda_tab: "Agenda",
        date: "Date",
        description: "Description",
        year_tab: "Year",
        week_agenda_tab: "Agenda",
        grid_tab: "Grid",
        drag_to_create: "Drag to create",
        drag_to_move: "Drag to move",
        message_ok: "OK",
        message_cancel: "Cancel"
    }
}, scheduler.config = {
    default_date: "%j %M %Y",
    month_date: "%F %Y",
    load_date: "%Y-%m-%d",
    week_date: "%l",
    day_date: "%D, %F %j",
    hour_date: "%H:%i",
    month_day: "%d",
    xml_date: "%m/%d/%Y %H:%i",
    api_date: "%d-%m-%Y %H:%i",
    preserve_length: !0,
    time_step: 5,
    start_on_monday: 1,
    first_hour: 0,
    last_hour: 24,
    readonly: !1,
    drag_resize: 1,
    drag_move: 1,
    drag_create: 1,
    dblclick_create: 1,
    edit_on_create: 1,
    details_on_create: 0,
    resize_month_events: !1,
    resize_month_timed: !1,
    cascade_event_display: !1,
    cascade_event_count: 4,
    cascade_event_margin: 30,
    multi_day: !0,
    multi_day_height_limit: 0,
    drag_lightbox: !0,
    preserve_scroll: !0,
    select: !0,
    server_utc: !1,
    touch: !0,
    touch_tip: !0,
    touch_drag: 500,
    quick_info_detached: !0,
    positive_closing: !1,
    drag_highlight: !0,
    limit_drag_out: !1,
    icons_edit: ["icon_save", "icon_cancel"],
    icons_select: ["icon_details", "icon_edit", "icon_delete"],
    buttons_left: ["dhx_save_btn", "dhx_cancel_btn"],
    buttons_right: ["dhx_delete_btn"],
    lightbox: {
        sections: [{
            name: "description",
            height: 200,
            map_to: "text",
            type: "textarea",
            focus: !0
        }, {
            name: "time",
            height: 72,
            type: "time",
            map_to: "auto"
        }
        ]
    },
    highlight_displayed_event: !0,
    left_border: !1
}, scheduler.templates = {}, scheduler.init_templates = function() {
    var e = scheduler.locale.labels;
    e.dhx_save_btn = e.icon_save, e.dhx_cancel_btn = e.icon_cancel, e.dhx_delete_btn = e.icon_delete;
    var t = scheduler.date.date_to_str, s = scheduler.config, i = function(e, t) {
        for (var s in t)
            e[s] || (e[s] = t[s])
    };
    i(scheduler.templates, {
        day_date: t(s.default_date),
        month_date: t(s.month_date),
        week_date: function(e, t) {
            return scheduler.templates.day_date(e) + " &ndash; " + scheduler.templates.day_date(scheduler.date.add(t, - 1, "day"))
        },
        day_scale_date: t(s.default_date),
        month_scale_date: t(s.week_date),
        week_scale_date: t(s.day_date),
        hour_scale: t(s.hour_date),
        time_picker: t(s.hour_date),
        event_date: t(s.hour_date),
        month_day: t(s.month_day),
        xml_date: scheduler.date.str_to_date(s.xml_date, s.server_utc),
        load_format: t(s.load_date, s.server_utc),
        xml_format: t(s.xml_date, s.server_utc),
        api_date: scheduler.date.str_to_date(s.api_date),
        event_header: function(e, t) {
            return scheduler.templates.event_date(e) + " - " + scheduler.templates.event_date(t)
        },
        event_text: function(e, t, s) {
            return s.text
        },
        event_class: function() {
            return ""
        },
        month_date_class: function() {
            return ""
        },
        week_date_class: function() {
            return ""
        },
        event_bar_date: function(e) {
            return scheduler.templates.event_date(e) + " "
        },
        event_bar_text: function(e, t, s) {
            return s.text
        },
        month_events_link: function(e, t) {
            return "<a>View more(" + t + " events)</a>"
        },
        drag_marker_class: function() {
            return ""
        },
        drag_marker_content: function() {
            return ""
        }
    }), this.callEvent("onTemplatesReady", [])
}, scheduler.uid = function() {
    return this._seed || (this._seed = (new Date).valueOf()), this._seed++
}, scheduler._events = {}, scheduler.clearAll = function() {
    this._events = {}, this._loaded = {}, this.clear_view(), this.callEvent("onClearAll", [])
}, scheduler.addEvent = function(e, t, s, i, n) {
    if (!arguments.length)
        return this.addEventNow();
    var a = e;
    1 != arguments.length && (a = n || {}, a.start_date = e, a.end_date = t, a.text = s, a.id = i), a.id = a.id || scheduler.uid(), a.text = a.text || "", "string" == typeof a.start_date && (a.start_date = this.templates.api_date(a.start_date)), "string" == typeof a.end_date && (a.end_date = this.templates.api_date(a.end_date));
    var r = 6e4 * (this.config.event_duration || this.config.time_step);
    a.start_date.valueOf() == a.end_date.valueOf() && a.end_date.setTime(a.end_date.valueOf() + r), a._timed = this.isOneDayEvent(a);
    var d=!this._events[a.id];
    return this._events[a.id] = a, this.event_updated(a), this._loading || this.callEvent(d ? "onEventAdded" : "onEventChanged", [a.id, a]), a.id
}, scheduler.deleteEvent = function(e, t) {
    var s = this._events[e];
    (t || this.callEvent("onBeforeEventDelete", [e, s]) && this.callEvent("onConfirmedBeforeEventDelete", [e, s])) && (s && (this._select_id = null, delete this._events[e], this.event_updated(s)), this.callEvent("onEventDeleted", [e, s]))
}, scheduler.getEvent = function(e) {
    return this._events[e]
}, scheduler.setEvent = function(e, t) {
    t.id || (t.id = e), this._events[e] = t
}, scheduler.for_rendered = function(e, t) {
    for (var s = this._rendered.length - 1; s >= 0; s--)
        this._rendered[s].getAttribute("event_id") == e && t(this._rendered[s], s)
}, scheduler.changeEventId = function(e, t) {
    if (e != t) {
        var s = this._events[e];
        s && (s.id = t, this._events[t] = s, delete this._events[e]), this.for_rendered(e, function(e) {
            e.setAttribute("event_id", t)
        }), this._select_id == e && (this._select_id = t), this._edit_id == e && (this._edit_id = t), this.callEvent("onEventIdChange", [e, t])
    }
}, function() {
    for (var e = ["text", "Text", "start_date", "StartDate", "end_date", "EndDate"], t = function(e) {
        return function(t) {
            return scheduler.getEvent(t)[e]
        }
    }, s = function(e) {
        return function(t, s) {
            var i = scheduler.getEvent(t);
            i[e] = s, i._changed=!0, i._timed = this.isOneDayEvent(i), scheduler.event_updated(i, !0)
        }
    }, i = 0; i < e.length; i += 2)
        scheduler["getEvent" + e[i + 1]] = t(e[i]), scheduler["setEvent" + e[i + 1]] = s(e[i])
}(), scheduler.event_updated = function(e) {
    this.is_visible_events(e) ? this.render_view_data() : this.clear_event(e.id)
}, scheduler.is_visible_events = function(e) {
    var t = e.start_date < this._max_date && this._min_date < e.end_date;
    if (t) {
        var s = e.end_date.getHours() >= this.config.first_hour && e.end_date.getHours() < this.config.last_hour || e.start_date.getHours() >= this.config.first_hour && e.start_date.getHours() < this.config.last_hour;
        if (s)
            return !0;
        var i = (e.end_date.valueOf() - e.start_date.valueOf()) / 36e5, n = 24 - (this.config.last_hour - this.config.first_hour);
        return i > n
    }
    return !1
}, scheduler.isOneDayEvent = function(e) {
    var t = e.end_date.getDate() - e.start_date.getDate();
    return t ? (0 > t && (t = Math.ceil((e.end_date.valueOf() - e.start_date.valueOf()) / 864e5)), 1 == t&&!e.end_date.getHours()&&!e.end_date.getMinutes() && (e.start_date.getHours() || e.start_date.getMinutes())) : e.start_date.getMonth() == e.end_date.getMonth() && e.start_date.getFullYear() == e.end_date.getFullYear()
}, scheduler.get_visible_events = function(e) {
    var t = [];
    for (var s in this._events)
        this.is_visible_events(this._events[s]) && (!e || this._events[s]._timed) && this.filter_event(s, this._events[s]) && t.push(this._events[s]);
    return t
}, scheduler.filter_event = function(e, t) {
    var s = this["filter_" + this._mode];
    return s ? s(e, t) : !0
}, scheduler._is_main_area_event = function(e) {
    return !!e._timed
}, scheduler.render_view_data = function(e, t) {
    if (!e) {
        if (this._not_render)
            return void(this._render_wait=!0);
        this._render_wait=!1, this.clear_view(), e = this.get_visible_events(!(this._table_view || this.config.multi_day))
    }
    for (var s = 0, i = e.length; i > s; s++)
        this._recalculate_timed(e[s]);
    if (this.config.multi_day&&!this._table_view) {
        for (var n = [], a = [], s = 0; s < e.length; s++)
            this._is_main_area_event(e[s]) ? n.push(e[s]) : a.push(e[s]);
        this._rendered_location = this._els.dhx_multi_day[0], this._table_view=!0, this.render_data(a, t), this._table_view=!1, this._rendered_location = this._els.dhx_cal_data[0], this._table_view=!1, this.render_data(n, t)
    } else 
        this._rendered_location = this._els.dhx_cal_data[0], this.render_data(e, t)
}, scheduler._view_month_day = function(e) {
    var t = scheduler.getActionData(e).date;
    scheduler.callEvent("onViewMoreClick", [t]) && scheduler.setCurrentView(t, "day")
}, scheduler._render_month_link = function(e) {
    for (var t = this._rendered_location, s = this._lame_clone(e), i = e._sday; i < e._eday; i++) {
        s._sday = i, s._eday = i + 1;
        var n = scheduler.date, a = scheduler._min_date;
        a = n.add(a, s._sweek, "week"), a = n.add(a, s._sday, "day");
        var r = scheduler.getEvents(a, n.add(a, 1, "day")).length, d = this._get_event_bar_pos(s), o = d.x2 - d.x, l = document.createElement("div");
        l.onclick = function(e) {
            scheduler._view_month_day(e || event)
        }, l.className = "dhx_month_link", l.style.top = d.y + "px", l.style.left = d.x + "px", l.style.width = o + "px", l.innerHTML = scheduler.templates.month_events_link(a, r), this._rendered.push(l), t.appendChild(l)
    }
}, scheduler._recalculate_timed = function(e) {
    if (e) {
        var t;
        t = "object" != typeof e ? this._events[e] : e, t && (t._timed = scheduler.isOneDayEvent(t))
    }
}, scheduler.attachEvent("onEventChanged", scheduler._recalculate_timed), scheduler.attachEvent("onEventAdded", scheduler._recalculate_timed), scheduler.render_data = function(e, t) {
    e = this._pre_render_events(e, t);
    for (var s = 0; s < e.length; s++)
        if (this._table_view)
            if ("month" != scheduler._mode)
                this.render_event_bar(e[s]);
            else {
                var i = scheduler.config.max_month_events;
                i !== 1 * i || e[s]._sorder < i ? this.render_event_bar(e[s]) : void 0 !== i && e[s]._sorder == i && scheduler._render_month_link(e[s])
            } else 
                this.render_event(e[s])
}, scheduler._pre_render_events = function(e, t) {
    var s = this.xy.bar_height, i = this._colsS.heights, n = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0], a = this._els.dhx_cal_data[0];
    if (e = this._table_view ? this._pre_render_events_table(e, t) : this._pre_render_events_line(e, t), this._table_view)
        if (t)
            this._colsS.heights = i;
        else {
            var r = a.firstChild;
            if (r.rows) {
                for (var d = 0; d < r.rows.length; d++) {
                    n[d]++;
                    var o = this._colsS.height - this.xy.month_head_height;
                    if (n[d] * s > o) {
                        var l = r.rows[d].cells, h = o;
                        1 * this.config.max_month_events !== this.config.max_month_events || n[d] <= this.config.max_month_events ? h = n[d] * s : (this.config.max_month_events + 1) * s > o && (h = (this.config.max_month_events + 1) * s);
                        for (var _ = 0; _ < l.length; _++)
                            l[_].childNodes[1].style.height = h + "px";
                            n[d] = (n[d - 1] || 0) + l[0].offsetHeight
                    }
                    n[d] = (n[d - 1] || 0) + r.rows[d].cells[0].offsetHeight
                }
                if (n.unshift(0), r.parentNode.offsetHeight < r.parentNode.scrollHeight&&!scheduler._colsS.scroll_fix && scheduler.xy.scroll_width) {
                    var c = scheduler._colsS, u = c[c.col_length], f = c.heights.slice();
                    u -= scheduler.xy.scroll_width || 0, this._calc_scale_sizes(u, this._min_date, this._max_date), scheduler._colsS.heights = f, this.set_xy(this._els.dhx_cal_header[0], u, this.xy.scale_height), scheduler._render_scales(this._els.dhx_cal_header[0]), scheduler._render_month_scale(this._els.dhx_cal_data[0], this._get_timeunit_start(), this._min_date), c.scroll_fix=!0
                }
            } else if (e.length || "visible" != this._els.dhx_multi_day[0].style.visibility || (n[0] =- 1), e.length||-1 == n[0]) {
                var g = (r.parentNode.childNodes, (n[0] + 1) * s + 1), v = g, m = g + "px";
                this.config.multi_day_height_limit && (v = Math.min(g, this.config.multi_day_height_limit), m = v + "px"), a.style.top = this._els.dhx_cal_navline[0].offsetHeight + this._els.dhx_cal_header[0].offsetHeight + v + "px", a.style.height = this._obj.offsetHeight - parseInt(a.style.top, 10) - (this.xy.margin_top || 0) + "px";
                var p = this._els.dhx_multi_day[0];
                p.style.height = m, p.style.visibility =- 1 == n[0] ? "hidden" : "visible";
                var x = this._els.dhx_multi_day[1];
                x.style.height = m, x.style.visibility =- 1 == n[0] ? "hidden" : "visible", x.className = n[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small", this._dy_shift = (n[0] + 1) * s, n[0] = 0, v != g && (a.style.top = parseInt(a.style.top) + 2 + "px", p.style.overflowY = "auto", p.style.width = parseInt(p.style.width) - 2 + "px", x.style.position = "fixed", x.style.top = "", x.style.left = "")
            }
        }
    return e
}, scheduler._get_event_sday = function(e) {
    return Math.floor((e.start_date.valueOf() - this._min_date.valueOf()) / 864e5)
}, scheduler._get_event_mapped_end_date = function(e) {
    var t = e.end_date;
    if (this.config.separate_short_events) {
        var s = (e.end_date - e.start_date) / 6e4;
        s < this._min_mapped_duration && (t = this.date.add(t, this._min_mapped_duration - s, "minute"))
    }
    return t
}, scheduler._pre_render_events_line = function(e, t) {
    e.sort(function(e, t) {
        return e.start_date.valueOf() == t.start_date.valueOf() ? e.id > t.id ? 1 : - 1 : e.start_date > t.start_date ? 1 : - 1
    });
    var s = [], i = [];
    this._min_mapped_duration = Math.ceil(60 * this.xy.min_event_height / this.config.hour_size_px);
    for (var n = 0; n < e.length; n++) {
        var a = e[n], r = a.start_date, d = a.end_date, o = r.getHours(), l = d.getHours();
        if (a._sday = this._get_event_sday(a), this._ignores[a._sday])
            e.splice(n, 1), n--;
        else {
            if (s[a._sday] || (s[a._sday] = []), !t) {
                a._inner=!1;
                for (var h = s[a._sday]; h.length;) {
                    var _ = h[h.length - 1], c = this._get_event_mapped_end_date(_);
                    if (!(c.valueOf() <= a.start_date.valueOf()))
                        break;
                    h.splice(h.length - 1, 1)
                }
                for (var u = h.length, f=!1, g = 0; g < h.length; g++) {
                    var _ = h[g], c = this._get_event_mapped_end_date(_);
                    if (c.valueOf() <= a.start_date.valueOf()) {
                        f=!0, a._sorder = _._sorder, u = g, a._inner=!0;
                        break
                    }
                }
                if (h.length && (h[h.length - 1]._inner=!0), !f)
                    if (h.length)
                        if (h.length <= h[h.length - 1]._sorder) {
                            if (h[h.length - 1]._sorder)
                                for (g = 0; g < h.length; g++) {
                                    for (var v=!1, m = 0; m < h.length; m++)
                                        if (h[m]._sorder == g) {
                                            v=!0;
                                            break
                                        }
                                        if (!v) {
                                            a._sorder = g;
                                            break
                                        }
                                } else 
                                    a._sorder = 0;
                                    a._inner=!0
                        } else {
                            var p = h[0]._sorder;
                            for (g = 1; g < h.length; g++)
                                h[g]._sorder > p && (p = h[g]._sorder);
                                a._sorder = p + 1, a._inner=!1
                        } else 
                            a._sorder = 0;
                h.splice(u, u == h.length ? 0 : 1, a), h.length > (h.max_count || 0) ? (h.max_count = h.length, a._count = h.length) : a._count = a._count ? a._count : 1
            }(o < this.config.first_hour || l >= this.config.last_hour) && (i.push(a), e[n] = a = this._copy_event(a), o < this.config.first_hour && (a.start_date.setHours(this.config.first_hour), a.start_date.setMinutes(0)), l >= this.config.last_hour && (a.end_date.setMinutes(0), a.end_date.setHours(this.config.last_hour)), a.start_date > a.end_date || o == this.config.last_hour) && (e.splice(n, 1), n--)
        }
    }
    if (!t) {
        for (var n = 0; n < e.length; n++)
            e[n]._count = s[e[n]._sday].max_count;
        for (var n = 0; n < i.length; n++)
            i[n]._count = s[i[n]._sday].max_count
    }
    return e
}, scheduler._time_order = function(e) {
    e.sort(function(e, t) {
        return e.start_date.valueOf() == t.start_date.valueOf() ? e._timed&&!t._timed ? 1 : !e._timed && t._timed?-1 : e.id > t.id ? 1 : - 1 : e.start_date > t.start_date ? 1 : - 1
    })
}, scheduler._pre_render_events_table = function(e, t) {
    this._time_order(e);
    for (var s, i = [], n = [[], [], [], [], [], [], []], a = this._colsS.heights, r = this._cols.length, d = {}, o = 0; o < e.length; o++) {
        var l = e[o], h = l.id;
        d[h] || (d[h] = {
            first_chunk: !0,
            last_chunk: !0
        });
        var _ = d[h], c = s || l.start_date, u = l.end_date;
        c < this._min_date && (_.first_chunk=!1, c = this._min_date), u > this._max_date && (_.last_chunk=!1, u = this._max_date);
        var f = this.locate_holder_day(c, !1, l);
        if (l._sday = f%r, !this._ignores[l._sday] ||!l._timed) {
            var g = this.locate_holder_day(u, !0, l) || r;
            l._eday = g%r || r, l._length = g - f, l._sweek = Math.floor((this._correct_shift(c.valueOf(), 1) - this._min_date.valueOf()) / (864e5 * r));
            var v, m = n[l._sweek];
            for (v = 0; v < m.length&&!(m[v]._eday <= l._sday); v++);
            if (l._sorder && t || (l._sorder = v), l._sday + l._length <= r)
                s = null, i.push(l), m[v] = l, a[l._sweek] = m.length - 1, l._first_chunk = _.first_chunk, l._last_chunk = _.last_chunk;
            else {
                var p = this._copy_event(l);
                p.id = l.id, p._length = r - l._sday, p._eday = r, p._sday = l._sday, p._sweek = l._sweek, p._sorder = l._sorder, p.end_date = this.date.add(c, p._length, "day"), p._first_chunk = _.first_chunk, _.first_chunk && (_.first_chunk=!1), i.push(p), m[v] = p, s = p.end_date, a[l._sweek] = m.length - 1, o--
            }
        }
    }
    return i
}, scheduler._copy_dummy = function() {
    var e = new Date(this.start_date), t = new Date(this.end_date);
    this.start_date = e, this.end_date = t
}, scheduler._copy_event = function(e) {
    return this._copy_dummy.prototype = e, new this._copy_dummy
}, scheduler._rendered = [], scheduler.clear_view = function() {
    for (var e = 0; e < this._rendered.length; e++) {
        var t = this._rendered[e];
        t.parentNode && t.parentNode.removeChild(t)
    }
    this._rendered = []
}, scheduler.updateEvent = function(e) {
    var t = this.getEvent(e);
    this.clear_event(e), t && this.is_visible_events(t) && this.filter_event(e, t) && (this._table_view || this.config.multi_day || t._timed) && (this.config.update_render ? this.render_view_data() : this.render_view_data([t], !0))
}, scheduler.clear_event = function(e) {
    this.for_rendered(e, function(e, t) {
        e.parentNode && e.parentNode.removeChild(e), scheduler._rendered.splice(t, 1)
    })
}, scheduler._y_from_date = function(e) {
    var t = 60 * e.getHours() + e.getMinutes();
    return Math.round((60 * t * 1e3 - 60 * this.config.first_hour * 60 * 1e3) * this.config.hour_size_px / 36e5)%(24 * this.config.hour_size_px)
}, scheduler._calc_event_y = function(e, t) {
    t = t || 0;
    var s = 60 * e.start_date.getHours() + e.start_date.getMinutes(), i = 60 * e.end_date.getHours() + e.end_date.getMinutes() || 60 * scheduler.config.last_hour, n = this._y_from_date(e.start_date), a = Math.max(t, (i - s) * this.config.hour_size_px / 60);
    return {
        top: n,
        height: a
    }
}, scheduler.render_event = function(e) {
    var t = scheduler.xy.menu_width, s = this.config.use_select_menu_space ? 0: t;
    if (!(e._sday < 0)) {
        var i = scheduler.locate_holder(e._sday);
        if (i) {
            var n = this._calc_event_y(e, scheduler.xy.min_event_height), a = n.top, r = n.height, d = e._count || 1, o = e._sorder || 0, l = Math.floor((i.clientWidth - s) / d), h = o * l + 1;
            if (e._inner || (l*=d - o), this.config.cascade_event_display) {
                var _ = this.config.cascade_event_count, c = this.config.cascade_event_margin;
                h = o%_ * c;
                var u = e._inner ? (d - o - 1)%_ * c / 2: 0;
                l = Math.floor(i.clientWidth - s - h - u)
            }
            var f = this._render_v_bar(e, s + h, a, l, r, e._text_style, scheduler.templates.event_header(e.start_date, e.end_date, e), scheduler.templates.event_text(e.start_date, e.end_date, e));
            if (this._rendered.push(f), i.appendChild(f), h = h + parseInt(i.style.left, 10) + s, this._edit_id == e.id) {
                f.style.zIndex = 1, l = Math.max(l - 4, scheduler.xy.editor_width), f = document.createElement("DIV"), f.setAttribute("event_id", e.id), this.set_xy(f, l, r - 20, h, a + 14), f.className = "dhx_cal_event dhx_cal_editor";
                var g = scheduler.templates.event_class(e.start_date, e.end_date, e);
                g && (f.className += " " + g);
                var v = document.createElement("DIV");
                this.set_xy(v, l - 6, r - 26), v.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;", f.appendChild(v), this._els.dhx_cal_data[0].appendChild(f), this._rendered.push(f), v.innerHTML = "<textarea class='dhx_cal_editor'>" + e.text + "</textarea>", this._quirks7 && (v.firstChild.style.height = r - 12 + "px"), this._editor = v.firstChild, this._editor.onkeydown = function(e) {
                    if ((e || event).shiftKey)
                        return !0;
                    var t = (e || event).keyCode;
                    t == scheduler.keys.edit_save && scheduler.editStop(!0), t == scheduler.keys.edit_cancel && scheduler.editStop(!1)
                }, this._editor.onselectstart = function(e) {
                    return (e || event).cancelBubble=!0, !0
                }, scheduler._focus(v.firstChild, !0), this._els.dhx_cal_data[0].scrollLeft = 0
            }
            if (0 !== this.xy.menu_width && this._select_id == e.id) {
                this.config.cascade_event_display && this._drag_mode && (f.style.zIndex = 1);
                for (var m = this.config["icons_" + (this._edit_id == e.id ? "edit" : "select")], p = "", x = e.color ? "background-color: " + e.color + ";" : "", b = e.textColor ? "color: " + e.textColor + ";" : "", y = 0; y < m.length; y++)
                    p += "<div class='dhx_menu_icon " + m[y] + "' style='" + x + b + "' title='" + this.locale.labels[m[y]] + "'></div>";
                var w = this._render_v_bar(e, h - t + 1, a, t, 20 * m.length + 26 - 2, "", "<div style='" + x + b + "' class='dhx_menu_head'></div>", p, !0);
                w.style.left = h - t + 1, this._els.dhx_cal_data[0].appendChild(w), this._rendered.push(w)
            }
            this.config.drag_highlight && this._drag_id == e.id && this.highlightEventPosition(e)
        }
    }
}, scheduler._render_v_bar = function(e, t, s, i, n, a, r, d, o) {
    var l = document.createElement("DIV"), h = e.id, _ = o ? "dhx_cal_event dhx_cal_select_menu": "dhx_cal_event", c = scheduler.templates.event_class(e.start_date, e.end_date, e);
    c && (_ = _ + " " + c);
    var u = e.color ? "background:" + e.color + ";": "", f = e.textColor ? "color:" + e.textColor + ";": "", g = '<div event_id="' + h + '" class="' + _ + '" style="position:absolute; top:' + s + "px; left:" + t + "px; width:" + (i - 4) + "px; height:" + n + "px;" + (a || "") + '"></div>';
    l.innerHTML = g;
    var v = l.cloneNode(!0).firstChild;
    if (!o && scheduler.renderEvent(v, e, i, n, r, d))
        return v;
    v = l.firstChild;
    var m = '<div class="dhx_event_move dhx_header" style=" width:' + (i - 6) + "px;" + u + '" >&nbsp;</div>';
    m += '<div class="dhx_event_move dhx_title" style="' + u + f + '">' + r + "</div>", m += '<div class="dhx_body" style=" width:' + (i - (this._quirks ? 4 : 14)) + "px; height:" + (n - (this._quirks ? 20 : 30) + 1) + "px;" + u + f + '">' + d + "</div>";
    var p = "dhx_event_resize dhx_footer";
    return o && (p = "dhx_resize_denied " + p), m += '<div class="' + p + '" style=" width:' + (i - 8) + "px;" + (o ? " margin-top:-1px;" : "") + u + f + '" ></div>', v.innerHTML = m, v
}, scheduler.renderEvent = function() {
    return !1
}, scheduler.locate_holder = function(e) {
    return "day" == this._mode ? this._els.dhx_cal_data[0].firstChild : this._els.dhx_cal_data[0].childNodes[e]
}, scheduler.locate_holder_day = function(e, t) {
    var s = Math.floor((this._correct_shift(e, 1) - this._min_date) / 864e5);
    return t && this.date.time_part(e) && s++, s
}, scheduler._get_dnd_order = function(e, t, s) {
    if (!this._drag_event)
        return e;
    this._drag_event._orig_sorder ? e = this._drag_event._orig_sorder : this._drag_event._orig_sorder = e;
    for (var i = t * e; i + t > s;)
        e--, i -= t;
    return e = Math.max(e, 0)
}, scheduler._get_event_bar_pos = function(e) {
    var t = this._colsS[e._sday], s = this._colsS[e._eday];
    s == t && (s = this._colsS[e._eday + 1]);
    var i = this.xy.bar_height, n = e._sorder;
    if (e.id == this._drag_id) {
        var a = this._colsS.heights[e._sweek + 1] - this._colsS.heights[e._sweek] - this.xy.month_head_height;
        n = scheduler._get_dnd_order(n, i, a)
    }
    var r = n * i, d = this._colsS.heights[e._sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) + r;
    return {
        x: t,
        x2: s,
        y: d
    }
}, scheduler.render_event_bar = function(e) {
    var t = this._rendered_location, s = this._get_event_bar_pos(e), i = s.y, n = s.x, a = s.x2, r = "";
    if (a) {
        var d = scheduler.config.resize_month_events && "month" == this._mode && (!e._timed || scheduler.config.resize_month_timed), o = document.createElement("DIV"), l = e.hasOwnProperty("_first_chunk") && e._first_chunk, h = e.hasOwnProperty("_last_chunk") && e._last_chunk, _ = d && (e._timed || l), c = d && (e._timed || h), u = "dhx_cal_event_clear";
        (!e._timed || d) && (u = "dhx_cal_event_line"), l && (u += " dhx_cal_event_line_start"), h && (u += " dhx_cal_event_line_end"), _ && (r += "<div class='dhx_event_resize dhx_event_resize_start'></div>"), c && (r += "<div class='dhx_event_resize dhx_event_resize_end'></div>");
        var f = scheduler.templates.event_class(e.start_date, e.end_date, e);
        f && (u += " " + f);
        var g = e.color ? "background:" + e.color + ";": "", v = e.textColor ? "color:" + e.textColor + ";": "", m = ["position:absolute", "top:" + i + "px", "left:" + n + "px", "width:" + (a - n - 15) + "px", v, g, e._text_style || ""].join(";"), p = '<div event_id="' + e.id + '" class="' + u + '" style="' + m + '">';
        d && (p += r), "month" == scheduler.getState().mode && (e = scheduler.getEvent(e.id)), e._timed && (p += scheduler.templates.event_bar_date(e.start_date, e.end_date, e)), p += scheduler.templates.event_bar_text(e.start_date, e.end_date, e) + "</div>", p += "</div>", o.innerHTML = p, this._rendered.push(o.firstChild), t.appendChild(o.firstChild)
    }
}, scheduler._locate_event = function(e) {
    for (var t = null; e&&!t && e.getAttribute;)
        t = e.getAttribute("event_id"), e = e.parentNode;
    return t
}, scheduler.edit = function(e) {
    this._edit_id != e && (this.editStop(!1, e), this._edit_id = e, this.updateEvent(e))
}, scheduler.editStop = function(e, t) {
    if (!t || this._edit_id != t) {
        var s = this.getEvent(this._edit_id);
        s && (e && (s.text = this._editor.value), this._edit_id = null, this._editor = null, this.updateEvent(s.id), this._edit_stop_event(s, e))
    }
}, scheduler._edit_stop_event = function(e, t) {
    this._new_event ? (t ? this.callEvent("onEventAdded", [e.id, e]) : e && this.deleteEvent(e.id, !0), this._new_event = null) : t && this.callEvent("onEventChanged", [e.id, e])
}, scheduler.getEvents = function(e, t) {
    var s = [];
    for (var i in this._events) {
        var n = this._events[i];
        n && (!e&&!t || n.start_date < t && n.end_date > e) && s.push(n)
    }
    return s
}, scheduler.getRenderedEvent = function(e) {
    if (e) {
        for (var t = scheduler._rendered, s = 0; s < t.length; s++) {
            var i = t[s];
            if (i.getAttribute("event_id") == e)
                return i
        }
        return null
    }
}, scheduler.showEvent = function(e, t) {
    var s = "number" == typeof e || "string" == typeof e ? scheduler.getEvent(e): e;
    if (t = t || scheduler._mode, s && (!this.checkEvent("onBeforeEventDisplay") || this.callEvent("onBeforeEventDisplay", [s, t]))) {
        var i = scheduler.config.scroll_hour;
        scheduler.config.scroll_hour = s.start_date.getHours();
        var n = scheduler.config.preserve_scroll;
        scheduler.config.preserve_scroll=!1;
        var a = s.color, r = s.textColor;
        scheduler.config.highlight_displayed_event && (s.color = scheduler.config.displayed_event_color, s.textColor = scheduler.config.displayed_event_text_color), scheduler.setCurrentView(new Date(s.start_date), t), s.color = a, s.textColor = r, scheduler.config.scroll_hour = i, scheduler.config.preserve_scroll = n, scheduler.matrix && scheduler.matrix[t] && (scheduler._els.dhx_cal_data[0].scrollTop = getAbsoluteTop(scheduler.getRenderedEvent(s.id)) - getAbsoluteTop(scheduler._els.dhx_cal_data[0]) - 20), scheduler.callEvent("onAfterEventDisplay", [s, t])
    }
}, scheduler._append_drag_marker = function(e) {
    if (!e.parentNode) {
        var t = scheduler._els.dhx_cal_data[0], s = t.lastChild;
        s.className && s.className.indexOf("dhx_scale_holder") < 0 && s.previousSibling && (s = s.previousSibling), s && 0 === s.className.indexOf("dhx_scale_holder") && s.appendChild(e)
    }
}, scheduler._update_marker_position = function(e, t) {
    var s = scheduler._calc_event_y(t, 0);
    e.style.top = s.top + "px", e.style.height = s.height + "px"
}, scheduler.highlightEventPosition = function(e) {
    var t = document.createElement("div");
    t.setAttribute("event_id", e.id), this._rendered.push(t), this._update_marker_position(t, e);
    var s = this.templates.drag_marker_class(e.start_date, e.end_date, e), i = this.templates.drag_marker_content(e.start_date, e.end_date, e);
    t.className = "dhx_drag_marker", s && (t.className += " " + s), i && (t.innerHTML = i), this._append_drag_marker(t)
}, scheduler._loaded = {}, scheduler._load = function(e, t) {
    if (e = e || this._load_url) {
        e += ( - 1 == e.indexOf("?") ? "?" : "&") + "timeshift=" + (new Date).getTimezoneOffset(), this.config.prevent_cache && (e += "&uid=" + this.uid());
        var s;
        if (t = t || this._date, this._load_mode) {
            var i = this.templates.load_format;
            for (t = this.date[this._load_mode + "_start"](new Date(t.valueOf())); t > this._min_date;)
                t = this.date.add(t, - 1, this._load_mode);
            s = t;
            for (var n=!0; s < this._max_date;)
                s = this.date.add(s, 1, this._load_mode), this._loaded[i(t)] && n ? t = this.date.add(t, 1, this._load_mode) : n=!1;
            var a = s;
            do 
                s = a, a = this.date.add(s, - 1, this._load_mode);
            while (a > t && this._loaded[i(a)]);
            if (t >= s)
                return !1;
            for (dhtmlxAjax.get(e + "&from=" + i(t) + "&to=" + i(s), function(e) {
                scheduler.on_load(e)
            }); s > t;)
                this._loaded[i(t)]=!0, t = this.date.add(t, 1, this._load_mode)
            } else 
                dhtmlxAjax.get(e, function(e) {
                    scheduler.on_load(e)
                });
        return this.callEvent("onXLS", []), !0
    }
}, scheduler.on_load = function(e) {
    var t;
    t = this._process && "xml" != this._process ? this[this._process].parse(e.xmlDoc.responseText) : this._magic_parser(e), scheduler._process_loading(t), this.callEvent("onXLE", [])
}, scheduler._process_loading = function(e) {
    this._loading=!0, this._not_render=!0;
    for (var t = 0; t < e.length; t++)
        this.callEvent("onEventLoading", [e[t]]) && this.addEvent(e[t]);
    this._not_render=!1, this._render_wait && this.render_view_data(), this._loading=!1, this._after_call && this._after_call(), this._after_call = null
}, scheduler._init_event = function(e) {
    e.text = e.text || e._tagvalue || "", e.start_date = scheduler._init_date(e.start_date), e.end_date = scheduler._init_date(e.end_date)
}, scheduler._init_date = function(e) {
    return e ? "string" == typeof e ? scheduler.templates.xml_date(e) : new Date(e) : null
}, scheduler.json = {}, scheduler.json.parse = function(data) {
    "string" == typeof data && (scheduler._temp = eval("(" + data + ")"), data = scheduler._temp ? scheduler._temp.data || scheduler._temp.d || scheduler._temp : []), data.dhx_security && (dhtmlx.security_key = data.dhx_security);
    var collections = scheduler._temp && scheduler._temp.collections ? scheduler._temp.collections: {}, collections_loaded=!1;
    for (var key in collections)
        if (collections.hasOwnProperty(key)) {
            collections_loaded=!0;
            var collection = collections[key], arr = scheduler.serverList[key];
            if (!arr)
                continue;
                arr.splice(0, arr.length);
                for (var j = 0; j < collection.length; j++) {
                    var option = collection[j], obj = {
                        key: option.value,
                        label: option.label
                    };
                    for (var option_key in option)
                        if (option.hasOwnProperty(option_key)) {
                            if ("value" == option_key || "label" == option_key)
                                continue;
                                obj[option_key] = option[option_key]
                        }
                        arr.push(obj)
                    }
            }
    collections_loaded && scheduler.callEvent("onOptionsLoad", []);
    for (var evs = [], i = 0; i < data.length; i++) {
        var event = data[i];
        scheduler._init_event(event), evs.push(event)
    }
    return evs
}, scheduler.parse = function(e, t) {
    this._process = t, this.on_load({
        xmlDoc: {
            responseText: e
        }
    })
}, scheduler.load = function(e, t) {
    "string" == typeof t && (this._process = t, t = arguments[2]), this._load_url = e, this._after_call = t, this._load(e, this._date)
}, scheduler.setLoadMode = function(e) {
    "all" == e && (e = ""), this._load_mode = e
}, scheduler.serverList = function(e, t) {
    return t ? (this.serverList[e] = t.slice(0), this.serverList[e]) : (this.serverList[e] = this.serverList[e] || [], this.serverList[e])
}, scheduler._userdata = {}, scheduler._magic_parser = function(e) {
    var t;
    if (!e.getXMLTopNode) {
        var s = e.xmlDoc.responseText;
        e = new dtmlXMLLoaderObject(function() {}), e.loadXMLString(s)
    }
    if (t = e.getXMLTopNode("data"), "data" != t.tagName)
        return [];
    var i = t.getAttribute("dhx_security");
    i && (dhtmlx.security_key = i);
    for (var n = e.doXPath("//coll_options"), a = 0; a < n.length; a++) {
        var r = n[a].getAttribute("for"), d = this.serverList[r];
        if (d) {
            d.splice(0, d.length);
            for (var o = e.doXPath(".//item", n[a]), l = 0; l < o.length; l++) {
                for (var h = o[l], _ = h.attributes, c = {
                    key: o[l].getAttribute("value"),
                    label: o[l].getAttribute("label")
                }, u = 0; u < _.length; u++) {
                    var f = _[u];
                    "value" != f.nodeName && "label" != f.nodeName && (c[f.nodeName] = f.nodeValue)
                }
                d.push(c)
            }
        }
    }
    n.length && scheduler.callEvent("onOptionsLoad", []);
    for (var g = e.doXPath("//userdata"), a = 0; a < g.length; a++) {
        var v = this._xmlNodeToJSON(g[a]);
        this._userdata[v.name] = v.text
    }
    var m = [];
    t = e.doXPath("//event");
    for (var a = 0; a < t.length; a++) {
        var p = m[a] = this._xmlNodeToJSON(t[a]);
        scheduler._init_event(p)
    }
    return m
}, scheduler._xmlNodeToJSON = function(e) {
    for (var t = {}, s = 0; s < e.attributes.length; s++)
        t[e.attributes[s].name] = e.attributes[s].value;
    for (var s = 0; s < e.childNodes.length; s++) {
        var i = e.childNodes[s];
        1 == i.nodeType && (t[i.tagName] = i.firstChild ? i.firstChild.nodeValue : "")
    }
    return t.text || (t.text = e.firstChild ? e.firstChild.nodeValue : ""), t
}, scheduler.attachEvent("onXLS", function() {
    if (this.config.show_loading===!0) {
        var e;
        e = this.config.show_loading = document.createElement("DIV"), e.className = "dhx_loading", e.style.left = Math.round((this._x - 128) / 2) + "px", e.style.top = Math.round((this._y - 15) / 2) + "px", this._obj.appendChild(e)
    }
}), scheduler.attachEvent("onXLE", function() {
    var e = this.config.show_loading;
    e && "object" == typeof e && (this._obj.removeChild(e), this.config.show_loading=!0)
}), scheduler.ical = {
    parse: function(e) {
        var t = e.match(RegExp(this.c_start + "[^\f]*" + this.c_end, ""));
        if (t.length) {
            t[0] = t[0].replace(/[\r\n]+(?=[a-z \t])/g, " "), t[0] = t[0].replace(/\;[^:\r\n]*:/g, ":");
            for (var s, i = [], n = RegExp("(?:" + this.e_start + ")([^\f]*?)(?:" + this.e_end + ")", "g"); null !== (s = n.exec(t));) {
                for (var a, r = {}, d = /[^\r\n]+[\r\n]+/g; null !== (a = d.exec(s[1]));)
                    this.parse_param(a.toString(), r);
                r.uid&&!r.id && (r.id = r.uid), i.push(r)
            }
            return i
        }
    },
    parse_param: function(e, t) {
        var s = e.indexOf(":");
        if ( - 1 != s) {
            var i = e.substr(0, s).toLowerCase(), n = e.substr(s + 1).replace(/\\\,/g, ",").replace(/[\r\n]+$/, "");
            "summary" == i ? i = "text" : "dtstart" == i ? (i = "start_date", n = this.parse_date(n, 0, 0)) : "dtend" == i && (i = "end_date", n = this.parse_date(n, 0, 0)), t[i] = n
        }
    },
    parse_date: function(e, t, s) {
        var i = e.split("T");
        i[1] && (t = i[1].substr(0, 2), s = i[1].substr(2, 2));
        var n = i[0].substr(0, 4), a = parseInt(i[0].substr(4, 2), 10) - 1, r = i[0].substr(6, 2);
        return scheduler.config.server_utc&&!i[1] ? new Date(Date.UTC(n, a, r, t, s)) : new Date(n, a, r, t, s)
    },
    c_start: "BEGIN:VCALENDAR",
    e_start: "BEGIN:VEVENT",
    e_end: "END:VEVENT",
    c_end: "END:VCALENDAR"
}, scheduler._lightbox_controls = {}, scheduler.formSection = function(e) {
    var t = this.config.lightbox.sections, s = 0;
    for (s; s < t.length && t[s].name != e; s++);
    var i = t[s];
    scheduler._lightbox || scheduler.getLightbox();
    var n = document.getElementById(i.id), a = n.nextSibling, r = {
        section: i,
        header: n,
        node: a,
        getValue: function(e) {
            return scheduler.form_blocks[i.type].get_value(a, e || {}, i)
        },
        setValue: function(e, t) {
            return scheduler.form_blocks[i.type].set_value(a, e, t || {}, i)
        }
    }, d = scheduler._lightbox_controls["get_" + i.type + "_control"];
    return d ? d(r) : r
}, scheduler._lightbox_controls.get_template_control = function(e) {
    return e.control = e.node, e
}, scheduler._lightbox_controls.get_select_control = function(e) {
    return e.control = e.node.getElementsByTagName("select")[0], e
}, scheduler._lightbox_controls.get_textarea_control = function(e) {
    return e.control = e.node.getElementsByTagName("textarea")[0], e
}, scheduler._lightbox_controls.get_time_control = function(e) {
    return e.control = e.node.getElementsByTagName("select"), e
}, scheduler.form_blocks = {
    template: {
        render: function(e) {
            var t = (e.height || "30") + "px";
            return "<div class='dhx_cal_ltext dhx_cal_template' style='height:" + t + ";'></div>"
        },
        set_value: function(e, t) {
            e.innerHTML = t || ""
        },
        get_value: function(e) {
            return e.innerHTML || ""
        },
        focus: function() {}
    },
    textarea: {
        render: function(e) {
            var t = (e.height || "130") + "px";
            return "<div class='dhx_cal_ltext' style='height:" + t + ";'><textarea></textarea></div>"
        },
        set_value: function(e, t) {
            e.firstChild.value = t || ""
        },
        get_value: function(e) {
            return e.firstChild.value
        },
        focus: function(e) {
            var t = e.firstChild;
            scheduler._focus(t, !0)
        }
    },
    select: {
        render: function(e) {
            for (var t = (e.height || "23") + "px", s = "<div class='dhx_cal_ltext' style='height:" + t + ";'><select style='width:100%;'>", i = 0; i < e.options.length; i++)
                s += "<option value='" + e.options[i].key + "'>" + e.options[i].label + "</option>";
            return s += "</select></div>"
        },
        set_value: function(e, t, s, i) {
            var n = e.firstChild;
            !n._dhx_onchange && i.onchange && (n.onchange = i.onchange, n._dhx_onchange=!0), "undefined" == typeof t && (t = (n.options[0] || {}).value), n.value = t || ""
        },
        get_value: function(e) {
            return e.firstChild.value
        },
        focus: function(e) {
            var t = e.firstChild;
            scheduler._focus(t, !0)
        }
    },
    time: {
        render: function(e) {
            e.time_format || (e.time_format = ["%H:%i", "%d", "%m", "%Y"]), e._time_format_order = {};
            var t = e.time_format, s = scheduler.config, i = this.date.date_part(scheduler._currentDate()), n = 1440, a = 0;
            scheduler.config.limit_time_select && (n = 60 * s.last_hour + 1, a = 60 * s.first_hour, i.setHours(s.first_hour));
            for (var r = "", d = 0; d < t.length; d++) {
                var o = t[d];
                switch (d > 0 && (r += " "), o) {
                case"%Y":
                    e._time_format_order[3] = d, r += "<select>";
                    for (var l = i.getFullYear() - 5, h = 0; 10 > h; h++)
                        r += "<option value='" + (l + h) + "'>" + (l + h) + "</option>";
                    r += "</select> ";
                    break;
                case"%m":
                    e._time_format_order[2] = d, r += "<select>";
                    for (var h = 0; 12 > h; h++)
                        r += "<option value='" + h + "'>" + this.locale.date.month_full[h] + "</option>";
                    r += "</select>";
                    break;
                case"%d":
                    e._time_format_order[1] = d, r += "<select>";
                    for (var h = 1; 32 > h; h++)
                        r += "<option value='" + h + "'>" + h + "</option>";
                    r += "</select>";
                    break;
                case"%H:%i":
                    e._time_format_order[0] = d, r += "<select>";
                    var h = a, _ = i.getDate();
                    for (e._time_values = []; n > h;) {
                        var c = this.templates.time_picker(i);
                        r += "<option value='" + h + "'>" + c + "</option>", e._time_values.push(h), i.setTime(i.valueOf() + 60 * this.config.time_step * 1e3);
                        var u = i.getDate() != _ ? 1: 0;
                        h = 24 * u * 60 + 60 * i.getHours() + i.getMinutes()
                    }
                    r += "</select>"
                }
            }
            return "<div style='height:30px;padding-top:0px;font-size:inherit;' class='dhx_section_time'>" + r + "<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>" + r + "</div>"
        },
        set_value: function(e, t, s, i) {
            function n(e, t, s) {
                for (var n = i._time_values, a = 60 * s.getHours() + s.getMinutes(), r = a, d=!1, o = 0; o < n.length; o++) {
                    var h = n[o];
                    if (h === a) {
                        d=!0;
                        break
                    }
                    a > h && (r = h)
                }
                e[t + l[0]].value = d ? a : r, d || r || (e[t + l[0]].selectedIndex =- 1), e[t + l[1]].value = s.getDate(), e[t + l[2]].value = s.getMonth(), e[t + l[3]].value = s.getFullYear()
            }
            var a, r, d = scheduler.config, o = e.getElementsByTagName("select"), l = i._time_format_order;
            if (d.full_day) {
                if (!e._full_day) {
                    var h = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + scheduler.locale.labels.full_day + "&nbsp;</label></input>";
                    scheduler.config.wide_form || (h = e.previousSibling.innerHTML + h), e.previousSibling.innerHTML = h, e._full_day=!0
                }
                var _ = e.previousSibling.getElementsByTagName("input")[0];
                _.checked = 0 === scheduler.date.time_part(s.start_date) && 0 === scheduler.date.time_part(s.end_date), o[l[0]].disabled = _.checked, o[l[0] + o.length / 2].disabled = _.checked, _.onclick = function() {
                    if (_.checked) {
                        var t = {};
                        scheduler.form_blocks.time.get_value(e, t, i), a = scheduler.date.date_part(t.start_date), r = scheduler.date.date_part(t.end_date), ( + r ==+ a||+r>=+a && (0 !== s.end_date.getHours() || 0 !== s.end_date.getMinutes())) && (r = scheduler.date.add(r, 1, "day"))
                    }
                    o[l[0]].disabled = _.checked, o[l[0] + o.length / 2].disabled = _.checked, n(o, 0, a || s.start_date), n(o, 4, r || s.end_date)
                }
            }
            if (d.auto_end_date && d.event_duration)
                for (var c = function() {
                    a = new Date(o[l[3]].value, o[l[2]].value, o[l[1]].value, 0, o[l[0]].value), r = new Date(a.getTime() + 60 * scheduler.config.event_duration * 1e3), n(o, 4, r)
                }, u = 0; 4 > u; u++)
                    o[u].onchange = c;
            n(o, 0, s.start_date), n(o, 4, s.end_date)
        },
        get_value: function(e, t, s) {
            var i = e.getElementsByTagName("select"), n = s._time_format_order;
            return t.start_date = new Date(i[n[3]].value, i[n[2]].value, i[n[1]].value, 0, i[n[0]].value), t.end_date = new Date(i[n[3] + 4].value, i[n[2] + 4].value, i[n[1] + 4].value, 0, i[n[0] + 4].value), t.end_date <= t.start_date && (t.end_date = scheduler.date.add(t.start_date, scheduler.config.time_step, "minute")), {
                start_date: new Date(t.start_date),
                end_date: new Date(t.end_date)
            }
        },
        focus: function(e) {
            scheduler._focus(e.getElementsByTagName("select")[0])
        }
    }
}, scheduler.showCover = function(e) {
    if (e) {
        e.style.display = "block";
        var t = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop, s = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft, i = window.innerHeight || document.documentElement.clientHeight;
        e.style.top = t ? Math.round(t + Math.max((i - e.offsetHeight) / 2, 0)) + "px" : Math.round(Math.max((i - e.offsetHeight) / 2, 0) + 9) + "px", e.style.left = document.documentElement.scrollWidth > document.body.offsetWidth ? Math.round(s + (document.body.offsetWidth - e.offsetWidth) / 2) + "px" : Math.round((document.body.offsetWidth - e.offsetWidth) / 2) + "px"
    }
    this.show_cover()
}, scheduler.showLightbox = function(e) {
    if (e) {
        if (!this.callEvent("onBeforeLightbox", [e]))
            return void(this._new_event && (this._new_event = null));
        var t = this.getLightbox();
        this.showCover(t), this._fill_lightbox(e, t), this.callEvent("onLightbox", [e])
    }
}, scheduler._fill_lightbox = function(e, t) {
    var s = this.getEvent(e), i = t.getElementsByTagName("span");
    scheduler.templates.lightbox_header ? (i[1].innerHTML = "", i[2].innerHTML = scheduler.templates.lightbox_header(s.start_date, s.end_date, s)) : (i[1].innerHTML = this.templates.event_header(s.start_date, s.end_date, s), i[2].innerHTML = (this.templates.event_bar_text(s.start_date, s.end_date, s) || "").substr(0, 70));
    for (var n = this.config.lightbox.sections, a = 0; a < n.length; a++) {
        var r = n[a], d = document.getElementById(r.id).nextSibling, o = this.form_blocks[r.type], l = void 0 !== s[r.map_to] ? s[r.map_to] : r.default_value;
        o.set_value.call(this, d, l, s, r), n[a].focus && o.focus.call(this, d)
    }
    scheduler._lightbox_id = e
}, scheduler._lightbox_out = function(e) {
    for (var t = this.config.lightbox.sections, s = 0; s < t.length; s++) {
        var i = document.getElementById(t[s].id);
        i = i ? i.nextSibling : i;
        var n = this.form_blocks[t[s].type], a = n.get_value.call(this, i, e, t[s]);
        "auto" != t[s].map_to && (e[t[s].map_to] = a)
    }
    return e
}, scheduler._empty_lightbox = function(e) {
    {
        var t = scheduler._lightbox_id, s = this.getEvent(t);
        this.getLightbox()
    }
    this._lame_copy(s, e), this.setEvent(s.id, s), this._edit_stop_event(s, !0), this.render_view_data()
}, scheduler.hide_lightbox = function() {
    this.hideCover(this.getLightbox()), this._lightbox_id = null, this.callEvent("onAfterLightbox", [])
}, scheduler.hideCover = function(e) {
    e && (e.style.display = "none"), this.hide_cover()
}, scheduler.hide_cover = function() {
    this._cover && this._cover.parentNode.removeChild(this._cover), this._cover = null
}, scheduler.show_cover = function() {
    if (!this._cover) {
        this._cover = document.createElement("DIV"), this._cover.className = "dhx_cal_cover";
        var e = void 0 !== document.height ? document.height : document.body.offsetHeight, t = document.documentElement ? document.documentElement.scrollHeight : 0;
        this._cover.style.height = Math.max(e, t) + "px", document.body.appendChild(this._cover)
    }
}, scheduler.save_lightbox = function() {
    var e = this._lightbox_out({}, this._lame_copy(this.getEvent(this._lightbox_id)));
    (!this.checkEvent("onEventSave") || this.callEvent("onEventSave", [this._lightbox_id, e, this._new_event])) && (this._empty_lightbox(e), this.hide_lightbox())
}, scheduler.startLightbox = function(e, t) {
    this._lightbox_id = e, this._custom_lightbox=!0, this._temp_lightbox = this._lightbox, this._lightbox = t, this.showCover(t)
}, scheduler.endLightbox = function(e, t) {
    this._edit_stop_event(scheduler.getEvent(this._lightbox_id), e), e && scheduler.render_view_data(), this.hideCover(t), this._custom_lightbox && (this._lightbox = this._temp_lightbox, this._custom_lightbox=!1), this._temp_lightbox = this._lightbox_id = null
}, scheduler.resetLightbox = function() {
    scheduler._lightbox&&!scheduler._custom_lightbox && scheduler._lightbox.parentNode.removeChild(scheduler._lightbox), scheduler._lightbox = null
}, scheduler.cancel_lightbox = function() {
    this.callEvent("onEventCancel", [this._lightbox_id, this._new_event]), this.endLightbox(!1), this.hide_lightbox()
}, scheduler._init_lightbox_events = function() {
    this.getLightbox().onclick = function(e) {
        var t = e ? e.target: event.srcElement;
        if (t.className || (t = t.previousSibling), t && t.className)
            switch (t.className) {
            case"dhx_save_btn":
                scheduler.save_lightbox();
                break;
            case"dhx_delete_btn":
                var s = scheduler.locale.labels.confirm_deleting;
                scheduler._dhtmlx_confirm(s, scheduler.locale.labels.title_confirm_deleting, function() {
                    scheduler.deleteEvent(scheduler._lightbox_id), scheduler._new_event = null, scheduler.hide_lightbox()
                });
                break;
            case"dhx_cancel_btn":
                scheduler.cancel_lightbox();
                break;
            default:
                if (t.getAttribute("dhx_button"))
                    scheduler.callEvent("onLightboxButton", [t.className, t, e]);
                else {
                    var i, n, a;
                    - 1 != t.className.indexOf("dhx_custom_button") && ( - 1 != t.className.indexOf("dhx_custom_button_") ? (i = t.parentNode.getAttribute("index"), a = t.parentNode.parentNode) : (i = t.getAttribute("index"), a = t.parentNode, t = t.firstChild)), i && (n = scheduler.form_blocks[scheduler.config.lightbox.sections[i].type], n.button_click(i, t, a, a.nextSibling))
                }
            }
        }, this.getLightbox().onkeydown = function(e) {
        switch ((e || event).keyCode) {
        case scheduler.keys.edit_save:
            if ((e || event).shiftKey)
                return;
            scheduler.save_lightbox();
            break;
        case scheduler.keys.edit_cancel:
            scheduler.cancel_lightbox()
        }
    }
}, scheduler.setLightboxSize = function() {
    var e = this._lightbox;
    if (e) {
        var t = e.childNodes[1];
        t.style.height = "0px", t.style.height = t.scrollHeight + "px", e.style.height = t.scrollHeight + scheduler.xy.lightbox_additional_height + "px", t.style.height = t.scrollHeight + "px"
    }
}, scheduler._init_dnd_events = function() {
    dhtmlxEvent(document.body, "mousemove", scheduler._move_while_dnd), dhtmlxEvent(document.body, "mouseup", scheduler._finish_dnd), scheduler._init_dnd_events = function() {}
}, scheduler._move_while_dnd = function(e) {
    if (scheduler._dnd_start_lb) {
        document.dhx_unselectable || (document.body.className += " dhx_unselectable", document.dhx_unselectable=!0);
        var t = scheduler.getLightbox(), s = e && e.target ? [e.pageX, e.pageY]: [event.clientX, event.clientY];
        t.style.top = scheduler._lb_start[1] + s[1] - scheduler._dnd_start_lb[1] + "px", t.style.left = scheduler._lb_start[0] + s[0] - scheduler._dnd_start_lb[0] + "px"
    }
}, scheduler._ready_to_dnd = function(e) {
    var t = scheduler.getLightbox();
    scheduler._lb_start = [parseInt(t.style.left, 10), parseInt(t.style.top, 10)], scheduler._dnd_start_lb = e && e.target ? [e.pageX, e.pageY] : [event.clientX, event.clientY]
}, scheduler._finish_dnd = function() {
    scheduler._lb_start && (scheduler._lb_start = scheduler._dnd_start_lb=!1, document.body.className = document.body.className.replace(" dhx_unselectable", ""), document.dhx_unselectable=!1)
}, scheduler.getLightbox = function() {
    if (!this._lightbox) {
        var e = document.createElement("DIV");
        e.className = "dhx_cal_light", scheduler.config.wide_form && (e.className += " dhx_cal_light_wide"), scheduler.form_blocks.recurring && (e.className += " dhx_cal_light_rec"), /msie|MSIE 6/.test(navigator.userAgent) && (e.className += " dhx_ie6"), e.style.visibility = "hidden";
        for (var t = this._lightbox_template, s = this.config.buttons_left, i = 0; i < s.length; i++)
            t += "<div class='dhx_btn_set dhx_left_btn_set " + s[i] + "_set'><div dhx_button='1' class='" + s[i] + "'></div><div>" + scheduler.locale.labels[s[i]] + "</div></div>";
        s = this.config.buttons_right;
        for (var i = 0; i < s.length; i++)
            t += "<div class='dhx_btn_set dhx_right_btn_set " + s[i] + "_set' style='float:right;'><div dhx_button='1' class='" + s[i] + "'></div><div>" + scheduler.locale.labels[s[i]] + "</div></div>";
        t += "</div>", e.innerHTML = t, scheduler.config.drag_lightbox && (e.firstChild.onmousedown = scheduler._ready_to_dnd, e.firstChild.onselectstart = function() {
            return !1
        }, e.firstChild.style.cursor = "pointer", scheduler._init_dnd_events()), document.body.insertBefore(e, document.body.firstChild), this._lightbox = e;
        var n = this.config.lightbox.sections;
        t = "";
        for (var i = 0; i < n.length; i++) {
            var a = this.form_blocks[n[i].type];
            if (a) {
                n[i].id = "area_" + this.uid();
                var r = "";
                n[i].button && (r = "<div class='dhx_custom_button' index='" + i + "'><div class='dhx_custom_button_" + n[i].button + "'></div><div>" + this.locale.labels["button_" + n[i].button] + "</div></div>"), this.config.wide_form && (t += "<div class='dhx_wrap_section'>");
                var d = this.locale.labels["section_" + n[i].name];
                "string" != typeof d && (d = n[i].name), t += "<div id='" + n[i].id + "' class='dhx_cal_lsection'>" + r + d + "</div>" + a.render.call(this, n[i]), t += "</div>"
            }
        }
        for (var o = e.getElementsByTagName("div"), i = 0; i < o.length; i++) {
            var l = o[i];
            if ("dhx_cal_larea" == l.className) {
                l.innerHTML = t;
                break
            }
        }
        this.setLightboxSize(), this._init_lightbox_events(this), e.style.display = "none", e.style.visibility = "visible"
    }
    return this._lightbox
}, scheduler._lightbox_template = "<div class='dhx_cal_ltitle'><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span></div><div class='dhx_cal_larea'></div>", scheduler._init_touch_events = function() {
    "force" != this.config.touch && (this.config.touch = this.config.touch && ( - 1 != navigator.userAgent.indexOf("Mobile")||-1 != navigator.userAgent.indexOf("iPad")||-1 != navigator.userAgent.indexOf("Android")||-1 != navigator.userAgent.indexOf("Touch"))), this.config.touch && (this.xy.scroll_width = 0, window.navigator.msPointerEnabled ? (this._touch_events(["MSPointerMove", "MSPointerDown", "MSPointerUp"], function(e) {
        return e.pointerType == e.MSPOINTER_TYPE_MOUSE ? null : e
    }, function(e) {
        return !e || e.pointerType == e.MSPOINTER_TYPE_MOUSE
    }), this._obj.ondblclick = function() {}) : this._touch_events(["touchmove", "touchstart", "touchend"], function(e) {
        return e.touches && e.touches.length > 1 ? null : e.touches[0] ? {
            target: e.target,
            pageX: e.touches[0].pageX,
            pageY: e.touches[0].pageY
        } : e
    }, function() {
        return !1
    }))
}, scheduler._touch_events = function(e, t, s) {
    function i(e, t, s) {
        dhtmlxEvent(e, t, function(e) {
            return scheduler._is_lightbox_open()?!0 : s(e)
        })
    }
    function n(e, t, s) {
        if (e && t) {
            var i = Math.abs(e.pageY - t.pageY), n = Math.abs(e.pageX - t.pageX);
            n > s && (!i || n / i > 3) && (e.pageX > t.pageX ? scheduler._click.dhx_cal_next_button() : scheduler._click.dhx_cal_prev_button())
        }
    }
    function a(e) {
        scheduler._hide_global_tip(), l && (scheduler._on_mouse_up(t(e || event)), scheduler._temp_touch_block=!1), scheduler._drag_id = null, scheduler._drag_mode = null, scheduler._drag_pos = null, clearTimeout(o), l = _=!1, h=!0
    }
    var r, d, o, l, h, _, c =- 1 != navigator.userAgent.indexOf("Android")&&-1 != navigator.userAgent.indexOf("WebKit"), u = 0;
    i(document.body, e[0], function(e) {
        if (!s(e)) {
            if (l)
                return scheduler._on_mouse_move(t(e)), scheduler._update_global_tip(), e.preventDefault && e.preventDefault(), e.cancelBubble=!0, !1;
            if (d && c && n(d, t(e), 0), d = t(e), _)
                return d ? void((r.target != d.target || Math.abs(r.pageX - d.pageX) > 5 || Math.abs(r.pageY - d.pageY) > 5) && (h=!0, clearTimeout(o))) : void(h=!0)
        }
    }), i(this._els.dhx_cal_data[0], "scroll", a), i(this._els.dhx_cal_data[0], "touchcancel", a), i(this._els.dhx_cal_data[0], "contextmenu", function(e) {
        return _ ? (e && e.preventDefault && e.preventDefault(), (e || event).cancelBubble=!0, !1) : void 0
    }), i(this._els.dhx_cal_data[0], e[1], function(e) {
        if (!s(e)) {
            var i;
            if (l = h=!1, _=!0, scheduler._temp_touch_block=!0, i = d = t(e), !i)
                return void(h=!0);
            var n = new Date;
            if (!h&&!l && 250 > n - u)
                return scheduler._click.dhx_cal_data(i), window.setTimeout(function() {
                    scheduler._on_dbl_click(i)
                }, 50), e.preventDefault && e.preventDefault(), e.cancelBubble=!0, scheduler._block_next_stop=!0, !1;
            u = n, h || l ||!scheduler.config.touch_drag || (o = setTimeout(function() {
                l=!0;
                var e = r.target;
                if (e && e.className&&-1 != e.className.indexOf("dhx_body") && (e = e.previousSibling), scheduler._on_mouse_down(r, e), scheduler._drag_mode && "create" != scheduler._drag_mode) {
                    var t =- 1;
                    if (scheduler.for_rendered(scheduler._drag_id, function(e, s) {
                        t = e.getBoundingClientRect().top, e.style.display = "none", scheduler._rendered.splice(s, 1)
                    }), t >= 0) {
                        var s = scheduler.config.time_step;
                        scheduler._move_pos_shift = s * Math.round(60 * (i.pageY - t) / (scheduler.config.hour_size_px * s))
                    }
                }
                scheduler.config.touch_tip && scheduler._show_global_tip(), scheduler._on_mouse_move(r)
            }, scheduler.config.touch_drag), r = i)
        }
    }), i(this._els.dhx_cal_data[0], e[2], function(e) {
        return s(e) ? void 0 : (l || n(r, d, 200), l && (scheduler._ignore_next_click=!0), a(e), scheduler._block_next_stop ? (scheduler._block_next_stop=!1, e.preventDefault && e.preventDefault(), e.cancelBubble=!0, !1) : void 0)
    }), dhtmlxEvent(document.body, e[2], a)
}, scheduler._show_global_tip = function() {
    scheduler._hide_global_tip();
    var e = scheduler._global_tip = document.createElement("DIV");
    e.className = "dhx_global_tip", scheduler._update_global_tip(1), document.body.appendChild(e)
}, scheduler._update_global_tip = function(e) {
    var t = scheduler._global_tip;
    if (t) {
        var s = "";
        if (scheduler._drag_id&&!e) {
            var i = scheduler.getEvent(scheduler._drag_id);
            i && (s = "<div>" + (i._timed ? scheduler.templates.event_header(i.start_date, i.end_date, i) : scheduler.templates.day_date(i.start_date, i.end_date, i)) + "</div>")
        }
        t.innerHTML = "create" == scheduler._drag_mode || "new-size" == scheduler._drag_mode ? (scheduler.locale.drag_to_create || "Drag to create") + s : (scheduler.locale.drag_to_move || "Drag to move") + s
    }
}, scheduler._hide_global_tip = function() {
    var e = scheduler._global_tip;
    e && e.parentNode && (e.parentNode.removeChild(e), scheduler._global_tip = 0)
}, scheduler._dp_init = function(e) {
    e._methods = ["_set_event_text_style", "", "changeEventId", "_dp_hook_delete"], this._dp_hook_delete = function(e) {
        return this.deleteEvent(e, !0)
    }, this.attachEvent("onEventAdded", function(t) {
        !this._loading && this._validId(t) && e.setUpdated(t, !0, "inserted")
    }), this.attachEvent("onConfirmedBeforeEventDelete", function(t) {
        if (this._validId(t)) {
            var s = e.getState(t);
            return "inserted" == s || this._new_event ? (e.setUpdated(t, !1), !0) : "deleted" == s?!1 : "true_deleted" == s?!0 : (e.setUpdated(t, !0, "deleted"), !1)
        }
    }), this.attachEvent("onEventChanged", function(t) {
        !this._loading && this._validId(t) && e.setUpdated(t, !0, "updated")
    }), e._getRowData = function(e) {
        var t = this.obj.getEvent(e), s = {};
        for (var i in t)
            0 !== i.indexOf("_") && (s[i] = t[i] && t[i].getUTCFullYear ? this.obj.templates.xml_format(t[i]) : t[i]);
        return s
    }, e._clearUpdateFlag = function() {}, e.attachEvent("insertCallback", scheduler._update_callback), e.attachEvent("updateCallback", scheduler._update_callback), e.attachEvent("deleteCallback", function(e, t) {
        this.obj.setUserData(t, this.action_param, "true_deleted"), this.obj.deleteEvent(t)
    })
}, scheduler._validId = function() {
    return !0
}, scheduler.setUserData = function(e, t, s) {
    e ? this.getEvent(e)[t] = s : this._userdata[t] = s
}, scheduler.getUserData = function(e, t) {
    return e ? this.getEvent(e)[t] : this._userdata[t]
}, scheduler._set_event_text_style = function(e, t) {
    this.for_rendered(e, function(e) {
        e.style.cssText += ";" + t
    });
    var s = this.getEvent(e);
    s._text_style = t, this.event_updated(s)
}, scheduler._update_callback = function(e) {
    var t = scheduler._xmlNodeToJSON(e.firstChild);
    t.text = t.text || t._tagvalue, t.start_date = scheduler.templates.xml_date(t.start_date), t.end_date = scheduler.templates.xml_date(t.end_date), scheduler.addEvent(t)
}, scheduler._skin_settings = {
    fix_tab_position: [1, 0],
    use_select_menu_space: [1, 0],
    wide_form: [1, 0],
    hour_size_px: [44, 42],
    displayed_event_color: ["#ff4a4a", "ffc5ab"],
    displayed_event_text_color: ["#ffef80", "7e2727"]
}, scheduler._skin_xy = {
    lightbox_additional_height: [90, 50],
    nav_height: [59, 22],
    bar_height: [24, 20]
}, scheduler._configure = function(e, t, s) {
    for (var i in t)
        "undefined" == typeof e[i] && (e[i] = t[i][s])
}, scheduler._skin_init = function() {
    if (!scheduler.skin)
        for (var e = document.getElementsByTagName("link"), t = 0; t < e.length; t++) {
            var s = e[t].href.match("dhtmlxscheduler_([a-z]+).css");
            if (s) {
                scheduler.skin = s[1];
                break
            }
        }
    var i = 0;
    if (!scheduler.skin || "classic" !== scheduler.skin && "glossy" !== scheduler.skin || (i = 1), this._configure(scheduler.config, scheduler._skin_settings, i), this._configure(scheduler.xy, scheduler._skin_xy, i), !i) {
        var n = scheduler.config.minicalendar;
        n && (n.padding = 14), scheduler.templates.event_bar_date = function(e) {
            return "• <b>" + scheduler.templates.event_date(e) + "</b> "
        }, scheduler.attachEvent("onTemplatesReady", function() {
            var e = scheduler.date.date_to_str("%d");
            scheduler.templates._old_month_day || (scheduler.templates._old_month_day = scheduler.templates.month_day);
            var t = scheduler.templates._old_month_day;
            if (scheduler.templates.month_day = function(s) {
                if ("month" == this._mode) {
                    var i = e(s);
                    return 1 == s.getDate() && (i = scheduler.locale.date.month_full[s.getMonth()] + " " + i), + s ==+ scheduler.date.date_part(new Date) && (i = scheduler.locale.labels.dhx_cal_today_button + " " + i), i
                }
                return t.call(this, s)
            }, scheduler.config.fix_tab_position) {
                for (var s = scheduler._els.dhx_cal_navline[0].getElementsByTagName("div"), i = null, n = 211, a = 0; a < s.length; a++) {
                    var r = s[a], d = r.getAttribute("name");
                    if (d)
                        switch (r.style.right = "auto", d) {
                        case"day_tab":
                            r.style.left = "14px", r.className += " dhx_cal_tab_first";
                            break;
                        case"week_tab":
                            r.style.left = "75px";
                            break;
                        case"month_tab":
                            r.style.left = "136px", r.className += " dhx_cal_tab_last";
                            break;
                        default:
                            r.style.left = n + "px", r.className += " dhx_cal_tab_standalone", n = n + 14 + r.offsetWidth
                        } else 
                            0 === (r.className || "").indexOf("dhx_minical_icon") && r.parentNode == scheduler._els.dhx_cal_navline[0] && (i = r)
                        }
                i && (i.style.left = n + "px")
            }
            scheduler.skin && "flat" === scheduler.skin && (scheduler.xy.scale_height = 35, scheduler.templates.hour_scale = function(e) {
                var t = e.getMinutes();
                t = 10 > t ? "0" + t : t;
                var s = "<span class='dhx_scale_h'>" + e.getHours() + "</span><span class='dhx_scale_m'>&nbsp;" + t + "</span>";
                return s
            })
        }), scheduler._skin_init = function() {}
    }
}, window.jQuery&&!function(e) {
    var t = [];
    e.fn.dhx_scheduler = function(s) {
        if ("string" != typeof s) {
            var i = [];
            return this.each(function() {
                if (this && this.getAttribute&&!this.getAttribute("dhxscheduler")) {
                    for (var e in s)
                        "data" != e && (scheduler.config[e] = s[e]);
                    this.getElementsByTagName("div").length || (this.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>', this.className += " dhx_cal_container"), scheduler.init(this, scheduler.config.date, scheduler.config.mode), s.data && scheduler.parse(s.data), i.push(scheduler)
                }
            }), 1 === i.length ? i[0] : i
        }
        return t[s] ? t[s].apply(this, []) : void e.error("Method " + s + " does not exist on jQuery.dhx_scheduler")
    }
}(jQuery);

