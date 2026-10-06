const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');


const names = {
  a:{
    first:[ "Maiden" ,"Wiz" , 'Scar','Rat','Maestro'],
    last: ['Lowkey', 'Lanez', 'Kid' , 'King','Von']
  },
  b: {
    first:[ 'Future', 'Thug', 'Fallen','Shimmy', 'Tha Baby'],
    last: ['Dame','West', 'Don' , 'Trippie','Machine']
  },
  c: {
    first:[ 'Evil' ,'Fool','Dash','Plug','Migos'],
    last: ['Ye','Cole','Swims','Uzi','Moneybagg']
  }

}

//havent created yet

function listTaker(list){
  return list[Math.floor(Math.random() * list.length)] // randomize numbers 
}

//making counts to count how many times a,b,c show up and return the highest count wins

function mostPicked(answered){
  const counts = {
    a:0,
    b:0,
    c:0,
  };
  //counts how many times a ,b,c comes in
  answered.forEach(function(answer){
    if(counts[answer]!== undefined){
      counts[answer]+= 1 
    }
  });


  let winner = 'a'
  if(counts.b > counts[winner])winner = 'b';
  if(counts.c > counts[winner])winner ='c'
  return winner
}


const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    const answer = [params.q1,params.q2,params.q3,params.q4,params.q5];
    const letter = mostPicked(answer)
    const group = names[letter]
    const name = listTaker(group.first)+ ' ' + listTaker(group.last)
    
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({name: name}));
     
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
    }//else if
  else if (page == '/css/wutang.webp'){
    fs.readFile('css/wutang.webp', function(err, data) {
    res.writeHead(200, {'Content-Type': 'img/webp'});
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
