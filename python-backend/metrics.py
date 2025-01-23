import psutil
import time
import json
import websocket


def get_metrics():
    metrics = {
        "cpu": psutil.cpu_percent(interval=1),
        "memory": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage('/').percent,
        "network": psutil.net_io_counters().bytes_sent
    }
    return metrics

def on_open(ws):
    print("Connection established")

def on_close(ws):
    print("Connection closed")

def send_metrics():
    url = "ws://localost:8080"
    ws = websocket.WebsocketApp(url, on_open=on_open, on_close=on_close)
    ws.on_open = on_open
    ws.on_close = on_close

    while True:
        metrics = get_metrics()
        ws.send(json.dumps(metrics))
        time.sleep(1)

if __name__ == "__main__":
    send_metrics()