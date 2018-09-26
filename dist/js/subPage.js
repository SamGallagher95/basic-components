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
},{"./classes/component.class":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("./components");
// Setup the Components App
const componentsApp = new components_1.ComponentApp();
componentsApp.init(() => {
    // Definitions
    const leftSideBarComponent = componentsApp.createComponent("left-sidebar");
    const contentComponent = componentsApp.createComponent("content");
    // Left Sidebar
    leftSideBarComponent.on("init", function () {
        this.rootElm.addClass("fade-in");
        this.elm(".name").onDomEvent("click", function () {
            this.rootElm.removeClass("fade-in");
            this.rootElm.addClass("fade-out");
            contentComponent.rootElm.removeClass("fade-in");
            contentComponent.rootElm.addClass("fade-out");
            setTimeout(() => {
                componentsApp.navigate("index.html");
            }, 400);
        });
    });
    // Content
    contentComponent.on("init", function () {
        setTimeout(() => {
            this.rootElm.addClass("fade-in");
        });
    });
});
},{"./components":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvY2xhc3Nlcy9jb21wb25lbnQuY2xhc3MudHMiLCJzcmMvdHMvY29tcG9uZW50cy50cyIsInNyYy90cy9zdWJQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxNQUFhLFNBQVM7SUFRbEI7OztPQUdHO0lBQ0gsWUFBWSxXQUFtQjtRQVB2QixXQUFNLEdBQTRCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDNUMsbUJBQWMsR0FBb0IsRUFBRSxDQUFDO1FBUXpDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixPQUFPO1FBQ1AsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBRUQsYUFBYTtJQUVOLFFBQVEsQ0FBQyxTQUFpQjtRQUU3QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsT0FBTyxJQUFJLENBQUM7SUFFaEIsQ0FBQztJQUVNLEdBQUcsQ0FBQyxXQUFtQjtRQUUxQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sSUFBSSxDQUFDO0lBRWhCLENBQUM7SUFFTSxFQUFFLENBQUMsS0FBYSxFQUFFLFFBQWtCO1FBRXZDLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNyRSxLQUFLLENB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QUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUVsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVsQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixhQUFhLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3pDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVaLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVO0lBQ1YsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRTtRQUV4QixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDLENBQUMsQ0FBQztBQUVQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGNsYXNzIENvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWREb206IGFueTtcclxuICAgIHByaXZhdGUgY29tcG9uZW50SWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgZG9tRWxlbWVudDogYW55O1xyXG4gICAgcHJpdmF0ZSBldmVudHM6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+ID0gbmV3IE1hcCgpO1xyXG4gICAgcHJpdmF0ZSBldmVudExpc3RlbmVyczogRXZlbnRMaXN0ZW5lcltdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjb21wb25lbnRJZCBUaGUgY29tcG9uZW50LWlkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudElkOiBzdHJpbmcpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbXBvbmVudElkID0gY29tcG9uZW50SWQ7XHJcbiAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCk7XHJcblxyXG4gICAgICAgIC8vIEluaXRcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KFwiaW5pdFwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBQdWJsaWMgQXBpXHJcblxyXG4gICAgcHVibGljIGFkZENsYXNzKGNsYXNzTmFtZTogc3RyaW5nKTogQ29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWREb20uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZWxtKGNzc1NlbGVjdG9yOiBzdHJpbmcpOiBDb21wb25lbnQge1xyXG5cclxuICAgICAgICB0aGlzLmFjdGl2YXRlZERvbSA9IHRoaXMuZG9tRWxlbWVudC5xdWVyeVNlbGVjdG9yKGNzc1NlbGVjdG9yKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IENvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gKHRoaXMuZXZlbnRzLmdldChldmVudCkpID8gdGhpcy5ldmVudHMuZ2V0KGV2ZW50KSA6IFtdO1xyXG4gICAgICAgIGFycmF5LnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLnNldChldmVudCwgYXJyYXkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Eb21FdmVudChldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiBDb21wb25lbnQge1xyXG5cclxuICAgICAgICB0aGlzLm9uKGV2ZW50LCBjYWxsYmFjayk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWREb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChlLnR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcpOiBDb21wb25lbnQge1xyXG5cclxuICAgICAgICB0aGlzLmFjdGl2YXRlZERvbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldHRlcnNcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJvb3RFbG0oKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWREb20gPSB0aGlzLmRvbUVsZW1lbnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHJpdmF0ZVxyXG5cclxuICAgIHByaXZhdGUgZW1pdChldmVudDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50cy5nZXQoZXZlbnQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFycmF5ID0gdGhpcy5ldmVudHMuZ2V0KGV2ZW50KTtcclxuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChmdW5jID0+IHtcclxuICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkodGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREb21FbGVtZW50KCkge1xyXG5cclxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb21wb25lbnQtaWQ9JyR7dGhpcy5jb21wb25lbnRJZH0nXWApO1xyXG5cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jbGFzc2VzL2NvbXBvbmVudC5jbGFzc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEFwcCB7XHJcblxyXG4gICAgLy8gUHJpdmF0ZSBQcm9wZXJ0aWVzXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRMaXN0OiBDb21wb25lbnRbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjb21wb25lbnRJZCBQYXNzIGEgc3RyaW5nIHZhbHVlIHRoYXQgaXMgdGhlIGNvbXBvbmVudC1pZCBmb3IgdGhlIGNvbXBvbmVudCB5b3UgYXJlIHRhcmdldGluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudElkOiBzdHJpbmcpOiBDb21wb25lbnQge1xyXG5cclxuICAgICAgICBjb25zdCBuZXdDb21wb25lbnQgPSBuZXcgQ29tcG9uZW50KGNvbXBvbmVudElkKTtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRMaXN0LnB1c2gobmV3Q29tcG9uZW50KTtcclxuICAgICAgICByZXR1cm4gbmV3Q29tcG9uZW50O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChmdW5jOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5hdmlnYXRlKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UodXJsKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnRBcHAgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XHJcblxyXG4vLyBTZXR1cCB0aGUgQ29tcG9uZW50cyBBcHBcclxuXHJcbmNvbnN0IGNvbXBvbmVudHNBcHAgPSBuZXcgQ29tcG9uZW50QXBwKCk7XHJcblxyXG5jb21wb25lbnRzQXBwLmluaXQoKCkgPT4ge1xyXG5cclxuICAgIC8vIERlZmluaXRpb25zXHJcbiAgICBjb25zdCBsZWZ0U2lkZUJhckNvbXBvbmVudCA9IGNvbXBvbmVudHNBcHAuY3JlYXRlQ29tcG9uZW50KFwibGVmdC1zaWRlYmFyXCIpO1xyXG4gICAgY29uc3QgY29udGVudENvbXBvbmVudCA9IGNvbXBvbmVudHNBcHAuY3JlYXRlQ29tcG9uZW50KFwiY29udGVudFwiKTtcclxuXHJcbiAgICAvLyBMZWZ0IFNpZGViYXJcclxuICAgIGxlZnRTaWRlQmFyQ29tcG9uZW50Lm9uKFwiaW5pdFwiLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yb290RWxtLmFkZENsYXNzKFwiZmFkZS1pblwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbG0oXCIubmFtZVwiKS5vbkRvbUV2ZW50KFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJvb3RFbG0ucmVtb3ZlQ2xhc3MoXCJmYWRlLWluXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJvb3RFbG0uYWRkQ2xhc3MoXCJmYWRlLW91dFwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRlbnRDb21wb25lbnQucm9vdEVsbS5yZW1vdmVDbGFzcyhcImZhZGUtaW5cIik7XHJcbiAgICAgICAgICAgIGNvbnRlbnRDb21wb25lbnQucm9vdEVsbS5hZGRDbGFzcyhcImZhZGUtb3V0XCIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzQXBwLm5hdmlnYXRlKFwiaW5kZXguaHRtbFwiKTtcclxuICAgICAgICAgICAgfSwgNDAwKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ29udGVudFxyXG4gICAgY29udGVudENvbXBvbmVudC5vbihcImluaXRcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvb3RFbG0uYWRkQ2xhc3MoXCJmYWRlLWluXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSk7Il19
