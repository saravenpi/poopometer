<template>
	<div>

		<Head>
			<Title>Poopometer</Title>
		</Head>

		<!-- Header -->
		<header class="flex flex-row p-6 md:p-10 w-full justify-between items-center gap-6 flex-wrap">
			<div class="flex flex-row gap-3 items-center ">
				<img src="/poop.png" alt="poop" class="w-8 md:w-16" />
				<h1 class="text-3xl md:text-4xl font-extrabold">Poopometer</h1>
			</div>
			<!-- Buttons -->
			<div>
				<a href="/about"
					class="text-[#615549] px-8 py-2 font-extrabold border-2 border-[#615549] rounded-full transition-colors duration-300 hover:bg-[#615549] hover:text-[#E4DDD5] text-sm">
					About
				</a>
			</div>
		</header>

		<div class="flex flex-col p-[16px] md:p-[100px] w-full gap-6">

			<div class="flex flex-col gap-6">
				<!-- Indicator -->
				<div class="flex flex-col bg-white p-[25px] rounded-3xl shadow-xl h-full text-center w-full">
					<div class="text-2xl">
						We are
					</div>
					<div class="text-6xl font-extrabold text-[#E5791F] w-full">
						{{ percentage }}%
					</div>
					<div class="text-2xl">
						in deep sh**
					</div>
				</div>
				<div class="text-xl font-bold bg-white w-full p-[25px] md:p-[50px] rounded-3xl shadow-xl text-center">
					<div v-if="commentLoading" class="flex justify-center items-center">
						<svg class="animate-spin h-10 w-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
							viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
							</circle>
							<path class="opacity-75" fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
						</svg>
					</div>
					<div v-else>
						{{ comment }}
					</div>
				</div>
			</div>

			<!-- Recent Events -->
			<div class="flex flex-col bg-white p-[25px] md:p-[50px] w-full rounded-3xl shadow-xl gap-3">
				<div class="flex flex-row gap-6 w-full items-center justify-between">
					<div class="text-xl md:text-3xl font-extrabold text-[#615549]">
						Recent Events
					</div>
					<span class="text-sm md:text-lg text-[#615549]">{{ events.length }} found</span>
				</div>

				<!-- Events List -->
				<div class="flex flex-col gap-3 w-full overflow-y-auto max-h-[250px] md:max-h-[500px]">
					<div v-if="loading" class="flex justify-center items-center max-w-screen md:max-h-64">
						<svg class="animate-spin h-10 w-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
							viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
							</circle>
							<path class="opacity-75" fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
						</svg>
					</div>
					<div v-else v-for="event in events" :key="event.title"
						class="flex items-start text-2xl bg-[#E4DDD5] p-3 rounded-lg md:rounded-xl">
						<img :src="event.imageUrl" alt="news image"
							class="w-16 h-8 md:w-32 md:h-16 rounded md:rounded-xl mr-3 object-cover" />
						<div class="flex flex-col max-h-8">
							<span class="text-sm font-semibold text-[#615549] max-w-32 md:max-w-64 truncate">{{
								event.title
							}}</span>
							<a :href="event.link" target="_blank"
								class="text-sm text-blue-500 hover:underline max-w-32 md:max-w-64 truncate">{{
									event.link }}</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<footer class="flex flex-col md:flex-row p-3 md:p-10 w-full justify-between md:items-center gap-3">
			<h1 class="text-3xl font-bold">
				The ai world crisis indicator
			</h1>
			<a href="/about"
				class="text-[#615549] px-8 py-2 font-extrabold border-2 border-[#615549] rounded-full transition-colors duration-300 hover:bg-[#615549] hover:text-[#E4DDD5] w-fit"
				text-sm>
				Learn More
			</a>
		</footer>
	</div>
</template>

<script>
import axios from 'axios';
import anime from 'animejs/lib/anime.es.js';

export default {
	data() {
		return {
			percentage: 0,
			comment: '',
			events: [],
			loading: true,
			commentLoading: true
		};
	},
	mounted() {
		this.fetchNews();
	},
	methods: {
		async fetchPercentage() {
			try {
				const response = await $fetch('https://poopometer-backend-production.up.railway.app/meter', { method: 'POST', body: JSON.stringify(this.events), pick: ['indicator'] });
				const indicator = response.indicator;
				const percentage = parseFloat(indicator);
				if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
					anime({
						targets: this,
						percentage: percentage,
						round: 1,
						easing: 'easeOutQuad',
						duration: 2000
					});
					this.comment = response.comment || 'No comment available.';
					this.commentLoading = false;
				} else {
					console.error("Invalid percentage received:", text);
				}

			} catch (error) {
				console.error("Error fetching percentage:", error);
			}
		},
		async fetchNews() {
			try {
				const response = await axios.get('https://ok.surf/api/v1/cors/news-feed');
				const news = [
					...response.data.Business,
					...response.data.Entertainment,
					...response.data.Health,
					...response.data.Science,
					...response.data.Sports,
					...response.data.Technology,
					...response.data.US,
					...response.data.World
				]
				this.events = news.map(article => ({
					title: article.title,
					imageUrl: article.og,
					link: article.link
				}));
				this.loading = false;

				this.fetchPercentage();
				this.events = news.map(article => ({
					title: article.title,
					imageUrl: article.og,
					link: article.link
				}));
			} catch (error) {
				console.error("Error fetching news:", error);
			}
		}
	}
};
</script>
