const checkUsernameExists = (database, username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    database.query(query, [username], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results.length > 0); // true if exists, false if not
    });
};

module.exports = checkUsernameExists;