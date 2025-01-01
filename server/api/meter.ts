import OpenAI from 'openai';
import { useRuntimeConfig } from '#imports';

const config = useRuntimeConfig();

const openai = new OpenAI({
	apiKey: config.OPENAI_API_KEY
});

const PROMPT = `You are an AI model tasked with evaluating the global situation based on the following recent events.`
	+ ` Analyze the events and provide a single number between 0 and 100 that represents the severity of the world situation,`
	+ ` where 0 indicates no concern and 100 indicates extreme concern.`
	+ ` Your response should be solely the number, without any additional text or explanation.`

export default defineEventHandler(async (event) => {
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
			max_tokens: 5,
		});

		const indicator = response.choices[0].message.content?.trim() || "42";
		return {
			indicator
		};
	} catch (error) {
		return { error: `Failed to fetch response from OpenAI` };
	}
});
