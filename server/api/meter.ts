import OpenAI from 'openai';
import { useRuntimeConfig } from '#imports';

const config = useRuntimeConfig();

const openai = new OpenAI({
	apiKey: config.OPENAI_API_KEY
});

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const articles = body;
	const eventTitles = articles.map((article: any) => article.title).join('\n');

	if (!articles || articles.length === 0) {
		return { error: 'No articles provided' };
	}
	const prompt = `Based on the following recent events: ${eventTitles}\n Give a number between 0 and 100 that indicates how bad the world situation is. Even if the data is not large, you must in always return an estimation number. Just your estimation between 0 and 100. Nothing else just a number.`

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [{ role: 'system', content: prompt }],
			max_tokens: 150,
		});

		const indicator = response.choices[0].message.content?.trim() || "42";
		return {
			indicator
		};
	} catch (error) {
		return { error: `Failed to fetch response from OpenAI` };
	}
});
