from settings import *
from model import *
from werkzeug.security import generate_password_hash, check_password_hash

def add_user(username, passowrd, device_id):
    existing_user = User.query.filter_by(username=username).first()

    if existing_user:
        return jsonify({"error_message":"User already exists"}), 400
    
    new_user = User(username=username, password=passowrd,devices=json.dumps([device_id]))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success_message":"User added successfully"}), 201


def perform_user_login(username, password, device_id):
    if not username or not password or not device_id:
        return jsonify({'error_message':'User not exists'})
    
    user = User.query.filter_by(username=username).first()
    if not user or user.password != password:
        return jsonify({'error_message': 'Invalid username or password'}), 403
    
    devices = json.loads(user.devices)
    if device_id not in devices:
        if len(devices) < 3:
            devices.append(device_id)
            user.devices = json.dumps(devices)
            db.session.commit()
        else:
            return jsonify({'message': 'Maximum number of devices reached', 'length':f'length = {len(devices)}'}), 403

    return jsonify({'message': 'Logged in successfully', 'user': {'username': user.username, 'devices': user.devices}}), 200


def perform_user_logout(username, device_id):
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({'error_message':'User not found'}), 401
    
    if device_id in user.devices:
        user.devices.remove(device_id)
        db.session.commit()
        return jsonify({'success_message':'Logged out successfully'}), 200
    
    return jsonify({'error_message':'Device not found'}), 404


def retrieve_user_sessions(username):
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({'device_ids': user.devices}), 200