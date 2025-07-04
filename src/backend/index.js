var PORT    = 3000;
var express = require('express');
var app     = express();
var db   = require('./mysql-connector');

app.use(express.json()); 

app.use(express.static('/home/node/app/static/'));


app.get('/devices/', function(req, res, next) {
    db.query('SELECT * FROM Devices', function(error, results, fields) {
        if (error) {
            console.error('Error al consultar la base de datos:', error);
            res.status(500).send('Error al obtener los dispositivos');
            return;
        }
        
        
        const devices = results.map(device => {
            return {
                'id': device.id,
                'name': device.name,
                'description': device.description,
                'state': device.tipo === 0 ? device.valor : null,
                'type': device.tipo,
                'value': device.tipo === 1 ? device.valor : null,
                'icon': device.iconMate
            };
        });
        
        res.send(JSON.stringify(devices)).status(200);
    });
});


app.delete('/devices/:id', function(req, res, next) {
    const id = req.params.id;
    
    db.query("DELETE FROM Devices WHERE id = " + id, function(error, respuesta, campos) {
        if (error == null) {
            console.log(respuesta);
            res.status(200).send({ message: "Dispositivo eliminado" });
        } else {
            console.log(error);
            res.status(404).send({ error: "Fallo la eliminación" });
        }
    });
});


app.put('/devices/:id', function(req, res, next) {
    const id = req.params.id;
    const fields = req.body;

    
    if (!fields || Object.keys(fields).length === 0) {
        return res.status(400).send({ error: "No se enviaron campos para actualizar" });
    }

    
    const setClause = Object.keys(fields).map(key => `${key} = ?`).join(', ');
    const values = Object.values(fields);
    values.push(id);

    const sql = `UPDATE Devices SET ${setClause} WHERE id = ?`;

    db.query(sql, values, function(error, respuesta, campos) {
        if (error == null) {
            res.status(200).send({ message: "Dispositivo actualizado" });
        } else {
            console.log(error);
            res.status(409).send({ error: "Fallo la actualización" });
        }
    });
});


app.post('/devices/', function(req, res, next) {
    const { name, description, tipo, valor, iconMate } = req.body;
    
  
    if (!name || tipo === undefined) {
        return res.status(400).send({ error: "Nombre y tipo son requeridos" });
    }
    
    const sql = "INSERT INTO Devices (name, description, tipo, valor, iconMate) VALUES (?, ?, ?, ?, ?)";
    const values = [name, description, tipo, valor || 0, iconMate || 'device_unknown'];
    
    db.query(sql, values, function(error, resultado, campos) {
        if (error == null) {
            res.status(201).send({ 
                message: "Dispositivo creado exitosamente", 
                id: resultado.insertId 
            });
        } else {
            console.log(error);
            res.status(500).send({ error: "Error al crear el dispositivo" });
        }
    });
});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

