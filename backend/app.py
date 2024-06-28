from settings import *
from  module import *
from werkzeug.security import generate_password_hash, check_password_hash
import uuid


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    device_id = str(uuid.uuid4())

    result = add_user(username, password, device_id)

    return result


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    device_id = data['device_id']

    result = perform_user_login(username, password, device_id)     

    return result         


@app.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    device_id = data['device_id']
    username = data['username']
    print(device_id)

    result = perform_user_logout(username, device_id)

    return result


@app.route('/sessions', methods=['GET'])
def get_sessions():
    username = request.args.get('username')

    result = retrieve_user_sessions(username)

    return result


if __name__ == '__main__':
    app.run(debug=True)