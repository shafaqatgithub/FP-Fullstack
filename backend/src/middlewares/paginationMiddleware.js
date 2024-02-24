export default function paginateResults(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const offset = (page - 1) * perPage;
    const limit = perPage;

    req.pagination = {
        offset,
        limit,
    };

    next();
}
