FROM python:alpine
RUN pip install --upgrade pip
RUN pip install flask waitress
COPY app /app
WORKDIR /app
CMD python main.py
