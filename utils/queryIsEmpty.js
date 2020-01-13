const queryIsEmpty = query =>
    query === undefined ||
    query === null ||
    (typeof query === "object" && Object.keys(query).length === 0) ||
    (typeof query === "string" && query.trim().length === 0);

module.exports = queryIsEmpty;