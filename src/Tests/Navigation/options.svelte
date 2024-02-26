<script>
  export let options = [
    { id: "1", label: "foo" },
    { id: "2", label: "bar" },
  ];
  export let selected = options[0];
  export let name = Math.random().toString(36).substring(2, 9);
</script>

<div style="margin-bottom: 15px;">
  {#each options as option}
    <label style="display: block;">
      <input type="radio" {name} value={option} bind:group={selected} />
      {option.label}
    </label>
  {/each}
</div>

<style>
  label,
  input {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }
  label {
    margin-bottom: 3px;
  }
  label:hover {
    transform: translateX(4px); /* Adjust the value as needed */
  }
</style>
