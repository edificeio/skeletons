package ${ORGANISATION}.${APPNAME.toLowerCase()}.controllers;

import static org.entcore.common.http.response.DefaultResponseHandler.arrayResponseHandler;
import static org.entcore.common.http.response.DefaultResponseHandler.defaultResponseHandler;
import ${ORGANISATION}.${APPNAME.toLowerCase()}.services.${APPNAME}Service;
import ${ORGANISATION}.${APPNAME.toLowerCase()}.services.${APPNAME}ServiceMongoImpl;
import fr.wseduc.rs.*;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;
import fr.wseduc.webutils.Either;
import fr.wseduc.webutils.request.RequestUtils;

import org.entcore.common.mongodb.MongoDbControllerHelper;
import org.entcore.common.user.UserInfos;
import org.entcore.common.user.UserUtils;
import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;

/**
 * Vert.x backend controller for the application using Mongodb.
 */
public class ${APPNAME}Controller extends MongoDbControllerHelper {

	//Computation service
	private final ${APPNAME}Service ${APPNAME.toLowerCase()}Service;

	//Permissions
	private static final String
		read_only 			= "${APPNAME.toLowerCase()}.view",
		modify 				= "${APPNAME.toLowerCase()}.create",
		manage_ressource	= "${APPNAME.toLowerCase()}.manager",
		contrib_ressource	= "${APPNAME.toLowerCase()}.contrib",
		view_ressource		= "${APPNAME.toLowerCase()}.read";

	/**
	 * Creates a new controller.
	 * @param collection Name of the collection stored in the mongoDB database.
	 */
	public ${APPNAME}Controller(String collection) {
		super(collection);
		${APPNAME.toLowerCase()}Service = new ${APPNAME}ServiceMongoImpl(collection);
	}

	/**
	 * Displays the home view.
	 * @param request Client request
	 */
	@Get("")
	@SecuredAction(read_only)
	public void view(HttpServerRequest request) {
		renderView(request);
	}

	//////////////
	//// CRUD ////
	//////////////

	/**
	 * Creates a new ${APPNAME.toLowerCase()}.
	 * @param request Client request.
	 */
	@Post("")
	@SecuredAction(modify)
	public void create${APPNAME}(final HttpServerRequest request) {
		UserUtils.getUserInfos(eb, request, new Handler<UserInfos>() {
			public void handle(final UserInfos user) {
				if (user != null) {
					RequestUtils.bodyToJson(request, pathPrefix + "create", new Handler<JsonObject>() {
						public void handle(JsonObject data) {
							${APPNAME.toLowerCase()}Service.create${APPNAME}(user, data, defaultResponseHandler(request));
						}
					});
				}
			}
		});
	}

	/**
	 * Returns the associated data.
	 * @param request Client request containing the id.
	 */
	@Get("/get/:id")
	@SecuredAction(value = view_ressource, type = ActionType.RESOURCE)
	public void get${APPNAME}(final HttpServerRequest request) {
		${APPNAME.toLowerCase()}Service.get${APPNAME}(request.params().get("id"), defaultResponseHandler(request));
	}

	/**
	 * Lists every object associated with the user.
	 * @param request Client request.
	 */
	@Get("/list")
	@SecuredAction(value = read_only, type = ActionType.AUTHENTICATED)
	public void list${APPNAME}(final HttpServerRequest request) {
		UserUtils.getUserInfos(eb, request, new Handler<UserInfos>() {
			public void handle(final UserInfos user) {
				if (user != null) {
					Handler<Either<String, JsonArray>> handler = arrayResponseHandler(request);
					${APPNAME.toLowerCase()}Service.list${APPNAME}(user, handler);
				}
			}
		});
	}

	/**
	 * Updates a single ${APPNAME.toLowerCase()}.
	 * @param request Client request.
	 */
	@Put("/:id")
	@SecuredAction(value = contrib_ressource, type = ActionType.RESOURCE)
	public void update${APPNAME}(final HttpServerRequest request) {
		RequestUtils.bodyToJson(request, pathPrefix + "update", new Handler<JsonObject>() {
			public void handle(JsonObject data) {
				${APPNAME.toLowerCase()}Service.update${APPNAME}(request.params().get("id"), data, defaultResponseHandler(request));
			}
		});
	}

	/**
	 * Deletes a single ${APPNAME.toLowerCase()}.
	 * @param request Client request.
	 */
	@Delete("/:id")
	@SecuredAction(value = manage_ressource, type = ActionType.RESOURCE)
	public void delete${APPNAME}(final HttpServerRequest request) {
		${APPNAME.toLowerCase()}Service.delete${APPNAME}(request.params().get("id"), defaultResponseHandler(request));
	}

	///////////////////
	//// TRASH BIN ////
	///////////////////

	/**
	 * Puts a ${APPNAME.toLowerCase()} into the trash bin.
	 * @param request Client request containing the id.
	 */
	@Put("/:id/trash")
	@SecuredAction(value = manage_ressource, type = ActionType.RESOURCE)
	public void trash${APPNAME}(final HttpServerRequest request) {
		final String id = request.params().get("id");
		${APPNAME.toLowerCase()}Service.trash${APPNAME}(id, defaultResponseHandler(request));
	}

	/**
	 * Recovers a ${APPNAME.toLowerCase()} from the trash bin.
	 * @param request Client request containing the id.
	 */
	@Put("/:id/recover")
	@SecuredAction(value = manage_ressource, type = ActionType.RESOURCE)
	public void recover${APPNAME}(final HttpServerRequest request) {
		final String id = request.params().get("id");
		${APPNAME.toLowerCase()}Service.recover${APPNAME}(id, defaultResponseHandler(request));
	}

	/////////////////
	//// SHARING ////
	/////////////////

	/**
	 * Lists sharing rights.
	 * @param request Client request containing the id.
	 */
	@Get("/share/json/:id")
	@SecuredAction(value = view_ressource, type = ActionType.RESOURCE)
	public void listRights(final HttpServerRequest request) {
		super.shareJson(request, false);
	}

	/**
	 * Adds sharing rights.
	 * @param request Client request containing the id.
	 */
	@Put("/share/json/:id")
	@SecuredAction(value = manage_ressource, type = ActionType.RESOURCE)
	public void addRights(final HttpServerRequest request) {
		super.shareJsonSubmit(request, "notify-share.html", false);
	}

	/**
	 * Drops sharing rights.
	 * @param request Client request containing the id.
	 */
	@Put("/share/remove/:id")
	@SecuredAction(value = manage_ressource, type = ActionType.RESOURCE)
	public void dropRights(final HttpServerRequest request) {
		super.removeShare(request, false);
	}

}
