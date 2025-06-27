<script lang="ts">
  import { getLifeExpectancy } from "../lifespan";
  import { userStore } from "../store/user.svelte";
  import IconUserHeart from "../svg/IconUserHeart.svelte";
  import AppUserAge from "./AppUserAge.svelte";
  import AppUserCountry from "./AppUserCountry.svelte";
  import AppUserGender from "./AppUserGender.svelte";

  async function handleSubmit(event) {
    const { age, country, gender } = event.target;

    const lifeExpectancy = await getLifeExpectancy(country?.value, gender?.value);

    userStore.setAge(age?.value);
    userStore.setLifeExpectancy(lifeExpectancy);
    userStore.setGender(gender?.value);
    userStore.setCountry(country?.value);
    userStore.setStarted(true);
    userStore.calculate();
  }

  const formEntries = [
    {
      label: "Age",
      for: "age",
      component: AppUserAge,
      isRelative: false,
    },
    {
      label: "Gender",
      for: "gender",
      component: AppUserGender,
      isRelative: false,
    },
    {
      label: "Country",
      for: "country",
      component: AppUserCountry,
      isRelative: true,
    },
  ];
</script>

<div class="flex flex-col items-center justify-center gap-4 mt-14 max-w-lg mx-auto">
  <form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center justify-center">
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 border border-border rounded-lg p-4 shadow-md"
    >
      {#each formEntries as entry}
        <div class="flex flex-col gap-1 {entry.isRelative ? 'relative' : ''}">
          <div class="flex flex-row items-center justify-start gap-1.5">
            <IconUserHeart customClass="w-5 h-5" customColor="#4B5563" />
            <label class="text-body" for={entry.for}>{entry.label}</label>
          </div>
          <entry.component />
        </div>
      {/each}
    </div>

    <button
      class="w-full bg-primary hover:bg-primary-hover rounded-lg p-2 text-white h-10 mt-4 shadow-md"
      type="submit">Start the Clock!</button
    >
  </form>
</div>
