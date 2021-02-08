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
define(['accUtils',
	'knockout',
	'ojs/ojarraydataprovider',
	'ojs/ojknockout-keyset',
	'ojs/ojswitch',
	'ojs/ojlabel',
	'ojs/ojavatar',
	'ojs/ojlistview',
	'ojs/ojlistitemlayout',
	'ojs/ojknockout'
],
 function(accUtils, ko, ArrayDataProvider,KeySet) {
    function DashboardViewModel() {
		const BASEURL = "https://apex.oracle.com/pls/apex/accjet/store/";
		let self = this;
		let catURL = BASEURL+"categories";
		let prodURL = BASEURL+"products/";


		// knockout observables for the categories list view
		this.catArray = ko.observable();

		// Knockout observables for the products list view
		this.prodArray = ko.observable();

console.log(catURL);
 // fetch the categories rest api into catArray
 fetch(catURL)
     .then(res => res.json()) // expecting a json response
     .then(json => {
         console.log(json);
          self.catArray(new ArrayDataProvider(json.items, { keyAttributes: 'category_id' }));
	     })
	     .catch(err => {
			 console.log("an error occurred during the fetch:");
	         console.log(err);
	     });

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
