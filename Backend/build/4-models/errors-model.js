"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.RouteNotFoundError = exports.ResourceNotFoundError = void 0;
class ClientError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}
class ResourceNotFoundError extends ClientError {
    constructor(id) {
        super(404, `Id ${id} not found`);
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
class RouteNotFoundError extends ClientError {
    constructor(method, route) {
        super(404, `Route ${route} on method ${method} not exist`);
    }
}
exports.RouteNotFoundError = RouteNotFoundError;
class ValidationError extends ClientError {
    constructor(message) {
        super(400, message);
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends ClientError {
    constructor(message) {
        super(401, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
// User tries to enter somewhere which he don't have permission to:
class ForbiddenError extends ClientError {
    constructor(message) {
        super(403, message);
    }
}
exports.ForbiddenError = ForbiddenError;
