<script lang="ts">
  import { userStore } from "../store/user.svelte";

  // Real-time seconds calculation
  let currentTime = $state(Date.now());
  let deathDate = $state(0);
  
  // Update current time every second
  $effect(() => {
    const interval = setInterval(() => {
      currentTime = Date.now();
    }, 1000);

    console.log(currentTime);
    
    return () => clearInterval(interval);
  });

  // Recalculate death date when user data changes
  $effect(() => {
    if (userStore.lifeExpectancy > 0 && userStore.age < userStore.lifeExpectancy) {
      const now = new Date();
      const yearsRemaining = userStore.lifeExpectancy - userStore.age;
      const calculatedDeathDate = new Date(now.getTime());
      calculatedDeathDate.setFullYear(now.getFullYear() + yearsRemaining);
      deathDate = calculatedDeathDate.getTime();
    } else {
      deathDate = 0;
    }
  });

  // Calculate seconds remaining in real time
  const secondsRemaining = $derived(
    deathDate > 0 ? Math.max(0, (deathDate - currentTime) / 1000) : 0
  );

  $effect(() => {
    userStore.setSecondsRemaining(secondsRemaining);
  });
</script>

<div>
  <h3>Your Timeline Snapshot</h3>
  <p>Your current age: {userStore.age}</p>
  <p>Estimated life expectancy: {userStore.lifeExpectancy.toFixed(1)} years</p>
  <p>Years remaining (estimated): {userStore.yearsRemaining.toFixed(1)}</p>
  <p>Seconds remaining (estimated): {Math.floor(secondsRemaining).toLocaleString()}</p>
</div> 