import {createServer} from 'node:http';
import {createReadStream,statSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
const root=process.cwd(),types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.json':'application/json'};
createServer((req,res)=>{let path;try{path=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end('Bad request');return}if(path==='/')path='/index.html';const file=resolve(root,'.'+path);if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end('Forbidden');return}try{if(!statSync(file).isFile())throw Error();res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});createReadStream(file).pipe(res)}catch{res.writeHead(404).end('Not found')}}).listen(8000,'127.0.0.1',()=>console.log('ATHLETE OS: http://127.0.0.1:8000'));

