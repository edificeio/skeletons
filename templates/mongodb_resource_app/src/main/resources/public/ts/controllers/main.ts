import { ng, template } from 'entcore';
import { Autosave } from 'entcore-toolkit';

/**
	Wrapper controller
	------------------
	Main controller.
**/

export const mainController = ng.controller('MainController', ['\$scope', 'route',(\$scope, route) => {
	\$scope.lightboxes = {};
	\$scope.params = {};
	
	route({
		defaultView: function(){
			Autosave.unwatchAll();
			template.open('main', 'library/main');
		},
		view: function(params){
			Autosave.unwatchAll();
			template.open('main', 'resource/view');
			\$scope.params.id = params.id;
		},
		edit: function(params){
			Autosave.unwatchAll();
			template.open('main', 'resource/edit');
			\$scope.params.id = params.id;
		}
	});

	\$scope.lightbox = (lightboxName: string) => \$scope.lightboxes[lightboxName] = !\$scope.lightboxes[lightboxName];
}]);
