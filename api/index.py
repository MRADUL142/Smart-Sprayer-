"""
Vercel entrypoint for FastAPI application.
This file is required by Vercel to find and run the FastAPI app.
"""

import sys
import os

# Set up the Python path to include the smart-sprayer directory
smart_sprayer_path = os.path.join(os.path.dirname(__file__), '..', 'smart-sprayer')
if smart_sprayer_path not in sys.path:
    sys.path.insert(0, smart_sprayer_path)

# Now import the FastAPI app from main.py
from main import app

# Export the FastAPI app instance for Vercel to use
__all__ = ['app']
