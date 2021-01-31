/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define([
  "knockout",
  "ojs/ojcontext",
  "text!appconfig.json",
  "ojs/ojmodule-element-utils",
  "ojs/ojknockouttemplateutils",
  "ojs/ojcorerouter",
  "ojs/ojmodulerouter-adapter",
  "ojs/ojknockoutrouteradapter",
  "ojs/ojurlparamadapter",
  "ojs/ojresponsiveutils",
  "ojs/ojresponsiveknockoututils",
  "ojs/ojarraydataprovider",
  "ojs/ojoffcanvas",
  "ojs/ojmodule-element",
  "ojs/ojknockout",
  "ojs/ojdialog",
  "ojs/ojinputtext",
  "ojs/ojformlayout",
  "ojs/ojbutton",
], function (
  ko,
  Context,
  appconfig,
  moduleUtils,
  KnockoutTemplateUtils,
  CoreRouter,
  ModuleRouterAdapter,
  KnockoutRouterAdapter,
  UrlParamAdapter,
  ResponsiveUtils,
  ResponsiveKnockoutUtils,
  ArrayDataProvider,
  OffcanvasUtils
) {
  function ControllerViewModel() {
    this.KnockoutTemplateUtils = KnockoutTemplateUtils;
    this.userName = ko.observable("Guest");
    this.userRole = ko.observable("user");
    this.authUser = ko.observable("");
    this.authActionName = ko.observable("Log In");
    this.config = JSON.parse(appconfig);

    this.menuItems = ko.pureComputed(() => {
      if (this.userRole() === "user") {
        return [
          { id: "pref", value: "pref", label: "Preferences" },
          { id: "help", value: "help", label: "Help" },
          { id: "about", value: "about", label: "About" },
          {
            id: "auth",
            value: this.authActionName(),
            label: this.authActionName(),
          },
        ];
      } else {
        return [
          { id: "pref", value: "pref", label: "Preferences" },
          { id: "help", value: "help", label: "Help" },
          { id: "about", value: "about", label: "About" },
          {
            id: "auth",
            value: this.authActionName(),
            label: this.authActionName(),
          },
          { id: "admin", value: "admin", label: "Administration" },
        ];
      }
    });

    // Handle announcements sent when pages change, for Accessibility.
    this.manner = ko.observable("polite");
    this.message = ko.observable();
    announcementHandler = (event) => {
      this.message(event.detail.message);
      this.manner(event.detail.manner);
    };

    document
      .getElementById("globalBody")
      .addEventListener("announce", announcementHandler, false);

    // Media queries for repsonsive layouts
    const smQuery = ResponsiveUtils.getFrameworkQuery(
      ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY
    );
    this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    const mdQuery = ResponsiveUtils.getFrameworkQuery(
      ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP
    );
    this.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

    let navData = [
      { path: "", redirect: "dashboard" },
      {
        path: "dashboard",
        detail: { label: "Dashboard", iconClass: "oj-ux-ico-bar-chart" },
      },
      {
        path: "administration",
        detail: { label: "Administration", iconClass: "oj-ux-ico-fire" },
      },
      {
        path: "customers",
        detail: { label: "Customers", iconClass: "oj-ux-ico-contact-group" },
      },
      {
        path: "about",
        detail: { label: "About", iconClass: "oj-ux-ico-information-s" },
      },
    ];

    // Router setup
    router = new CoreRouter(navData, {
      urlAdapter: new UrlParamAdapter(),
    });
    router.sync();

    this.moduleAdapter = new ModuleRouterAdapter(router);

    this.selection = new KnockoutRouterAdapter(router);

    // Setup the navDataProvider with the routes, excluding the first redirected
    // route.
    this.navDataProvider = new ArrayDataProvider(navData.slice(1), {
      keyAttributes: "path",
    });

    router.currentState.subscribe((args) => {
      let state = args.state;
      if (state) {
        let name = state.path;
        var complete = args.complete;
        // Load the module and return Promise to CoreRouter
        if (name === "administration" && this.userRole() !== "admin") {
          complete(Promise.reject(new Error('User does not have Administrator rights.')).then(function() {
            // only handling errors, no success defaults.
          }, function(error) {
            console.log(error);
            router.go({path:'dashboard'});
          }));
        }
      }
    });

    // Drawer
    // Close offcanvas on medium and larger screens
    this.mdScreen.subscribe(() => {
      OffcanvasUtils.close(this.drawerParams);
    });
    this.drawerParams = {
      displayMode: "push",
      selector: "#navDrawer",
      content: "#pageContent",
    };
    // Called by navigation drawer toggle button and after selection of nav drawer item
    this.toggleDrawer = () => {
      this.navDrawerOn = true;
      return OffcanvasUtils.toggle(this.drawerParams);
    };

    // Header
    // Application Name used in Branding Area
    this.appName = ko.observable("The Store");
    // User Info used in Global Navigation area
    this.userLogin = ko.observable("Guest");

    this.cancelAction = () => {
      document.getElementById("loginDialog").close();
    };

    this.authAction = () => {
      let action = this.authActionName() === "Log In" ? "login" : "logout";
      let user = this.authUser();
      if (action === "login") {
        if (user.length > 0) {
          fetch(this.config.baseURL + "/" + user)
            .then((response) => response.json())
            .then((results) => {
              let data = results.items[0];
              if (data.full_name !== null) {
                console.log(
                  "UserName: " + data.full_name + " || Role: " + data.role
                );
                this.userLogin(data.full_name);
                data.role ? this.userRole(data.role) : this.userRole("user");
                this.authActionName("Log Out");
                document.getElementById("loginDialog").close();
              } else {
                this.userLogin("Unknown");
              }
            });
        }
      } else if (action === "logout") {
        this.userLogin("Guest");
        this.userRole("user");
        this.authActionName("Log In");
        router.go({ path: "dashboard" });
      }
    };

    // document
    //   .getElementById("globalBody")
    //   .addEventListener("authChanged", authenticationHandler, false);

    this.menuItemAction = (event) => {
      let action = event.target.value;
      if (action === "Log In") {
        document.getElementById("loginDialog").open();
      } else if (action === "Log Out") {
        this.authAction();
      } else if (action === "Administration") {
        router.go({ path: "administration" });
      } else {
        console.log("Menu clicked: " + action);
      }
    };

    // Footer
    this.footerLinks = [
      {
        name: "About Oracle",
        linkId: "aboutOracle",
        linkTarget: "http://www.oracle.com/us/corporate/index.html#menu-about",
      },
      {
        name: "Contact Us",
        id: "contactUs",
        linkTarget: "http://www.oracle.com/us/corporate/contact/index.html",
      },
      {
        name: "Legal Notices",
        id: "legalNotices",
        linkTarget: "http://www.oracle.com/us/legal/index.html",
      },
      {
        name: "Terms Of Use",
        id: "termsOfUse",
        linkTarget: "http://www.oracle.com/us/legal/terms/index.html",
      },
      {
        name: "Your Privacy Rights",
        id: "yourPrivacyRights",
        linkTarget: "http://www.oracle.com/us/legal/privacy/index.html",
      },
    ];
  }
  // release the application bootstrap busy state
  Context.getPageContext().getBusyContext().applicationBootstrapComplete();

  return new ControllerViewModel();
});
