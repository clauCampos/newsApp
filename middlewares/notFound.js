export const notFound = (request, response) => {
    response.status(404).send({
        status: "error", message: "Not found",
    })
};