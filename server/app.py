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
import json

app = Flask(__name__)
CORS(app)
tasksFile = 'tasks.json'

if os.path.exists(tasksFile):
    with open(tasksFile, 'r') as f:
        tasks = json.load(f)
else:
    tasks = [
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

def save_tasks():
    with open(tasksFile, 'w') as f:
        json.dump(tasks, f)

@app.route('/')
def index():
    return send_from_directory('../client', 'index.html')

@app.route('/<path:path>')
def static_files(path):
	return send_from_directory('../client', path)



@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):    
    data = request.get_json()
    task_to_update = next((task for task in tasks if task['id'] == task_id), None)
    if not task_to_update:
        return jsonify({'error': 'Task not found'}), 404
    task_to_update['name'] = data.get('name', task_to_update['name'])
    task_to_update['description'] = data.get('description', task_to_update['description'])
    task_to_update['duedate'] = data.get('duedate', task_to_update['duedate'])
    task_to_update['assignee'] = data.get('assignee', task_to_update['assignee'])
    task_to_update['status'] = data.get('status', task_to_update['status'])
    save_tasks()
    return jsonify(task_to_update)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = {
        'id': tasks[-1]['id'] + 1 if tasks else 1,
        'name': data.get('name', 'New Task'),
        'description': data.get('description', 'No description provided'),
        'duedate': data.get('duedate', 'No due date provided'),
        'assignee': data.get('assignee', 'Unassigned'),
        'status': data.get('status', 'pending')
    }
    tasks.append(new_task)
    save_tasks()
    return jsonify(new_task), 201

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task_to_delete = next((task for task in tasks if task['id'] == task_id), None)
    if not task_to_delete:
        return jsonify({'error': 'Task not found'}), 404
    tasks.remove(task_to_delete)
    save_tasks()
    return jsonify({'result': True})

if __name__ == '__main__':
    app.run(debug=True)