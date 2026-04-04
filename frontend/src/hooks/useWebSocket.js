import { useEffect, useRef, useCallback } from 'react';
import { websocketService } from '../services/websocketService';

export const useWebSocket = () => {
  const subscriptionsRef = useRef({});
  const isConnectingRef = useRef(false);

  const ensureConnected = useCallback((onConnect, onError) => {
    return new Promise((resolve) => {
      if (websocketService.connected) {
        resolve();
        return;
      }

      if (isConnectingRef.current) {
        // Wait for connection
        const checkInterval = setInterval(() => {
          if (websocketService.connected) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
        return;
      }

      isConnectingRef.current = true;
      websocketService.connect(
        () => {
          isConnectingRef.current = false;
          resolve();
          if (onConnect) onConnect();
        },
        (error) => {
          isConnectingRef.current = false;
          if (onError) onError(error);
          resolve(); // Still resolve to not block
        }
      );
    });
  }, []);

  const subscribe = useCallback((destination, callback) => {
    return ensureConnected().then(() => {
      const subscription = websocketService.subscribe(destination, callback);
      subscriptionsRef.current[destination] = subscription;
      return subscription;
    });
  }, [ensureConnected]);

  const unsubscribe = useCallback((destination) => {
    websocketService.unsubscribe(destination);
    delete subscriptionsRef.current[destination];
  }, []);

  const send = useCallback((destination, body) => {
    return ensureConnected().then(() => {
      websocketService.send(destination, body);
    });
  }, [ensureConnected]);

  // Cleanup on unmount
  useEffect(() => {
    const subscriptions = subscriptionsRef.current;
    return () => {
      Object.keys(subscriptions).forEach((destination) => {
        unsubscribe(destination);
      });
    };
  }, [unsubscribe]);

  return {
    subscribe,
    unsubscribe,
    send,
    isConnected: websocketService.connected,
  };
};
