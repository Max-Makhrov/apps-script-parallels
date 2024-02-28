<script>
  export let label = "";
  export let value = 2000;
  export let disabled = false;
  export let minMax = [1000, 3000];
</script>

<label for="numberSlider">{label}</label>

<input
  {disabled}
  type="range"
  id="numberSlider"
  bind:value
  min={minMax[0]}
  max={minMax[1]}
/>
{value}
