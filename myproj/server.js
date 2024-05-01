var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: '34.70.237.30',
                user: 'root',
                password: 'test1234',
                database: 'inside_out'
});

connection.connect;

var app = express();

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('index', { title: 'View Students' });
});

app.get('/success', function(req, res) {
  res.send(`
    <html>
      <head>
        <title>Success</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          h1 {
            text-align: center;
            color: #007bff;
          }
          button {
            display: block;
            margin: 20px auto 0;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Course added successfully to roster</h1>
          <button onclick="window.location.href='/'">Close</button>
        </div>
      </body>
    </html>
  `);
});
 
app.get('/success2', function(req, res) {
  res.send(`
    <html>
      <head>
        <title>Success</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          h1 {
            text-align: center;
            color: #007bff;
          }
          button {
            display: block;
            margin: 20px auto 0;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Rating added successfully to roster</h1>
          <button onclick="window.location.href='/'">Close</button>
        </div>
      </body>
    </html>
  `);
});

app.get('/success3', function(req, res) {
  res.send(`
    <html>
      <head>
        <title>Success</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          h1 {
            text-align: center;
            color: #007bff;
          }
          button {
            display: block;
            margin: 20px auto 0;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Student name updated successfully</h1>
          <button onclick="window.location.href='/'">Close</button>
        </div>
      </body>
    </html>
  `);
});
// this code is executed when a user clicks the form submit button
app.post('/scheduleeditor', function(req, res) {
  var netid = req.body.netid2;
  var crn = req.body.crn;
   
  var sql = `INSERT INTO ENROLLS (NetId, CRN) VALUES ('${netid}', '${crn}')`;

   console.log(sql);
   connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
   connection.query('CALL UpdateUserYearIf18Credits(?)', [netid], function(err) {
      if (err) {
        res.send(err);
        return;
    }
    res.redirect('/success');
    });
  });
});

app.post('/modify', function(req, res) {
  var netid = req.body.netid;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
   
  var sql = `UPDATE USER SET FirstName = ?, LastName = ? WHERE NetId = ?`;

console.log(sql);
  connection.query(sql, [first_name, last_name, netid], function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/success3');
  });
});

app.post('/addteachereditor', function(req, res) {
  var netid = req.body.netid3;
  var teacher = req.body.teacher3;
  var rating = req.body.rating;
  var class_difficulty = req.body.class_difficulty;
  var time_spent = req.body.time_spent;
 
  var sql = `INSERT INTO RATES (NetID, Name, Rating, ClassDifficulty, TimeSpent) VALUES ('${netid}', '${teacher}', '${rating}', '${class_difficulty}', '${time_spent}')`;

console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/success2');
  });
});

app.get('/api/teacher', function(req, res) {
 var sql = 'CALL HighLowDifficulty;';
 console.log(sql);
  connection.query(sql, function(err, results) {
    if (err) {
      console.error('Error fetching attendance data:', err);
      res.status(500).send({ message: 'Error fetching attendance data', error: err });
      return;
    }
    res.json(results);
  });
});

app.get('/api/student/find', function(req, res) {
  var netid = req.query.netid;
  console.log('Received request for Net ID:', netid);
  var sql = 'SELECT * FROM USER WHERE NetId = ?';

  connection.query(sql, [netid], function(err, results) {
    if (err) {
      console.error('Error fetching attendance data:', err);
      res.status(500).send({ message: 'Error fetching attendance data', error: err });
      return;
    }
    res.json(results);
  });
});

app.get('/api/student/schedule', function(req, res) {
  var netid = req.query.netid;
  console.log('Received enroll for Net ID:', netid);
  var sql = 'SELECT * FROM ENROLLS WHERE NetId = ?';

  connection.query(sql, [netid], function(err, results) {
    if (err) {
      console.error('Error fetching attendance data:', err);
      res.status(500).send({ message: 'Error fetching attendance data', error: err });
      return;
    }
    res.json(results);
  });
});

app.get('/api/teacher/find', function(req, res) {
  var teacher = req.query.teacher;
  console.log('Received request for teacher:', teacher);
  var sql = 'SELECT * FROM RATES WHERE Name = ?';

  connection.query(sql, [teacher], function(err, results) {
    if (err) {
      console.error('Error fetching attendance data:', err);
      res.status(500).send({ message: 'Error fetching attendance data', error: err });
      return;
    }
    res.json(results);
  });
});

app.get('/api/courses', function(req, res) {
  var sortBy = req.query.sortBy;
  console.log('Received request for teacher:', sortBy);
  var sql = `SELECT * FROM COURSE ORDER BY ${sortBy}`;  

  connection.query(sql, function(err, results) {
    if (err) {
      console.error('Error fetching attendance data:', err);
      res.status(500).send({ message: 'Error fetching attendance data', error: err });
      return;
    }
    res.json(results);
  });
});

app.get('/api/research', function(req, res) {
  var sortBy = req.query.sortBy;
  var sql = `SELECT r.ResearchName as ResearchName, r.Field as Field, COUNT(*) as NumStudents FROM RESEARCH r NATURAL JOIN CONTRIBUTES c GROUP BY r.ResearchName ORDER BY NumStudents ${sortBy}`;  

  connection.query(sql, function(err, results) {
    if (err) {
      console.error('Error fetching attendance data:', err);
      res.status(500).send({ message: 'Error fetching attendance data', error: err });
      return;
    }
    res.json(results);
  });
});

app.delete('/api/schedule/delete', function(req, res) {
  var netid = req.body.netid;
  var crn = req.body.crn;

  var sql = 'DELETE FROM ENROLLS WHERE NetId = ? AND CRN = ?';

  connection.query(sql, [netid, crn], function(err, result) {
    if (err) {
      console.error('Error deleting attendance record:', err);
      res.status(500).send({ message: 'Error deleting attendance record', error: err });
      return;
    }
    if(result.affectedRows === 0) {
      // No rows were affected, meaning no record was found with that ID
      res.status(404).send({ message: 'Record not found' });
    } else {
      res.send({ message: 'Attendance record deleted successfully' });
    }
  });
});


app.listen(80, function () {
    console.log('Node app is running on port 80');
});
