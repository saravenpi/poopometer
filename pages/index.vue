<template>
	<div class="flex flex-col justify-between h-screen w-full">
		<Head>
			<Title>Poopometer</Title>
		</Head>
		<!-- Header -->
		<header class="flex flex-row p-10 w-full justify-between items-center">
			<div class="flex flex-row gap-6 items-center ">
				<img src="/poop.png" alt="poop" class="w-16" />
				<h1 class="text-4xl font-extrabold">Poopometer</h1>
			</div>
			<!-- Buttons -->
			<div>
				<a
						href="/about"
						class="text-[#615549] px-8 py-2 font-extrabold border-2 border-[#615549] rounded-full transition-colors duration-300 hover:bg-[#615549] hover:text-[#E4DDD5] text-sm">
					About
				</a>
			</div>
		</header>

		<div class="flex flex-col md:flex-row p-[100px] w-full justify-center gap-10 items-center">
			<!-- Indicator -->
			<div class="flex flex-col bg-white p-[50px] rounded-3xl shadow-xl w-min h-min">
				<div class="text-2xl">
					We are
				</div>
				<div class="text-6xl font-extrabold text-[#E5791F] w-[150px]">
					{{ percentage }}%
				</div>
				<div class="text-2xl">
					in deep shit
				</div>
			</div>

			<!-- Recent Events -->
			<div class="flex flex-col bg-white p-[50px] rounded-3xl shadow-xl gap-3">
				<div class="flex flex-row gap-6 w-full items-center justify-between">
					<div class="text-3xl font-extrabold text-[#615549]">
						Recent Events
					</div>
					<span class="text-lg text-[#615549]">{{ events.length }} found</span>
				</div>

				<!-- Events List -->
				<div class="flex flex-col gap-3 max-h-64 overflow-y-auto">
					<div v-if="loading" class="flex justify-center items-center max-h-64">
						<svg class="animate-spin h-10 w-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
																											 viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
							</circle>
							<path class="opacity-75" fill="currentColor"
													 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
						</svg>
					</div>
					<div v-else v-for="event in events" :key="event.title"
								class="flex items-start text-2xl bg-[#E4DDD5] p-3 rounded-xl">
						<img :src="event.imageUrl" alt="news image"
												   class="max-w-32 h-16 rounded-xl mr-3 object-cover" />
						<div class="flex flex-col max-h-16">
							<span class="text-lg font-semibold text-[#615549] max-w-64 truncate">{{ event.title
								}}</span>
							<a href="event.link" target="_blank"
												 class="text-sm text-blue-500 max-w-64 truncate hover:underline">{{ event.link }}</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<footer class="flex flex-row p-10 w-full justify-between items-center">
			<h1 class="text-3xl font-bold">
				The ai world crisis indicator
			</h1>
			<a
					href="/about"
					class="text-[#615549] px-8 py-2 font-extrabold border-2 border-[#615549] rounded-full transition-colors duration-300 hover:bg-[#615549] hover:text-[#E4DDD5]" text-sm>
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
				events: [],
				loading: true
			};
		},
		mounted() {
			this.fetchNews();
		},
		methods: {
			async fetchPercentage() {
				try {
					const response = await $fetch('/api/meter', { method: 'POST', body: JSON.stringify(this.events), pick: ['indicator'] });
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
					this.events = response.data.World.map(article => ({
						title: article.title,
						imageUrl: article.og,
						link: article.link
					}));
					this.loading = false;
					this.fetchPercentage();
					this.events = response.data.World.map(article => ({
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
