<script>
  import { activeScreen, screens } from "../Stores/screen";

  import Welcome from "../Samples/Welcome.svelte";
  import Picture from "../Samples/Picture.svelte";
  import Pause from "../Samples/Pause.svelte";
  import TaskInfo from "../Samples/TaskInfo.svelte";
  import Modules from "../Samples/multimodules/Modules.svelte";
  import Timeout from "../Samples/Timeout.svelte";
  import Tries from "../Samples/Tries.svelte";
  import Priority from "../Samples/Priority.svelte";
  import Limit from "../Samples/Limit.svelte";
  import Speed from "../Samples/Speed.svelte";

  let screenComponents = {
    [screens.Main.welcome]: Welcome,

    [screens.Runtime.picture]: Picture,
    [screens.Runtime.pause]: Pause,
    [screens.Runtime.taskinfo]: TaskInfo,
    [screens.Runtime.components]: Modules,

    [screens.Options.timeout]: Timeout,
    [screens.Options.tries]: Tries,
    [screens.Options.priority]: Priority,

    [screens.Engine.limit]: Limit,
    [screens.Engine.speed]: Speed,
  };

  let currentComponent;
  $: currentComponent = screenComponents[$activeScreen];
</script>

<svelte:component this={currentComponent} />
