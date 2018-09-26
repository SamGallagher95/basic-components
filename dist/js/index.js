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
    const mainComponent = componentsApp.createComponent("main");
    mainComponent.on("init", function () {
        this.rootElm.addClass("fade-in");
        this.elm(".about-click").onDomEvent("click", function () {
            this.rootElm.removeClass("fade-in");
            this.rootElm.addClass("fade-out");
            setTimeout(() => {
                this.rootElm.removeClass("fade-out");
                componentsApp.navigate("about.html");
            }, 350);
        });
        // Image Transitions
        let index = 1;
        let lastIndex = 1;
        setInterval(() => {
            ++index;
            if (index > 3) {
                index = 1;
            }
            this.elm(".author-image").removeClass(`bg${lastIndex}`).addClass(`bg${index}`);
            lastIndex = index;
        }, 4000);
        setTimeout(() => {
            this.elm(".links").addClass("fade-in");
        });
    });
});
},{"./components":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvY2xhc3Nlcy9jb21wb25lbnQuY2xhc3MudHMiLCJzcmMvdHMvY29tcG9uZW50cy50cyIsInNyYy90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsTUFBYSxTQUFTO0lBUWxCOzs7T0FHRztJQUNILFlBQVksV0FBbUI7UUFQdkIsV0FBTSxHQUE0QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzVDLG1CQUFjLEdBQW9CLEVBQUUsQ0FBQztRQVF6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsT0FBTztRQUNQLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELGFBQWE7SUFFTixRQUFRLENBQUMsU0FBaUI7UUFFN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDO0lBRWhCLENBQUM7SUFFTSxHQUFHLENBQUMsV0FBbUI7UUFFMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvRCxPQUFPLElBQUksQ0FBQztJQUVoQixDQUFDO0lBRU0sRUFBRSxDQUFDLEtBQWEsRUFBRSxRQUFrQjtRQUV2QyxNQUFNLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDckUsS0FBSyxDQUFD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QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNyQyxhQUFhLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3pDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVaLENBQUMsQ0FBQyxDQUFDO1FBRUgsb0JBQW9CO1FBQ3BCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ2IsRUFBRSxLQUFLLENBQUM7WUFDUixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNiO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDL0UsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDLENBQUMsQ0FBQztBQUVQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGNsYXNzIENvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWREb206IGFueTtcclxuICAgIHByaXZhdGUgY29tcG9uZW50SWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgZG9tRWxlbWVudDogYW55O1xyXG4gICAgcHJpdmF0ZSBldmVudHM6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+ID0gbmV3IE1hcCgpO1xyXG4gICAgcHJpdmF0ZSBldmVudExpc3RlbmVyczogRXZlbnRMaXN0ZW5lcltdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjb21wb25lbnRJZCBUaGUgY29tcG9uZW50LWlkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudElkOiBzdHJpbmcpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbXBvbmVudElkID0gY29tcG9uZW50SWQ7XHJcbiAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCk7XHJcblxyXG4gICAgICAgIC8vIEluaXRcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KFwiaW5pdFwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBQdWJsaWMgQXBpXHJcblxyXG4gICAgcHVibGljIGFkZENsYXNzKGNsYXNzTmFtZTogc3RyaW5nKTogQ29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWREb20uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZWxtKGNzc1NlbGVjdG9yOiBzdHJpbmcpOiBDb21wb25lbnQge1xyXG5cclxuICAgICAgICB0aGlzLmFjdGl2YXRlZERvbSA9IHRoaXMuZG9tRWxlbWVudC5xdWVyeVNlbGVjdG9yKGNzc1NlbGVjdG9yKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IENvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gKHRoaXMuZXZlbnRzLmdldChldmVudCkpID8gdGhpcy5ldmVudHMuZ2V0KGV2ZW50KSA6IFtdO1xyXG4gICAgICAgIGFycmF5LnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLnNldChldmVudCwgYXJyYXkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Eb21FdmVudChldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiBDb21wb25lbnQge1xyXG5cclxuICAgICAgICB0aGlzLm9uKGV2ZW50LCBjYWxsYmFjayk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWREb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChlLnR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcpOiBDb21wb25lbnQge1xyXG5cclxuICAgICAgICB0aGlzLmFjdGl2YXRlZERvbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldHRlcnNcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJvb3RFbG0oKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWREb20gPSB0aGlzLmRvbUVsZW1lbnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHJpdmF0ZVxyXG5cclxuICAgIHByaXZhdGUgZW1pdChldmVudDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50cy5nZXQoZXZlbnQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFycmF5ID0gdGhpcy5ldmVudHMuZ2V0KGV2ZW50KTtcclxuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChmdW5jID0+IHtcclxuICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkodGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREb21FbGVtZW50KCkge1xyXG5cclxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb21wb25lbnQtaWQ9JyR7dGhpcy5jb21wb25lbnRJZH0nXWApO1xyXG5cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jbGFzc2VzL2NvbXBvbmVudC5jbGFzc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEFwcCB7XHJcblxyXG4gICAgLy8gUHJpdmF0ZSBQcm9wZXJ0aWVzXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRMaXN0OiBDb21wb25lbnRbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjb21wb25lbnRJZCBQYXNzIGEgc3RyaW5nIHZhbHVlIHRoYXQgaXMgdGhlIGNvbXBvbmVudC1pZCBmb3IgdGhlIGNvbXBvbmVudCB5b3UgYXJlIHRhcmdldGluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudElkOiBzdHJpbmcpOiBDb21wb25lbnQge1xyXG5cclxuICAgICAgICBjb25zdCBuZXdDb21wb25lbnQgPSBuZXcgQ29tcG9uZW50KGNvbXBvbmVudElkKTtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRMaXN0LnB1c2gobmV3Q29tcG9uZW50KTtcclxuICAgICAgICByZXR1cm4gbmV3Q29tcG9uZW50O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChmdW5jOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5hdmlnYXRlKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UodXJsKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnRBcHAgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XHJcblxyXG4vLyBTZXR1cCB0aGUgQ29tcG9uZW50cyBBcHBcclxuXHJcbmNvbnN0IGNvbXBvbmVudHNBcHAgPSBuZXcgQ29tcG9uZW50QXBwKCk7XHJcblxyXG5jb21wb25lbnRzQXBwLmluaXQoKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IG1haW5Db21wb25lbnQgPSBjb21wb25lbnRzQXBwLmNyZWF0ZUNvbXBvbmVudChcIm1haW5cIik7XHJcblxyXG4gICAgbWFpbkNvbXBvbmVudC5vbihcImluaXRcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHRoaXMucm9vdEVsbS5hZGRDbGFzcyhcImZhZGUtaW5cIik7XHJcblxyXG4gICAgICAgIHRoaXMuZWxtKFwiLmFib3V0LWNsaWNrXCIpLm9uRG9tRXZlbnQoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucm9vdEVsbS5yZW1vdmVDbGFzcyhcImZhZGUtaW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdEVsbS5hZGRDbGFzcyhcImZhZGUtb3V0XCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsbS5yZW1vdmVDbGFzcyhcImZhZGUtb3V0XCIpO1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50c0FwcC5uYXZpZ2F0ZShcImFib3V0Lmh0bWxcIik7XHJcbiAgICAgICAgICAgIH0sIDM1MCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBJbWFnZSBUcmFuc2l0aW9uc1xyXG4gICAgICAgIGxldCBpbmRleCA9IDE7XHJcbiAgICAgICAgbGV0IGxhc3RJbmRleCA9IDE7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICArK2luZGV4O1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAzKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbG0oXCIuYXV0aG9yLWltYWdlXCIpLnJlbW92ZUNsYXNzKGBiZyR7bGFzdEluZGV4fWApLmFkZENsYXNzKGBiZyR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgIGxhc3RJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIH0sIDQwMDApO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbG0oXCIubGlua3NcIikuYWRkQ2xhc3MoXCJmYWRlLWluXCIpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSk7XHJcblxyXG59KTsiXX0=
