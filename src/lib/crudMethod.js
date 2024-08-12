import { connection } from '../config/connection.config.js'

export const listAll = (columns, table_name) => {
    return connection(table_name)
        .select(columns)
}

export const listWhere = (columns, params = {}, table_name) => {
    return connection(table_name)
        .select(columns)
        .where(params)
}

export const create = (object, table_name) => {
    return connection(table_name)
        .insert(object)
}

export const update = (params, object, table_name) => {
    return connection(table_name)
        .where(params)
        .update(object)   
}

export const deleteWhere = (params = {}, table_name) => {
    return connection(table_name)
        .where(params)
        .del()
}