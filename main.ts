import { serve } from "https://deno.land/std@0.92.0/http/server.ts";
const s = serve({ port: 80 });
console.log("http://0.0.0.0.:80/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
