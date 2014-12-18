var ${APPNAME.toLowerCase()}Resources = {
	read: {
		right: "${ORGANISATION.replaceAll('[.]', '-')}-${APPNAME.toLowerCase()}-controllers-${APPNAME}Controller|get${APPNAME}"
	},
	contrib: {
		right: "${ORGANISATION.replaceAll('[.]', '-')}-${APPNAME.toLowerCase()}-controllers-${APPNAME}Controller|update${APPNAME}"
	},
	manager: {
		right: "${ORGANISATION.replaceAll('[.]', '-')}-${APPNAME.toLowerCase()}-controllers-${APPNAME}Controller|addRights"
	}
};

Behaviours.register('${APPNAME.toLowerCase()}', {
	rights: {
		workflow: {
			view: '${ORGANISATION}.${APPNAME.toLowerCase()}.controllers.${APPNAME}Controller|view',
			create: '${ORGANISATION}.${APPNAME.toLowerCase()}.controllers.${APPNAME}Controller|create${APPNAME}'
		}
	},
	dependencies: {},
	resource: function(resource){
		if(!resource.myRights){
			resource.myRights = {};
		}

		for(var behaviour in ${APPNAME.toLowerCase()}Resources){
			if(model.me.hasRight(resource, ${APPNAME.toLowerCase()}Resources[behaviour]) || model.me.userId === resource.owner.userId){
				if(resource.myRights[behaviour] !== undefined){
					resource.myRights[behaviour] = resource.myRights[behaviour] && ${APPNAME.toLowerCase()}Resources[behaviour];
				}
				else{
					resource.myRights[behaviour] = ${APPNAME.toLowerCase()}Resources[behaviour];
				}
			}
		}

		if(model.me.userId === resource.owner){
			resource.myRights.share = ${APPNAME.toLowerCase()}Resources[behaviour];
		}

		return resource;
	},
	resourceRights: function(){
		return ['read', 'contrib', 'manager']
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
