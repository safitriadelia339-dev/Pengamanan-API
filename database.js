require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

const DB_SOURCE = process.env.DB_SOURCE || "movies-new.db";

const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        console.error("Gagal terhubung ke database:", err.message);
        throw err;
    } else {
        console.log('Terhubung ke basis data SQLite.');

        // Eksekusi berurutan
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS users`);
            db.run(`DROP TABLE IF EXISTS directors`);
            db.run(`DROP TABLE IF EXISTS movies`);

            db.run(`CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                director TEXT NOT NULL,
                year INTEGER
            )`, (err) => {
                if (err) {
                    console.error("Gagal membuat tabel movies:", err.message);
                } else {
                    console.log("Tabel movies siap digunakan.");
                }
            });

            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'user'
            )`, (err) => {
                if (err) {
                    console.error("Gagal membuat tabel users:", err.message);
                } else {
                    console.log("Tabel users siap digunakan.");
                }
            });

            db.run(`CREATE TABLE IF NOT EXISTS directors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                birth_year INTEGER
            )`, (err) => {
                if (err) {
                    console.error("Gagal membuat tabel directors:", err.message);
                } else {
                    console.log("Tabel directors siap digunakan.");
                }
            });
        });
    }
});

module.exports = db;
