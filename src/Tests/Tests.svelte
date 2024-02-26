<script>
  import { onMount } from "svelte";
  import { setData } from "./PixelPainting/pixeldoc";
  import Menus from "./Navigation/menus.svelte";
  import Screen from "./Navigation/screen.svelte";
  import Footer from "./Navigation/footer.svelte";
  onMount(setData);
</script>

<Menus />
<Screen />
<Footer />

<head>
  <link
    rel="stylesheet"
    href="https://ssl.gstatic.com/docs/script/css/add-ons1.css"
  />
</head>
