from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from datetime import datetime
from config import db_config


app = Flask(__name__)
CORS(app)  # enable CORS for all routes for simplicity


def get_db_connection():
    """Create and return a new DB connection using mysql-connector-python."""
    return mysql.connector.connect(**db_config)


@app.get('/api/projects')
def get_projects():
    """Return list of projects."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT id, name, status, DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date,
                   DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date, progress
            FROM projects
            ORDER BY id DESC
            """
        )
        projects = cursor.fetchall()
        return jsonify(projects)
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        try:
            cursor.close()
            conn.close()
        except Exception:
            pass


@app.get('/api/updates')
def get_updates():
    """Return recent project updates, joined with project name."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT u.id, u.project_id, p.name AS project_name, u.update_text,
                   DATE_FORMAT(u.timestamp, '%Y-%m-%d %H:%i:%s') AS timestamp
            FROM updates u
            JOIN projects p ON p.id = u.project_id
            ORDER BY u.timestamp DESC
            LIMIT 50
            """
        )
        updates = cursor.fetchall()
        return jsonify(updates)
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        try:
            cursor.close()
            conn.close()
        except Exception:
            pass


@app.post('/api/feedback')
def submit_feedback():
    """Accept feedback and store to DB."""
    try:
        payload = request.get_json(force=True)
        name = (payload.get('name') or '').strip()
        email = (payload.get('email') or '').strip()
        feedback_text = (payload.get('feedback') or '').strip()
        if not name or not email or not feedback_text:
            return jsonify({"error": "Missing fields"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO feedback (name, email, feedback_text, submitted_at)
            VALUES (%s, %s, %s, %s)
            """,
            (name, email, feedback_text, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        )
        conn.commit()
        return jsonify({"status": "ok"}), 201
    except Error as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        try:
            cursor.close()
            conn.close()
        except Exception:
            pass


if __name__ == '__main__':
    # Run the Flask app
    app.run(host='127.0.0.1', port=5000, debug=True)


