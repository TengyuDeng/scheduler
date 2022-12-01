from flask import Flask, url_for, request, redirect
import pandas as pd
import os

app = Flask(__name__)

from flask import render_template

@app.route('/', methods=['GET'])
def timer():
    return render_template('timer.html')

@app.route('/send', methods=['POST'])
def send():
    data = request.json
    save_data(**data)
    return "OK"

@app.route('/result', methods=['GET'])
def result():
    return render_template('result.html')

def save_data(task: str, time : str):
    if not os.path.exists('data.csv'):
        # If data not exists, create new dataframe
        data = {'task': ["WORK", "MEAL", "GAME", "DVD", "SHOPPING", "SLEEP"], 'time': [0.] * 6}
        df = pd.DataFrame(data)
    else:
        df = pd.read_csv('data.csv', index_col=0)
    # Save data to database
    h, m, s = [int(t) for t in time.split(':')]
    df.loc[df['task'] == task, 'time'] += h * 3600 + m * 60 + s
    app.logger.info(f"Saved data : {task} {time}")
    app.logger.info(f"Updated data: {df.loc[df['task'] == task, 'time']}")
    # Save the data to csv
    df.to_csv('data.csv')

def read_data(csv_path: str):
    df = pd.read_csv(csv_path, index_col=0)
    
    return df
if __name__ == '__main__':
    app.run()