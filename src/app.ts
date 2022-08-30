require('dotenv').config()

// import express from 'express'
// import compression from 'compression'
// import cors from 'cors'

import { WebSocketServer } from 'ws';
import { replyMessage } from './Services/MessageService';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
	ws.on('message', async (data) => {
		const userMessage = JSON.parse(data.toString())
		const reply = await replyMessage(userMessage)
		ws.send(reply);
	});
	ws.send(JSON.stringify({
		from: 'server',
		type: 'text',
		message: 'Здравствуйте! Что вы хотите сделать?'
	}))
	ws.send(JSON.stringify({
		from: 'server',
		type: 'buttons',
		message: [{ text: 'Войти', action: 'login' }, { text: 'Найти', action: 'search' }]
	}))
});