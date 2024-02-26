<script>
  import Wrapper from "../../Navigation/wrapper.svelte";
  import { running } from "@/Parallels/engine";
  import Module1 from "./module1.svelte";
  import Module2 from "./module2.svelte";
</script>

<Wrapper>
  <h1>🧱Modules</h1>
  <Module1 />
  <Module2 />
  <p style="font-size: large;">
    <strong>Total tasks running: </strong><code>{$running}</code>
  </p>
</Wrapper>
