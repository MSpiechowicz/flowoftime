<script>
  import AppHeader from "./lib/components/AppHeader.svelte";
  import AppHearthAnimation from "./lib/components/AppHearthAnimation.svelte";
  import AppUserInput from "./lib/components/AppUserInput.svelte";
  import AppUserLifespan from "./lib/components/AppUserLifespan.svelte";
  import AppUserOverLifespan from "./lib/components/AppUserOverLifespan.svelte";
  import { userStore } from "./lib/store/user.svelte";

  let age = 0;
  let lifeExpectancy = 0;
  let secondsRemaining = 0;

  function handleCalculate(event) {
    age = event.detail.age;
    lifeExpectancy = event.detail.lifeExpectancy;
    const yearsRemaining = lifeExpectancy - age;
    secondsRemaining = yearsRemaining * 365.25 * 24 * 60 * 60;
  }
</script>

<main class="app-flow-of-time">
  <AppHeader />
  <AppUserInput />
  {#if userStore.started}
    <div class="flex flex-col items-center justify-center gap-4 mt-14 max-w-lg mx-auto">
      <h2 class="text-3xl font-bold text-primary">Your Lifespan Snapshot</h2>
      <p class="text-body text-center">
        All of the data are calculated based on the average lifespan of the country you selected. More detail about
        how it is calculated can be found at the project repository.
      </p>
      {#if userStore.age > userStore.lifeExpectancy}
        <div class="flex flex-row items-center justify-center gap-10 mt-4">
          <AppUserOverLifespan />
          <AppUserLifespan />
        </div>
      {:else}
        <div class="flex flex-row items-center justify-center gap-10 mt-4">
          <AppHearthAnimation />
          <AppUserLifespan />
        </div>
      {/if}
    </div>
  {/if}
</main>
