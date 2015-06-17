Behaviours.register('${APPNAME.toLowerCase()}', {
	rights: {
		workflow: {
			view: '${ORGANISATION}.${APPNAME.toLowerCase()}.controllers.${APPNAME}Controller|view',
			create: '${ORGANISATION}.${APPNAME.toLowerCase()}.controllers.${APPNAME}Controller|create${APPNAME}'
		},
		resource: {
			read: {
				right: "${ORGANISATION.replaceAll('[.]', '-')}-${APPNAME.toLowerCase()}-controllers-${APPNAME}Controller|get${APPNAME}"
			},
			contrib: {
				right: "${ORGANISATION.replaceAll('[.]', '-')}-${APPNAME.toLowerCase()}-controllers-${APPNAME}Controller|update${APPNAME}"
			},
			manager: {
				right: "${ORGANISATION.replaceAll('[.]', '-')}-${APPNAME.toLowerCase()}-controllers-${APPNAME}Controller|addRights"
			}
		}
	},
	loadResources: function(callback){
		http().get('/${APPNAME.toLowerCase()}/list').done(function(${APPNAME.toLowerCase()}){
			this.resources = _.map(_.where(${APPNAME.toLowerCase()}, { trashed: 0 }), function(${APPNAME.toLowerCase()}){
				${APPNAME.toLowerCase()}.icon = ${APPNAME.toLowerCase()}.icon || '/img/illustrations/${APPNAME.toLowerCase()}-default.png';
				return {
					title: ${APPNAME.toLowerCase()}.title,
					owner: ${APPNAME.toLowerCase()}.owner,
					icon: ${APPNAME.toLowerCase()}.icon,
					path: '/${APPNAME.toLowerCase()}#/view-${APPNAME.toLowerCase()}/' + ${APPNAME.toLowerCase()}._id,
					_id: ${APPNAME.toLowerCase()}._id
				};
			});
			callback(this.resources);
		}.bind(this));
	}
});
