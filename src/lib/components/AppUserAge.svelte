<script lang="ts">
  import { userStore } from "../store/user.svelte";
</script>

<input
  class="border border-border rounded-lg p-2 bg-white w-full h-10 appearance-none cursor-pointer"
  id="age"
  type="number"
  value={userStore.age}
  min="1"
  max="120"
/>
