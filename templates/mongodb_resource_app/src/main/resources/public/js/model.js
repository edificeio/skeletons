//  [${APPNAME.toUpperCase()}]   //
function ${APPNAME}(){}
${APPNAME}.prototype = {
	API_PATH 	: "/${APPNAME.toLowerCase()}",

	delete 		: function(){ return http().delete	(this.API_PATH + '/' + this._id).done(function(){ notify.info('${APPNAME.toLowerCase()}.notify.deleted') }) },
	trash 		: function(){ return http().put		(this.API_PATH + '/' + this._id + '/trash').done(function(){ notify.info('${APPNAME.toLowerCase()}.notify.trashed') }) },
	restore 	: function(){ return http().put		(this.API_PATH + '/' + this._id + '/recover').done(function(){ notify.info('${APPNAME.toLowerCase()}.notify.restored') }) },
	create 		: function(hook){
		var ${APPNAME.toLowerCase()} = this
		return http().postJson(this.API_PATH, {
			"title": 		${APPNAME.toLowerCase()}.title,
			"thumbnail": 	(${APPNAME.toLowerCase()}.thumbnail === undefined ? "" : ${APPNAME.toLowerCase()}.thumbnail)
		}).done(function(){ notify.info('${APPNAME.toLowerCase()}.notify.saved'); hook() })
	},
	update : function(hook){
		var ${APPNAME.toLowerCase()} = this
		return http().putJson(this.API_PATH + '/' + this._id, {
			"title": 		${APPNAME.toLowerCase()}.title,
			"thumbnail": 	${APPNAME.toLowerCase()}.thumbnail
		}).done(function(){ notify.info('${APPNAME.toLowerCase()}.notify.modified'); hook() })
	},
    get : function(hook){
        var ${APPNAME.toLowerCase()} = this
        return http().get(this.API_PATH + "/get/" + this._id).done(function(data){
            for (var prop in data) {
                if (data.hasOwnProperty(prop)){
                    ${APPNAME.toLowerCase()}[prop] = data[prop]
                }
            }
            hook()
        })
    }
}

//  [${APPNAME.toUpperCase()} COLLECTION]   //
function ${APPNAME}Collection(){
	this.collection(${APPNAME}, {
		behaviours: '${APPNAME.toLowerCase()}',
		folder: 'mine',
		sync: function(){
			http().get("${APPNAME.toLowerCase()}/list").done(function(data){
				this.load(data)
				this.all.forEach(function(item){ delete item.data })
			}.bind(this))
		},
		remove: function(){
			collection = this
			var parsedCount = 0
			this.selection().forEach(function(item){
				if(collection.folder === 'trash'){
					item.delete().done(function(){
						if(++parsedCount === collection.selection().length)
							collection.sync()
					})
				}
				else{
					item.trash().done(function(){
						if(++parsedCount === collection.selection().length)
							collection.sync()
					})
				}
			})
		},
		restore: function(){
			collection = this
			var parsedCount = 0
			this.selection().forEach(function(item){
				item.restore().done(function(){
					if(++parsedCount === collection.selection().length)
						collection.sync()
				})
			})
		}
	})
}

///////////////////////
///   MODEL.BUILD   ///

model.build = function(){
	model.me.workflow.load(['${APPNAME.toLowerCase()}'])
	this.makeModels([${APPNAME}, ${APPNAME}Collection])

	this.${APPNAME.toLowerCase()}Collection = new ${APPNAME}Collection()
}

///////////////////////
