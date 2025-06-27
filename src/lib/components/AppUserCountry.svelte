<script lang="ts">
  import { getCountries } from "../lifespan";
  import { userStore } from "../store/user.svelte";

  let showDropdown = $state(false);
  let searchDropdownValue = $state(userStore.country);
  let filteredCountries = $state([]);

  function handleInputBlur() {
    // Delay hiding dropdown to allow for country selection
    setTimeout(() => {
      showDropdown = false;
    }, 200);
  }

  function selectCountry(country: string) {
    userStore.setCountry(country);
    searchDropdownValue = country;
    showDropdown = false;
  }

  function handleSearch(event: Event) {
    const { value } = event.target as HTMLInputElement;
    searchDropdownValue = value;
    const countries = getCountries();
    filteredCountries = countries.filter((country) =>
      country.toLowerCase().includes(value.toLowerCase()),
    );
    showDropdown = true;
  }

  function handleInputFocus() {
    const countries = getCountries();
    filteredCountries = countries;
    showDropdown = true;
  }
</script>

<input
  class="border border-border rounded-lg p-2 bg-white w-full h-10 appearance-none cursor-pointer form-select bg-no-repeat"
  id="country"
  type="text"
  placeholder="Select country"
  value={searchDropdownValue}
  oninput={handleSearch}
  onfocus={handleInputFocus}
  onblur={handleInputBlur}
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
        onclick={() => selectCountry(country)}
      >
        {country}
      </button>
    {/each}
  </div>
{/if}
