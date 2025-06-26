<script>
  import AppHeader from "./lib/components/AppHeader.svelte";
  import AppHearthAnimation from "./lib/components/AppHearthAnimation.svelte";
  import AppUserInput from "./lib/components/AppUserInput.svelte";
  import AppUserLifespan from "./lib/components/AppUserLifespan.svelte";
  import AppUserOverLifespan from "./lib/components/AppUserOverLifespan.svelte";
  import { userStore } from "./lib/store/user.svelte";
</script>

<main class="app-flow-of-time">
  <AppHeader />
  <AppUserInput />
  {#if userStore.started}
    <div class="flex flex-col items-center justify-center gap-4 px-4 md:px-0 mt-14 max-w-lg mx-auto">
      <h2 class="text-3xl font-semibold text-primary">Your Lifespan Snapshot</h2>
      <p class="text-body text-center">
        All of the data are calculated based on the average lifespan of the country you selected. More detail about
        how it is calculated can be found at the project <a href="https://github.com/MSpiechowicz/flowoftime" target="_blank" class="text-body underline underline-offset-4 font-bold">repository</a>.
      </p>
      {#if userStore.age > userStore.lifeExpectancy}
        <div class="flex flex-col md:flex-row items-center justify-center gap-10 mt-4 mb-12 md:mb-0">
          <AppUserOverLifespan />
          <AppUserLifespan />
        </div>
      {:else}
        <div class="flex flex-col md:flex-row items-center justify-center gap-10 mt-8 mb-12 md:mt-4 md:mb-0">
          <AppHearthAnimation />
          <AppUserLifespan />
        </div>
      {/if}
    </div>
  {/if}
</main>
