(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Component {
    /**
     *
     * @param componentId The component-id
     */
    constructor(componentId) {
        this.events = new Map();
        this.eventListeners = [];
        this.componentId = componentId;
        this.getDomElement();
        // Init
        setTimeout(() => {
            this.emit("init");
        });
    }
    // Public Api
    addClass(className) {
        this.activatedDom.classList.add(className);
        return this;
    }
    elm(cssSelector) {
        this.activatedDom = this.domElement.querySelector(cssSelector);
        return this;
    }
    on(event, callback) {
        const array = (this.events.get(event)) ? this.events.get(event) : [];
        array.push(callback);
        this.events.set(event, array);
        return this;
    }
    onDomEvent(event, callback) {
        this.on(event, callback);
        this.activatedDom.addEventListener(event, (e) => {
            this.emit(e.type);
        });
        return this;
    }
    removeClass(className) {
        this.activatedDom.classList.remove(className);
        return this;
    }
    // Getters
    get rootElm() {
        this.activatedDom = this.domElement;
        return this;
    }
    // Private
    emit(event) {
        if (this.events.get(event)) {
            const array = this.events.get(event);
            array.forEach(func => {
                func.apply(this);
            });
        }
    }
    getDomElement() {
        this.domElement = document.querySelector(`[data-component-id='${this.componentId}']`);
    }
}
exports.Component = Component;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_class_1 = require("./classes/component.class");
class ComponentApp {
    constructor() {
        // Private Properties
        this._componentList = [];
    }
    /**
     *
     * @param componentId Pass a string value that is the component-id for the component you are targeting
     */
    createComponent(componentId) {
        const newComponent = new component_class_1.Component(componentId);
        this._componentList.push(newComponent);
        return newComponent;
    }
    init(func) {
        setTimeout(() => {
            func();
        });
    }
    navigate(url) {
        window.location.replace(url);
    }
}
exports.ComponentApp = ComponentApp;
},{"./classes/component.class":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvY2xhc3Nlcy9jb21wb25lbnQuY2xhc3MudHMiLCJzcmMvdHMvY29tcG9uZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsTUFBYSxTQUFTO0lBUWxCOzs7T0FHRztJQUNILFlBQVksV0FBbUI7UUFQdkIsV0FBTSxHQUE0QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzVDLG1CQUFjLEdBQW9CLEVBQUUsQ0FBQztRQVF6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsT0FBTztRQUNQLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELGFBQWE7SUFFTixRQUFRLENBQUMsU0FBaUI7UUFFN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDO0lBRWhCLENBQUM7SUFFTSxHQUFHLENBQUMsV0FBbUI7UUFFMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvRCxPQUFPLElBQUksQ0FBQztJQUVoQixDQUFDO0lBRU0sRUFBRSxDQUFDLEtBQWEsRUFBRSxRQUFrQjtRQUV2QyxNQUFNLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDckUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7SUFFaEIsQ0FBQztJQUVNLFVBQVUsQ0FBQyxLQUFhLEVBQUUsUUFBa0I7UUFFL0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBRWhCLENBQUM7SUFFTSxXQUFXLENBQUMsU0FBaUI7UUFFaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sSUFBSSxDQUFDO0lBRWhCLENBQUM7SUFFRCxVQUFVO0lBRVYsSUFBVyxPQUFPO1FBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxVQUFVO0lBRUYsSUFBSSxDQUFDLEtBQWE7UUFFdEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFFTCxDQUFDO0lBRU8sYUFBYTtRQUVqQixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO0lBRTFGLENBQUM7Q0FFSjtBQTVGRCw4QkE0RkM7Ozs7QUM1RkQsK0RBQXNEO0FBRXRELE1BQWEsWUFBWTtJQUtyQjtRQUhBLHFCQUFxQjtRQUNiLG1CQUFjLEdBQWdCLEVBQUUsQ0FBQztJQUV6QixDQUFDO0lBRWpCOzs7T0FHRztJQUNJLGVBQWUsQ0FBQyxXQUFtQjtRQUV0QyxNQUFNLFlBQVksR0FBRyxJQUFJLDJCQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkMsT0FBTyxZQUFZLENBQUM7SUFFeEIsQ0FBQztJQUVNLElBQUksQ0FBQyxJQUFjO1FBQ3RCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLFFBQVEsQ0FBQyxHQUFXO1FBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Q0FFSjtBQTdCRCxvQ0E2QkMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgY2xhc3MgQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIGFjdGl2YXRlZERvbTogYW55O1xyXG4gICAgcHJpdmF0ZSBjb21wb25lbnRJZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBkb21FbGVtZW50OiBhbnk7XHJcbiAgICBwcml2YXRlIGV2ZW50czogTWFwPHN0cmluZywgRnVuY3Rpb25bXT4gPSBuZXcgTWFwKCk7XHJcbiAgICBwcml2YXRlIGV2ZW50TGlzdGVuZXJzOiBFdmVudExpc3RlbmVyW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNvbXBvbmVudElkIFRoZSBjb21wb25lbnQtaWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50SWQ6IHN0cmluZykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50SWQgPSBjb21wb25lbnRJZDtcclxuICAgICAgICB0aGlzLmdldERvbUVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJpbml0XCIpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIFB1YmxpYyBBcGlcclxuXHJcbiAgICBwdWJsaWMgYWRkQ2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcpOiBDb21wb25lbnQge1xyXG5cclxuICAgICAgICB0aGlzLmFjdGl2YXRlZERvbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbG0oY3NzU2VsZWN0b3I6IHN0cmluZyk6IENvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVkRG9tID0gdGhpcy5kb21FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoY3NzU2VsZWN0b3IpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb24oZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogQ29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSAodGhpcy5ldmVudHMuZ2V0KGV2ZW50KSkgPyB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpIDogW107XHJcbiAgICAgICAgYXJyYXkucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgdGhpcy5ldmVudHMuc2V0KGV2ZW50LCBhcnJheSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkRvbUV2ZW50KGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IENvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIHRoaXMub24oZXZlbnQsIGNhbGxiYWNrKTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlZERvbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCAoZTogRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KGUudHlwZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVDbGFzcyhjbGFzc05hbWU6IHN0cmluZyk6IENvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVkRG9tLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0dGVyc1xyXG5cclxuICAgIHB1YmxpYyBnZXQgcm9vdEVsbSgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlZERvbSA9IHRoaXMuZG9tRWxlbWVudDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBQcml2YXRlXHJcblxyXG4gICAgcHJpdmF0ZSBlbWl0KGV2ZW50OiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzLmdldChldmVudCkpIHtcclxuICAgICAgICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpO1xyXG4gICAgICAgICAgICBhcnJheS5mb3JFYWNoKGZ1bmMgPT4ge1xyXG4gICAgICAgICAgICAgICAgZnVuYy5hcHBseSh0aGlzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERvbUVsZW1lbnQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvbXBvbmVudC1pZD0nJHt0aGlzLmNvbXBvbmVudElkfSddYCk7XHJcblxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NsYXNzZXMvY29tcG9uZW50LmNsYXNzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50QXBwIHtcclxuXHJcbiAgICAvLyBQcml2YXRlIFByb3BlcnRpZXNcclxuICAgIHByaXZhdGUgX2NvbXBvbmVudExpc3Q6IENvbXBvbmVudFtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNvbXBvbmVudElkIFBhc3MgYSBzdHJpbmcgdmFsdWUgdGhhdCBpcyB0aGUgY29tcG9uZW50LWlkIGZvciB0aGUgY29tcG9uZW50IHlvdSBhcmUgdGFyZ2V0aW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVDb21wb25lbnQoY29tcG9uZW50SWQ6IHN0cmluZyk6IENvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld0NvbXBvbmVudCA9IG5ldyBDb21wb25lbnQoY29tcG9uZW50SWQpO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudExpc3QucHVzaChuZXdDb21wb25lbnQpO1xyXG4gICAgICAgIHJldHVybiBuZXdDb21wb25lbnQ7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KGZ1bmM6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmF2aWdhdGUodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh1cmwpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==
