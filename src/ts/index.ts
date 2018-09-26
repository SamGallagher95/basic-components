import { ComponentApp } from "./components";

// Setup the Components App

const componentsApp = new ComponentApp();

componentsApp.init(() => {

    const mainComponent = componentsApp.createComponent("main");

    mainComponent.on("init", function() {

        this.rootElm.addClass("fade-in");

        this.elm(".about-click").onDomEvent("click", function() {

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
        })

    });

});