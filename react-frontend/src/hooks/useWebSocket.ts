import { useEffect, useState } from 'react';

export const useWebSocket = (url: string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState<string>('');
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            setIsConnected(true);
            console.log("websocket connected")
        };

        ws.onmessage = (event) => {
            console.log('received message: ', event.data);
            try {
                const parsedData = JSON.parse(event.data);
                setMessage(parsedData);
            } catch (error) {
                console.error("failed to parse message: ", error)
            }
        };

        ws.onerror = (error) => {
            console.error('Websocket error: ', error);
        };

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [url]);

    return { socket, message, isConnected };
}