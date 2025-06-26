<script lang="ts">
  import { getCountries, getLifeExpectancy } from "../lifespan";
  import { userStore } from "../store/user.svelte";
  import IconUserHeart from "../svg/IconUserHeart.svelte";
  import IconUserPin from "../svg/IconUserPin.svelte";
  import IconUserQuestion from "../svg/IconUserQuestion.svelte";

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

  let showDropdown = false;
  let searchValue = userStore.country;
  let filteredCountries = [];

  function handleSearch(event) {
    const { value } = event.target;
    searchValue = value;
    const countries = getCountries();
    filteredCountries = countries.filter((country) => country.toLowerCase().includes(value.toLowerCase()));
    showDropdown = true;
  }

  function selectCountry(country: string) {
    userStore.setCountry(country);
    searchValue = country;
    showDropdown = false;
  }

  function handleInputFocus() {
    const countries = getCountries();
    filteredCountries = countries;
    showDropdown = true;
  }

  function handleInputBlur() {
    // Delay hiding dropdown to allow for country selection
    setTimeout(() => {
      showDropdown = false;
    }, 200);
  }
</script>

<div class="flex flex-col items-center justify-center gap-4 mt-14 max-w-lg mx-auto">
  <form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center justify-center">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 border border-border rounded-lg p-4 shadow-md">
      <div class="flex flex-col gap-1">
        <div class="flex flex-row items-center justify-start gap-1.5">
          <IconUserHeart customClass="w-5 h-5" customColor="#4B5563" />
          <label class="text-body" for="age">Age </label>
        </div>
        <input
          class="border border-border rounded-lg p-2 bg-white w-full h-10 appearance-none cursor-pointer"
          id="age"
          type="number"
          value={userStore.age}
          min="1"
          max="120"
        />
      </div>
      <div class="flex flex-col gap-1">
        <div class="flex flex-row items-center justify-start gap-1.5">
          <IconUserQuestion customClass="w-5 h-5" customColor="#4B5563" />
          <label class="text-body" for="gender">Gender</label>
        </div>
        <select
          class="border border-border rounded-lg w-full h-10 bg-white appearance-none px-2 cursor-pointer form-select bg-no-repeat"
          id="gender"
          value={userStore.gender}
        >
          <option selected value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
      <div class="flex flex-col gap-1 relative">
        <div class="flex flex-row items-center justify-start gap-1.5">
          <IconUserPin customClass="w-5 h-5" customColor="#4B5563" />
          <label class="text-body" for="country">Country</label>
        </div>
        <input
          class="border border-border rounded-lg p-2 bg-white w-full h-10 appearance-none cursor-pointer form-select bg-no-repeat"
          id="country"
          type="text"
          placeholder="Select country"
          value={searchValue}
          on:input={handleSearch}
          on:focus={handleInputFocus}
          on:blur={handleInputBlur}
          autocomplete="off"
          required
        />

        {#if showDropdown && filteredCountries.length > 0}
          <div
            class="absolute top-full left-0 right-0 bg-white border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto z-10 mt-1"
          >
            {#each filteredCountries as country}
              <button
                type="button"
                class="w-full text-left px-3 py-2 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                on:click={() => selectCountry(country)}
              >
                {country}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <button class="w-full bg-primary hover:bg-primary-hover rounded-lg p-2 text-white h-10 mt-4 shadow-md" type="submit"
      >Start the Clock!</button
    >
  </form>
</div>
