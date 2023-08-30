from datetime import datetime, timedelta
from rest_framework_jwt.utils import jwt_payload_handler as default_payload_handler


def jwt_payload_handler(user):
    payload = default_payload_handler(user)
    
    # Add custom fields to the payload
    payload['user_id'] = user.id
    payload['role'] = user.role  # Replace 'role' with the actual field name
    
    # Add expiration time to the payload (optional)
    payload['exp'] = datetime.utcnow() + timedelta(days=1)
    
    return payload