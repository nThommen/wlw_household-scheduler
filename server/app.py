"""
Filename: app.py
Date: 04. May 2025
Author: Nicolas Thommen
Description: app for running the serverside for the wlw_project during the
fourth semester of my BSc programme.
"""

from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

tasks=[
            {
                'id': 1,
                'name': 'Task 1',
                'description': 'Description of Task 1',
                'status': 'pending'
            },
            {
                'id': 2,
                'name': 'Task 2',
                'description': 'Description of Task 2',
                'status': 'completed'
            }
        ]

@app.route('/')
def index():
    return send_from_directory('../client', 'index.html')

@app.route('/<path:path>')
def static_files(path):
	return send_from_directory('../client', path)



@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = {
        'id': tasks[-1]['id'] + 1 if tasks else 1,
        'name': data.get('name', 'New Task'),
        'description': data.get('description', 'No description provided'),
        'status': data.get('status', 'pending')
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

if __name__ == '__main__':
    app.run(debug=True)

