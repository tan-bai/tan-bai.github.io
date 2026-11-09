import {copyFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const files=["height_summary.json", "satellite.png", "models/qufu_gba.glb", "LICENSE.upstream", "LICENSE.three", "functions.json", "functions.geojson", "FUNCTIONS.md"];
for(const file of files){const to=path.join(root,'public',file);await mkdir(path.dirname(to),{recursive:true});await copyFile(path.join(root,'..',file),to);}
