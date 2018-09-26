import { Component } from "./classes/component.class";

export class ComponentApp {

    // Private Properties
    private _componentList: Component[] = [];

    constructor() { }

    /**
     * 
     * @param componentId Pass a string value that is the component-id for the component you are targeting
     */
    public createComponent(componentId: string): Component {

        const newComponent = new Component(componentId);
        this._componentList.push(newComponent);
        return newComponent;

    }

    public init(func: Function) {
        setTimeout(() => {
            func();
        });
    }

    public navigate(url: string): void {
        window.location.replace(url);
    }

}