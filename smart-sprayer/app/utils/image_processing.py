import random

def detect_disease(image_bytes: bytes) -> dict:
    """
    Placeholder function for disease detection.
    In a real implementation, this would use a trained ML model.
    """
    # Mock diseases that match the database
    diseases = [
        {"name": "Late Blight", "confidence": 0.85},
        {"name": "Early Blight", "confidence": 0.72},
        {"name": "Potato Blight", "confidence": 0.91},
        {"name": "Healthy", "confidence": 0.95}
    ]

    # Randomly select a disease for demo purposes
    result = random.choice(diseases)

    return result