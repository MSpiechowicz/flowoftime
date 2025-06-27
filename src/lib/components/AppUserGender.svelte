<script lang="ts">
  import { userStore } from "../store/user.svelte";
</script>

<select
  class="border border-border rounded-lg w-full h-10 bg-white appearance-none px-2 cursor-pointer form-select bg-no-repeat"
  id="gender"
  value={userStore.gender}
>
  <option selected value="female">Female</option>
  <option value="male">Male</option>
</select>
