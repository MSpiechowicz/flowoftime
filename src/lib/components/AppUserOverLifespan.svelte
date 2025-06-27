<script lang="ts">
  import { onMount } from "svelte";
  import { userStore } from "../store/user.svelte";
  import IconOldMan from "../svg/IconOldMan.svelte";
  import IconOldWoman from "../svg/IconOldWoman.svelte";
  import { isElementInViewport } from "../utils/isElementInViewport";

  let transitionDiv: HTMLElement;

  onMount(() => {
    if (transitionDiv && !isElementInViewport(transitionDiv)) {
      transitionDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
</script>

<div bind:this={transitionDiv} class="flex flex-row items-center justify-center gap-10 mt-4">
  {#if userStore.gender === "male"}
    <IconOldMan customClass="w-40 h-auto text-body" />
  {:else}
    <IconOldWoman customClass="w-40 h-auto text-body" />
  {/if}
</div>
