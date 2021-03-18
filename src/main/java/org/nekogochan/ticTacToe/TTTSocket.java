package org.nekogochan.ticTacToe;

import com.google.gson.Gson;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class TTTSocket extends TextWebSocketHandler {

    private final Gson JSON = new Gson();

    TTTModel model;
    Map<WebSocketSession, Integer> players = new HashMap<>();

    public TTTSocket(TTTModel model) {
        this.model = model;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        if (players.size() >= 2) session.close();

        int newPlayerNumber = 0;
        for (var n : players.values()) {
            newPlayerNumber = n == 1 ? 0 : 1;
        }
        players.put(session, newPlayerNumber);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        players.remove(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        var msg = message.getPayload();
        if (msg.equals("newGame")) {
            model.refresh();
            sendMessageToAll("refresh", "succeed");
            sendMessageToAll("field", model.getField());
        } else {

            if (players.get(session) != model.getCurrentPlayer())
                sendError(session, "It's not your turn");
            else
                try {
                    var xy = msg.split(",");
                    int x = Integer.parseInt(xy[0]);
                    int y = Integer.parseInt(xy[1]);
                    if (model.doStep(x, y)) {
                        sendMessageToAll("gameEnd", model.getWinner());
                    }
                    sendMessageToAll("field", model.getField());
                } catch (TTTModel.IllegalMoveException e) {
                    sendError(session, e.getMessage());
                }
        }
    }

    static class JsonErrorTemplate {
        Object status;
        Object value;

        public JsonErrorTemplate(Object value) {
            this.status = "error";
            this.value = value;
        }
    }

    void sendError(WebSocketSession session, Object value) throws IOException {
        session.sendMessage(new TextMessage(
                JSON.toJson(new JsonErrorTemplate(value))
        ));
    }

    static class JsonMessageTemplate {
        static class ValueTemplate {
            Object type;
            Object value;

            public ValueTemplate(Object type, Object value) {
                this.type = type;
                this.value = value;
            }
        }

        Object status;
        ValueTemplate value;

        public JsonMessageTemplate(Object type, Object value) {
            this.status = "ok";
            this.value = new ValueTemplate(type, value);
        }
    }

    void sendMessage(WebSocketSession session, Object type, Object value) throws IOException {
        session.sendMessage(new TextMessage(
                JSON.toJson(new JsonMessageTemplate(type, value))
        ));
    }

    void sendMessageToAll(Object type, Object value) throws IOException {
        for (var session : players.keySet()) {
            sendMessage(session, type, value);
        }
    }
}
