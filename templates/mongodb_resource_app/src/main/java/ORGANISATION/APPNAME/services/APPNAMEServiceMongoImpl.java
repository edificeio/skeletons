package ${ORGANISATION}.${APPNAME.toLowerCase()}.services;

import java.util.ArrayList;
import java.util.List;

import org.entcore.common.mongodb.MongoDbResult;
import org.entcore.common.service.impl.MongoDbCrudService;
import org.entcore.common.user.UserInfos;
import org.vertx.java.core.Handler;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;

import com.mongodb.DBObject;
import com.mongodb.QueryBuilder;
import com.mongodb.util.JSON;

import fr.wseduc.mongodb.MongoDb;
import fr.wseduc.mongodb.MongoQueryBuilder;
import fr.wseduc.webutils.Either;

/**
 * MongoDB implementation of the REST service.
 * Methods are usually self-explanatory.
 */
public class ${APPNAME}ServiceMongoImpl extends MongoDbCrudService implements ${APPNAME}Service{

	private final String collection;
	private final MongoDb mongo;

	public ${APPNAME}ServiceMongoImpl(final String collection) {
		super(collection);
		this.collection = collection;
		this.mongo = MongoDb.getInstance();
	}

	public void create${APPNAME}(UserInfos user, JsonObject data, Handler<Either<String, JsonObject>> handler) {
		data.putNumber("trashed", 0);
		data.putString("name", data.getString("title"));
		super.create(data, user, handler);
	}

	public void list${APPNAME}(UserInfos user, Handler<Either<String, JsonArray>> handler) {
		List<DBObject> groups = new ArrayList<>();
		groups.add(QueryBuilder.start("userId").is(user.getUserId()).get());
		for (String gpId : user.getProfilGroupsIds()) {
			groups.add(QueryBuilder.start("groupId").is(gpId).get());
		}

		QueryBuilder query = new QueryBuilder().or(
				QueryBuilder.start("owner.userId").is(user.getUserId()).get(),
				QueryBuilder.start("shared").elemMatch(new QueryBuilder().or(groups.toArray(new DBObject[groups.size()])).get()).get());

		JsonObject projection = new JsonObject();

		mongo.find(collection, MongoQueryBuilder.build(query), new JsonObject(), projection, MongoDbResult.validResultsHandler(handler));
	}

	public void get${APPNAME}(String id, Handler<Either<String, JsonObject>> handler) {
		mongo.findOne(collection, MongoQueryBuilder.build(QueryBuilder.start("_id").is(id)), MongoDbResult.validResultHandler(handler));
	}

	public void update${APPNAME}(String id, JsonObject data, Handler<Either<String, JsonObject>> handler) {
		String thumbnail = data.getString("thumbnail");
		data.putString("thumbnail", thumbnail == null ? "" : thumbnail);
		if(data.containsField("title"))
			data.putString("name", data.getString("title"));
		super.update(id, data, handler);
	}

	public void trash${APPNAME}(String id, Handler<Either<String, JsonObject>> handler) {
		JsonObject data = new JsonObject();
		data.putNumber("trashed", 1);

		super.update(id, data, handler);
	}

	public void recover${APPNAME}(String id, Handler<Either<String, JsonObject>> handler) {
		JsonObject data = new JsonObject();
		data.putNumber("trashed", 0);

		super.update(id, data, handler);
	}

	public void delete${APPNAME}(String id, Handler<Either<String, JsonObject>> handler) {
		super.delete(id, handler);
	}

}
