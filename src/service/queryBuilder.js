
/**
 * @param {staing} tableName => to get all columns
 * @param {*} builder
 * @param {*} query => ctx.state.query
 */
const whereBuilder = (tableName, builder, query) => {
  const schema = bared.schemas.find(i => i.tableName === tableName)
  const columns = Object.keys(schema.attributes).concat(['id'])

  const userQueryKeys = Object.keys(query)
    .filter(i => i.slice(0, 1) !== '_')

  userQueryKeys.forEach(key => {
    const [column, matchKey] = key.split('~')
    if (columns.indexOf(column) >= 0) {
      switch (matchKey) {
        case 'eq':
          builder.where({ [column]: query[key] })
          break

        case 'gt':
          builder.where(column, '>', query[key])
          break

        case 'gte':
          builder.where(column, '>=', query[key])
          break

        case 'lt':
          builder.where(column, '<', query[key])
          break

        case 'lte':
          builder.where(column, '<=', query[key])
          break

        case 'in':
          // query[key] -> [1,2,3]
          // console.log(column, JSON.parse(query[key]))
          builder.whereIn(column, JSON.parse(query[key]))
          break

        case 'nin':
          builder.whereNotIn(column, JSON.parse(query[key]))
          break
        default:
          builder.where({ [column]: query[key] })
          break
      }
    }
  })

  if (query._q) {
    const [key, value] = query._q.split(':')
    if (value) {
      builder.whereILike(key, `%${value}%`)
    }
  }
}

module.exports = { whereBuilder }
