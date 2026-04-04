import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const WS_BASE_URL = 'http://localhost:8080/ws';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.subscriptions = {};
    this.connected = false;
  }

  connect(onConnect, onError) {
    if (this.stompClient && this.connected) return;

    const socket = new SockJS(WS_BASE_URL);
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => {};

    const token = localStorage.getItem('rocketdrop.token') || document.cookie.match(/(?:^|; )accessToken=([^;]+)/)?.[1];
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    this.stompClient.connect(headers, () => {
      this.connected = true;
      if (onConnect) onConnect();
    }, (error) => {
      if (onError) onError(error);
    });
  }

  disconnect() {
    if (this.stompClient) {
      Object.values(this.subscriptions).forEach((subscription) => {
        try {
          subscription.unsubscribe();
        } catch {
          // ignore cleanup failures
        }
      });
      this.subscriptions = {};
      this.stompClient.disconnect();
      this.stompClient = null;
      this.connected = false;
    }
  }

  subscribe(destination, callback) {
    if (!this.stompClient || !this.connected) {
      console.warn('WebSocket not connected');
      return null;
    }

    const subscription = this.stompClient.subscribe(destination, (message) => {
      try {
        const data = JSON.parse(message.body);
        callback(data);
      } catch {
        callback(message.body);
      }
    });

    this.subscriptions[destination] = subscription;
    return subscription;
  }

  unsubscribe(destination) {
    if (this.subscriptions[destination]) {
      this.subscriptions[destination].unsubscribe();
      delete this.subscriptions[destination];
    }
  }

  send(destination, body) {
    if (this.stompClient && this.connected) {
      this.stompClient.send(destination, {}, JSON.stringify(body));
    } else {
      console.warn('WebSocket not connected');
    }
  }
}

export const websocketService = new WebSocketService();