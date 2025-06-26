<script>
  import AppHeader from './lib/components/AppHeader.svelte';
  import AppHearthAnimation from './lib/components/AppHearthAnimation.svelte';
  import AppUserInput from './lib/components/AppUserInput.svelte';
  import AppUserLifespan from './lib/components/AppUserLifespan.svelte';

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
  <AppHearthAnimation />
  <AppUserLifespan />
</main>
