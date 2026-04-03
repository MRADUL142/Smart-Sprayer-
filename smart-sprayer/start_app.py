#!/usr/bin/env python
"""
Smart Sprayer Application Launcher
Handles port cleanup and application startup
"""

import subprocess
import sys
import time
import logging
import os

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

PORT = 8000
PYTHON_EXECUTABLE = sys.executable

def kill_process_on_port(port):
    """Kill any process using the specified port"""
    try:
        # Check for processes using the port
        result = subprocess.run(
            f'netstat -ano | findstr :{port}',
            shell=True,
            capture_output=True,
            text=True
        )
        
        if result.stdout:
            logger.info(f"Found processes using port {port}:")
            for line in result.stdout.strip().split('\n'):
                if line.strip():
                    logger.info(f"  {line}")
                    # Extract PID (last column)
                    parts = line.split()
                    if len(parts) > 0:
                        pid = parts[-1]
                        if pid.isdigit() and pid != '0':
                            try:
                                logger.info(f"Killing process {pid}...")
                                subprocess.run(
                                    f'taskkill /PID {pid} /F',
                                    shell=True,
                                    capture_output=True,
                                    timeout=5
                                )
                                logger.info(f"Process {pid} killed successfully")
                            except Exception as e:
                                logger.warning(f"Could not kill process {pid}: {e}")
    except Exception as e:
        logger.warning(f"Error checking for processes on port {port}: {e}")

def start_application():
    """Start the FastAPI application"""
    try:
        logger.info(f"Starting Smart Sprayer on port {PORT}...")
        logger.info(f"Web interface: http://localhost:{PORT}")
        logger.info(f"API endpoints: http://localhost:{PORT}/api/")
        
        # Run the main application
        result = subprocess.run(
            [PYTHON_EXECUTABLE, 'main.py'],
            cwd=os.path.dirname(os.path.abspath(__file__))
        )
        return result.returncode
    except KeyboardInterrupt:
        logger.info("Application stopped by user")
        return 0
    except Exception as e:
        logger.error(f"Error starting application: {e}")
        return 1

def main():
    """Main entry point"""
    logger.info("=" * 60)
    logger.info("Smart Sprayer - Plant Disease Detection System")
    logger.info("=" * 60)
    
    # Kill any existing processes on the port
    logger.info(f"Checking port {PORT}...")
    kill_process_on_port(PORT)
    
    # Wait for OS to fully release the port
    logger.info("Waiting for port to be released...")
    time.sleep(2)
    
    # Verify port is free
    result = subprocess.run(
        f'netstat -ano | findstr :{PORT}',
        shell=True,
        capture_output=True,
        text=True
    )
    
    if result.stdout.strip():
        logger.warning(f"Port {PORT} is still in use, trying anyway...")
    else:
        logger.info(f"Port {PORT} is now free")
    
    # Start the application
    return_code = start_application()
    
    logger.info("=" * 60)
    logger.info("Application shutdown")
    logger.info("=" * 60)
    
    return return_code

if __name__ == "__main__":
    sys.exit(main())
