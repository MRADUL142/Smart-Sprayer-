#!/bin/bash
# Build script for Render deployment

cd smart-sprayer
pip install -r requirements.txt
python seed.py
