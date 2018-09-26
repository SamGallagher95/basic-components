import { ComponentApp } from "./components";

// Setup the Components App

const componentsApp = new ComponentApp();

componentsApp.init(() => {

    // Definitions
    const leftSideBarComponent = componentsApp.createComponent("left-sidebar");
    const contentComponent = componentsApp.createComponent("content");

    // Left Sidebar
    leftSideBarComponent.on("init", function() {

        this.rootElm.addClass("fade-in");

        this.elm(".name").onDomEvent("click", function() {

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
    contentComponent.on("init", function() {

        setTimeout(() => {
            this.rootElm.addClass("fade-in");
        });

    });

});