<script>
  import { fade } from "svelte/transition";
  export let isChecked = false;
  export let onText = "Switch is ON";
  export let offText = "Switch is OFF";

  function toggleSwitch() {
    isChecked = !isChecked;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="switch-container" on:click={toggleSwitch}>
  <div class="switch">
    <input type="checkbox" bind:checked={isChecked} />
    <span class="slider"></span>
  </div>
  {#if isChecked}
    <p class="label" in:fade>{onText}</p>
  {:else}
    <p class="label" in:fade>{offText}</p>
  {/if}
</div>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    border-radius: 17px; /* half of the height for rounded corners */
    overflow: hidden;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f0e15a;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 17px; /* half of the height for rounded corners */
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%; /* for a circular handle */
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .label {
    margin-left: 10px;
  }

  .switch-container {
    margin-left: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
</style>
