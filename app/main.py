from flask import Flask, render_template
import os

app = Flask(__name__)


@app.route('/')
def index():
    dirs = os.listdir(f"static/plans/")
    return render_template('index.html', dirs=dirs)


@app.route('/<plan>')
def display(plan):
    directory = f'static/plans/{plan}'
    if not os.path.exists(directory):
        return f'ERROR: This directory does not exist: {plan}'
    if not os.path.isdir(directory):
        return f'ERROR: This is not a directory: {plan}'
    layers = sorted(os.listdir(directory))
    return render_template('display.html', plan=plan, layers=layers)


if __name__ == '__main__':
    # Might be useful for debugging.
    # app.run(debug=True)

    from waitress import serve
    serve(app, host='0.0.0.0', port=5000, threads=12)
    # threads=12 because of https://stackoverflow.com/a/75679198
