import { Colors, Nats } from "../src/mod.ts";

const nc = await Nats.connect({ servers: Deno.args[0] || "localhost" });
try {
  let codec = Nats.StringCodec();
  console.log(`Connected to ${nc.getServer()}`);
  const sub = nc.subscribe("*");
  for await (let msg of sub) {
    console.log(`[${msg.subject}]`);
    console.group();
    console.log(codec.decode(msg.data));
    console.groupEnd();
  }
} catch (e) {
  console.error(Colors.red(e));
} finally {
  nc.close();
}
