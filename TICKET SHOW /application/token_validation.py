import datetime
import jwt
from flask import current_app as app, jsonify
class Validate_and_generate_token:
    def validate(self=None,token=""):
        
        try:
            payload = jwt.decode(token,app.config['SECRET_KEY'], algorithms=["HS256"])
            print(payload)
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
            
        return(payload)

    def generate(self=None,user_id=1):
        print(app.config['SECRET_KEY'])
        token=jwt.encode({'user_id':user_id,'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=100)},app.config['SECRET_KEY'], algorithm="HS256" )
        print(token)
        return(token)
    
    def generate2(self=None,admin_id=1):
        print(app.config['SECRET_KEY'])
        token=jwt.encode({'admin_id':admin_id,'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=100)},app.config['SECRET_KEY'], algorithm="HS256" )
        print(token)
        return(token)