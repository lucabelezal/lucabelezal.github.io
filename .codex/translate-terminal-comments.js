const fs = require('fs');
const path = require('path');
const replacements = {
  '# When we run the program the `\\"ping\\"` message is': '# Ao executar o programa, a mensagem `\\"ping\\"` é',
  '# us to wait at the end of our program for the `\\"ping\\"`': '# esperar no fim do programa pela mensagem `\\"ping\\"`',
  "# To experiment with command-line arguments it's best to": '# Para experimentar argumentos de linha de comando, é melhor',
  '# function. Usually this isn\'t an issue though, since': '# . Normalmente isso não é um problema, pois',
  '# starting goroutines, spawning processes, and exec\'ing': '# iniciar goroutines, criar processos e executar processos',
  '# We receive the values `\\"one\\"` and then `\\"two\\"` as': '# Recebemos os valores `\\"one\\"` e depois `\\"two\\"` como',
};
for (const file of fs.readdirSync('go-by-example').filter((name) => /^\d\d-.*\.mdx$/.test(name))) {
  const target = path.join('go-by-example', file);
  let source = fs.readFileSync(target, 'utf8');
  for (const [from, to] of Object.entries(replacements)) source = source.split(from).join(to);
  fs.writeFileSync(target, source);
}
