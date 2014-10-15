/**
	Application routes.
**/
routes.define(function(\$routeProvider){
	\$routeProvider
		.otherwise({
			action: 'defaultView'
		})
})

/**
	Wrapper controller
	------------------
	Main controller.
**/
function ${APPNAME}Controller(\$scope, \$rootScope, model, template, route, date){

	\$scope.template = template

	route({
		defaultView: function(){
			\$scope.openView('main', 'library')
		}
	})

	\$rootScope.longDate = function(dateStr){
		return date.create(dateStr.split(' ')[0]).format('DD MMMM YYYY')
	}

	\$scope.openView = function(container, view){
		if(container === "lightbox")
			ui.showLightbox()
		else
			ui.hideLightbox()
		template.open(container, view)
	}

}

/**
	FolderController
	----------------
	${APPNAME} are split in 3 "folders" :
		- Ownermade
		- Shared
		- Deleted
	This controller helps dealing with these 3 views.
**/
function FolderController(\$scope, \$rootScope, model, template){

	\$scope.${APPNAME.toLowerCase()}List = model.${APPNAME.toLowerCase()}Collection.${APPNAME.toLowerCase()}s
	\$scope.filter${APPNAME} = {}
	\$scope.select = { all: false }
	\$scope.ordering = 'title'

	var DEFAULT_VIEW = function(){
		if(model.me.workflow.${APPNAME.toLowerCase()}.create !== true)
			\$scope.folders["shared"].list()
		else
			\$scope.folders["mine"].list()
	}

	//////////////////////
	// ${APPNAME} listing //
	//////////////////////

	var refreshListing = function(folder){
		\$scope.select.all = false
		\$scope.${APPNAME.toLowerCase()}List.sync()
		if(typeof folder === "string")
			\$scope.${APPNAME.toLowerCase()}List.folder = folder
		if(!template.contains('list', 'table-list') && !template.contains('list', 'icons-list'))
			\$scope.openView('list', 'table-list')
	}

	\$scope.folders = {
		"mine": {
			list: function(){
				\$scope.filter${APPNAME} = {
					"owner.userId": model.me.userId,
					"trashed": 0
				}
				refreshListing("mine")
			},
			workflow: "${APPNAME.toLowerCase()}.create"
		},
		"shared": {
			list: function(){
				\$scope.filter${APPNAME} = function(item){
					return item.owner.userId !== model.me.userId
				}
				refreshListing("shared")
			}
		},
		"trash": {
			list: function(){
				\$scope.filter${APPNAME} = {
					"trashed": 1
				}
				refreshListing("trash")
			},
			workflow: "${APPNAME.toLowerCase()}.create"
		}
	}

	//Deep filtering an Object based on another Object properties
	//Supports "dot notation" for accessing nested objects, ex: ({a {b: 1}} can be filtered using {"a.b": 1})
	var deepObjectFilter = function(object, filter){
		for(var prop in filter){
			var splitted_prop 	= prop.split(".")
			var obj_value 		= object
			var filter_value 	= filter[prop]
			for(i = 0; i < splitted_prop.length; i++){
				obj_value 		= obj_value[splitted_prop[i]]
			}
			if(filter_value instanceof Object && obj_value instanceof Object){
				if(!deepObjectFilter(obj_value, filter_value))
					return false
			} else if(obj_value !== filter_value)
				return false
		}
		return true
	}
	var ${APPNAME.toLowerCase()}ObjectFiltering = function(item){ return deepObjectFilter(item, \$scope.filter${APPNAME}) }
	var selectMultiple = function(items){
		_.forEach(items, function(item){ item.selected = true })
	}

	\$scope.switchAll = function(){
		if(\$scope.select.all){
			selectMultiple(\$scope.${APPNAME.toLowerCase()}List.filter(${APPNAME.toLowerCase()}ObjectFiltering).filter(function(item){ return item.myRights.manager !== undefined }))
		}
		else{
			\$scope.${APPNAME.toLowerCase()}List.deselectAll();
		}
	}

	\$scope.orderBy = function(what){
		\$scope.ordering = (\$scope.ordering === what ? '-' + what : what)
	}

	\$scope.open${APPNAME.toLowerCase()} = function(${APPNAME.toLowerCase()}){
		\$rootScope.${APPNAME.toLowerCase()} = ${APPNAME.toLowerCase()}
		\$scope.openView('main', '${APPNAME.toLowerCase()}')
	}

	/////////////////////////////////////
	// ${APPNAME} creation /modification //
	/////////////////////////////////////

	\$scope.new${APPNAME.toLowerCase()} = function(){
		\$scope.${APPNAME.toLowerCase()} = new ${APPNAME}()
		\$scope.${APPNAME.toLowerCase()}List.deselectAll()
		\$scope.select.all = false
		\$scope.openView('list', '${APPNAME.toLowerCase()}-infos')
	}

	\$scope.editInfos = function(){
		\$scope.${APPNAME.toLowerCase()} = \$scope.${APPNAME.toLowerCase()}List.selection()[0]
		\$scope.openView('list', '${APPNAME.toLowerCase()}-infos')
	}

	\$scope.removeIcon = function(){
		\$scope.${APPNAME.toLowerCase()}.thumbnail = ""
	}

	\$scope.remove${APPNAME.toLowerCase()} = function(){
		\$scope.${APPNAME.toLowerCase()}List.remove()
		if(template.contains('list', '${APPNAME.toLowerCase()}-infos'))
			\$scope.closeInfos()
	}

	\$scope.saveInfos = function(){
		if(!\$scope.${APPNAME.toLowerCase()}.title){
			notify.error('${APPNAME.toLowerCase()}.title.missing')
			return;
		}
		if(\$scope.${APPNAME.toLowerCase()}._id){
			\$scope.${APPNAME.toLowerCase()}.update(DEFAULT_VIEW)
		}
		else{
			\$scope.${APPNAME.toLowerCase()}.create(DEFAULT_VIEW)
		}
	}

	\$scope.closeInfos = function(){
		DEFAULT_VIEW()
	}

	\$scope.share${APPNAME.toLowerCase()} = function(){
		\$rootScope.shared${APPNAME} = \$scope.${APPNAME.toLowerCase()}List.selection()
		\$scope.openView('lightbox', 'share')
	}

	\$rootScope.\$on('share-updated', function(){
		\$scope.${APPNAME.toLowerCase()}List.sync()
	})

	//Default view displayed on opening
	DEFAULT_VIEW()

}
