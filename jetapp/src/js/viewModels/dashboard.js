/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['accUtils'
	'knockout',
	'text!appconfig.json',
	'ojs/ojarraydataprovider',
	'ojs/ojknockout-keyset',
	'ojs/ojswitch',
	'ojs/ojlabel',
	'ojs/ojavatar',
	'ojs/ojlistview',
	'ojs/ojlistitemlayout',
	'ojs/ojknockout'
],
 function(accUtils, ko, appconfig,ArrayDataProvider,KeySet) {
    function DashboardViewModel() {
		this.config = JSON.parse(appconfig);
		this.categoriesURL = config.baseurl+"/categories";
		this.productsURL = config.baseurl+"/productsByCategory/";

		// knockout observables for the categories list view
		this.selectedCategories = new ojknockout_keyset_1.ObservableKeySet(); 
		this.selectedCategorySelectionRequired = ko.observable(false);
		this.firstCategorySelectedItem = ko.observable();
		this.selectedCategoryIds = ko.observable();
		this.categoriesArray = ko.observable();

		// Knockout observables for the products list view
		this.selectedproducts = new ojknockout_keyset_1.ObservableKeySet(); 
		this.selectedProductSelectionRequired = ko.observable(false);
		this.firstProductSelectedItem = ko.observable();
		this.selectedProductIds = ko.observable();
		this.productsArray = ko.observable();

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);
