import pool from '../config/db.js';

export const getAllHorses = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search || '';
        const offset = (page - 1) * limit;

        let dataSql = '';
        let countSql = '';
        let params = [];

        if (search) {
            const searchPattern = `%${search}%`;
            dataSql = `
                SELECT id, name, foalingDate, sireId, sireName, damId, damName, damSireId, damSireName
                FROM horses 
                WHERE name LIKE ? 
                ORDER BY foalingDate ASC 
                LIMIT ? OFFSET ?`;
            countSql = `SELECT COUNT(*) as total FROM horses WHERE name LIKE ?`;
            params = [searchPattern, limit, offset];
        } else {
            dataSql = `
                SELECT id, name, foalingDate, sireId, sireName, damId, damName, damSireId, damSireName
                FROM horses 
                ORDER BY foalingDate ASC 
                LIMIT ? OFFSET ?`;
            countSql = `SELECT COUNT(*) as total FROM horses`;
            params = [limit, offset];
        }

        const [rows] = await pool.query(dataSql, params);
        
        const countParams = search ? [params[0]] : [];
        const [[{ total }]] = await pool.query(countSql, countParams);

        const hasMore = offset + rows.length < total;

        res.json({
            data: rows,
            totalCount: total,
            currentPage: page,
            hasMore: hasMore
        });
    } catch (err) {
        next(err);
    }
};

export const getSearchHorses = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search || '';
        const offset = (page - 1) * limit;

        let dataSql = '';
        let countSql = '';
        let params = [];

        if (search) {
            const searchPattern = `%${search}%`;
            dataSql = `
                SELECT id, name, foalingDate 
                FROM horses 
                WHERE name LIKE ? 
                ORDER BY foalingDate ASC 
                LIMIT ? OFFSET ?`;
            countSql = `SELECT COUNT(*) as total FROM horses WHERE name LIKE ?`;
            params = [searchPattern, limit, offset];
        } else {
            dataSql = `
                SELECT id, name, foalingDate 
                FROM horses 
                ORDER BY foalingDate ASC 
                LIMIT ? OFFSET ?`;
            countSql = `SELECT COUNT(*) as total FROM horses`;
            params = [limit, offset];
        }

        const [rows] = await pool.query(dataSql, params);
        
        const countParams = search ? [params[0]] : [];
        const [[{ total }]] = await pool.query(countSql, countParams);

        const hasMore = offset + rows.length < total;

        res.json({
            data: rows,
            totalCount: total,
            currentPage: page,
            hasMore: hasMore
        });
    } catch (err) {
        next(err);
    }
};

export const getPedigree = async (req, res, next) => {
    const { id } = req.params;
    const sql = `
        SELECT h.id, h.name, h.sex, h.foalingDate,
               s.name AS sire_name, d.name AS dam_name
        FROM horses h
        LEFT JOIN horses s ON h.sire_id = s.id
        LEFT JOIN horses d ON h.dam_id = d.id
        WHERE h.id = ?`;
    try {
        const [rows] = await pool.query(sql, [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Horse not found" });
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
};