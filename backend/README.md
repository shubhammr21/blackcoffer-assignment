# Blackcoffer Backend Documentation

## Overview

This is the backend project for the Blackcoffer assignment. It is built using Django and manages data import, API endpoints, and database operations.

## Prerequisites

- Python 3.10 or higher
- [uv](https://github.com/astral-sh/uv) CLI for Python dependency management
- pip (Python package manager)

## Setup Instructions

1. **Clone the repository** (if not already done):

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies using uv:**

   ```bash
   uv sync
   ```

   This will install all required packages as specified in `pyproject.toml` and `uv.lock`.

3. **Apply database migrations:**

   ```bash
   python manage.py migrate
   ```

4. **Load initial data:**

   ```bash
   python manage.py import_data jsondata.json
   ```

   This command imports data from `jsondata.json` into the database.

5. **Run the development server:**

   ```bash
   python manage.py runserver
   ```

   The backend server will start at `http://127.0.0.1:8000/` by default.

## Additional Notes

- Ensure you have the correct version of Python installed.
- If you encounter issues with `uv`, refer to the [uv documentation](https://github.com/astral-sh/uv).
- For custom management commands or additional features, check the `records/management/commands/` directory.

## Project Structure

- `core/` - Django project settings and configuration
- `records/` - Main app containing models, views, serializers, and management commands
- `jsondata.json` - Data file for import

## Useful Commands

- `python manage.py makemigrations` - Create new migrations based on model changes
- `python manage.py createsuperuser` - Create an admin user for the Django admin panel

---

For any issues, please raise an issue in the repository or contact the maintainer.
