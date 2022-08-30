import { searchBooks } from '../api'

const replyMessage = async (m) => {
	switch (m.action) {
		case 'search':
			const response = await searchBooks(m.message, m.token)
			return formatReply('server', 'Здравствуйте!')
		case 'login':
			return formatReply('service', 'login')
		default:
			return formatReply('server', 'Не удалось распознать ваше сообщение.')
	}
}

const formatReply = (type, text) => {
	return JSON.stringify({
		type,
		text
	})
}

export { formatReply, replyMessage }