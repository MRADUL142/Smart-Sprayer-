"""
Vercel entrypoint for FastAPI application.
This file is required by Vercel to find and run the FastAPI app.
"""

import sys
import os

# Add the smart-sprayer directory to the path so imports work correctly
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'smart-sprayer'))

from main import app

# Export the FastAPI app instance for Vercel to use
__all__ = ['app']
