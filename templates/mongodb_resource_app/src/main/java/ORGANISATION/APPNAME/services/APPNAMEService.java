package ${ORGANISATION}.${APPNAME.toLowerCase()}.services;

import org.entcore.common.user.UserInfos;
import org.vertx.java.core.Handler;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;

import ${ORGANISATION}.webutils.Either;

/**
 * Generic REST service for ${APPNAME}.
 */
public interface ${APPNAME}Service {

	//CRUD
	public void create${APPNAME}(UserInfos user, JsonObject data, Handler<Either<String, JsonObject>> handler);
	public void get${APPNAME}(String id, Handler<Either<String, JsonObject>> handler);
	public void list${APPNAME}(UserInfos user, Handler<Either<String, JsonArray>> handler);
	public void update${APPNAME}(String id, JsonObject data, Handler<Either<String, JsonObject>> handler);
	public void delete${APPNAME}(String id, Handler<Either<String, JsonObject>> handler);

	//TRASHBIN
	public void trash${APPNAME}(String id, Handler<Either<String, JsonObject>> handler);
	public void recover${APPNAME}(String id, Handler<Either<String, JsonObject>> handler);

}
