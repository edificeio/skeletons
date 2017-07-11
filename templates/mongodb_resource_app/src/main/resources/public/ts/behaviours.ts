import { Behaviours } from 'entcore';
import http from 'axios';

Behaviours.register('${APPNAME.toLowerCase()}', {
	rights: {
		workflow: {
			view: '${ORGANISATION}.${APPNAME.toLowerCase()}.controllers.${APPNAME}Controller|view',
			create: '${ORGANISATION}.${APPNAME.toLowerCase()}.controllers.${APPNAME}Controller|create${APPNAME}'
		},
		resource: {
			read: "${ORGANISATION.replaceAll('[.]', '-')}-${APPNAME.toLowerCase()}-controllers-${APPNAME}Controller|get${APPNAME}",
			contrib: "${ORGANISATION.replaceAll('[.]', '-')}-${APPNAME.toLowerCase()}-controllers-${APPNAME}Controller|update${APPNAME}",
			manager: "${ORGANISATION.replaceAll('[.]', '-')}-${APPNAME.toLowerCase()}-controllers-${APPNAME}Controller|addRights"
		}
	},
	loadResources: async function(callback){
		const response = await http.get('/${APPNAME.toLowerCase()}/list');
		this.resources = response.data.filter(e => e.trashed === 0).map((${APPNAME.toLowerCase()}) => {
			${APPNAME.toLowerCase()}.icon = ${APPNAME.toLowerCase()}.icon || '/img/illustrations/${APPNAME.toLowerCase()}-default.png';
			return {
				title: ${APPNAME.toLowerCase()}.title,
				owner: ${APPNAME.toLowerCase()}.owner,
				icon: ${APPNAME.toLowerCase()}.icon,
				path: '/${APPNAME.toLowerCase()}#/view-${APPNAME.toLowerCase()}/' + ${APPNAME.toLowerCase()}._id,
				_id: ${APPNAME.toLowerCase()}._id
			};
		});
		return this.resources;
	}
});
