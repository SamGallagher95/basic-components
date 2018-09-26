export class Component {

    private activatedDom: any;
    private componentId: string;
    private domElement: any;
    private events: Map<string, Function[]> = new Map();
    private eventListeners: EventListener[] = [];

    /**
     * 
     * @param componentId The component-id
     */
    constructor(componentId: string) {
        
        this.componentId = componentId;
        this.getDomElement();

        // Init
        setTimeout(() => {
            this.emit("init");
        })

    }

    // Public Api

    public addClass(className: string): Component {

        this.activatedDom.classList.add(className);
        return this;

    }

    public elm(cssSelector: string): Component {

        this.activatedDom = this.domElement.querySelector(cssSelector);
        return this;

    }

    public on(event: string, callback: Function): Component {

        const array = (this.events.get(event)) ? this.events.get(event) : [];
        array.push(callback);
        this.events.set(event, array);
        return this;

    }

    public onDomEvent(event: string, callback: Function): Component {

        this.on(event, callback);
        this.activatedDom.addEventListener(event, (e: Event) => {
            this.emit(e.type);
        });
        return this;

    }

    public removeClass(className: string): Component {

        this.activatedDom.classList.remove(className);
        return this;

    }

    // Getters

    public get rootElm() {
        this.activatedDom = this.domElement;
        return this;
    }

    // Private

    private emit(event: string) {

        if (this.events.get(event)) {
            const array = this.events.get(event);
            array.forEach(func => {
                func.apply(this);
            });
        }

    }

    private getDomElement() {

        this.domElement = document.querySelector(`[data-component-id='${this.componentId}']`);

    }

}