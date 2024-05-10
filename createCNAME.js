import fs from 'fs';

if (!fs.existsSync('./dist/CNAME')) {
  fs.appendFileSync('./dist/CNAME', 'eurovision-ranking.mihau.co');
}
