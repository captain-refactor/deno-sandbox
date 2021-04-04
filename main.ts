import {render} from "https://deno.land/x/dejs/mod.ts";

let template = `
<head></head>
<body>
<h1>Hello</h1>
</body>
`

addEventListener("fetch", async (event) => {
    const response = new Response(await render(template), {
        headers: {"content-type": "text/plain"},
    });
    event.respondWith(response);
});
