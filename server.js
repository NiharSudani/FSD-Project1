const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_change_this_in_production";

// Enhanced JWT Configuration
const JWT_CONFIG = {
    expiresIn: '24h',
    algorithm: 'HS256'
};

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

// Enhanced Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || "your_session_secret_change_this",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // Change if needed
    database: 'ajio'
});

db.connect(err => {
    if (err) throw err;
    console.log(" MySQL Connected");
});

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home.html'));
});

// Register
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const role = 'user'; // Force role to 'user' regardless of input
    db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, role],
        err => {
            if (err) return res.status(500).send("DB Error");
            res.redirect('/login.html');
        }
    );
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (err, results) => {
            if (err) return res.status(500).send("DB Error");
            if (results.length === 0) return res.status(401).send("Invalid credentials");

            const user = results[0];
            const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });

            res.cookie('token', token, { httpOnly: true });
            req.session.user = user;

            if (user.role === 'admin') {
                res.redirect('/admin.html');
            } else {
                res.redirect('/home.html');
            }
        }
    );
});

// Token Verification
app.get('/verify-token', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Unauthorized");

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send("Invalid token");
        res.json({ success: true, user: decoded });
    });
});

// Product APIs
app.post('/api/products', (req, res) => {
    const { name, image, price } = req.body;
    db.query(
        'INSERT INTO products (name, image, price) VALUES (?, ?, ?)',
        [name, image, price],
        err => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        }
    );
});

app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

app.delete('/api/products/:id', (req, res) => {
    db.query('DELETE FROM products WHERE id = ?', [req.params.id], err => {
        if (err) return res.sendStatus(500);
        res.sendStatus(200);
    });
});

// Banner APIs
app.post('/api/banners', (req, res) => {
    const { image } = req.body;
    db.query(
        'INSERT INTO banners (image) VALUES (?)',
        [image],
        err => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        }
    );
});

app.get('/api/banners', (req, res) => {
    db.query('SELECT * FROM banners', (err, results) => {
        if (err) return res.sendStatus(500);
        res.json(results);
    });
});

app.delete('/api/banners/:id', (req, res) => {
    db.query('DELETE FROM banners WHERE id = ?', [req.params.id], err => {
        if (err) return res.sendStatus(500);
        res.sendStatus(200);
    });
});

// Orders API
app.post('/api/orders', (req, res) => {
    const { name, address, payment, products } = req.body;
    const orderDate = new Date();
    const status = "Pending";

    db.query(
        'INSERT INTO orders (name, address, payment, products, order_date, status) VALUES (?, ?, ?, ?, ?, ?)',
        [name, address, payment, JSON.stringify(products), orderDate, status],
        err => {
            if (err) {
                console.error("Error placing order:", err);
                return res.status(500).send("DB error");
            }
            res.sendStatus(200);
        }
    );
});

app.get('/api/orders', (req, res) => {
    db.query('SELECT * FROM orders ORDER BY order_date DESC', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

// Get products with category
app.get('/api/products/category', (req, res) => {
  const query = "SELECT id, name, price, image, category FROM products";
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
});


// Mark Order as Shipped
app.put('/api/orders/:id/shipped', (req, res) => {
    const orderId = req.params.id;

    const sql = 'UPDATE orders SET status = ? WHERE id = ?';
    db.query(sql, ['Shipped', orderId], (err, result) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).json({ message: 'Error updating order status' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order marked as shipped' });
    });
});

// Get orders with detailed error handling
app.get('/api/orders/detailed', (req, res) => {
  const query = 'SELECT * FROM orders ORDER BY order_date DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error("Failed to fetch orders:", err);
      return res.status(500).send('Failed to fetch orders');
    }
    res.json(results);
  });
});





// Start server
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
