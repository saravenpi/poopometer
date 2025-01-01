<template>
	<div class="flex flex-col justify-between h-screen w-full">
		<Head>
			<Title>Poopometer - About</Title>
		</Head>
		<!-- Header -->
		<header class="flex flex-row p-10 w-full justify-between">
			<div class="flex flex-row gap-6 items-center ">
				<img src="/poop.png" alt="poop" class="w-16" />
				<h1 class="text-4xl font-extrabold">Poopometer</h1>
			</div>
		</header>

		<!-- About -->
		<div class="flex flex-col p-[100px] w-full justify-center gap-6 items-center text-2xl">
			The poopometer is a simple app that tells you how bad the world situation is. It fetches the recent news and
			then sends them to OpenAi to make an AI generated evaluation of how the world situation is right now.
			<a href="/" class="text-[#615549] px-8 py-2 font-extrabold border-2 border-[#615549] rounded-full transition-colors duration-300 hover:bg-[#615549] hover:text-[#E4DDD5] text-sm">Go back</a>
		</div>

		<!-- Footer -->
		<footer class="flex flex-row p-10 w-full justify-between">
			<h1 class="text-2xl">
				Made with ❤️ by <a href="https://github.com/saravenpi" class="underline">saravenpi</a>
			</h1>
		</footer>
	</div>
</template>
