const myval = 1000;
const myval1 = 1100;
const myval2 = 1110;
const myval3 = 1111;
const myval4 = 3589;
const arr = [' ', 'ti', 'hundre', 'tusen'];
const nullTilNi = ['null', 'ett', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni']
const teens = ['null', 'ellve', 'tolv', 'tretten', 'fjorten', 'femten', 'seksten', 'søtten', 'atten', 'nitten']
const nullTilNitty = ['null', 'ti', 'tjue', 'tretti', 'førti', 'femti', 'seksti', 'sjøtti', 'åtti', 'nitti']

let trans = (val) => {
  let valString = val.toString().split('');
  let current = valString.length -1;

  let newstring = "";
  valString.forEach((c) => {

    if (c !== '0') {
      if (current == 1 && parseInt(c)==1 ) {
        newstring += ' og ' + arr[current] + ' '

      } else if (valString.length -1- current==2) {
        newstring += ' og ' + nullTilNitty[parseInt(c)] + ' '
      }
      else {
        newstring += nullTilNi[parseInt(c)] + ' ' + arr[current] + ' '

      }
    }


    current -= 1;

  })
  return newstring
}
console.log(trans(myval));
console.log(trans(myval1));
console.log(trans(myval2));
console.log(trans(myval3));
console.log(trans(myval4));
