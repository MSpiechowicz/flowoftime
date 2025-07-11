<script lang="ts">
  import { userStore } from "../store/user.svelte";
  import IconPinned from "../svg/IconPinned.svelte";
  import { getDeathDate } from "../utils/getDeathDate";
  import { isSingularOrPlural } from "../utils/isSingularOrPlural";

  // Real-time seconds calculation
  let currentTime = $state(Date.now());
  let deathDate = $state(0);

  // Update current time every second
  $effect(() => {
    const interval = setInterval(() => {
      currentTime = Date.now();
    }, 1000);

    return () => clearInterval(interval);
  });

  // Recalculate death date when user data changes
  $effect(() => {
    if (userStore.lifeExpectancy > 0 && userStore.age < userStore.lifeExpectancy) {
      deathDate = getDeathDate(userStore.age, userStore.lifeExpectancy);
    } else {
      deathDate = 0;
    }
  });

  $effect(() => {
    userStore.setSecondsRemaining(secondsRemaining);
  });

  // Calculate seconds remaining in real time
  const secondsRemaining = $derived(deathDate > 0 ? Math.max(0, (deathDate - currentTime) / 1000) : 0);

  const lifeExpectancyText = $derived(
    `${userStore.lifeExpectancy.toFixed(0)} ${isSingularOrPlural(userStore.lifeExpectancy, "year", "years")}`
  );
  const yearsRemainingText = $derived(
    `${userStore.yearsRemaining.toFixed(0)} ${isSingularOrPlural(userStore.yearsRemaining, "year", "years")}`
  );
  const secondsRemainingText = $derived(
    `${Math.floor(secondsRemaining).toLocaleString()} ${isSingularOrPlural(Math.floor(secondsRemaining), "second", "seconds")}`
  );

  const lifespanInfo = $derived([
    {
      label: "Average lifespan",
      value: lifeExpectancyText,
      visible: true,
    },
    {
      label: "Years remaining",
      value: yearsRemainingText,
      visible: userStore.age < userStore.lifeExpectancy,
    },
    {
      label: "Seconds remaining",
      value: secondsRemainingText,
      visible: userStore.age < userStore.lifeExpectancy,
    },
  ]);
</script>

<div class="flex flex-col items-start justify-start gap-2 max-w-lg mx-auto">
  {#each lifespanInfo as info}
    {#if info.visible}
      <div class="flex flex-row items-center justify-start gap-2">
        <IconPinned customClass="min-w-6 min-h-6" customColor="#4B5563" />
        <div class="flex flex-col items-start justify-start">
          <p class="text-lg text-body">{info.label}</p>
          <p class="text-lg text-body font-bold">{info.value}</p>
        </div>
      </div>
    {/if}
  {/each}
  {#if userStore.age >= userStore.lifeExpectancy}
    <div class="flex flex-row items-center justify-start gap-2">
      <IconPinned customClass="min-w-6 min-h-6" customColor="#4B5563" />
      <div class="flex flex-col items-start justify-start">
        <p class="text-lg text-body">Congratulations! You cheated death.</p>
      </div>
    </div>
  {/if}
</div>
