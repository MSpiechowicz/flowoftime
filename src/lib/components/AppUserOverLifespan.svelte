<script lang="ts">
  import { userStore } from "../store/user.svelte";
  import IconOldMan from "../svg/IconOldMan.svelte";
  import IconOldWoman from "../svg/IconOldWoman.svelte";
</script>

<div class="flex flex-row items-center justify-center gap-10 mt-4">
  {#if userStore.gender === "male"}
    <IconOldMan customClass="w-40 h-auto text-body" />
  {:else}
    <IconOldWoman customClass="w-40 h-auto text-body" />
  {/if}
</div>
