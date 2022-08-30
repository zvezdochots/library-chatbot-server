import axios from 'axios'

const APIURL = 'https://lib.gubkin.ru/api'

const API = axios.create({ baseURL: APIURL })

const searchBooks = async (title, token) => {
	const request = {
		fond: "MSCIENCE",
		searchParameters: [
			{ tab: 'Автор', word: '%%', condAfter: '1' },
			{ tab: 'Продолж.заглавия', word: '%%', condAfter: '1' },
			{ tab: 'Заглавие', word: `%${title}%`, condAfter: '1' },
			{ tab: 'Ключевые слова', word: '%%', condAfter: '1' },
			{ tab: 'Дата издания', word: '%%', condAfter: '0' }
		]
	}

	let parsedBooks = [];
	const response = API.post(
		'/Biblio/Search',
		JSON.stringify(request),
		{
			headers: {
				'content-type': 'application/json',
				'authorization': 'bearer ' + token
			}
		}
	)
	let keys = Object.keys(response);
	for (let i = 0; i < keys.length; i++) {
		parsedBooks.push({
			header: keys[i],
			//Пора пересмотреть API.
			bookData: response[keys[i]] ?? null
		});
	}
	return parsedBooks;
}

export { searchBooks }