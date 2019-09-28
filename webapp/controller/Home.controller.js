sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"com/ui5/ZUI51/model/formatter"
], function (Controller, JSONModel, Filter, FilterOperator, formatter) {
	"use strict";
	return Controller.extend("com.ui5.ZUI51.controller.Home", {
		myFormatter: formatter,
		onInit: function () {
			/*this.getView().getModel().attachRequestSent().setBusy(true);
		this.getView().getModel().attachRequestCompleted().setBusy(false);*/
			var myData = {
				"p1": {
					"original": "Original",
					"changed": "Changed"
				}
			};
			var oModel = new JSONModel();
			oModel.setData(myData);
			this.getView().setModel(oModel, "m1");
		},
		onRowSelected: function (oEvent) {
			var sBindPath = oEvent.getSource().getBindingContextPath();
			this.byId("productDetailsPanel").bindElement(sBindPath);
			this.byId("productDetailsPanel").setVisible(true);
		},
		onShow: function () {
			//	this.byId("inputId").bindProperty("value","m1>/p1/changed");
			//	this.byId("inputId").bindValue("m1>/p1/changed");
			this.getView().getModel("m1").setProperty("/p1/original", "test");
		},
		onTableSearch: function (oEvent) {
			var aFilters = [];
			var sSearch = oEvent.getParameter("query");
			if (sSearch) {
				var oFilterCategory = new Filter({
					path: 'ProductID',
					caseSensitive: true,
					operator: FilterOperator.Contains,
					value1: sSearch
				});
				var oFilterProductID = new Filter("Category", FilterOperator.Contains, sSearch);
				aFilters.push(new Filter({
					filters: [oFilterCategory, oFilterProductID],
					and: true
				}));
			}
			this.getView().byId("productTable").getBinding("items").filter(aFilters);
		},
		onVHDialogSelect:function(oEvent){
			
		if(!this._oFragDialog){
			this._oFragDialog = sap.ui.xmlfragment("idFrag","com.ui5.ZUI51.view.VHDialog",this);
			this.getView().addDependent(this._oFragDialog);
			}
			this._oFragDialog.open();
		},
		onVHItemSelected:function(oEvent){
			var oSelectedItem=oEvent.getParameters("selectedItems").selectedItem.getBindingContext().getObject();
			if(oSelectedItem){
			var sName=oSelectedItem.Name;
			this.byId("vhNameInput").setValue(sName);
			}
		},
		onVHSearch:function(oEvent){
			var sQuery=oEvent.getParameter("value");
			if(sQuery){
				var oFilterProductID = new Filter("Category", FilterOperator.Contains, sQuery);
			}
			oEvent.getParameters("itemsBinding").itemsBinding.filter(oFilterProductID);
			
		},
		onDisplayData:function(){
		/*	var oComboBox= this.byId("productsCombo");
			this.ctemplate=this.byId("ctempate");
			var oItemTemplate = new sap.ui.core.ListItem({text:"{ProductID}"});
			oComboBox.bindAggregation("items", {
				path: "/ProductSet",
				template:  this.ctemplate,
				templateShareable: false
			});*/

			var that=this;
			var oTable= this.byId("dynProductTable");
			var oTemplate=this.byId("tableTemplate");
			var oFilterProductID = new Filter("ProductID", FilterOperator.EQ, "HT-1001");
		
	    	oTable.bindAggregation("items",{
				path:"/ProductSet",
				filters:[oFilterProductID],
				template: oTemplate,
				 templateShareable: false,
				events:{
					dataRequested:function(){
					that.getView().setBusy(true);
						
					},
					dataReceived:function(){
						that.getView().setBusy(false);
					}
				}
				
			});
		}

	});
});