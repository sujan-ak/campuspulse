from flask import Flask, render_template, request, jsonify
import qrcode
import sqlite3
from geopy.distance import geodesic
import time
from datetime import datetime

app = Flask(__name__)

# Teacher classroom location
TEACHER_LOCATION = (17.3850, 78.4867)

# Maximum allowed distance (meters)
MAX_DISTANCE = 100


# ---------------- DATABASE ---------------- #

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


# ---------------- PAGES ---------------- #

@app.route("/")
def teacher():
    return render_template("teacher.html")


@app.route("/student")
def student():
    return render_template("student.html")


# ---------------- QR GENERATION ---------------- #
@app.route("/generate_qr", methods=["POST"])
def generate_qr():

    global TEACHER_LOCATION

    data = request.json

    lat = float(data["lat"])
    lon = float(data["lon"])

    TEACHER_LOCATION = (lat, lon)

    print("Teacher classroom location set:", TEACHER_LOCATION)

    session = str(int(time.time()))

    class_link = "https://nongenealogical-unlittered-cathie.ngrok-free.dev/student?session=" + session

    qr = qrcode.make(class_link)
    qr.save("static/qr.png")

    return jsonify({
        "qr": "/static/qr.png",
        "session": session
    })

# ---------------- MARK ATTENDANCE ---------------- #

@app.route("/mark_attendance", methods=["POST"])
def mark():

    data = request.json

    student = data["student_id"]
    session = data["qr"]
    lat = float(data["lat"])
    lon = float(data["lon"])

    student_loc = (lat, lon)

    # Calculate distance
    distance = geodesic(TEACHER_LOCATION, student_loc).meters

    # Debug info (shown in terminal)
    print("Student location:", lat, lon)
    print("Teacher location:", TEACHER_LOCATION)
    print("Distance:", distance)

    # Check classroom radius
    if distance > MAX_DISTANCE:
        return jsonify({
            "status": "failed",
            "msg": "You are outside classroom range",
            "distance": round(distance, 2)
        })

    conn = sqlite3.connect("attendance.db")
    c = conn.cursor()

    # Prevent duplicate attendance
    c.execute("""
    SELECT * FROM attendance
    WHERE student_id=? AND session_id=?
    """, (student, session))

    result = c.fetchone()

    if result:
        conn.close()
        return jsonify({
            "status": "error",
            "msg": "Attendance already marked"
        })

    now = datetime.now()

    date = now.strftime("%Y-%m-%d")
    time_now = now.strftime("%H:%M:%S")

    c.execute("""
    INSERT INTO attendance
    (student_id,session_id,date,time,latitude,longitude)
    VALUES (?,?,?,?,?,?)
    """, (student, session, date, time_now, lat, lon))

    conn.commit()
    conn.close()

    return jsonify({
        "status": "success",
        "msg": "Attendance marked successfully",
        "time": time_now,
        "distance": round(distance, 2)
    })


# ---------------- VIEW ATTENDANCE ---------------- #

@app.route("/attendance")
def view_attendance():

    conn = sqlite3.connect("attendance.db")
    c = conn.cursor()

    c.execute("SELECT * FROM attendance")

    data = c.fetchall()

    conn.close()

    return jsonify(data)


# ---------------- RUN SERVER ---------------- #

if __name__ == "__main__":
    app.run(debug=True)