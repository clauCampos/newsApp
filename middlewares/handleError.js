export const handleError = (error, request, response, next) => {
    console.error(error);

    response.statusCode = error.statusCode || 500;
    response.send({ status: "error", message: error.message });
};