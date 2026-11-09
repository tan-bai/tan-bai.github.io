import {copyFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const files=["block_metadata.json", "context_metadata.json", "reference_overlay.svg", "reference_1600m.png", "models/jining_block_v02.glb", "models/jining_context_v02.glb", "LICENSE.upstream", "LICENSE.three", "functions.json", "functions.geojson", "FUNCTIONS.md"];
for(const file of files){const to=path.join(root,'public',file);await mkdir(path.dirname(to),{recursive:true});await copyFile(path.join(root,'..',file),to);}
