// Script teste consumindo api decolar.com
// Desenvolvido em Node JS - Desenvolvido por Julio Verissimo -  julio_verissimo@hotmail.com.br
// Node v10.16.0
// 1 - Rodar comando:  npm install na pasta para instalar dependencias
// 2 - Rodar comando: node index.js


const fs = require('fs');
const axios = require('axios');

let loopRequest = loop("aaa");

var file = fs.createWriteStream("result.csv");
file.once('open', async function (fd) {
    //header 
    file.write("id;gid;code;type;parents;display;higlight;location");
    for (const iterator of loopRequest) {
        let result = await axios.get(`https://www.decolar.com/suggestions?locale=pt-BR&profile=sbox-cp-vh&hint=${iterator}&fields=city`);

        for (const item of result.data.items) {
            console.log('item', item)
            for (const it of item.items) {
                file.write(`${it.target.id};${it.target.gid};${it.target.code};${it.target.type};${JSON.stringify(it.target.parents)};${it.display};higlight;${JSON.stringify(it.location)}`);
                file.write("\n");
            }
        }

    }
    file.end();
});

function loop(init) {
    let prefix = [];
    var temp = init;
    console.log(init);
    while (true) {
        temp = generate(temp);
        if (temp == init) break;
        // console.log(temp);
        prefix.push(temp);
    }

    return prefix;
}
function generate(str) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var chars = [];
    for (var i = 0; i < str.length; i++) {
        chars.push(alphabet.indexOf(str[i]));
    }
    for (var i = chars.length - 1; i >= 0; i--) {
        var tmp = chars[i];
        if (tmp >= 0 && tmp < 25) {
            chars[i]++;
            break;
        }
        else { chars[i] = 0; }
    }
    var newstr = "";
    for (var i = 0; i < chars.length; i++) {
        newstr += alphabet[chars[i]];
    }
    return newstr;
} 