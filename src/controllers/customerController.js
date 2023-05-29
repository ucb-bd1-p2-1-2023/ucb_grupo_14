const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user', (err, users) => {
            if (err) {
                res.json(err);
            }
            res.render('users', {
                data: users
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al conectar con la base de datos');
            return;
        }

        // Verificar si el usuario ya existe
        conn.query('SELECT * FROM user WHERE email = ?', [data.email], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al verificar si el usuario existe');
                return;
            }

            if (rows.length > 0) {
                // El usuario ya existe, retornar un mensaje indicando esto
                res.status(400).send('El usuario ya existe');
                return;
            }

            // El usuario no existe, realizar la inserción
            conn.query('INSERT INTO user SET ?', data, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al insertar usuario en la base de datos');
                    return;
                }

                console.log(result);
                res.send('Usuario creado exitosamente');
            });
        });
    });
};

controller.job = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al conectar con la base de datos');
            return;
        }

        // Verificar si el usuario ya existe
        conn.query('SELECT * FROM worker WHERE email = ?', [data.email], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al verificar si el usuario existe');
                return;
            }

            if (rows.length > 0) {
                // El usuario ya existe, retornar un mensaje indicando esto
                res.status(400).send('El usuario ya existe');
                return;
            }

            // El usuario no existe, realizar la inserción
            conn.query('INSERT INTO worker SET ?', data, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al insertar usuario en la base de datos');
                    return;
                }

                console.log(result);
                res.send('Usuario creado exitosamente');
            });
        });
    });
};

controller.startUser = (req, res) => {
    const { email, ADRRESS } = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al conectar con la base de datos');
            return;
        }

        // Check if the user exists in the database
        conn.query('SELECT * FROM user WHERE email = ? AND ADRRESS = ?', [email, ADRRESS], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al verificar el inicio de sesión');
                return;
            }

            if (rows.length === 0) {
                // User not found or invalid credentials
                res.status(401).send('Credenciales inválidas');
                return;
            }

            // User found, login successful
            res.send('Inicio de sesión exitoso');
        });
    });
};

controller.startWorker = (req, res) => {
    const { email, ADRRESS } = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al conectar con la base de datos');
            return;
        }

        // Check if the user exists in the database
        conn.query('SELECT * FROM worker WHERE email = ? AND ADRRESS = ?', [email, ADRRESS], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al verificar el inicio de sesión');
                return;
            }

            if (rows.length === 0) {
                // User not found or invalid credentials
                res.status(401).send('Credenciales inválidas');
                return;
            }

            // User found, login successful
            res.send('Inicio de sesión exitoso');
        });
    });
};
module.exports = controller;