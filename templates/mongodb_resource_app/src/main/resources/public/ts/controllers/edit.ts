import { ng } from 'entcore';
import { Autosave } from 'entcore-toolkit';
import { Library } from '../model/library';
import { ${APPNAME} } from '../model/${APPNAME.toLowerCase()}'

export const editController = ng.controller('EditController', ['\$scope', '\$location', 'route', (\$scope, \$location, route) => {
    const loadResource = async () => {
        await Library.instance.root.sync();
        \$scope.${APPNAME.toLowerCase()} = Library.instance.root.list.find(r => r._id === \$scope.params.id);
        \$scope.resources = Library.instance.root.list;
        Autosave.watch(() => \$scope.${APPNAME.toLowerCase()}.save(), \$scope.${APPNAME.toLowerCase()});
        \$scope.\$apply();
    };
    loadResource();

    route({
		edit: () => loadResource()
	});

    \$scope.view = (resource: ${APPNAME}) => {
		\$location.path('/view/' + resource._id);
	}
}]);