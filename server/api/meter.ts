import OpenAI from 'openai';
import { useRuntimeConfig } from '#imports';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const config = useRuntimeConfig();

const openai = new OpenAI({
	apiKey: config.OPENAI_API_KEY
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const promptFilePath = path.resolve(__dirname, '../../prompt.xml');
let PROMPT = '';

export default defineEventHandler(async (event) => {
	PROMPT = await fs.readFile(promptFilePath, 'utf-8');
	const body = await readBody(event);
	const articles = body;
	const eventTitles = articles.map((article: any) => article.title).join('\n');

	if (!articles || articles.length === 0) {
		return { error: 'No articles provided' };
	}

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [
				{ role: 'system', content: PROMPT },
				{ role: 'user', content: `Here are the recent events: ${eventTitles}` }
			],
			max_tokens: 1000,
		});

		const content = response.choices[0].message.content?.trim() || '{"indicator": 42, "comment": "Default response"}';
		const cleanedContent = content.replace(/```json|```/g, '').trim();
		const result = JSON.parse(cleanedContent);
		return {
			indicator: result.indicator,
			comment: result.comment
		};
	} catch (error) {
		return { indicator: 42, comment: 'An error occurred' };
	}
});
