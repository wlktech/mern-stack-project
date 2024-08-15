const paginate = (total, limit, current) => {
    let page = Number(current);
    let totalPages = Math.ceil(total / limit);
    let next = page < totalPages ? page + 1 : null;
    let prev = page > 1 ? page - 1 : null;
    let start = ((page - 1) * limit) + 1;
    let end = next === null ? total : page * limit;

    let links = {
        next,
        prev,
        loopableLinks : [],
        current : page,
        totalPages,
        limit,
        start,
        end,
        total
    }
    for(let i = 1; i <= totalPages; i++){
        links.loopableLinks.push(i);
    }
    return links;
}

module.exports = paginate;