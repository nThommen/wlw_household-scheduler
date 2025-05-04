"""
Filename: app.py
Date: 04. May 2025
Author: Nicolas Thommen
Description: app for running the serverside for the wlw_project during the
fourth semester of my BSc programme.
"""

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Household Scheduler API is running."


@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify([]) #Empty list for now

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

