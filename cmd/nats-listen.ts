import {connect, StringCodec} from "https://deno.land/x/nats/src/mod.ts";
import {red} from 'https://deno.land/std@0.92.0/fmt/colors.ts';

const nc = await connect({servers: Deno.args[0] || 'localhost'})
try {
    let codec = StringCodec()
    console.log(`Connected to ${nc.getServer()}`);
    const sub = nc.subscribe('*')
    for await (let msg of sub) {
        console.log(`[${msg.subject}]`)
        console.group()
        console.log(codec.decode(msg.data))
        console.groupEnd()
    }
} catch (e) {
    console.error(red(e));
} finally {
    nc.close()
}
