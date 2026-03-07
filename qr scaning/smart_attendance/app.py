from flask import Flask,render_template,request,jsonify
import qrcode
import sqlite3
from geopy.distance import geodesic
import time
from datetime import datetime

app = Flask(__name__)

TEACHER_LOCATION = (17.3850,78.4867)
MAX_DISTANCE = 50


def init_db():
    conn = sqlite3.connect("attendance.db")
    c = conn.cursor()

    c.execute("""
    CREATE TABLE IF NOT EXISTS attendance(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id TEXT,
        session_id TEXT,
        date TEXT,
        time TEXT,
        latitude REAL,
        longitude REAL
    )
    """)

    conn.commit()
    conn.close()

init_db()


@app.route("/")
def teacher():
    return render_template("teacher.html")


@app.route("/student")
def student():
    return render_template("student.html")


@app.route("/generate_qr")
def generate_qr():

    session = str(int(time.time()))

    qr = qrcode.make(session)
    qr.save("static/qr.png")

    return jsonify({
        "qr":"/static/qr.png",
        "session":session
    })


@app.route("/mark_attendance",methods=["POST"])
def mark():

    data = request.json

    student = data["student_id"]
    session = data["qr"]
    lat = float(data["lat"])
    lon = float(data["lon"])

    student_loc = (lat,lon)

    distance = geodesic(TEACHER_LOCATION,student_loc).meters

    if distance > MAX_DISTANCE:

        return jsonify({
            "status":"failed",
            "msg":"You are outside classroom range"
        })


    conn = sqlite3.connect("attendance.db")
    c = conn.cursor()

    # prevent duplicate attendance
    c.execute("""
    SELECT * FROM attendance
    WHERE student_id=? AND session_id=?
    """,(student,session))

    result = c.fetchone()

    if result:
        return jsonify({
            "status":"error",
            "msg":"Attendance already marked"
        })


    now = datetime.now()

    date = now.strftime("%Y-%m-%d")
    time_now = now.strftime("%H:%M:%S")


    c.execute("""
    INSERT INTO attendance
    (student_id,session_id,date,time,latitude,longitude)
    VALUES (?,?,?,?,?,?)
    """,(student,session,date,time_now,lat,lon))

    conn.commit()
    conn.close()

    return jsonify({
        "status":"success",
        "msg":"Attendance marked successfully"
    })


@app.route("/attendance")
def view_attendance():

    conn = sqlite3.connect("attendance.db")
    c = conn.cursor()

    c.execute("SELECT * FROM attendance")

    data = c.fetchall()

    conn.close()

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)