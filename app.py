from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class ToDo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Integer, default=0)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Task %r>' % self.id

@app.route('/api/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'POST':
        task_content = request.json['content']
        new_task = ToDo(content=task_content)
        try:
            db.session.add(new_task)
            db.session.commit()
            return jsonify({
                'id': new_task.id,
                'content': new_task.content,
                'completed': new_task.completed,
                'date_created': new_task.date_created
            }), 201
        except:
            return jsonify({'error': 'There was an issue adding your task'}), 500
    else:
        tasks = ToDo.query.order_by(ToDo.date_created).all()
        return jsonify([
            {
                'id': task.id,
                'content': task.content,
                'completed': task.completed,
                'date_created': task.date_created
            } for task in tasks
        ])

@app.route('/api/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task_to_delete = ToDo.query.get_or_404(id)
    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return jsonify({'message': 'Task deleted'}), 200
    except:
        return jsonify({'error': 'There was a problem deleting that task'}), 500

@app.route('/api/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = ToDo.query.get_or_404(id)
    task.content = request.json['content']
    try:
        db.session.commit()
        return jsonify({
            'id': task.id,
            'content': task.content,
            'completed': task.completed,
            'date_created': task.date_created.isoformat()
        }), 200
    except:
        return jsonify({'error': 'There was an issue updating your task'}), 500

def init_db():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    init_db()
    app.run(debug=True)