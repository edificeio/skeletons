package ${ORGANISATION}.${APPNAME.toLowerCase()};

import org.entcore.common.http.BaseServer;
import org.entcore.common.http.filter.ShareAndOwner;
import org.entcore.common.mongodb.MongoDbConf;

import ${ORGANISATION}.${APPNAME.toLowerCase()}.controllers.${APPNAME}Controller;

public class ${APPNAME} extends BaseServer {

	public final static String ${APPNAME.toUpperCase()}_COLLECTION = "${APPNAME.toLowerCase()}";

	@Override
	public void start() {
		super.start();
		addController(new ${APPNAME}Controller(${APPNAME.toUpperCase()}_COLLECTION));
		MongoDbConf.getInstance().setCollection(${APPNAME.toUpperCase()}_COLLECTION);
		setDefaultResourceFilter(new ShareAndOwner());
	}

}
