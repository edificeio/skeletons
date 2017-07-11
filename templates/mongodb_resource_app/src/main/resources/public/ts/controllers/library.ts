import { ng, template } from 'entcore';
import { Library } from '../model/library';
import { ${APPNAME} } from '../model/${APPNAME.toLowerCase()}'

export const libraryController = ng.controller('LibraryController', ['\$scope', '\$location', (\$scope, \$location) => {
	template.open('library/properties', 'library/properties');
	template.open('library/folder-content', 'library/folder-content');
	
	\$scope.${APPNAME.toLowerCase()} = new ${APPNAME}();

	\$scope.save = async () => {
		\$scope.lightbox('new');
		await \$scope.${APPNAME.toLowerCase()}.save();
		\$scope.${APPNAME.toLowerCase()} = new ${APPNAME}();
		await \$scope.currentFolder.sync(true);
		\$scope.\$apply();
	};

	\$scope.removeSelection = async () => {
		\$scope.lightbox('confirmRemove');
		await \$scope.currentFolder.delete();
		await \$scope.currentFolder.sync(true);
		\$scope.\$apply();
	};

	\$scope.restore = async () => {
		await Library.instance.trash.restore();
		\$scope.\$apply();
	};

	\$scope.view = (resource: ${APPNAME}) => {
		\$location.path('/view/' + resource._id);
	}

	\$scope.openRoot = async () => {
		template.open('library/toaster', 'library/root-toaster');
		\$scope.currentFolder = Library.instance.root;
		await \$scope.currentFolder.sync();
		\$scope.\$apply();
	}

	\$scope.openTrash = async () => {
		template.open('library/toaster', 'library/trash-toaster');
		\$scope.currentFolder = Library.instance.trash;
		await \$scope.currentFolder.sync();
		\$scope.\$apply();
	}

	\$scope.openRoot();
}]);