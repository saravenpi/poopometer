<template>
	<div class="flex flex-col h-screen w-full">

		<Head>
			<Title>Poopometer - About</Title>
		</Head>
		<!-- Header -->
		<header class="flex flex-row p-6 md:p-10 w-full justify-between">
			<div class="flex flex-row gap-3 items-center ">
				<img src="/poop.png" alt="poop" class="w-8 md:w-16" />
				<h1 class="text-[#615549] text-3xl md:text-4xl font-extrabold">Poopometer</h1>
			</div>
		</header>

		<!-- About -->
		<div class="flex flex-col p-[16px] md:p-[100px] w-full justify-center gap-6 text-2xl">
			<h2 class="text-[#615549]">
				The Poopometer is a simple app that gauges the state of the world.
			</h2>
			<h2 class="text-[#615549]">
				By analyzing recent world news, it uses gpt-4o to generate an AI-driven assessment of just how chaotic
				or
				challenging the current global situation might be.
			</h2>
			<h2 class="text-[#615549]">
				The AI processes the data every 15 minutes to ensure up-to-date insights.
			</h2>
			<h1 class="text-[#615549] text-lg md:text-2xl">
				Made with ❤️ by <a href="https://github.com/saravenpi" class="underline">saravenpi</a>
			</h1>
			<a href="/"
				class="text-[#615549] px-8 py-2 font-extrabold border-2 border-[#615549] rounded-full transition-colors duration-300 hover:bg-[#615549] hover:text-[#E4DDD5] text-sm w-fit">
				Go back
			</a>
		</div>
	</div>
</template>
