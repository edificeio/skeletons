import { ng } from 'entcore';
import { Library } from '../model/library';
import { ${APPNAME} } from '../model/${APPNAME.toLowerCase()}'

export const viewController = ng.controller('ViewController', ['\$scope', '\$location', 'route', (\$scope, \$location, route) => {
    const loadResource = async () => {
        await Library.instance.root.sync();
        \$scope.${APPNAME.toLowerCase()} = Library.instance.root.list.find(r => r._id === \$scope.params.id);
        \$scope.resources = Library.instance.root.list;
        \$scope.\$apply();
    };
    loadResource();

    route({
		view: () => loadResource()
	});

    \$scope.edit = (resource: ${APPNAME}) => {
		\$location.path('/edit/' + resource._id);
	}
}]);