# syntax=docker/dockerfile:1
FROM python:3.8.3-slim-buster
WORKDIR /TiendaBarco
RUN apt-get update && apt-get -y install libpq-dev gcc && pip install psycopg2
COPY requirements.txt requirements.txt
# install dependencies
RUN pip install --upgrade pip

COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .
CMD ["cd", "/TiendaBarco"]
CMD ["ls"]
CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8000"]